<?php

namespace App\Http\Requests\Request;

use App\Http\Requests\EmployeeSelfRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RequestUpdateRequest extends EmployeeSelfRequest
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
            'status' => [
                'required',
                Rule::in(['accepted', 'rejected'])
            ],
            'validator_comments' => 'nullable|sometimes|string',
            'validator_id' => 'required',
        ];
    }
}
