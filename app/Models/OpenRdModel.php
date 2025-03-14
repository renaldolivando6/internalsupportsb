<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Exception;

class OpenRdModel extends Model
{
    protected $connection = 'sqlsrv'; // Default connection
    protected $table = 'customerorder.dbo.xRere_OpenRDRY';
    public $timestamps = false;

    public static function executeOpenRd($companyCode, $nomorRd)
    {
        // Ambil mapping koneksi dari config
        $connections = config('database_map.company_connections');

        // Validasi koneksi
        if (!array_key_exists($companyCode, $connections)) {
            throw new Exception("Unknown Company Code!");
        }

        $conn = $connections[$companyCode];
        
        // Jalankan query ke database yang sesuai
        $results = DB::connection($conn)->select("
            EXEC customerorder.dbo.xRere_OpenRDRY 
            @kodePembuat = ?, 
            @notransKembali = ?, 
            @applyNo = '%', 
            @request = 'open'
        ", [$companyCode, $nomorRd]);

        // Ambil hanya baris pertama
        return $results[0] ?? null;
    }
}
