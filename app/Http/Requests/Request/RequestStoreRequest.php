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
            //booking, absence, holiday
            'date' => 'required|dateformat:Y-m-d',
            //booking, absenc
            'incidence_id' => 'nullable|sometimes|integer|exists:incidences,id',
            //booking
            'time' => [
                'required_if:type,booking', 'dateformat:H:i:s',
                Rule::unique('bookings')
                    ->where('employee_id', $this->employee->id)
                    ->where('date', $this->date)
            ]
            //holiday
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
