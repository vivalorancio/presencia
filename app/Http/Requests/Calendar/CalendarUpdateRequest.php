<?php

namespace App\Http\Requests\Calendar;


use App\Http\Requests\AuthorizeAdminRequest;
use Illuminate\Foundation\Http\FormRequest;

class CalendarUpdateRequest extends AuthorizeAdminRequest
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
            'name' => 'sometimes|string|unique:calendars,name,' . $this->calendar->id,
            'year' => 'sometimes|numeric|min:1900|max:2100'
        ];
    }
}
