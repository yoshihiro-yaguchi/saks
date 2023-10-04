<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contracts extends Model
{
    use HasFactory;

    protected $table = 'contracts';

    protected $fillable = [
        'contract_id',
        'contract_plan',
        'contract_company_name',
        'contractors_name',
        'contract_date',
        'cancellation_date',
        'cancellation_memo',
        'contract_zipcode',
        'contract_address1',
        'contract_address2',
        'contract_address3',
        'contract_address4',
    ];
}
