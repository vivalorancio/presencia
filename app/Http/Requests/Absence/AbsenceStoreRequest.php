<?php

namespace App\Http\Requests\Absence;

use App\Http\Requests\AuthorizeAdminRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class AbsenceStoreRequest extends AuthorizeAdminRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    // public function authorize()
    // {

    // }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'date' => [
                'required', 'dateformat:Y-m-d',
                //No pot existir una absència del mateix empleat al mateix dia
                Rule::unique('absences')
                    ->where('employee_id', $this->employee->id)
            ],
            'incidence_id' => 'required|integer|exists:incidences,id',
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
            'date.unique' => 'An absence with this employee and date already exists'
        ];
    }
}
