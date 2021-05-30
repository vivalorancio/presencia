<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AuthorizeAdminRequest;
use App\Http\Requests\HolidayPeriod\HolidayPeriodStoreRequest;
use App\Http\Requests\HolidayPeriod\HolidayPeriodUpdateRequest;
use App\Http\Resources\HolidayPeriodResource;
use App\Models\HolidayPeriod;

class HolidayPeriodController extends Controller
{
    private $orderBy = 'code';
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
        if (!in_array($request_orderBy, ['code', 'description', 'days', 'date_from', 'date_to'])) {
            $request_orderBy = $this->orderBy;
        }

        $request_orderDirection = request('sort_direction', $this->orderDirection);
        if (!in_array($request_orderDirection, ['asc', 'desc'])) {
            $request_orderDirection = $this->orderDirection;
        }

        $search_code = request('search_code', '');
        $search_description = request('search_description', '');

        $holiday_periods = HolidayPeriod::when($search_code != '', function ($query) use ($search_code) {
            $query->where('code', 'LIKE', '%' . $search_code . '%');
        })->when($search_description != '', function ($query) use ($search_description) {
            $query->where('description', 'LIKE', '%' . $search_description . '%');
        })->orderBy($request_orderBy, $request_orderDirection)->paginate($request_perPage);

        return HolidayPeriodResource::collection($holiday_periods);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(HolidayPeriodStoreRequest $request)
    {
        $holiday_period = new HolidayPeriod($request->validated());
        $holiday_period->save();

        return new HolidayPeriodResource($holiday_period);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(AuthorizeAdminRequest $request, HolidayPeriod $holiday_period)
    {
        return new HolidayPeriodResource($holiday_period);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(HolidayPeriodUpdateRequest $request, HolidayPeriod $holiday_period)
    {
        $holiday_period->update($request->validated());
        $holiday_period->save();

        return new HolidayPeriodResource($holiday_period);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(AuthorizeAdminRequest $request, HolidayPeriod $holiday_period)
    {
        $holiday_period->delete();
        return ["message" => "deleted"];
    }
}
