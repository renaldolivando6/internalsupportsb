<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RefreshNpwpModel;
use Inertia\Inertia;

class RefreshNpwpController extends Controller
{
    // Menampilkan halaman TSX
    public function index()
    {
        return Inertia::render('job/tax/RefreshNpwp');
    }

    // Menjalankan stored procedure
    public function refresh(Request $request)
    {
        $result = RefreshNpwpModel::executeRefreshNpwp();
        return response()->json($result);
    }
}
