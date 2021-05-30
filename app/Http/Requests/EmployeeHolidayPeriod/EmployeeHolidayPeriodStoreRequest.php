<?php

namespace App\Http\Requests\EmployeeHolidayPeriod;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\AuthorizeAdminRequest;
use Illuminate\Validation\Rule;

class EmployeeHolidayPeriodStoreRequest extends AuthorizeAdminRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    // public function authorize()
    // {
    //     return false;
    // }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'holiday_period_id' => [
                'required', 'exists:holiday_periods,id',
                Rule::unique('employee_holiday_periods')
                    ->where('employee_id', $this->employee->id),
            ]
        ];
    }

    public function messages()
    {
        return [
            'holiday_period.unique' => 'A holiday period is already assigned to this employee'
        ];
    }
}
