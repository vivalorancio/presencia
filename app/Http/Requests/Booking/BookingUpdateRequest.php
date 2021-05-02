<?php


namespace App\Http\Requests\Booking;

use App\Http\Requests\AuthorizeAdminRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;


class BookingUpdateRequest extends AuthorizeAdminRequest
{
    public function authorize()
    {
        if ($this->booking->employee != $this->employee)
            return false;

        return parent::authorize();
    }

    public function rules()
    {
        return [
            'date' => [
                'required', 'dateformat:Y-m-d',
                //No pot existir un marcatge del mateix empleat al mateix moment
                Rule::unique('bookings')
                    ->ignore($this->booking->id)
                    ->where('employee_id', $this->employee->id)
                    ->where('time', $this->time)
            ],
            'time' => 'required|dateformat:H:i:s',
            'incidence_id' => 'nullable|sometimes|integer|exists:incidences,id',
            'user_id' => [
                'required', 'integer', 'exists:users,id',
                //Ha de correspondre a l'usuari del login
                function ($attribute, $value, $fail) {
                    if ($value !== Auth::user()->id)
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
