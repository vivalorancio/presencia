<?php

namespace App\Http\Requests\EmployeeHolidayPeriod;

use App\Http\Requests\EmployeeSelfRequest;

class EmployeeHolidayPeriodShowRequest extends EmployeeSelfRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if ($this->holiday_period->employee != $this->employee)
            return false;

        return parent::authorize();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //
        ];
    }
}
