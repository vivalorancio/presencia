<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthorizeAdminRequest;
use App\Http\Requests\Incidence\IncidenceStoreRequest;
use App\Http\Requests\Incidence\IncidenceUpdateRequest;
use App\Http\Resources\IncidenceResource;
use App\Models\Incidence;
use Illuminate\Http\Request;

class IncidenceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(AuthorizeAdminRequest $request)
    {
        $incidences = Incidence::paginate(25);
        return IncidenceResource::collection($incidences);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(IncidenceStoreRequest $request)
    {
        $incidence = new Incidence($request->validated());
        $incidence->save();

        return new IncidenceResource($incidence);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(AuthorizeAdminRequest $request, Incidence $incidence)
    {
        return new IncidenceResource($incidence);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(IncidenceUpdateRequest $request, Incidence $incidence)
    {
        $incidence->update($request->validated());
        $incidence->save();

        return new IncidenceResource($incidence);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(AuthorizeAdminRequest $request, Incidence $incidence)
    {
        $incidence->delete();
        return ["message" => "deleted"];
    }
}
