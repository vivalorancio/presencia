<?php

namespace App\Http\Requests\Request;

use App\Http\Requests\EmployeeSelfRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RequestStoreRequest extends EmployeeSelfRequest
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
            'type' => [
                'required',
                Rule::in(['booking', 'absence', 'holiday'])
            ],
            'comments' => 'nullable|sometimes|string',
            //booking,
            'date' => 'required_if:type,booking|dateformat:Y-m-d',
            'time' => [
                'required_if:type,booking', 'dateformat:H:i:s',
                Rule::unique('bookings')
                    ->where('employee_id', $this->employee->id)
                    ->where('date', $this->date)
            ],
            //booking, absence
            'incidence_id' => 'nullable|sometimes|required_if:type,absence|integer|exists:incidences,id',
            //absence, holiday
            'date_from' => 'required_if:type,absence|required_if:type,holiday|dateformat:Y-m-d',
            'date_to' => 'required_if:type,absence|required_if:type,holiday|dateformat:Y-m-d',
            //holiday
            'employee_holiday_period_id' => 'required_if:type,holiday|integer|exists:employee_holiday_periods,id'
            //            'holiday_period_id' => 'required_if:type,holiday|integer|exists:holiday_periods,id'
        ];
    }

    public function messages()
    {
        return [
            'time.unique' => 'A booking with this employee, date and time already exists'
        ];
    }
}
