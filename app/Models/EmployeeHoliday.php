<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeHoliday extends Model
{
    use HasFactory;


    protected $fillable = [
        'day',
        'employee_holiday_period_id'
    ];


    public function employee_holiday_period()
    {
        return $this->belongsTo(EmployeeHolidayPeriod::class);
    }
}
