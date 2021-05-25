<?php

namespace App\Http\Controllers;

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
use DateTime;
use Symfony\Component\HttpFoundation\Response;

class BookingController extends Controller
{

    private $request_order = 'date ASC, time ASC';
    private $range = 'week'; //'month' 'year'

    private function nextday($aday)
    {
        $data = new DateTime($aday);
        $data->modify('+1 day');
        return $data->format('Y-m-d');
    }


    private function tointerval($date)
    {
        $ds = substr($date, 1, -9);
        $hs = substr($date, -8, -6);
        $ms = substr($date, -5, -3);
        $ss = substr($date, -2);

        $sign = $date[0];
        $interval = "P";
        if ($ds != "0" || $ds != "" || $ds != null || strlen($ds) > 0) {
            $interval = $interval . $ds . "D";
        }
        $interval = $interval . "T" . $hs . "H" . $ms . "M" . $ss . "S";

        return ['sign' => $sign, 'interval' => $interval];
    }

    private function addtoaccumulated($accumulated, $amount)
    {
        if ($amount == '')
            return $accumulated;

        $pbint = $this->tointerval($accumulated);
        $dbint = $this->tointerval($amount);

        $time0 = new DateTime('00:00');
        $tadd = clone $time0;

        if ($pbint['sign'] == "+") {
            $tadd->add(new \DateInterval($pbint['interval']));
        } else {
            $tadd->sub(new \DateInterval($pbint['interval']));
        }
        if ($dbint['sign'] == "+") {
            $tadd->add(new \DateInterval($dbint['interval']));
        } else {
            $tadd->sub(new \DateInterval($dbint['interval']));
        }

        $diff = $time0->diff($tadd);

        if ($diff->d > 0)
            $res = $diff->format("%R%dd%H:%I:%S");
        else
            $res = $diff->format("%R%H:%I:%S");

        return $res;
    }

    private function formatperiodbalance($periodbalance)
    {
        $ds = intval(substr($periodbalance, 1, -9));
        $hs = intval(substr($periodbalance, -8, -6));
        $ths = (24 * $ds) + $hs;

        return $periodbalance[0] . $ths . substr($periodbalance, -6);
    }


    private function eval($day)
    {
        $time0 = new DateTime('00:00');
        $eval = ['count' => count($day['bookings'])];
        $eval['anomalies'] = [];
        $eval['balance'] = '';

        if ($day['shift'] == null) {
            array_push($eval['anomalies'], 'no_shift');
            $day['eval'] = $eval;
            return $eval;
        }
        $eval['totalbookedtime'] = '00:00:00';

        $expected_time = date("H:i:s", strtotime($day['shift']->expected_time));
        $recess_time = $day['shift']->recess_time == null ? "00:00:00" : date("H:i:s", strtotime($day['shift']->recess_time));
        $tadd = clone $time0;
        $tadd->add(date_diff($time0, new DateTime($expected_time)));
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
            $eval['totalbookedtime'] = $totalbookedtime->format("%R%H:%I:%S");

            $tadd = clone $time0;

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
            // $a = new DateTime($eval['totalbookedtime']);
            // $b = new DateTime($eval['totalshifttime']);
            // $diff = $b->diff($a);
            // $eval['balance'] = $diff->format("%R%H:%I:%S");
            $eval['balance'] = $this->addtoaccumulated($eval['totalbookedtime'], $eval['totalshifttime']);
            $eval['negbalance'] = false;
            // if ($diff->invert)
            if ($eval['balance'][0] == '-')
                $eval['negbalance'] = true;
        }


        $day['eval'] = $eval;
        return $eval;
    }

    public function index(EmployeeSelfRequest $request, Employee $employee)
    {
        $request_range = request('range', $this->range);
        $request_date = request('date', '');

        $start_date = $request_date;
        $end_date = '';
        $prev_date = '';
        $next_date = '';

        switch ($request_range) {
            case 'day': {
                    if ($start_date == '') {
                        $start_date = date('Y-m-d', strtotime('today'));
                    }
                    $end_date = $start_date;

                    $prev_date = new DateTime($start_date);
                    $prev_date = $prev_date->modify('-1 days')->format("Y-m-d");
                    $next_date = new DateTime($start_date);
                    $next_date = $next_date->modify('+1 days')->format("Y-m-d");
                }
                break;
            case 'week': {
                    if ($start_date == '') {
                        $start_date = date('Y-m-d', strtotime('monday this week'));
                        $end_date = date('Y-m-d', strtotime('sunday this week'));
                    } else {
                        $data = $start_date;
                        $nbDay = date('N', strtotime($data));
                        $start_date = new DateTime($data);
                        $end_date = new DateTime($data);
                        $start_date = $start_date->modify('-' . ($nbDay - 1) . ' days')->format("Y-m-d");
                        $end_date = $end_date->modify('+' . (7 - $nbDay) . ' days')->format("Y-m-d");
                    }
                    $prev_date = new DateTime($start_date);
                    $prev_date = $prev_date->modify('-7 days')->format("Y-m-d");
                    $next_date = new DateTime($start_date);
                    $next_date = $next_date->modify('+7 days')->format("Y-m-d");
                }
                break;
            case 'month': {
                    if ($start_date == '') {
                        $start_date = date('Y-m-d', strtotime('first day of this month'));
                        $end_date = date('Y-m-d', strtotime('last day of this month'));
                    } else {
                        $start_date = date('Y-m-d', strtotime('first day of ' . date_create($start_date)->format('Y-m')));
                        $end_date = date('Y-m-d', strtotime('last day of ' . date_create($start_date)->format('Y-m')));
                    }
                    $prev_date = new DateTime($start_date);
                    $prev_date = $prev_date->modify('-1 month')->format("Y-m-d");
                    $next_date = new DateTime($start_date);
                    $next_date = $next_date->modify('+1 month')->format("Y-m-d");
                }
                break;
            case 'year':
                if ($start_date == '') {
                    $start_date = date('Y-m-d', strtotime('first day of january this year'));
                    $end_date = date('Y-m-d', strtotime('last day of december this year'));
                } else {
                    $start_date = date('Y-m-d', strtotime('first day of january ' . date_create($start_date)->format('Y')));
                    $end_date = date('Y-m-d', strtotime('last day of december ' . date_create($start_date)->format('Y')));
                }
                $prev_date = new DateTime($start_date);
                $prev_date = $prev_date->modify('-1 year')->format("Y-m-d");
                $next_date = new DateTime($start_date);
                $next_date = $next_date->modify('+1 year')->format("Y-m-d");
                break;
            default:
                break;
        }

        $meta = [
            'date' => $request_date,
            'range' => $request_range,
            'start_date' => $start_date,
            'end_date' => $end_date,
            'prev_date' => $prev_date,
            'next_date' => $next_date,
            'period_balance' => '00:00:00'
        ];

        $from = $start_date;
        $to = $end_date;

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
        $day = null;
        $previous_bookingdate = null;
        //$periodbalanceinterval=new DateInterval('0H0M0S')

        $currentday = $from;
        foreach ($bookings as $booking) {

            while ($booking->date > $currentday) {
                $skip = false;
                if ($day != null) {
                    $day['eval'] = $this->eval($day);

                    $meta['period_balance'] = $this->addtoaccumulated($meta['period_balance'], $day['eval']['balance']);
                    $day['eval']['acc_balance'] = $meta['period_balance'];
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
                if ($previous_bookingdate != $booking->date) {
                    if ($day != null) {
                        $day['eval'] = $this->eval($day);
                        $meta['period_balance'] = $this->addtoaccumulated($meta['period_balance'], $day['eval']['balance']);
                        $day['eval']['acc_balance'] = $meta['period_balance'];

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
                    $previous_bookingdate = $booking->date;
                }
                array_push($day['bookings'], $booking);
            }
        }
        if ($day != null) {
            $day['eval'] = $this->eval($day);
            $meta['period_balance'] = $this->addtoaccumulated($meta['period_balance'], $day['eval']['balance']);
            $day['eval']['acc_balance'] = $meta['period_balance'];

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
            $meta['period_balance'] = $this->addtoaccumulated($meta['period_balance'], $day['eval']['balance']);
            $day['eval']['acc_balance'] = $meta['period_balance'];
            $day['pos'] = '0';
            array_push($days, $day);
            // $data = new DateTime($currentday);
            // $data->modify('+1 day');
            // $currentday = $data->format('Y-m-d');
            $currentday = $this->nextday($currentday);
        }

        $meta['period_balance'] = $this->formatperiodbalance($meta['period_balance']);


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
