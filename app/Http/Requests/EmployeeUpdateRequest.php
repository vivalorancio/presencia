<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class EmployeeUpdateRequest extends AuthorizeAdminRequest
{
    public function rules()
    {
        return [
            'first_name' => 'sometimes|string',
            'last_name' => 'sometimes|string',
            'code' => 'nullable|sometimes|unique:employees,code,' . $this->employee->id,
            'national_id' => 'nullable|sometimes|unique:employees,national_id,' . $this->employee->id,
            'email' => 'nullable|sometimes|email',
            'start_date' => 'nullable|sometimes|dateformat:Y-m-d',
            'end_date' => 'nullable|sometimes|dateformat:Y-m-d|after_or_equal:start_date',
            'incidences_group_id' => 'nullable|sometimes|integer|exists:incidences_groups,id',
            'supervision_group_id' => 'nullable|sometimes|integer',
            'shift_id' => 'nullable|sometimes|integer|exists:shifts,id',
            'department_id' => 'nullable|sometimes|integer|exists:departments,id',
            'area_id' => 'nullable|sometimes|integer|exists:areas,id',
            'section_id' => 'nullable|sometimes|integer|exists:sections,id',
            'username' => [
                'nullable', 'sometimes', 'string',
                Rule::unique('users')->whereNot('employee_id', $this->employee->id)
            ],
            'password' => 'nullable|sometimes|string',
            'is_admin' => 'nullable|sometimes|boolean',
            'is_blocked' => 'nullable|sometimes|boolean'

        ];
    }
}
