<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'type',
        'status',
        'comments',
        'validated_at',
        'validator_id',
        'validator_comments'
    ];


    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function validator()
    {
        return $this->belongsTo(Employee::class);
    }

    public function bookingrequest()
    {
        return $this->hasOne(BookingRequest::class);
    }
}
