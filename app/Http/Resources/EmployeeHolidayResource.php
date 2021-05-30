<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeHolidayResource extends JsonResource
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
            'day' =>  $this->day,
            'employee_holiday_period_id' =>  $this->employee_holiday_period_id,
            'employee_holiday_period' =>  new EmployeeHolidayPeriodResource($this->employee_holiday_period)
        ];
    }
}
