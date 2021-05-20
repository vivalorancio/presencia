<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\EmployeeSelfRequest;
use App\Models\Employee;
use App\Models\Request as RequestModel;
use App\Models\BookingRequest;
use App\Http\Resources\RequestResource;
use App\Http\Requests\Request\RequestStoreRequest;

class RequestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(EmployeeSelfRequest $request, Employee $employee)
    {
        $calendars_per_page = 10000;
        return RequestResource::collection($employee->requests()->paginate($calendars_per_page));
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
    public function destroy($id)
    {
        //
    }
}
