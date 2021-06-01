<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\EmployeeSelfRequest;
use App\Models\Employee;
use App\Models\Request as RequestModel;
use App\Models\BookingRequest;
use App\Models\AbsenceRequest;
use App\Models\HolidayRequest;
use App\Models\Booking;
use App\Models\Absence;
use App\Models\Shift;
use App\Http\Resources\RequestResource;
use App\Http\Requests\Request\RequestStoreRequest;
use App\Http\Requests\Request\RequestUpdateRequest;
use App\Http\Requests\Request\RequestDestroyRequest;
use App\Models\EmployeeHoliday;
use Carbon\Carbon;
use DateTime;


class RequestController extends Controller
{

    private function nextday($aday)
    {
        $data = new DateTime($aday);
        $data->modify('+1 day');
        return $data->format('Y-m-d');
    }


    public function index(EmployeeSelfRequest $request, Employee $employee)
    {
        $orderBy = 'created_at';
        $orderDirection = 'asc';

        $request_perPage = request('per_page', 25);

        $request_orderBy = request('sort_field', $orderBy);
        if (!in_array($request_orderBy, ['created_at', 'type', 'status'])) {
            $request_orderBy = $orderBy;
        }

        $request_orderDirection = request('sort_direction', $orderDirection);
        if (!in_array($request_orderDirection, ['asc', 'desc'])) {
            $request_orderDirection = $orderDirection;
        }

        $request_order = '';
        switch ($request_orderBy) {
            case 'created_at':
                $request_order = 'created_at ' . $request_orderDirection;
                break;
            case 'type':
                $request_order = 'type ' . $request_orderDirection;
                break;
            case 'status':
                $request_order = 'status ' . $request_orderDirection;
                break;
            default:
                $request_order = $request_orderBy . ' ' . $request_orderDirection;
                break;
        }

        $types = explode(',', request('type', ''));
        $allowedtypes = [];
        foreach ($types as $type) {
            if (in_array($type, ['booking', 'absence', 'holiday']) && !in_array($type, $allowedtypes))
                array_push($allowedtypes, $type);
        }
        $cnttypes = count($allowedtypes);

        $statuses = explode(',', request('status', ''));
        $allowedstatuses = [];
        foreach ($statuses as $status) {
            if (in_array($status, ['pending', 'accepted', 'rejected']) && !in_array($status, $allowedstatuses))
                array_push($allowedstatuses, $status);
        }
        $cntstatuses = count($allowedstatuses);

        $requests = $employee->requests()->when($cnttypes > 0 && $cnttypes < 3, function ($query) use ($allowedtypes) {
            $query->whereIn('type', $allowedtypes);
        })->when($cntstatuses > 0 && $cntstatuses < 3, function ($query) use ($allowedstatuses) {
            $query->whereIn('status', $allowedstatuses);
        })->orderByRaw($request_order)->paginate($request_perPage);

        return RequestResource::collection($requests);
    }

    public function supervised(EmployeeSelfRequest $request, Employee $employee)
    {
        $orderBy = 'created_at';
        $orderDirection = 'asc';

        $request_perPage = request('per_page', 25);

        $request_orderBy = request('sort_field', $orderBy);
        if (!in_array($request_orderBy, ['created_at', 'type', 'status'])) {
            $request_orderBy = $orderBy;
        }

        $request_orderDirection = request('sort_direction', $orderDirection);
        if (!in_array($request_orderDirection, ['asc', 'desc'])) {
            $request_orderDirection = $orderDirection;
        }

        $request_order = '';
        switch ($request_orderBy) {
            case 'created_at':
                $request_order = 'created_at ' . $request_orderDirection;
                break;
            case 'type':
                $request_order = 'type ' . $request_orderDirection;
                break;
            case 'status':
                $request_order = 'status ' . $request_orderDirection;
                break;
            default:
                $request_order = $request_orderBy . ' ' . $request_orderDirection;
                break;
        }

        $types = explode(',', request('type', ''));
        $allowedtypes = [];
        foreach ($types as $type) {
            if (in_array($type, ['booking', 'absence', 'holiday']) && !in_array($type, $allowedtypes))
                array_push($allowedtypes, $type);
        }
        $cnttypes = count($allowedtypes);

        $statuses = explode(',', request('status', ''));
        $allowedstatuses = [];
        foreach ($statuses as $status) {
            if (in_array($status, ['pending', 'accepted', 'rejected']) && !in_array($status, $allowedstatuses))
                array_push($allowedstatuses, $status);
        }
        $cntstatuses = count($allowedstatuses);

        $employee_ids = [];
        $supervisorgroups = $employee->supervisor;
        foreach ($supervisorgroups as $supervisorgroup) {
            $employees = $supervisorgroup->employees;
            foreach ($employees as $employee) {
                $employee_id = $employee->id;
                if (!in_array($employee_id, $employee_ids)) {
                    array_push($employee_ids, $employee_id);
                }
            }
        }

        $requests = RequestModel::whereIn('employee_id', $employee_ids)->when($cnttypes > 0 && $cnttypes < 3, function ($query) use ($allowedtypes) {
            $query->whereIn('type', $allowedtypes);
        })->when($cntstatuses > 0 && $cntstatuses < 3, function ($query) use ($allowedstatuses) {
            $query->whereIn('status', $allowedstatuses);
        })->orderByRaw($request_order)->paginate($request_perPage);



        // $requests = RequestModel::whereIn('employee_id', $employee_ids)->orderBy("created_at")->paginate($request_perPage);
        return RequestResource::collection($requests);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RequestStoreRequest $request, Employee $employee)
    {
        $type = request('type', '');

        $requestmodel = new RequestModel($request->validated());
        $requestmodel->status = 'pending';

        $employee->requests()->save($requestmodel);

        $typerequest = null;
        if ($type == 'booking') {
            $typerequest = new BookingRequest($request->validated());
            $requestmodel->bookingrequest()->save($typerequest);
        } else if ($type == 'absence') {
            $typerequest = new AbsenceRequest($request->validated());
            $requestmodel->absencerequest()->save($typerequest);
        } else if ($type == 'holiday') {
            $typerequest = new HolidayRequest($request->validated());
            $requestmodel->holidayrequest()->save($typerequest);
        }


        return [$requestmodel, $typerequest];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(RequestUpdateRequest $request, Employee $employee, RequestModel $req)
    {
        $req->update($request->validated());
        $req->validated_at = Carbon::now();
        $req->save();
        if ($req->status === 'accepted') {
            if ($req->type === 'booking') {
                $reqbooking = $req->bookingrequest;
                $booking = new Booking();
                $booking->date = $reqbooking->date;
                $booking->time = $reqbooking->time;
                $booking->incidence_id = $reqbooking->incidence_id;
                $booking->employee_id = $req->employee_id;
                $booking->user_id = $employee->id;
                $booking->save();
            } else if ($req->type === 'absence' || $req->type === 'holiday') {
                $reqemployee = $req->employee;
                $from = '';
                $to = '';
                if ($req->type === 'absence') {
                    $reqabsence = $req->absencerequest;
                    $from = $reqabsence->date_from;
                    $to = $reqabsence->date_to;
                }
                if ($req->type === 'holiday') {
                    $reqholiday = $req->holidayrequest;
                    $from = $reqholiday->date_from;
                    $to = $reqholiday->date_to;
                }

                $yearfrom = intval(date("Y", strtotime($from)));
                $yearto = intval(date("Y", strtotime($to)));

                $cals = [];
                $shift_ids = [];
                for ($i = $yearfrom; $i <= $yearto; $i++) {
                    $empcalendar = $reqemployee->calendars()->where('year', strval($i))->first();
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

                $currentday = $from;
                $currentyear = null;
                $calshifts = null;
                $absence_days = [];
                while ($currentday <= $to) {
                    $dayshift = $reqemployee->shift;
                    $year = date("Y", strtotime($currentday));
                    $dayofyear = date("z", strtotime($currentday));

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
                        if ($req->type === 'absence') {
                            $reqabsence = $req->absencerequest;
                            $absence = new Absence();
                            $absence->date = $currentday;
                            $absence->incidence_id = $reqabsence->incidence_id;
                            $absence->employee_id = $req->employee_id;
                            $absence->user_id = $employee->id;
                            $absence->save();
                        }
                        if ($req->type === 'holiday') {
                            $reqholiday = $req->holidayrequest;
                            $holiday = new EmployeeHoliday();
                            $holiday->day = $currentday;
                            $holiday->employee_holiday_period_id = $reqholiday->employee_holiday_period_id;
                            $holiday->save();
                        }
                    }
                    $currentday = $this->nextday($currentday);
                }
            }
        }

        return new RequestResource($req);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(RequestDestroyRequest $request, Employee $employee, RequestModel $req)
    {
        $req->delete();
    }
}
