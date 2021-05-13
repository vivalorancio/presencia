<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthorizeAdminRequest;
use App\Http\Requests\Booking\BookingStoreRequest;
use App\Http\Requests\Booking\BookingShowRequest;
use App\Http\Requests\Booking\BookingUpdateRequest;
use App\Http\Requests\Booking\BookingDestroyRequest;
use App\Http\Requests\EmployeeSelfRequest;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use App\Models\Employee;
use App\Models\Shift;
use App\Models\CalendarShifts;
use Symfony\Component\HttpFoundation\Response;

class BookingController extends Controller
{

    private $orderBy = 'date';
    private $orderDirection = 'asc';
    private $perPage = '50';

    public function index(EmployeeSelfRequest $request, Employee $employee)
    {
        $request_perPage = request('per_page', $this->perPage);

        $request_orderBy = request('sort_field', $this->orderBy);
        if (!in_array($request_orderBy, ['date'])) {
            $request_orderBy = $this->orderBy;
        }
        $request_orderDirection = request('sort_direction', $this->orderDirection);
        if (!in_array($request_orderDirection, ['asc', 'desc'])) {
            $request_orderDirection = $this->orderDirection;
        }

        $request_order = '';
        switch ($request_orderBy) {
            case 'date':
                $request_order = 'date ' . $request_orderDirection . ', time ' . $request_orderDirection;
                break;
            default:
                $request_order = $request_orderBy . ' ' . $request_orderDirection;
                break;
        }
        $start_date = request('start_date', '');
        $end_date = request('end_date', '');



        $bookings = Booking::when($start_date != '', function ($query) use ($start_date) {
            $query->where('date', '>=', $start_date);
        })->when($end_date != '', function ($query) use ($end_date) {
            $query->where('date', '<=', $end_date);
        })->orderByRaw($request_order)->paginate($request_perPage);
        // return $bookings;

        $datefrom = null;
        $dateto = null;
        if ($request_orderDirection == 'asc') {
            $datefrom = $bookings->first()->date;
            $dateto = $bookings->last()->date;
        } else {
            $datefrom = $bookings->last()->date;
            $dateto = $bookings->first()->date;
        }

        $yearfrom = intval(date("Y", strtotime($datefrom)));
        $yearto = intval(date("Y", strtotime($dateto)));

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
        // foreach ($shifts as $shift) {
        //     $shift->start_time == $shift->start_time->format('H:i');
        // }
        $currentyear = null;
        $calshifts = null;
        foreach ($bookings as $booking) {
            $booking->shift = $employee->shift;

            $year = date("Y", strtotime($booking->date));
            $dayofyear = date("z", strtotime($booking->date));

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
                                $booking->shift = $shift;
                                break;
                            }
                        }
                        break;
                    }
                }
            }
        }
        //return $bookings;

        return BookingResource::collection($bookings);
    }

    public function store(BookingStoreRequest $request, Employee $employee)
    {
        $booking = new Booking($request->validated());
        $employee->bookings()->save($booking);
        return response(['message' => 'Booking Successful.', 'code' => 'BOOKING_MSG_Successful'], Response::HTTP_CREATED);
    }

    public function show(BookingShowRequest $request, Employee $employee, Booking $booking)
    {
        return new BookingResource($booking);
    }

    public function update(BookingUpdateRequest $request, Employee $employee, Booking $booking)
    {
        $booking->update($request->validated());
        $booking->save();
        return new BookingResource($booking);
    }

    public function destroy(BookingDestroyRequest $request, Employee $employee, Booking $booking)
    {
        $booking->delete();
    }
}
