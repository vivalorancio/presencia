<?php

namespace App\Http\Requests\Shift;

use App\Http\Requests\AuthorizeAdminRequest;
use Illuminate\Foundation\Http\FormRequest;

class ShiftUpdateRequest extends AuthorizeAdminRequest
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
            'code' => 'sometimes|unique:shifts,code,' . $this->shift->id,
            'description' => 'sometimes|string',
            'colour' => 'sometimes|string',
            'start_time' => 'sometimes|dateformat:H:i',
            'end_time' => 'sometimes|dateformat:H:i',
            'expected_time' => 'sometimes|dateformat:H:i',
            'recess_time' => 'nullable|sometimes|dateformat:H:i',
            'is_holiday' => 'nullable|sometimes|boolean',
        ];
    }
}
