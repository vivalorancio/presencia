<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends AuthorizeAdminRequest
{
    public function rules()
    {
        return [
            'username' => 'required|string|unique:users',
            'password' => 'required|string',
            'employee_id' => 'nullable|sometimes|integer|exists:employees,id|unique:users',
            'is_blocked' => 'sometimes|boolean',
            'is_admin' => 'sometimes|boolean',
        ];
    }
}
