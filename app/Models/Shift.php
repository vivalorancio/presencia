<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shift extends Model
{
    use HasFactory;


    protected $fillable = [
        'code',
        'description',
        'colour',
        'start_time',
        'end_time',
        'expected_time',
        'recess_time',
        'is_holiday',
        //,'grace_time'
    ];
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'expected_time' => 'datetime',
        'recess_time' => 'datetime',
        'is_holiday' => 'boolean',
    ];

    public function employees()
    {
        return $this->hasMany(Employee::class);
    }
}
