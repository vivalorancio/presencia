<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IncidencesGroupIncidence extends Model
{
    use HasFactory;

    protected $fillable = [
        'incidences_group_id',
        'incidence_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function incidences_group()
    {
        return $this->belongsTo(IncidencesGroup::class);
    }

    public function incidence()
    {
        return $this->belongsTo(Incidence::class);
    }
}
