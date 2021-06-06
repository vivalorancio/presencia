<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AuthorizeAdminRequest;
use App\Models\SupervisionGroupSupervisor;
use App\Models\SupervisionGroup;
use App\Http\Requests\SupervisionGroupSupervisor\SupervisionGroupSupervisorStoreRequest;
use App\Http\Resources\SupervisionGroupSupervisorResource;

class SupervisionGroupSupervisorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(AuthorizeAdminRequest $request, SupervisionGroup $supervision_group)
    {
        $supervision_group_supervisors_per_page = 10000;
        return SupervisionGroupSupervisorResource::collection($supervision_group->supervisors()->paginate($supervision_group_supervisors_per_page));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SupervisionGroupSupervisorStoreRequest $request, SupervisionGroup $supervision_group)
    {
        $supervision_group_supervisor = new SupervisionGroupSupervisor($request->validated());
        $supervision_group->supervisors()->save($supervision_group_supervisor);

        return new SupervisionGroupSupervisorResource($supervision_group_supervisor);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(AuthorizeAdminRequest $request, SupervisionGroup $supervision_group, SupervisionGroupSupervisor $supervisor)
    {
        return new SupervisionGroupSupervisorResource($supervisor);
    }

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
    public function destroy(AuthorizeAdminRequest $request, SupervisionGroup $supervision_group, SupervisionGroupSupervisor $supervisor)
    {
        $supervisor->delete();
        return ["message" => "deleted"];
    }
}
