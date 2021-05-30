<?php

namespace App\Http\Requests\EmployeeHoliday;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\AuthorizeAdminRequest;

class EmployeeHolidayDestroyRequest extends AuthorizeAdminRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if ($this->holiday->employee_holiday_period != $this->holiday_period)
            return false;

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
