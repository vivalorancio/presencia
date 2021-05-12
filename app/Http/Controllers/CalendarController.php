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
    private $orderBy = 'year';
    private $orderDirection = 'asc';
    private $perPage = '25';

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(AuthorizeAdminRequest $request)
    {
        $request_perPage = request('per_page', $this->perPage);

        $request_orderBy = request('sort_field', $this->orderBy);
        if (!in_array($request_orderBy, ['year', 'name'])) {
            $request_orderBy = $this->orderBy;
        }

        $request_orderDirection = request('sort_direction', $this->orderDirection);
        if (!in_array($request_orderDirection, ['asc', 'desc'])) {
            $request_orderDirection = $this->orderDirection;
        }

        $search_year = request('search_year', '');
        $search_name = request('search_name', '');



        $calendars = Calendar::when($search_year != '', function ($query) use ($search_year) {
            $query->where('year', 'LIKE', '%' . $search_year . '%');
        })->when($search_name != '', function ($query) use ($search_name) {
            $query->where('name', 'LIKE', '%' . $search_name . '%');
        })->orderBy($request_orderBy, $request_orderDirection)->paginate($request_perPage);

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
