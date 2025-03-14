<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Exception;

class RefreshNpwpModel extends Model
{    
    public static function executeRefreshNpwp()
    {
        try {
            $conn = 'sqlsrv_58';

            // Jalankan stored procedure tanpa mengharapkan hasil (unprepared fungsinya buat itu, kalau ga ada hasil erorr dia gapake itu)
            DB::connection($conn)->unprepared("
                EXEC msdb.dbo.sp_start_job @job_name = 'Proses EFaktur Pelanggan n Keuangan Acc'
            ");

            return [
                'status' => 'success',
                'message' => 'Refresh successfully started, Please wait 2 minutes for next refresh'
            ];

        } catch (Exception $e) {
            $errorMessage = $e->getMessage();

            // Tangani error jika job sedang berjalan
            if (stripos($errorMessage, "SQLServerAgent Error") !== false && stripos($errorMessage, "already running") !== false) {
                return ['status' => 'warning', 'message' => 'Wait, refresh still running!'];
            }

            return ['status' => 'error', 'message' => $errorMessage];
        }
    }
}
