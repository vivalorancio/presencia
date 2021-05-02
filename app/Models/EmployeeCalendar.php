<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeCalendar extends Model
{
    use HasFactory;


    protected $fillable = [
        'year',
        'employee_id',
        'calendar_id'
    ];


    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function calendar()
    {
        return $this->belongsTo(Calendar::class);
    }
}
