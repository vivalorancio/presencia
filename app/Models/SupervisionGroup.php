<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupervisionGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'description',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function employees()
    {
        return $this->hasMany(Employee::class);
    }

    public function supervisors()
    {
        return $this->hasMany(SupervisionGroupSupervisor::class);
    }
}
