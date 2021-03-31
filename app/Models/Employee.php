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
        'shift_id'
    ];

    protected $hidden = [];

    protected $casts = [];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function user()
    {
        return $this->hasOne(User::class);
    }
}
