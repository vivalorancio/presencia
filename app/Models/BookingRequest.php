<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'request_id',
        'date',
        'time',
        'incidence_id',
        // 'user_id',
    ];


    public function request()
    {
        return $this->belongsTo(Request::class);
    }

    public function incidence()
    {
        return $this->belongsTo(Incidence::class);
    }
}
