<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeeSelfRequest;
use App\Http\Requests\EmployeeCalendar\EmployeeCalendarShowRequest;
use App\Http\Requests\EmployeeCalendar\EmployeeCalendarStoreRequest;
use App\Http\Requests\EmployeeCalendar\EmployeeCalendarUpdateRequest;
use App\Http\Requests\EmployeeCalendar\EmployeeCalendarDestroyRequest;
use Illuminate\Http\Request;
use App\Http\Resources\EmployeeCalendarResource;
use App\Models\Employee;
use App\Models\EmployeeCalendar;

class EmployeeCalendarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(EmployeeSelfRequest $request, Employee $employee)
    {
        $calendars_per_page = 25;
        return EmployeeCalendarResource::collection($employee->calendars()->paginate($calendars_per_page));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(EmployeeCalendarStoreRequest $request, Employee $employee)
    {
        $calendar = new EmployeeCalendar($request->validated());
        $employee->calendars()->save($calendar);
        return new EmployeeCalendarResource($calendar);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(EmployeeCalendarShowRequest $request, Employee $employee, EmployeeCalendar $calendar)
    {
        return new EmployeeCalendarResource($calendar);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(EmployeeCalendarUpdateRequest $request, Employee $employee, EmployeeCalendar $calendar)
    {
        $calendar->update($request->validated());
        $calendar->save();
        return new EmployeeCalendarResource($calendar);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(EmployeeCalendarDestroyRequest $request, Employee $employee, EmployeeCalendar $calendar)
    {
        $calendar->delete();
        return ["message" => "deleted"];
    }
}
