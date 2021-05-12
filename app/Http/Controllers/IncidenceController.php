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
        if (!in_array($request_orderBy, ['code', 'description', 'is_counted', 'is_absence'])) {
            $request_orderBy = $this->orderBy;
        }

        $request_orderDirection = request('sort_direction', $this->orderDirection);
        if (!in_array($request_orderDirection, ['asc', 'desc'])) {
            $request_orderDirection = $this->orderDirection;
        }

        $search_code = request('search_code', '');
        $search_description = request('search_description', '');

        $incidences = Incidence::when($search_code != '', function ($query) use ($search_code) {
            $query->where('code', 'LIKE', '%' . $search_code . '%');
        })->when($search_description != '', function ($query) use ($search_description) {
            $query->where('description', 'LIKE', '%' . $search_description . '%');
        })->orderBy($request_orderBy, $request_orderDirection)->paginate($request_perPage);

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
