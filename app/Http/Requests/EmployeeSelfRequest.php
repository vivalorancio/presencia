<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class EmployeeSelfRequest extends FormRequest
{
    public function authorize()
    {
        return (Auth::user()->is_admin || Auth::user()->employee == $this->employee);
    }

    public function rules()
    {
        return [];
    }
}
