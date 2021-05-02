<?php

namespace App\Http\Requests\IncidencesGroupIncidence;

use App\Http\Requests\AuthorizeAdminRequest;
use Illuminate\Foundation\Http\FormRequest;

class IncidencesGroupIncidenceStoreRequest extends AuthorizeAdminRequest
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
            'incidence_id' => [
                'required', 'exists:incidences,id'
            ]
        ];
    }
}
