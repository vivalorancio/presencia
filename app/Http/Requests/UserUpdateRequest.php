<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends AuthorizeAdminRequest
{
    public function rules()
    {
        return [
            'username' => 'sometimes|string|unique:users',
            'password' => 'sometimes|string',
            'employee_id' => 'sometimes|integer|exists:employees,id|unique:users',
            'is_blocked' => 'sometimes|boolean',
            'is_admin' => 'sometimes|boolean',
        ];
    }
}
