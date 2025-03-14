<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OpenRdHistory extends Model
{
    protected $connection = 'sqlsrv';
    protected $table = 'open_rd_histories';

    protected $fillable = [
        'tax_number',
        'company',
        'username',
    ];

    public $timestamps = false;

    public static function getTop20()
    {
        return self::latest('date_open')->limit(20)->get();
    }
}
