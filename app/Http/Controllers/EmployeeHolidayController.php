<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\EmployeeSelfRequest;
use App\Http\Requests\AuthorizeAdminRequest;
use App\Http\Requests\EmployeeHoliday\EmployeeHolidayStoreRequest;
use App\Http\Requests\EmployeeHoliday\EmployeeHolidayDestroyRequest;
use App\Models\Employee;
use App\Models\Shift;
use App\Models\EmployeeHolidayPeriod;
use App\Models\EmployeeHoliday;
use App\Http\Resources\EmployeeHolidayResource;

class EmployeeHolidayController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(EmployeeSelfRequest $request, Employee $employee, EmployeeHolidayPeriod $holiday_period)
    {
        $holidays_per_page = 10000;
        $orderBy = 'day';
        $orderDirection = 'asc';


        $holidays = $holiday_period->holidays()->orderBy($orderBy, $orderDirection)->paginate($holidays_per_page);
        return EmployeeHolidayResource::collection($holidays);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(EmployeeHolidayStoreRequest $request, Employee $employee, EmployeeHolidayPeriod $holiday_period)
    {
        $period = $holiday_period->holiday_period;
        $from = $period->date_from;
        $to = $period->date_to;
        $totaldays = $period->days;

        $yearfrom = intval(date("Y", strtotime($from)));
        $yearto = intval(date("Y", strtotime($to)));

        $cals = [];
        $shift_ids = [];
        for ($i = $yearfrom; $i <= $yearto; $i++) {
            $empcalendar = $employee->calendars()->where('year', strval($i))->first();
            $calendar = $empcalendar == null ? null : $empcalendar->calendar;
            $calendarshifts = $calendar == null ? null : $calendar->shifts;
            if ($calendarshifts) {
                foreach ($calendarshifts as $calendarshift) {
                    if (!in_array($calendarshift->shift_id, $shift_ids)) {
                        array_push($shift_ids, $calendarshift->shift_id);
                    }
                }
            }
            $cal = [
                'year' => strval($i),
                'calendarshifts' => $calendarshifts
            ];
            array_push($cals, $cal);
        }
        $shifts = Shift::whereIn('id', $shift_ids)->get();
        $currentyear = null;

        $requestholidays = $request->all();
        foreach ($requestholidays as $requestholiday) {
            $spent = $holiday_period->holidays()->count();

            if ($requestholiday['day'] >= $from &&  $requestholiday['day'] <= $to && $spent < $totaldays) {

                $dayshift = $employee->shift;
                $year = date("Y", strtotime($requestholiday['day']));
                $dayofyear = date("z", strtotime($requestholiday['day']));

                if ($currentyear != $year) {
                    foreach ($cals as $cal) {
                        if ($cal['year'] == $year) {
                            $currentyear = $year;
                            $calshifts = $cal['calendarshifts'];
                            break;
                        }
                    }
                }
                if ($calshifts != null) {
                    foreach ($calshifts as $calshift) {
                        if ($calshift->day == $dayofyear && $shifts != null) {
                            foreach ($shifts as $shift) {
                                if ($shift->id == $calshift->shift_id) {
                                    $dayshift = $shift;
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }

                if ($dayshift && !$dayshift->is_holiday) {
                    $holiday = EmployeeHoliday::firstOrNew(['employee_holiday_period_id' => $holiday_period->id, 'day' => $requestholiday['day']]);
                    $holiday_period->holidays()->save($holiday);
                }
            }
        }

        return EmployeeHolidayResource::collection($holiday_period->holidays()->paginate(10000));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function show($id)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function update(Request $request, $id)
    // {
    //     //
    // }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(EmployeeHolidayDestroyRequest $request, Employee $employee, EmployeeHolidayPeriod $holiday_period, EmployeeHoliday $holiday)
    {
        // $hp = $holiday->employee_holiday_period;

        // return ['a' => $hp, 'b' => $holiday_period];

        $holiday->delete();
        return ["message" => "deleted"];
    }
}
