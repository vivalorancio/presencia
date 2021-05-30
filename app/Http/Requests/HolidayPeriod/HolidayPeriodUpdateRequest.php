<?php

namespace App\Http\Requests\HolidayPeriod;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\AuthorizeAdminRequest;

class HolidayPeriodUpdateRequest extends AuthorizeAdminRequest
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
            'code' => 'sometimes|unique:holiday_periods,code,' . $this->holiday_period->id,
            'description' => 'sometimes|string',
            'days' => 'sometimes|numeric|min:1',
            'date_from' => 'sometimes|dateformat:Y-m-d',
            'date_to' => 'sometimes|dateformat:Y-m-d|after:date_from'
        ];
    }
}
