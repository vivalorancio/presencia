<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Incidence extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'description',
        'colour',
        'is_counted',
        'is_absence',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'is_counted' => 'boolean',
        'is_absence' => 'boolean',
    ];

    public function incidences_group()
    {
        return $this->hasMany(IncidencesGroupIncidence::class);
    }
}
