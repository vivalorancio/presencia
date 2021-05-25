<?php

namespace App\Http\Requests\Request;

use App\Http\Requests\AuthorizeAdminRequest;

class RequestDestroyRequest extends AuthorizeAdminRequest
{
    public function authorize()
    {
        if ($this->employee != $this->employee)
            return false;

        return parent::authorize();
    }

    public function rules()
    {
        return [];
    }
}
