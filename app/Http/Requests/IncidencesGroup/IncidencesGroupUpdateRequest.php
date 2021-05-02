<?php

namespace App\Http\Requests\IncidencesGroup;

use App\Http\Requests\AuthorizeAdminRequest;
use Illuminate\Foundation\Http\FormRequest;

class IncidencesGroupUpdateRequest extends AuthorizeAdminRequest
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
            'code' => 'sometimes|unique:incidences_groups,code,' . $this->incidences_group->id,
            'description' => 'sometimes|string',

        ];
    }
}
