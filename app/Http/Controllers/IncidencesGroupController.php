<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthorizeAdminRequest;
use App\Http\Requests\IncidencesGroup\IncidencesGroupStoreRequest;
use App\Http\Requests\IncidencesGroup\IncidencesGroupUpdateRequest;
use App\Http\Resources\IncidencesGroupResource;
use App\Models\IncidencesGroup;
use Illuminate\Http\Request;

class IncidencesGroupController extends Controller
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
        if (!in_array($request_orderBy, ['code', 'description'])) {
            $request_orderBy = $this->orderBy;
        }

        $request_orderDirection = request('sort_direction', $this->orderDirection);
        if (!in_array($request_orderDirection, ['asc', 'desc'])) {
            $request_orderDirection = $this->orderDirection;
        }

        $search_code = request('search_code', '');
        $search_description = request('search_description', '');

        $incidencesgroups = IncidencesGroup::when($search_code != '', function ($query) use ($search_code) {
            $query->where('code', 'LIKE', '%' . $search_code . '%');
        })->when($search_description != '', function ($query) use ($search_description) {
            $query->where('description', 'LIKE', '%' . $search_description . '%');
        })->orderBy($request_orderBy, $request_orderDirection)->paginate($request_perPage);

        return IncidencesGroupResource::collection($incidencesgroups);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(IncidencesGroupStoreRequest $request)
    {
        $incidences_group = new IncidencesGroup($request->validated());
        $incidences_group->save();

        return new IncidencesGroupResource($incidences_group);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(AuthorizeAdminRequest $request, IncidencesGroup $incidences_group)
    {
        return new IncidencesGroupResource($incidences_group);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(IncidencesGroupUpdateRequest $request, IncidencesGroup $incidences_group)
    {
        $incidences_group->update($request->validated());
        $incidences_group->save();

        return new IncidencesGroupResource($incidences_group);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(AuthorizeAdminRequest $request, IncidencesGroup $incidences_group)
    {
        $incidences_group->delete();
        return ["message" => "deleted"];
    }
}
