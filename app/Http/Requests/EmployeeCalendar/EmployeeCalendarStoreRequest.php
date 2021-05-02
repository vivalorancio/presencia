<?php

namespace App\Http\Requests\EmployeeCalendar;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\AuthorizeAdminRequest;
use Illuminate\Validation\Rule;

class EmployeeCalendarStoreRequest extends AuthorizeAdminRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    // public function authorize()
    // {

    //     if ($this->employeecalendar->employee != $this->employee)
    //         return false;

    //     return parent::authorize();
    // }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'year' => [
                'required', 'numeric',
                Rule::unique('employee_calendars')
                    ->where('employee_id', $this->employee->id),
                Rule::exists('calendars')->where('id', $this->calendar_id)
            ],
            'calendar_id' => [
                'required', 'exists:calendars,id'
            ]

        ];
    }

    public function messages()
    {
        return [
            'year.unique' => 'A calendar for the same year is already assigned to this employee',
            'year.exists' => "The year and the calendar year don't match"
        ];
    }
}
