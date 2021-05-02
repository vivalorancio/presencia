<?php

namespace App\Http\Requests\EmployeeCalendar;

use App\Http\Requests\EmployeeSelfRequest;

class EmployeeCalendarShowRequest extends EmployeeSelfRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if ($this->calendar->employee != $this->employee)
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
