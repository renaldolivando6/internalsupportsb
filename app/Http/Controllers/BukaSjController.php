<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Config;

class BukaSJController extends Controller
{
    public function getSessionData()
    {
        return response()->json([
            'exceptionCode' => session('buka-sj-exception-code', '')
        ]);
    }

    public function updateSessionData(Request $request)
    {
        $validated = $request->validate([
            'exceptionCode' => 'required|string'
        ]);

        session(['buka-sj-exception-code' => $validated['exceptionCode']]);

        return response()->json(['success' => true]);
    }

    public function check(Request $request)
    {
        // Validate form data based on exception code
        $validated = $this->validateRequest($request);

        $exceptionCode = $validated['exceptionCode'];
        $result1 = [];
        $result2 = [];

        try {
            // Get connection based on company code
            $companyCode = $this->getCompanyCode($validated, $exceptionCode);
            $connectionName = $this->getDatabaseConnection($companyCode);

            switch ($exceptionCode) {
                case 'SJ':
                    $result1 = $this->checkSj($connectionName, $validated);
                    break;
                case 'SUSPEND':
                    $result1 = $this->checkSuspend($connectionName, $validated);
                    break;
                case 'SJ_SUSPEND':
                    list($result1, $result2) = $this->checkSjSuspend($connectionName, $validated);
                    break;
                case 'RC':
                    $result1 = $this->checkRc($connectionName, $validated);
                    break;
                case 'RT':
                    $result1 = $this->checkRt($connectionName, $validated);
                    break;
                case 'BK':
                    $result1 = $this->checkBk($connectionName, $validated);
                    break;
                case 'BT':
                    $result1 = $this->checkBt($connectionName, $validated);
                    break;
                case 'PB':
                    $result1 = $this->checkPb($connectionName, $validated);
                    break;
                case 'BTRC':
                    $result1 = $this->checkBtrc($connectionName, $validated);
                    break;
                case 'BTRP':
                    $result1 = $this->checkBtrp($connectionName, $validated);
                    break;
            }

            return response()->json([
                'success' => true,
                'result1' => $result1,
                'result2' => $result2
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function run(Request $request)
    {
        // Similar to check but with islive=1
        $validated = $this->validateRequest($request);

        $exceptionCode = $validated['exceptionCode'];

        try {
            // Get connection based on company code
            $companyCode = $this->getCompanyCode($validated, $exceptionCode);
            $connectionName = $this->getDatabaseConnection($companyCode);

            switch ($exceptionCode) {
                case 'SJ':
                    $this->runSj($connectionName, $validated);
                    break;
                case 'SUSPEND':
                    $this->runSuspend($connectionName, $validated);
                    break;
                case 'SJ_SUSPEND':
                    $this->runSjSuspend($connectionName, $validated);
                    break;
                case 'RC':
                    $this->runRc($connectionName, $validated);
                    break;
                case 'RT':
                    $this->runRt($connectionName, $validated);
                    break;
                case 'BK':
                    $this->runBk($connectionName, $validated);
                    break;
                case 'BT':
                    $this->runBt($connectionName, $validated);
                    break;
                case 'PB':
                    $this->runPb($connectionName, $validated);
                    break;
                case 'BTRC':
                    $this->runBtrc($connectionName, $validated);
                    break;
                case 'BTRP':
                    $this->runBtrp($connectionName, $validated);
                    break;
            }

            return response()->json([
                'success' => true,
                'message' => 'Operation completed successfully.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    private function validateRequest(Request $request)
    {
        // Common validation for all requests
        $rules = [
            'exceptionCode' => 'required|string'
        ];

        // Additional validation based on exception code
        $exceptionCode = $request->input('exceptionCode');
        switch ($exceptionCode) {
            case 'SJ':
                $rules['company'] = 'required|string|min:4|max:4';
                $rules['nomorPs'] = 'required|string';
                break;
            case 'SUSPEND':
                $rules['company'] = 'required|string|min:4|max:4';
                $rules['customerCode'] = 'required|string';
                $rules['prodcat'] = 'required|string';
                break;
            case 'SJ_SUSPEND':
                $rules['company'] = 'required|string|min:4|max:4';
                $rules['nomorPs'] = 'required|string';
                $rules['customerCode'] = 'required|string';
                $rules['prodcat'] = 'required|string';
                break;
            case 'RC':
                $rules['company'] = 'required|string|min:4|max:4';
                $rules['customerCode'] = 'required|string';
                break;
            case 'RT':
                $rules['company'] = 'required|string|min:4|max:4';
                $rules['nomorRc'] = 'required|string';
                break;
            case 'BK':
                $rules['companyIm'] = 'required|string|min:4|max:4';
                $rules['nomorSj'] = 'required|string';
                break;
            case 'BT':
                $rules['companyIm'] = 'required|string|min:4|max:4';
                $rules['nomorPb'] = 'required|string';
                break;
            case 'PB':
                $rules['companyIm'] = 'required|string|min:4|max:4';
                $rules['companyWhin'] = 'required|string|min:4|max:4';
                $rules['nomorSj'] = 'required|string';
                break;
            case 'BTRC':
            case 'BTRP':
                $rules['companyIm'] = 'required|string|min:4|max:4';
                $rules['nomorRc'] = 'required|string';
                break;
        }

        return $request->validate($rules);
    }

    private function getCompanyCode($validated, $exceptionCode)
    {
        switch ($exceptionCode) {
            case 'SJ':
            case 'SUSPEND': 
            case 'SJ_SUSPEND':
            case 'RC':
            case 'RT':
                return $validated['company'];
            case 'BK':
            case 'BT':
            case 'BTRC':
            case 'BTRP':
            case 'PB':
                return $validated['companyIm'];
            default:
                throw new \Exception('Invalid exception code');
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

    /* 
     * Check methods for different exception codes
     */
    private function checkSj($connectionName, $data)
    {
        $companyCode = strtoupper($data['company']);
        $nomorPs = strtoupper($data['nomorPs']);
        $exceptionCode = $data['exceptionCode'];

        $results = DB::connection($connectionName)->select(
            "EXEC customerorder.dbo.xRere_BukaSJ_check 
            @companycop = ?, 
            @exceptionlist = ?, 
            @exceptioncode = ?, 
            @companyim = '', 
            @companywhin = '', 
            @custcodelist = '', 
            @overwrite = 0, 
            @islive = 0",
            [$companyCode, $nomorPs, $exceptionCode]
        );

        return $results;
    }

    private function checkSuspend($connectionName, $data)
    {
        $companyCode = strtoupper($data['company']);
        $customerCode = strtoupper($data['customerCode']);
        $prodcat = $data['prodcat'];

        $results = DB::connection($connectionName)->select(
            "EXEC customerorder.dbo.xRere_SUSPEND_check 
            @companycode = ?, 
            @custcodelist = ?, 
            @prodcatlist = ?, 
            @islive = 0",
            [$companyCode, $customerCode, $prodcat]
        );

        return $results;
    }

    private function checkSjSuspend($connectionName, $data)
    {
        $companyCode = strtoupper($data['company']);
        $nomorPs = strtoupper($data['nomorPs']);
        $customerCode = strtoupper($data['customerCode']);
        $prodcat = $data['prodcat'];

        // Execute the first stored procedure
        $results1 = DB::connection($connectionName)->select(
            "EXEC customerorder.dbo.xRere_BukaSJ_check 
            @companycop = ?, 
            @exceptionlist = ?, 
            @exceptioncode = 'SJ', 
            @companyim = '', 
            @companywhin = '', 
            @custcodelist = '', 
            @overwrite = 0, 
            @islive = 0",
            [$companyCode, $nomorPs]
        );

        // Execute the second stored procedure
        $results2 = DB::connection($connectionName)->select(
            "EXEC customerorder.dbo.xRere_SUSPEND_check 
            @companycode = ?, 
            @custcodelist = ?, 
            @prodcatlist = ?, 
            @islive = 0",
            [$companyCode, $customerCode, $prodcat]
        );

        return [$results1, $results2];
    }

    private function checkRc($connectionName, $data)
    {
        $companyCode = strtoupper($data['company']);
        $customerCode = strtoupper($data['customerCode']);
        $exceptionCode = $data['exceptionCode'];

        $results = DB::connection($connectionName)->select(
            "EXEC customerorder.dbo.xRere_BukaSJ_check 
            @companycop = ?, 
            @exceptionlist = '', 
            @custcodelist = ?, 
            @exceptioncode = ?, 
            @companyim = '', 
            @companywhin='',
            @overwrite=0,
            @islive=0",
            [$companyCode, $customerCode, $exceptionCode]
        );

        return $results;
    }

    private function checkRt($connectionName, $data)
    {
    $companyCode = strtoupper($data['company']);
    $nomorRc = strtoupper($data['nomorRc']);
    $exceptionCode = $data['exceptionCode'];

    $results = DB::connection($connectionName)->select(
        "EXEC customerorder.dbo.xRere_BukaSJ_check 
        @companycop = ?, 
        @exceptionlist = ?, 
        @exceptioncode = ?, 
        @companyim = '', 
        @companywhin = '', 
        @custcodelist = '', 
        @overwrite = 0, 
        @islive = 0",
        [$companyCode, $nomorRc, $exceptionCode]
     );

        return $results;
    }

private function checkBk($connectionName, $data)
{
    $companyIm = strtoupper($data['companyIm']);
    $nomorSj = strtoupper($data['nomorSj']);

    $results = DB::connection($connectionName)->select(
        "EXEC customerorder.dbo.xRere_BukaSJ_check 
        @companycop = '', 
        @exceptionlist = ?, 
        @exceptioncode = 'BK', 
        @companyim = ?, 
        @companywhin = '', 
        @custcodelist = '', 
        @overwrite = 0, 
        @islive = 0",
        [$nomorSj,$companyIm]
    );

    return $results;
}

private function checkBt($connectionName, $data)
{
    $companyIm = strtoupper($data['companyIm']);
    $nomorPb = strtoupper($data['nomorPb']);

    $results = DB::connection($connectionName)->select(
        "EXEC customerorder.dbo.xRere_BukaSJ_check 
        @companycop = '', 
        @exceptionlist = ?, 
        @exceptioncode = 'BT', 
        @companyim = ?, 
        @companywhin = '', 
        @custcodelist = '', 
        @overwrite = 0, 
        @islive = 0",
        [$nomorPb,$companyIm]
    );

    return $results;
}

private function checkPb($connectionName, $data)
{
    $companyIm = strtoupper($data['companyIm']);
    $companyWhin = strtoupper($data['companyWhin']);
    $nomorSj = strtoupper($data['nomorSj']);

    $results = DB::connection($connectionName)->select(
        "EXEC customerorder.dbo.xRere_BukaSJ_check 
        @companycop = '', 
        @exceptionlist = ?, 
        @exceptioncode = 'PB', 
        @companyim = ?, 
        @companywhin = ?, 
        @custcodelist = '', 
        @overwrite = 0, 
        @islive = 0",
        [$nomorSj, $companyIm, $companyWhin]
    );

    return $results;
}

private function checkBtrc($connectionName, $data)
{
    $companyIm = strtoupper($data['companyIm']);
    $nomorRc = strtoupper($data['nomorRc']);

    $results = DB::connection($connectionName)->select(
        "EXEC customerorder.dbo.xRere_BukaSJ_check 
        @companycop = '', 
        @exceptionlist = ?, 
        @exceptioncode = 'BTRC', 
        @companyim = ?, 
        @companywhin = '', 
        @custcodelist = '', 
        @overwrite = 0, 
        @islive = 0",
        [$nomorRc, $companyIm]
    );

    return $results;
}

private function checkBtrp($connectionName, $data)
{
    $companyIm = strtoupper($data['companyIm']);
    $nomorRc = strtoupper($data['nomorRc']);

    $results = DB::connection($connectionName)->select(
        "EXEC customerorder.dbo.xRere_BukaSJ_check 
        @companycop = '', 
        @exceptionlist = ?, 
        @exceptioncode = 'BTRP', 
        @companyim = ?, 
        @companywhin = '', 
        @custcodelist = '', 
        @overwrite = 0, 
        @islive = 0",
        [$nomorRc, $companyIm]
    );

    return $results;
}

/*
 * Run methods for different exception codes
 */
private function runSj($connectionName, $data)
{
    $companyCode = strtoupper($data['company']);
    $nomorPs = strtoupper($data['nomorPs']);
    $exceptionCode = $data['exceptionCode'];

    // Jalankan prosedur SQL
    DB::connection($connectionName)->statement(
        "EXEC customerorder.dbo.xRere_BukaSJ_check 
        @companycop = ?, 
        @exceptionlist = ?, 
        @exceptioncode = ?, 
        @companyim = '', 
        @companywhin = '', 
        @custcodelist = '', 
        @overwrite = 1, 
        @islive = 1",
        [$companyCode, $nomorPs, $exceptionCode]
    );

    // Response JSON tanpa hasil, hanya sebagai indikasi sukses
    return response()->noContent();
}

private function runSuspend($connectionName, $data)
{
    $companyCode = strtoupper($data['company']);
    $customerCode = strtoupper($data['customerCode']);
    $prodcat = $data['prodcat'];

    DB::connection($connectionName)->select(
        "EXEC customerorder.dbo.xRere_SUSPEND_check 
        @companycode = ?, 
        @custcodelist = ?, 
        @prodcatlist = ?, 
        @islive = 1",
        [$companyCode, $customerCode, $prodcat]
    );

    return response()->noContent();
}

private function runSjSuspend($connectionName, $data)
{
    $companyCode = strtoupper($data['company']);
    $nomorPs = strtoupper($data['nomorPs']);
    $customerCode = strtoupper($data['customerCode']);
    $prodcat = $data['prodcat'];

    // Execute the first stored procedure
    DB::connection($connectionName)->statement(
        "EXEC customerorder.dbo.xRere_BukaSJ_check 
        @companycop = ?, 
        @exceptionlist = ?, 
        @exceptioncode = 'SJ', 
        @companyim = '', 
        @companywhin = '', 
        @custcodelist = '', 
        @overwrite = 1, 
        @islive = 1",
        [$companyCode, $nomorPs]
    );

    // Execute the second stored procedure
    DB::connection($connectionName)->select(
        "EXEC customerorder.dbo.xRere_SUSPEND_check 
        @companycode = ?, 
        @custcodelist = ?, 
        @prodcatlist = ?, 
        @islive = 1",
        [$companyCode, $customerCode, $prodcat]
    );

    return response()->noContent();
}

private function runRc($connectionName, $data)
{
    $companyCode = strtoupper($data['company']);
    $customerCode = strtoupper($data['customerCode']);
    $exceptionCode = $data['exceptionCode'];

    DB::connection($connectionName)->statement(
        "EXEC customerorder.dbo.xRere_BukaSJ_check 
        @companycop = ?, 
        @exceptionlist = '', 
        @custcodelist = ?, 
        @exceptioncode = ?, 
        @companyim = '', 
        @companywhin='',
        @overwrite=1,
        @islive=1",
        [$companyCode, $customerCode, $exceptionCode]
    );
}

private function runRt($connectionName, $data)
{
    $companyCode = strtoupper($data['company']);
    $nomorRc = strtoupper($data['nomorRc']);
    $exceptionCode = $data['exceptionCode'];

    DB::connection($connectionName)->statement(
        "EXEC customerorder.dbo.xRere_BukaSJ_check 
        @companycop = ?, 
        @exceptionlist = ?, 
        @exceptioncode = ?, 
        @companyim = '', 
        @companywhin = '', 
        @custcodelist = '', 
        @overwrite = 1, 
        @islive = 1",
        [$companyCode, $nomorRc, $exceptionCode]
     );

     return response()->noContent();
    }

private function runBk($connectionName, $data)
{
    $companyIm = strtoupper($data['companyIm']);
    $nomorSj = strtoupper($data['nomorSj']);

    DB::connection($connectionName)->statement(
        "EXEC customerorder.dbo.xRere_BukaSJ_check 
        @companycop = '', 
        @exceptionlist = ?, 
        @exceptioncode = 'BK', 
        @companyim = ?, 
        @companywhin = '', 
        @custcodelist = '', 
        @overwrite = 1, 
        @islive = 1",
        [$nomorSj, $companyIm]
    );

    return response()->noContent();
}

private function runBt($connectionName, $data)
{
    $companyIm = strtoupper($data['companyIm']);
    $nomorPb = strtoupper($data['nomorPb']);

    DB::connection($connectionName)->statement(
        "EXEC customerorder.dbo.xRere_BukaSJ_check 
        @companycop = '', 
        @exceptionlist = ?, 
        @exceptioncode = 'BT', 
        @companyim = ?, 
        @companywhin = '', 
        @custcodelist = '', 
        @overwrite = 1, 
        @islive = 1",
        [$nomorPb, $companyIm]
    );

    return response()->noContent();
}

private function runPb($connectionName, $data)
{
    $companyIm = strtoupper($data['companyIm']);
    $companyWhin = strtoupper($data['companyWhin']);
    $nomorSj = strtoupper($data['nomorSj']);

    DB::connection($connectionName)->statement(
        "EXEC customerorder.dbo.xRere_BukaSJ_check 
        @companycop = '', 
        @exceptionlist = ?, 
        @exceptioncode = 'PB', 
        @companyim = ?, 
        @companywhin = ?, 
        @custcodelist = '', 
        @overwrite = 1, 
        @islive = 1",
        [$nomorSj, $companyIm, $companyWhin]
    );

    return response()->noContent();
}

private function runBtrc($connectionName, $data)
{
    $companyIm = strtoupper($data['companyIm']);
    $nomorRc = strtoupper($data['nomorRc']);

    DB::connection($connectionName)->statement(
        "EXEC customerorder.dbo.xRere_BukaSJ_check 
        @companycop = '', 
        @exceptionlist = ?, 
        @exceptioncode = 'BTRC', 
        @companyim = ?, 
        @companywhin = '', 
        @custcodelist = '', 
        @overwrite = 1, 
        @islive = 1",
        [$nomorRc, $companyIm]
    );

    return response()->noContent();
}

private function runBtrp($connectionName, $data)
{
    $companyIm = strtoupper($data['companyIm']);
    $nomorRc = strtoupper($data['nomorRc']);

    DB::connection($connectionName)->statement(
        "EXEC customerorder.dbo.xRere_BukaSJ_check 
        @companycop = '', 
        @exceptionlist = ?, 
        @exceptioncode = 'BTRP', 
        @companyim = ?, 
        @companywhin = '', 
        @custcodelist = '', 
        @overwrite = 1, 
        @islive = 1",
        [$nomorRc, $companyIm]
    );

    return response()->noContent();
}

}