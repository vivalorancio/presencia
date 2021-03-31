<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class AuthorizeAdminRequest extends FormRequest
{
    public function authorize()
    {
        return Auth::user()->is_admin;
    }

    public function rules()
    {
        return [];
    }
}
