<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthorizeAdminRequest;
use App\Http\Requests\Booking\BookingStoreRequest;
use App\Http\Requests\Booking\BookingShowRequest;
use App\Http\Requests\Booking\BookingUpdateRequest;
use App\Http\Requests\Booking\BookingDestroyRequest;
use App\Http\Requests\EmployeeSelfRequest;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use App\Models\Employee;

class BookingController extends Controller
{
    public function index(EmployeeSelfRequest $request, Employee $employee)
    {
        $bookings_per_page = 25;
        return BookingResource::collection($employee->bookings()->paginate($bookings_per_page));
    }

    public function store(BookingStoreRequest $request, Employee $employee)
    {
        $booking = new Booking($request->validated());
        $employee->bookings()->save($booking);
        return new BookingResource($booking);
    }

    public function show(BookingShowRequest $request, Employee $employee, Booking $booking)
    {
        return new BookingResource($booking);
    }

    public function update(BookingUpdateRequest $request, Employee $employee, Booking $booking)
    {
        $booking->update($request->validated());
        $booking->save();
        return new BookingResource($booking);
    }

    public function destroy(BookingDestroyRequest $request, Employee $employee, Booking $booking)
    {
        $booking->delete();
    }
}
