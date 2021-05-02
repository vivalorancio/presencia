<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthorizeAdminRequest;
use App\Http\Requests\IncidencesGroupIncidence\IncidencesGroupIncidenceStoreRequest;
use App\Http\Requests\IncidencesGroupIncidence\IncidencesGroupIncidenceUpdateRequest;
use App\Http\Resources\IncidencesGroupIncidenceResource;
use App\Models\IncidencesGroupIncidence;
use App\Models\IncidencesGroup;
use Illuminate\Http\Request;

class IncidencesGroupIncidenceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(AuthorizeAdminRequest $request, IncidencesGroup $incidences_group)
    {
        // $incidences_group_incidences = IncidencesGroupIncidence::paginate(25);
        // return IncidencesGroupIncidenceResource::collection($incidences_group_incidences);

        $incidences_group_incidences_per_page = 25;
        return IncidencesGroupIncidenceResource::collection($incidences_group->incidences()->paginate($incidences_group_incidences_per_page));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(IncidencesGroupIncidenceStoreRequest $request, IncidencesGroup $incidences_group)
    {
        $incidences_group_incidence = new IncidencesGroupIncidence($request->validated());
        $incidences_group->incidences()->save($incidences_group_incidence);

        return new IncidencesGroupIncidenceResource($incidences_group_incidence);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(AuthorizeAdminRequest $request, IncidencesGroup $incidences_group, IncidencesGroupIncidence $incidence)
    {
        return new IncidencesGroupIncidenceResource($incidence);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function update(IncidencesGroupIncidenceStoreRequest $request, IncidencesGroupIncidence $incidences_group_incidence)
    // {
    //     $incidences_group_incidence->update($request->validated());
    //     $incidences_group_incidence->save();

    //     return new IncidencesGroupIncidenceResource($incidences_group_incidence);
    // }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(AuthorizeAdminRequest $request, IncidencesGroup $incidences_group, IncidencesGroupIncidence $incidence)
    {
        $incidence->delete();
        return ["message" => "deleted"];
    }
}
