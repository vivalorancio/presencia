<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthorizeAdminRequest;
use App\Http\Requests\Department\DepartmentStoreRequest;
use App\Http\Requests\Department\DepartmentUpdateRequest;
use App\Http\Resources\DepartmentResource;
use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
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

        $departments = Department::when($search_code != '', function ($query) use ($search_code) {
            $query->where('code', 'LIKE', '%' . $search_code . '%');
        })->when($search_description != '', function ($query) use ($search_description) {
            $query->where('description', 'LIKE', '%' . $search_description . '%');
        })->orderBy($request_orderBy, $request_orderDirection)->paginate($request_perPage);

        return DepartmentResource::collection($departments);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(DepartmentStoreRequest $request)
    {
        $department = new Department($request->validated());
        $department->save();

        return new DepartmentResource($department);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(AuthorizeAdminRequest $request, Department $department)
    {
        return new DepartmentResource($department);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(DepartmentUpdateRequest $request, Department $department)
    {
        $department->update($request->validated());
        $department->save();

        return new DepartmentResource($department);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(AuthorizeAdminRequest $request, Department $department)
    {
        $department->delete();
        return ["message" => "deleted"];
    }
}
