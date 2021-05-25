<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            "id" => $this->id,
            "username" => $this->username,
            "employee_id" => $this->employee_id,
            "is_blocked" => $this->is_blocked,
            "is_admin" => $this->is_admin,
            "is_supervisor" => $this->employee ? count($this->employee->supervisor) > 0 : false
        ];
    }
}
