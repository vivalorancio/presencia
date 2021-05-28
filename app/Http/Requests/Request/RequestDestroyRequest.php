<?php

namespace App\Http\Requests\Request;

use App\Http\Requests\AuthorizeAdminRequest;
use App\Http\Requests\EmployeeSelfRequest;

class RequestDestroyRequest extends EmployeeSelfRequest
{
    public function authorize()
    {
        if ($this->req->employee != $this->employee)
            return false;

        return parent::authorize();
    }

    public function rules()
    {
        return [];
    }
}
