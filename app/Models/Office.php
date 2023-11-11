<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Office extends Model
{
    use HasFactory;

    protected $table = 'offices';

    protected $fillable = [
        'contract_id',
        'office_code',
        'office_name',
        'phone_number',
        'zipcode',
        'address1',
        'address2',
        'address3',
        'address4',
    ];
}
