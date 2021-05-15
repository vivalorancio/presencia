<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthorizeAdminRequest;
use App\Http\Requests\Booking\BookingStoreRequest;
use App\Http\Requests\Booking\BookingShowRequest;
use App\Http\Requests\Booking\BookingUpdateRequest;
use App\Http\Requests\Booking\BookingDestroyRequest;
use App\Http\Requests\EmployeeSelfRequest;
use App\Http\Resources\BookingResource;
use App\Http\Resources\DayBookingResource;
use App\Models\Booking;
use App\Models\Employee;
use App\Models\Shift;
use App\Models\CalendarShifts;
use DateTime;
use Symfony\Component\HttpFoundation\Response;

use Illuminate\Http\Resources\Json\JsonResource;


class BookingController extends Controller
{

    private $request_order = 'date ASC, time ASC';
    private $perPage = '7';

    private function nextday($aday)
    {
        $data = new DateTime($aday);
        $data->modify('+1 day');
        return $data->format('Y-m-d');
    }


    private function eval($day)
    {
        $time0 = new DateTime('00:00');
        $eval = ['count' => count($day['bookings'])];
        $eval['totalbookedtime'] = '00:00:00';
        $eval['anomalies'] = [];

        $expected_time = date("H:i:s", strtotime($day['shift']->expected_time));
        $recess_time = $day['shift']->recess_time == null ? "00:00:00" : date("H:i:s", strtotime($day['shift']->recess_time));
        $tadd = clone $time0;
        $tadd->add(date_diff($time0, new DateTime($expected_time)));
        //$tadd->add(date_diff($time0, new DateTime($recess_time)));
        $totalshifttime = $time0->diff($tadd);
        $eval['totalshifttime'] = $totalshifttime->format("%H:%I:%S");



        $today = new DateTime();
        $aday = new DateTime($day['day']);
        if ($aday > $today || $day['shift']->is_holiday) {
            $eval['totalbookedtime'] = '';
        } else if ($eval['count'] > 0 && $eval['count'] % 2 == 0) {
            $eval['diffs'] = [];
            $eval['offtimes'] = [];
            $tadd = clone $time0;
            $countofftime = false;
            $fbdt = null;
            for ($i = 0; $i < $eval['count']; $i += 2) {
                $b1 = $day['bookings'][$i];
                $b2 = $day['bookings'][$i + 1];
                $b1t = date("Y-m-d H:i:s", strtotime($b1->time));
                $b2t = date("Y-m-d H:i:s", strtotime($b2->time));
                if ($b1->incidence == null || $b1->incidence->is_counted) {
                    $binterval = date_diff(new DateTime($b1t), new DateTime($b2t));
                    array_push($eval['diffs'], $binterval->format("%H:%I:%S"));
                    $tadd->add($binterval);
                    if ($fbdt == null) {
                        $fbdt = $b1t;
                    }
                } else {
                    if (!in_array('first_inc_not_counted', $eval['anomalies'])) {
                        array_push($eval['anomalies'], 'first_inc_not_counted');
                    }
                }
                if ($b2->incidence != null && $b2->incidence->is_counted) {
                    if ($i + 1 == $eval['count'] - 1) {
                        $b3t = date("Y-m-d H:i:s", strtotime($day['shift']->end_time));
                    } else {
                        $b3 = $day['bookings'][$i + 2];
                        $b3t = date("Y-m-d H:i:s", strtotime($b3->time));
                    }
                    $binterval = date_diff(new DateTime($b2t), new DateTime($b3t));
                    if ($binterval->invert == 1) {
                        array_push($eval['anomalies'], 'last_inc_counted');
                    } else {
                        array_push($eval['diffs'], $binterval->format("%H:%I:%S"));
                        $tadd->add($binterval);
                        $countofftime = true;
                        if ($fbdt == null) {
                            $fbdt = $b2t;
                        }
                    }
                }
                array_push($eval['offtimes'], $countofftime);
            }
            $tadd->sub(date_diff($time0, new DateTime($recess_time)));
            $totalbookedtime = $time0->diff($tadd);
            $eval['totalbookedtime'] = $totalbookedtime->format("%H:%I:%S");

            $tadd = clone $time0;

            // $a = new DateTime($eval['totalbookedtime']);
            // $b = new DateTime($eval['totalshifttime']);
            // $eval['balance'] = $b->diff($a)->format("%R%H:%I:%S");


            $start_time = date("Y-m-d H:i:s", strtotime($day['shift']->start_time));
            $end_time = date("Y-m-d H:i:s", strtotime($day['shift']->end_time));
            $eval['arrivedifftime'] = null;
            if ($fbdt != null) {
                $diff = date_diff(new DateTime($fbdt), new DateTime($start_time));
                $eval['arrivedifftime'] = $diff->format("%R%H:%I:%S");
                if ($diff->invert) {
                    array_push($eval['anomalies'], 'arrive_late');
                }
            }
            $lbdt = date("Y-m-d H:i:s", strtotime($day['bookings'][$eval['count'] - 1]->time));
            $diff = date_diff(new DateTime($end_time), new DateTime($lbdt));
            $eval['leavedifftime'] = $diff->format("%R%H:%I:%S");
            if ($diff->invert) {
                array_push($eval['anomalies'], 'leave_early');
            }
        } else if (!$day['shift']->is_holiday) {
            array_push($eval['anomalies'], 'missing_bookings');
        }

        if ($eval['totalbookedtime'] != '') {
            $a = new DateTime($eval['totalbookedtime']);
            $b = new DateTime($eval['totalshifttime']);
            $diff = $b->diff($a);
            $eval['balance'] = $diff->format("%R%H:%I:%S");
            $eval['negbalance'] = false;
            if ($diff->invert)
                $eval['negbalance'] = true;
        }


        $day['eval'] = $eval;
        return $eval;
    }

    public function index(EmployeeSelfRequest $request, Employee $employee)
    {
        $request_perPage = request('per_page', $this->perPage);
        $request_page = request('page', '1');

        $monday = date('Y-m-d', strtotime('monday this week'));
        $sunday = date('Y-m-d', strtotime('sunday this week'));

        //return [$monday, $sunday];

        $start_date = request('start_date', '');
        $end_date = request('end_date', '');

        if ($start_date == '') {
            $start_date = $monday;
            $end_date = $sunday;
        }
        if ($end_date == '') {
            $end_date = $start_date;
        }


        //paginar -> per_page i page
        $dataini = new DateTime($start_date);
        $datafi = new DateTime($end_date);
        $interval = $datafi->diff($dataini);
        $dies = $interval->format("%a") + 1;
        $pp = intval($request_perPage);
        $p = intval($request_page);
        $pagines = ceil($dies / $pp);

        $ps = [];
        for ($i = 0; $i < $pagines; $i++) {
            $di = clone $dataini;
            $df = clone $di;
            $ini = 1 + ($pp * ($i));
            $fi = $ini + $pp - 1 < $dies ? $ini + $pp - 1 : $dies;

            $di->modify('+' . ($ini - 1) . ' day');
            $df->modify('+' . ($fi - 1) . ' day');


            $ps[$i] = [
                'i' => $ini,
                'di' => $di->format('Y-m-d'),
                'f' => $fi,
                'df' => $df->format('Y-m-d'),
            ];
        }


        $meta = [
            'total' => $dies,
            'last_page' => $pagines,
            'per_page' => $pp,
            'current_page' => $p,
            'from_d' => $ps[$p - 1]['i'],
            'to_d' => $ps[$p - 1]['f'],
            'from' => $ps[$p - 1]['di'],
            'to' => $ps[$p - 1]['df'],
            'pages' => $ps,
        ];
        //$data->modify('+1 day');
        //$data->format('Y-m-d');

        $from = $meta['from'];
        $to = $meta['to'];
        //return [$from, $to];

        $bookings = Booking::where('employee_id', '=', $employee->id)->when($from != '', function ($query) use ($from) {
            $query->where('date', '>=', $from);
        })->when($to != '', function ($query) use ($to) {
            $query->where('date', '<=', $to);
        })->orderByRaw($this->request_order)->get(); //paginate($request_perPage);
        //return $bookings;


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
        $calshifts = null;
        $days = [];
        $currentday = null;
        $daybookings = [];
        $day = null;

        $currentday = $from;

        $pbd = null;
        foreach ($bookings as $booking) {

            while ($booking->date > $currentday) {
                $skip = false;
                if ($day != null) {
                    $day['eval'] = $this->eval($day);
                    $day['pos'] = '1';
                    array_push($days, $day);
                    if ($day['day'] == $currentday)
                        $skip = true;
                    $day = null;
                }
                if ($skip == false) {
                    $day = ['day' => $currentday, 'eval' => null, 'bookings' => [], 'shift' => $employee->shift];

                    $year = date("Y", strtotime($day['day']));
                    $dayofyear = date("z", strtotime($day['day']));

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
                                        $day['shift'] = $shift;
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                    }
                }

                // $data = new DateTime($currentday);
                // $data->modify('+1 day');
                // $currentday = $data->format('Y-m-d');
                $currentday = $this->nextday($currentday);
            }
            if ($booking->date == $currentday) {
                if ($pbd != $booking->date) {
                    if ($day != null) {
                        $day['eval'] = $this->eval($day);
                        $day['pos'] = '0';
                        array_push($days, $day);
                    }

                    $day = ['day' => $currentday, 'eval' => null, 'bookings' => [], 'shift' => $employee->shift];
                    $year = date("Y", strtotime($day['day']));
                    $dayofyear = date("z", strtotime($day['day']));

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
                                        $day['shift'] = $shift;
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                    }
                    $pbd = $booking->date;
                }
                array_push($day['bookings'], $booking);
            }
        }
        if ($day != null) {
            $day['eval'] = $this->eval($day);
            $day['pos'] = '2';
            array_push($days, $day);
            $currentday = $day['day'];
            $currentday = $this->nextday($currentday);
        }
        // $data = new DateTime($currentday);
        // $data->modify('+1 day');
        // $currentday = $data->format('Y-m-d');

        while ($currentday <= $to) {
            $day = ['day' => $currentday, 'eval' => null, 'bookings' => [], 'shift' => $employee->shift];

            $year = date("Y", strtotime($day['day']));
            $dayofyear = date("z", strtotime($day['day']));

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
                                $day['shift'] = $shift;
                                break;
                            }
                        }
                        break;
                    }
                }
            }
            $day['eval'] = $this->eval($day);
            $day['pos'] = '0';
            array_push($days, $day);
            // $data = new DateTime($currentday);
            // $data->modify('+1 day');
            // $currentday = $data->format('Y-m-d');
            $currentday = $this->nextday($currentday);
        }

        return ['data' => DayBookingResource::collection($days), 'meta' => $meta];

        // return JsonResource::collection($days);

        // return BookingResource::collection($bookings);
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
