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
            'employee' => $this->employee,
            'type' => $this->type,
            'status' => $this->status,
            'comments' => $this->comments,
            'validator_id' => $this->validator_id,
            'validator' => $this->validator,
            'requested_at' => $this->created_at,
            'validated_at' => null,
            'validator_comments' => $this->validator_comments,
            'booking' => $this->when($this->type == 'booking', function () {
                $bookingrequest = $this->bookingrequest;
                return [
                    'date' => $bookingrequest->date,
                    'time' =>  $bookingrequest->time,
                    'incidence_id' => $bookingrequest->incidence_id,
                    'incidence' => $bookingrequest->incidence
                ];
            }),
        ];
    }
}
