<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeHolidayPeriodResource extends JsonResource
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
            'employee_id' =>  $this->employee_id,
            // 'holiday_period_id' =>  $this->holiday_period_id,
            'holiday_period' =>  $this->holiday_period,
        ];
    }
}
