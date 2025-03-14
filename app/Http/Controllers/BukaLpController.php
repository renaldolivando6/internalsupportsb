<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class BukaLpController extends Controller
{
    /**
     * Check LP details
     */
    public function check(Request $request)
    {
        $validated = $request->validate([
            'company' => 'required|string|size:4',
            'nomorLp' => [
                'required',
                'string',
                'size:10',
                'regex:/^LP\d{8}$/', // Format: LP + 8 digit angka
            ],
        ]);

        $company = strtoupper($validated['company']);
        $nomorLp = strtoupper($validated['nomorLp']);

        try {
            // Get the correct database connection name
            $connectionName = $this->getConnectionName($company);
            
            // Execute stored procedure in check mode (@islive = 0)
            $results = DB::connection($connectionName)
                ->select("EXEC customerorder.dbo.xRere_BukaLP @companycode = ?, @nomor_lp = ?, @islive = 0", [
                    $company,
                    $nomorLp
                ]);

            return response()->json([
                'company' => $company,
                'nomorLp' => $nomorLp,
                'results' => $results,
            ]);
        } catch (\Exception $e) {
            Log::error("Error checking LP: " . $e->getMessage());

            return response()->json([
                'company' => $company,
                'nomorLp' => $nomorLp,
                'error' => 'Error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Run LP opening process
     */
    public function run(Request $request)
    {
        $validated = $request->validate([
            'company' => 'required|string|size:4',
            'nomorLp' => [
                'required',
                'string',
                'size:10',
                'regex:/^LP\d{8}$/',
            ],
        ]);

        $company = strtoupper($validated['company']);
        $nomorLp = strtoupper($validated['nomorLp']);

        try {
            // Get the correct database connection name
            $connectionName = $this->getConnectionName($company);
            
            // Execute stored procedure in live mode (@islive = 1)
            DB::connection($connectionName)
                ->statement("EXEC customerorder.dbo.xRere_BukaLP @companycode = ?, @nomor_lp = ?, @islive = 1", [
                    $company,
                    $nomorLp
                ]);

            return response()->json([
                'company' => $company,
                'nomorLp' => $nomorLp,
                'success' => 'LP opening process executed successfully.',
            ]);
        } catch (\Exception $e) {
            Log::error("Error running LP process: " . $e->getMessage());

            return response()->json([
                'company' => $company,
                'nomorLp' => $nomorLp,
                'error' => 'Error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get the database connection name for the given company code
     */
    private function getConnectionName(string $company): string
    {
        $connectionMap = config('database_map.company_connections', []);

        if (!array_key_exists($company, $connectionMap)) {
            throw new \Exception('Unknown Company Code!');
        }

        return $connectionMap[$company];
    }
}
