<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthorizeAdminRequest;
use App\Http\Requests\Shift\ShiftStoreRequest;
use App\Http\Requests\Shift\ShiftUpdateRequest;
use App\Http\Resources\ShiftResource;
use App\Models\Shift;
use Illuminate\Http\Request;

class ShiftController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(AuthorizeAdminRequest $request)
    {
        $shifts = Shift::paginate(25);
        return ShiftResource::collection($shifts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ShiftStoreRequest $request)
    {
        $shift = new Shift($request->validated());
        $shift->save();

        return new ShiftResource($shift);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(AuthorizeAdminRequest $request, Shift $shift)
    {
        return new ShiftResource($shift);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ShiftUpdateRequest $request, Shift $shift)
    {
        $shift->update($request->validated());
        $shift->save();

        return new ShiftResource($shift);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(AuthorizeAdminRequest $request, Shift $shift)
    {
        $shift->delete();
        return ["message" => "deleted"];
    }
}
