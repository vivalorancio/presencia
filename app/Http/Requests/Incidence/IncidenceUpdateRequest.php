<?php

namespace App\Http\Requests\Incidence;

use App\Http\Requests\AuthorizeAdminRequest;
use Illuminate\Foundation\Http\FormRequest;

class IncidenceUpdateRequest extends AuthorizeAdminRequest
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
            'code' => 'sometimes|unique:incidences,code,' . $this->incidence->id,
            'description' => 'sometimes|string',
            'colour' => 'sometimes|string',
            'is_counted' => 'nullable|sometimes|boolean',
            'is_absence' => 'nullable|sometimes|boolean',
        ];
    }
}
