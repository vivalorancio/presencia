<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeHolidayPeriod extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'holiday_period_id'
    ];


    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function holiday_period()
    {
        return $this->belongsTo(HolidayPeriod::class);
    }

    public function holidays()
    {
        return $this->hasMany(EmployeeHoliday::class);
    }
}
