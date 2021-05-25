<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\EmployeeSelfRequest;
use App\Models\Employee;
use App\Models\Request as RequestModel;
use App\Models\BookingRequest;
use App\Http\Resources\RequestResource;
use App\Http\Requests\Request\RequestStoreRequest;
use App\Http\Requests\Request\RequestDestroyRequest;

class RequestController extends Controller
{


    public function index(EmployeeSelfRequest $request, Employee $employee)
    {
        $orderBy = 'created_at';
        $orderDirection = 'asc';

        $request_perPage = request('per_page', 25);

        $request_orderBy = request('sort_field', $orderBy);
        if (!in_array($request_orderBy, ['created_at', 'type', 'status'])) {
            $request_orderBy = $orderBy;
        }

        $request_orderDirection = request('sort_direction', $orderDirection);
        if (!in_array($request_orderDirection, ['asc', 'desc'])) {
            $request_orderDirection = $orderDirection;
        }

        $request_order = '';
        switch ($request_orderBy) {
            case 'created_at':
                $request_order = 'created_at ' . $request_orderDirection;
                break;
            case 'type':
                $request_order = 'type ' . $request_orderDirection;
                break;
            case 'status':
                $request_order = 'status ' . $request_orderDirection;
                break;
            default:
                $request_order = $request_orderBy . ' ' . $request_orderDirection;
                break;
        }

        $types = explode(',', request('type', ''));
        $allowedtypes = [];
        foreach ($types as $type) {
            if (in_array($type, ['booking', 'absence', 'holiday']) && !in_array($type, $allowedtypes))
                array_push($allowedtypes, $type);
        }
        $cnttypes = count($allowedtypes);

        $statuses = explode(',', request('status', ''));
        $allowedstatuses = [];
        foreach ($statuses as $status) {
            if (in_array($status, ['pending', 'accepted', 'rejected']) && !in_array($status, $allowedstatuses))
                array_push($allowedstatuses, $status);
        }
        $cntstatuses = count($allowedstatuses);

        $requests = $employee->requests()->when($cnttypes > 0 && $cnttypes < 3, function ($query) use ($allowedtypes) {
            $query->whereIn('type', $allowedtypes);
        })->when($cntstatuses > 0 && $cntstatuses < 3, function ($query) use ($allowedstatuses) {
            $query->whereIn('status', $allowedstatuses);
        })->orderByRaw($request_order)->paginate($request_perPage);

        return RequestResource::collection($requests);
    }

    public function supervised(EmployeeSelfRequest $request, Employee $employee)
    {
        $orderBy = 'created_at';
        $orderDirection = 'asc';

        $request_perPage = request('per_page', 25);

        $request_orderBy = request('sort_field', $orderBy);
        if (!in_array($request_orderBy, ['created_at', 'type', 'status'])) {
            $request_orderBy = $orderBy;
        }

        $request_orderDirection = request('sort_direction', $orderDirection);
        if (!in_array($request_orderDirection, ['asc', 'desc'])) {
            $request_orderDirection = $orderDirection;
        }

        $request_order = '';
        switch ($request_orderBy) {
            case 'created_at':
                $request_order = 'created_at ' . $request_orderDirection;
                break;
            case 'type':
                $request_order = 'type ' . $request_orderDirection;
                break;
            case 'status':
                $request_order = 'status ' . $request_orderDirection;
                break;
            default:
                $request_order = $request_orderBy . ' ' . $request_orderDirection;
                break;
        }

        $types = explode(',', request('type', ''));
        $allowedtypes = [];
        foreach ($types as $type) {
            if (in_array($type, ['booking', 'absence', 'holiday']) && !in_array($type, $allowedtypes))
                array_push($allowedtypes, $type);
        }
        $cnttypes = count($allowedtypes);

        $statuses = explode(',', request('status', ''));
        $allowedstatuses = [];
        foreach ($statuses as $status) {
            if (in_array($status, ['pending', 'accepted', 'rejected']) && !in_array($status, $allowedstatuses))
                array_push($allowedstatuses, $status);
        }
        $cntstatuses = count($allowedstatuses);

        $employee_ids = [];
        $supervisorgroups = $employee->supervisor;
        foreach ($supervisorgroups as $supervisorgroup) {
            $employees = $supervisorgroup->employees;
            foreach ($employees as $employee) {
                $employee_id = $employee->id;
                if (!in_array($employee_id, $employee_ids)) {
                    array_push($employee_ids, $employee_id);
                }
            }
        }

        $requests = RequestModel::whereIn('employee_id', $employee_ids)->when($cnttypes > 0 && $cnttypes < 3, function ($query) use ($allowedtypes) {
            $query->whereIn('type', $allowedtypes);
        })->when($cntstatuses > 0 && $cntstatuses < 3, function ($query) use ($allowedstatuses) {
            $query->whereIn('status', $allowedstatuses);
        })->orderByRaw($request_order)->paginate($request_perPage);



        // $requests = RequestModel::whereIn('employee_id', $employee_ids)->orderBy("created_at")->paginate($request_perPage);
        return RequestResource::collection($requests);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RequestStoreRequest $request, Employee $employee)
    {
        $type = request('type', '');

        $requestmodel = new RequestModel($request->validated());
        $requestmodel->status = 'pending';

        $employee->requests()->save($requestmodel);

        $bookingrequest = null;
        if ($type == 'booking') {
            $bookingrequest = new BookingRequest($request->validated());
            $requestmodel->bookingrequest()->save($bookingrequest);
        }


        return [$requestmodel, $bookingrequest];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(RequestDestroyRequest $request, Employee $employee, RequestModel $req)
    {
        $req->delete();
    }
}
