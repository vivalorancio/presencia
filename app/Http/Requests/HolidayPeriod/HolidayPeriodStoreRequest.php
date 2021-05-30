<?php

namespace App\Http\Requests\HolidayPeriod;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\AuthorizeAdminRequest;

class HolidayPeriodStoreRequest extends AuthorizeAdminRequest
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
            'code' => 'required|string|max:3|unique:holiday_periods',
            'description' => 'required|string',
            'days' => 'required|numeric|min:1',
            'date_from' => 'required|dateformat:Y-m-d',
            'date_to' => 'required|dateformat:Y-m-d|after:date_from'
        ];
    }
}
