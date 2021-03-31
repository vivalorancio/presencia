<?php

namespace App\Http\Requests\Booking;

use App\Http\Requests\EmployeeSelfRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class BookingStoreRequest extends EmployeeSelfRequest
{
    public function rules()
    {
        return [
            'date' => [
                'required', 'dateformat:Y-m-d',
                //No pot existir un marcatge del mateix empleat al mateix moment
                Rule::unique('bookings')
                    ->where('employee_id', $this->employee->id)
                    ->where('time', $this->time)
            ],
            'time' => 'required|dateformat:H:i:s',
            'incidence_id' => 'sometimes|integer|exists:incidences,id',
            'user_id' => [
                'integer', 'exists:users,id',
                //Required si és un marcatge de tercers
                Rule::requiredIf($this->employee->id !== Auth::user()->employee_id),
                //Ha de correspondre a l'usuari del login i ha de ser admin.
                function ($attribute, $value, $fail) {
                    if ($value !== Auth::user()->id || !Auth::user()->is_admin)
                        $fail('The ' . $attribute . ' is invalid');
                }

            ]
        ];
    }


    public function messages()
    {
        return [
            'date.unique' => 'A booking with this employee, date and time already exists'
        ];
    }
}
