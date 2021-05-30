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
        'shift_id',
        'department_id',
        'area_id',
        'section_id',
    ];

    protected $hidden = [];

    protected $casts = [];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function absences()
    {
        return $this->hasMany(Absence::class);
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

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function area()
    {
        return $this->belongsTo(Area::class);
    }

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function supervision_group()
    {
        return $this->belongsTo(SupervisionGroup::class);
    }

    public function supervisor()
    {
        //return $this->hasMany(SupervisionGroupSupervisor::class);
        return $this->belongsToMany(SupervisionGroup::class, 'supervision_group_supervisors', 'employee_id', 'supervision_group_id');
    }

    public function calendars()
    {
        return $this->hasMany(EmployeeCalendar::class);
    }

    public function holiday_periods()
    {
        return $this->hasMany(EmployeeHolidayPeriod::class);
    }

    public function requests()
    {
        return $this->hasMany(Request::class);
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
