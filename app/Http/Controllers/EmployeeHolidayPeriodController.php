<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\EmployeeSelfRequest;
use App\Http\Requests\EmployeeHolidayPeriod\EmployeeHolidayPeriodShowRequest;
use App\Http\Requests\EmployeeHolidayPeriod\EmployeeHolidayPeriodStoreRequest;
use App\Http\Requests\EmployeeHolidayPeriod\EmployeeHolidayPeriodUpdateRequest;
use App\Http\Requests\EmployeeHolidayPeriod\EmployeeHolidayPeriodDestroyRequest;
use App\Http\Resources\EmployeeHolidayPeriodResource;
use App\Models\Employee;
use App\Models\EmployeeHolidayPeriod;

class EmployeeHolidayPeriodController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(EmployeeSelfRequest $request, Employee $employee)
    {
        $holiday_periods_per_page = 10000;
        return EmployeeHolidayPeriodResource::collection($employee->holiday_periods()->paginate($holiday_periods_per_page));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(EmployeeHolidayPeriodStoreRequest $request, Employee $employee)
    {
        $holiday_period = new EmployeeHolidayPeriod($request->validated());
        $employee->holiday_periods()->save($holiday_period);
        return new EmployeeHolidayPeriodResource($holiday_period);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(EmployeeHolidayPeriodShowRequest $request, Employee $employee, EmployeeHolidayPeriod $holiday_period)
    {
        return new EmployeeHolidayPeriodResource($holiday_period);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(EmployeeHolidayPeriodUpdateRequest $request, Employee $employee, EmployeeHolidayPeriod $holiday_period)
    {
        $holiday_period->update($request->validated());
        $holiday_period->save();
        return new EmployeeHolidayPeriodResource($holiday_period);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(EmployeeHolidayPeriodDestroyRequest $request, Employee $employee, EmployeeHolidayPeriod $holiday_period)
    {
        $holiday_period->delete();
        return ["message" => "deleted"];
    }
}
