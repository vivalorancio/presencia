<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupervisionGroupSupervisor extends Model
{
    use HasFactory;

    protected $fillable = [
        'supervision_group_id',
        'employee_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function supervisiongroup()
    {
        return $this->belongsTo(SupervisionGroup::class);
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
