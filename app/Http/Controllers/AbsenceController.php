<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests\Absence\AbsenceStoreRequest;
use App\Http\Requests\Absence\AbsenceShowRequest;
use App\Http\Requests\Absence\AbsenceUpdateRequest;
use App\Http\Requests\Absence\AbsenceDestroyRequest;
use App\Http\Resources\AbsenceResource;
use App\Models\Absence;
use App\Models\Employee;
use Symfony\Component\HttpFoundation\Response;

class AbsenceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function index()
    // {
    //     //
    // }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AbsenceStoreRequest $request, Employee $employee)
    {
        $absence = new Absence($request->validated());
        $employee->absences()->save($absence);
        return response(['message' => 'Absence Successful.', 'code' => 'ABSENCE_MSG_Successful'], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(AbsenceShowRequest $request, Employee $employee, Absence $absence)
    {
        return new AbsenceResource($absence);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(AbsenceUpdateRequest $request, Employee $employee, Absence $absence)
    {
        $absence->update($request->validated());
        $absence->save();
        return new AbsenceResource($absence);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(AbsenceDestroyRequest $request, Employee $employee, Absence $absence)
    {
        $absence->delete();
    }
}
