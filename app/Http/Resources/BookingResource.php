<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ShiftResource;

class BookingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            // 'employee_id' => $this->employee->id,
            'date' => $this->date,
            'time' => $this->time,
            // 'incidence_id' => $this->incidence_id,
            'incidence' => $this->incidence,
            'shift' => ShiftResource::collection([$this->shift]),
            // 'shift.start_time' => $this->shift->start_time->format('H:i'),
            'manual' => $this->user_id != null,
        ];
    }
}
