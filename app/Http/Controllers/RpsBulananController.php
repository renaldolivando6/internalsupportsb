<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;

class RpsBulananController extends Controller
{
    public function check(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'companyCop' => 'required|string|min:4|max:4',
            'custCodeRaw' => 'required|string',
            'isLiveX' => 'required|integer'
        ]);

        try {
            // Get connection based on company code
            $companyCop = strtoupper($validated['companyCop']);
            $custCodeRaw = strtoupper($validated['custCodeRaw']);
            $isLiveX = (int)$validated['isLiveX'];
            
            $connectionName = $this->getDatabaseConnection($companyCop);
            
            // Execute the stored procedure
            $results = DB::connection($connectionName)->select(
                "EXEC customerorder.dbo.xrere_insertrps 
                @companycop = ?, 
                @custcode_raw = ?, 
                @islivex = ?",
                [$companyCop, $custCodeRaw, $isLiveX]
            );

            return response()->json([
                'success' => true,
                'results' => $results ?? [] // Jika kosong, tetap kembalikan array kosong
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    private function getDatabaseConnection($companyCode)
    {
        // Get the connection mapping from configuration
        $connectionMap = Config::get('database_map.company_connections');
        
        if (!isset($connectionMap[$companyCode])) {
            throw new \Exception('Company connection not found');
        }
        
        return $connectionMap[$companyCode];
    }
}