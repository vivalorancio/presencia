<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;


class EmployeeStoreRequest extends AuthorizeAdminRequest
{
    public function rules()
    {
        return [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'code' => 'nullable|sometimes|unique:employees',
            'national_id' => 'nullable|sometimes|unique:employees',
            'email' => 'nullable|sometimes|email',
            'start_date' => 'nullable|sometimes|dateformat:Y-m-d',
            'end_date' => 'nullable|sometimes|dateformat:Y-m-d|after_or_equal:start_date',
            'incidences_group_id' => 'nullable|sometimes|integer',
            'supervision_group_id' => 'nullable|sometimes|integer',
            'shift_id' => 'nullable|sometimes|integer',
            'username' => 'nullable|sometimes|string|unique:users,username',
            'password' => 'nullable|sometimes|string',
            'is_admin' => 'nullable|sometimes|boolean',
            'is_blocked' => 'nullable|sometimes|boolean'
        ];
    }
}
