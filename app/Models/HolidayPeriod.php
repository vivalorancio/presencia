<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HolidayPeriod extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'description',
        'days',
        'date_from',
        'date_to'
    ];
}
