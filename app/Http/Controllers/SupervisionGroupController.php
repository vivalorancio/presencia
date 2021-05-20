<?php

namespace App\Http\Controllers;


use App\Http\Requests\AuthorizeAdminRequest;
use App\Http\Requests\SupervisionGroup\SupervisionGroupStoreRequest;
use App\Http\Requests\SupervisionGroup\SupervisionGroupUpdateRequest;
use App\Http\Resources\SupervisionGroupResource;
use App\Models\SupervisionGroup;
use Illuminate\Http\Request;

class SupervisionGroupController extends Controller
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

        $supervision_groups = SupervisionGroup::when($search_code != '', function ($query) use ($search_code) {
            $query->where('code', 'LIKE', '%' . $search_code . '%');
        })->when($search_description != '', function ($query) use ($search_description) {
            $query->where('description', 'LIKE', '%' . $search_description . '%');
        })->orderBy($request_orderBy, $request_orderDirection)->paginate($request_perPage);

        return SupervisionGroupResource::collection($supervision_groups);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SupervisionGroupStoreRequest $request)
    {
        $supervision_group = new SupervisionGroup($request->validated());
        $supervision_group->save();

        return new SupervisionGroupResource($supervision_group);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(AuthorizeAdminRequest $request, SupervisionGroup $supervision_group)
    {
        return new SupervisionGroupResource($supervision_group);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(SupervisionGroupUpdateRequest $request, SupervisionGroup $supervision_group)
    {
        $supervision_group->update($request->validated());
        $supervision_group->save();

        return new SupervisionGroupResource($supervision_group);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(AuthorizeAdminRequest $request, SupervisionGroup $supervision_group)
    {
        $supervision_group->delete();
        return ["message" => "deleted"];
    }
}
