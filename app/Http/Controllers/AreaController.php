<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthorizeAdminRequest;
use App\Http\Requests\Area\AreaStoreRequest;
use App\Http\Requests\Area\AreaUpdateRequest;
use App\Http\Resources\AreaResource;
use App\Models\Area;
use Illuminate\Http\Request;

class AreaController extends Controller
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

        $areas = Area::when($search_code != '', function ($query) use ($search_code) {
            $query->where('code', 'LIKE', '%' . $search_code . '%');
        })->when($search_description != '', function ($query) use ($search_description) {
            $query->where('description', 'LIKE', '%' . $search_description . '%');
        })->orderBy($request_orderBy, $request_orderDirection)->paginate($request_perPage);

        return AreaResource::collection($areas);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AreaStoreRequest $request)
    {
        $area = new Area($request->validated());
        $area->save();

        return new AreaResource($area);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(AuthorizeAdminRequest $request, Area $area)
    {
        return new AreaResource($area);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(AreaUpdateRequest $request, Area $area)
    {
        $area->update($request->validated());
        $area->save();

        return new AreaResource($area);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(AuthorizeAdminRequest $request, Area $area)
    {
        $area->delete();
        return ["message" => "deleted"];
    }
}
