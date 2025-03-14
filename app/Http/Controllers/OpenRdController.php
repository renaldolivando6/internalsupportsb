<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\OpenRdHistory;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use App\Models\OpenRdModel;
use Exception;


class OpenRdController extends Controller
{
    public function index()
    {
        $data = OpenRdHistory::getTop20();

        return Inertia::render('job/tax/OpenRd', [
            'data' => $data,
            'successMessage' => session('success'),
        ]);
    }

    public function store(Request $request)
    {
        //Log::info('Request Data:', $request->all()); // Log data request

        $validated = $request->validate([
            'company' => 'required|min:4|max:4',
            'rdNumber' => 'required|min:10|max:10', // regex sudah ditangani di .jsx
        ]);

        $validated['company'] = strtoupper($validated['company']);
        $validated['rdNumber'] = strtoupper($validated['rdNumber']);

        OpenRdHistory::create([
            'company' => $validated['company'],
            'tax_number' => $validated['rdNumber'],
            'username' => Auth::user()->username, // Mengambil nama user yang login
        ]);

        $openRdExecQuery = OpenRdModel::executeOpenRd($validated['company'], $validated['rdNumber']);
        $openRdExecResult = current((array) $openRdExecQuery);

        // Redirect ke halaman dengan pesan sukses
        return back()->with('success', 'Data berhasil ditambahkan!, '.$openRdExecResult.'');
    }

/*
    public function exec(Request $request)
    {
        $validated = $request->validate([
            'company' => 'required|min:4|max:4',
            'rdNumber' => 'required|min:10|max:10',
        ]);

        $validated['company'] = strtoupper($validated['company']);
        $validated['rdNumber'] = strtoupper($validated['rdNumber']);

        try {
            // Jalankan query melalui model
            $result = OpenRdModel::executeOpenRd($validated['company'], $validated['rdNumber']);

            if (!$result) {
                return response()->json(['message' => 'Data not found'], 404);
            }

            return response()->json($result);

        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
*/
}


