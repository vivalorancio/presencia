<?php

namespace App\Http\Requests\Shift;

use App\Http\Requests\AuthorizeAdminRequest;
use Illuminate\Foundation\Http\FormRequest;

class ShiftStoreRequest extends AuthorizeAdminRequest
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
            'code' => 'required|string|max:3|unique:shifts',
            'description' => 'required|string',
            'colour' => 'required|string',
            'start_time' => 'required|dateformat:H:i',
            'end_time' => 'required|dateformat:H:i',
            'expected_time' => 'required|dateformat:H:i',
            'recess_time' => 'nullable|sometimes|dateformat:H:i',
            'is_holiday' => 'nullable|sometimes|boolean',
            //'grace_time' => ''
        ];
    }
}
