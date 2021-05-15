<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ShiftResource;
use App\Http\Resources\BookingResource;

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
            'shift' => ShiftResource::collection([$this['shift']]),
            'bookings' => BookingResource::collection($this['bookings']),
            'eval' => $this['eval']
        ];
    }
}
