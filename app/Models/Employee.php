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
        'incidences_group_id',
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

    public function shift()
    {
        return $this->belongsTo(Shift::class);
    }

    public function incidences_group()
    {
        return $this->belongsTo(IncidencesGroup::class);
    }

    public function calendars()
    {
        return $this->hasMany(EmployeeCalendar::class);
    }

    // public function currentcalendar()
    // {
    //     $calendar = $this->calendars()->where('year', date("Y"))->firstOrFail();
    //     return  $calendar->calendar();
    //     if ($calendar == null) {
    //         return;
    //     }
    // }

    // public function currentshift()
    // {
    //     $currrentcalendar = $this->currentcalendar;
    //     if ($currrentcalendar == null) {
    //         return null;
    //     }
    //     $currentshift = $currrentcalendar->shifts()->where('day', date("z"))->first()->shift();
    //     if ($currentshift == null) {
    //         $currentshift = $this->shift();
    //     }
    //     return $currentshift;
    // }
}
