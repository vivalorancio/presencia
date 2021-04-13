<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ShiftResource extends JsonResource
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
            'id' => $this->id,
            'code' => $this->code,
            'description' => $this->description,
            'colour' => $this->colour,
            'start_time' => $this->start_time->format('H:i'),
            'end_time' => $this->end_time->format('H:i'),
            'expected_time' => $this->expected_time->format('H:i'),
            'recess_time' => $this->recess_time ? $this->recess_time->format('H:i') : null,
            'is_holiday' => $this->is_holiday,
            // 'grace_time' => $this->grace_time,
        ];
    }
}
