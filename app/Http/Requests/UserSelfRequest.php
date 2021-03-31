<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UserSelfRequest extends FormRequest
{
    public function authorize()
    {
        return (Auth::user()->is_admin || Auth::user()->id == $this->user);
    }

    public function rules()
    {
        return [];
    }
}
