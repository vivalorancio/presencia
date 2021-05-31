<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ShiftResource;
use App\Http\Resources\BookingResource;
use App\Http\Resources\AbsenceResource;
use App\Http\Resources\EmployeeHolidayResource;

class DayBookingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        return [
            'day' => $this['day'],
            'shift' => $this['shift'] == null ? null : ShiftResource::collection([$this['shift']]),
            'bookings' => BookingResource::collection($this['bookings']),
            'absences' => AbsenceResource::collection($this['absences']),
            'holidays' => EmployeeHolidayResource::collection($this['holidays']),
            'eval' => $this['eval']
        ];
    }
}
