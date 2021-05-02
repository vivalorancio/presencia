<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IncidencesGroup extends Model
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

    public function incidences()
    {
        return $this->hasMany(IncidencesGroupIncidence::class);
    }

    public function employees()
    {
        return $this->hasMany(Employee::class);
    }
}
