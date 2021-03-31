<?php

namespace App\Http\Requests\Booking;

use App\Http\Requests\EmployeeSelfRequest;

class BookingShowRequest extends EmployeeSelfRequest
{
    public function authorize()
    {
        if ($this->booking->employee != $this->employee)
            return false;

        return parent::authorize();
    }

    public function rules()
    {
        return [];
    }
}
