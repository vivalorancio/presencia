<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RequestResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        //return parent::toArray($request);
        return [
            'id' => $this->id,
            'employee_id' => $this->employee_id,
            'type' => $this->type,
            'status' => $this->status,
            'comments' => $this->comments,
            'validator_id' => $this->validator_id,
            'requested_at' => $this->created_at,
            'booking' => $this->when($this->type == 'booking', function () {
                $bookingrequest = $this->bookingrequest;
                return [
                    'date' => $bookingrequest->date,
                    'time' =>  $bookingrequest->time,
                    'incidence_id' => $bookingrequest->incidence_id
                ];
            }),
        ];
    }
}
