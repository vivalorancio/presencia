<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'year'
    ];

    public function shifts()
    {
        return $this->hasMany(CalendarShifts::class);
    }
}
