<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthorizeAdminRequest;
use App\Http\Requests\Calendar\CalendarStoreRequest;
use App\Http\Requests\Calendar\CalendarUpdateRequest;
use App\Http\Resources\CalendarResource;
use App\Models\Calendar;
use Illuminate\Http\Request;

class CalendarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(AuthorizeAdminRequest $request)
    {
        $calendars = Calendar::paginate(25);
        return CalendarResource::collection($calendars);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CalendarStoreRequest $request)
    {
        $calendar = new Calendar($request->validated());
        $calendar->save();

        return new CalendarResource($calendar);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(AuthorizeAdminRequest $request, Calendar $calendar)
    {
        return new CalendarResource($calendar);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CalendarUpdateRequest $request, Calendar $calendar)
    {
        $calendar->update($request->validated());
        $calendar->save();

        return new CalendarResource($calendar);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(AuthorizeAdminRequest $request, Calendar $calendar)
    {
        $calendar->delete();
        return ["message" => "deleted"];
    }
}
