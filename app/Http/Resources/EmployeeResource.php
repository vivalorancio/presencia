<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
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
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'code' => $this->code,
            'national_id' => $this->national_id,
            'email' => $this->email,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'supervision_group_id' => $this->supervision_group_id,
            'shift_id' => $this->shift_id,
            'user' => $this->user,
        ];
    }
}
