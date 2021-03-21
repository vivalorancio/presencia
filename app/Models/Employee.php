<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'code',
        'national_id',
        'email',
        'start_date',
        'end_date',
        'supervision_group_id',
        'shift_id',
        'is_editor'
    ];

    protected $hidden = [];

    protected $casts = [
        'is_editor' => 'boolean',
    ];
}
