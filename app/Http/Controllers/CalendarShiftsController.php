<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AuthorizeAdminRequest;
use App\Http\Resources\CalendarResource;
use App\Http\Resources\CalendarShiftsResource;
use App\Models\Calendar;
use App\Models\CalendarShifts;
use Illuminate\Queue\Console\RetryBatchCommand;

class CalendarShiftsController extends Controller
{
    private $shifts_per_page = 366;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(AuthorizeAdminRequest $request, Calendar $calendar)
    {

        return CalendarShiftsResource::collection($calendar->shifts()->paginate($this->shifts_per_page));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AuthorizeAdminRequest $request, Calendar $calendar)
    {
        //
        //
        //      FALTA VALIDAR!!!!!!!!
        //
        //

        // $requestcalendarshifts = $request->validated();
        $calendarshifts = [];
        $requestcalendarshifts = $request->all();
        foreach ($requestcalendarshifts as $requestcalendarshift) {
            $calendarshift = CalendarShifts::firstOrNew(['calendar_id' => $calendar->id, 'day' => $requestcalendarshift['day']]);
            if ($requestcalendarshift['shift_id'] == null) {
                if ($calendarshift->exists)
                    $calendarshift->delete();
                continue;
            }
            $calendarshift->shift_id = $requestcalendarshift['shift_id'];
            $calendar->shifts()->save($calendarshift);
            array_push($calendarshifts, $calendarshift);
        }
        // return CalendarShiftsResource::collection($calendarshifts);
        return CalendarShiftsResource::collection($calendar->shifts()->paginate($this->shifts_per_page));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function show(AuthorizeAdminRequest $request, Calendar $calendar, CalendarShifts $calendarshifts)
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
    // public function destroy($id)
    // {
    //     //
    // }
}
