<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HolidayRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'request_id',
        'date_from',
        'date_to',
        'employee_holiday_period_id'
    ];


    public function request()
    {
        return $this->belongsTo(Request::class);
    }

    public function employee_holiday_period()
    {
        return $this->belongsTo(EmployeeHolidayPeriod::class);
    }
}
