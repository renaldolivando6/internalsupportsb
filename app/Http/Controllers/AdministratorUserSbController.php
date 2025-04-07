<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdministratorUserSbController extends Controller
{
    /**
     * Display a listing of administrators.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $administrators = DB::connection('sqlsrv')
            ->table('administrator_user_sb')
            ->select(
                'id',
                'nama',
                'company',
                'lokasi',
                'posisi',
                'rdweb',
                'website_rosebrand',
                'sfa',
                'mobile_sales',
                'application_login',
                'group_name',
                'created_at',
                'updated_at',
                'is_resigned',
                'delete_status'
            )
            ->orderBy('nama')
            ->get();

        return Inertia::render('job/administrator/administrator-user-sb', [
            'administrators' => $administrators
        ]);
    }

    /**
     * Show the form for creating a new administrator.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('job/administrator/administrator-user-sb-add');
    }

    /**
     * Store a newly created administrator in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'company' => 'required|string|max:10',
            'nama' => 'required|string|max:100',
            'lokasi' => 'nullable|string|max:50',
            'posisi' => 'nullable|string|max:50',
            'rdweb' => 'nullable|string|max:100',
            'website_rosebrand' => 'nullable|string|max:100',
            'sfa' => 'nullable|string|max:50',
            'mobile_sales' => 'nullable|string|max:50',
            'application_login' => 'nullable|string|max:50',
            'group_name' => 'nullable|string|max:50',
        ]);

        // Add timestamps and user login information
        $validated['created_at'] = now();
        $validated['updated_at'] = now();
        $validated['is_resigned'] = 0; // Default to not resigned
        $validated['id_entry'] = Auth::user()->username; // Mengambil username pengguna yang login

        DB::connection('sqlsrv')
            ->table('administrator_user_sb')
            ->insert($validated);

        return redirect()->route('job.administrator-user-sb.index')
            ->with('message', 'Administrator created successfully');
    }

    /**
     * Show the form for editing the specified administrator.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function edit($id)
    {
        $administrator = DB::connection('sqlsrv')
            ->table('administrator_user_sb')
            ->where('id', $id)
            ->first();

        return Inertia::render('job/administrator/administrator-user-sb-edit', [
            'administrator' => $administrator
        ]);
    }

    /**
     * Update the specified administrator in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'company' => 'required|string|max:10',
            'nama' => 'required|string|max:100',
            'lokasi' => 'nullable|string|max:50',
            'posisi' => 'nullable|string|max:50',
            'rdweb' => 'nullable|string|max:100',
            'website_rosebrand' => 'nullable|string|max:100',
            'sfa' => 'nullable|string|max:50',
            'mobile_sales' => 'nullable|string|max:50',
            'application_login' => 'nullable|string|max:50',
            'group_id' => 'nullable|integer',
            'group_name' => 'nullable|string|max:50',
        ]);

        $validated['updated_at'] = now();

        DB::connection('sqlsrv')
            ->table('administrator_user_sb')
            ->where('id', $id)
            ->update($validated);

        return redirect()->route('job.administrator-user-sb.edit', $id)
            ->with('message', 'Administrator updated successfully');
    }

    /**
     * Remove the specified administrator from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        DB::connection('sqlsrv')
            ->table('administrator_user_sb')
            ->where('id', $id)
            ->delete();

        return redirect()->route('job.administrator-user-sb.index')
            ->with('message', 'Administrator deleted successfully');
    }

    /**
     * Mark an administrator as resigned.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function resign($id)
    {
        DB::connection('sqlsrv')
            ->table('administrator_user_sb')
            ->where('id', $id)
            ->update([
                'is_resigned' => 1,
                'resigned_at' => now()
            ]);

        return redirect()->route('job.administrator-user-sb.index')
            ->with('message', 'Administrator marked as resigned');
    }

    /**
     * Update the delete status of an administrator.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateDeleteStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'delete_status' => 'required|in:pending,done'
        ]);

        DB::connection('sqlsrv')
            ->table('administrator_user_sb')
            ->where('id', $id)
            ->update([
                'delete_status' => $validated['delete_status']
            ]);

        return redirect()->route('job.administrator-user-sb.index')
            ->with('message', 'Delete status updated successfully');
    }
}