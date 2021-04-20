<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CalendarShifts extends Model
{
    use HasFactory;

    protected $fillable = [
        'calendar_id',
        'day',
        'shift_id'
    ];


    public function calendar()
    {
        return $this->belongsTo(Calendar::class);
    }

    public function shift()
    {
        return $this->belongsTo(Shift::class);
    }
}
