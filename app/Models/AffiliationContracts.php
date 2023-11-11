<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AffiliationContracts extends Model
{
    use HasFactory;

    protected $table = 'affiliation_contracts';

    protected $fillable = [
        'contract_id',
        'email',
        'job_division',
    ];
}
