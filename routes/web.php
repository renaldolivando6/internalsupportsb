<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\OpenRdController;
use App\Http\Controllers\RefreshNpwpController;
use App\Http\Controllers\BukaSJController;

//HomePage
Route::get('/', function () {
    return Inertia::render('homepage');
})->name('home');

Route::get('/company-profile', function () {
    return Inertia::render('company-profile');
})->name('company_profile.page');

Route::get('/it-division-profile', function () {
    return Inertia::render('it-division-profile');
})->name('it_division_profile.page');

Route::get('/products', function () {
    return Inertia::render('products');
})->name('products.page');
//END HomePage


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::prefix('job/tax')->group(function () {
    Route::get('openrd', [OpenRdController::class, 'index'])->name('job.tax.open_rd');
    Route::post('openrd', [OpenRdController::class, 'store'])->name('job.tax.open_rd.store');
    /*Route::post('openrd', [OpenRdController::class, 'exec'])->name('job.tax.open_rd.exec');*/
});

Route::prefix('job/tax')->group(function () {
    Route::get('refresh-npwp', [RefreshNpwpController::class, 'index'])->name('job.tax.refresh_npwp.page');
    Route::post('refresh-npwp', [RefreshNpwpController::class, 'refresh'])->name('job.tax.refresh_npwp');
});

Route::get('/buka-sj', function () {
    return Inertia::render('job/ar/buka-sj');
})->name('buka-sj.page');

Route::get('/buka-lp', function () {
    return Inertia::render('job/ar/buka-lp');
})->name('buka-lp.page');

Route::get('/rps-bulanan', function () {
    return Inertia::render('job/ar/rps-bulanan');
})->name('rps-bulanan.page');

Route::get('/cop', function () {
    return Inertia::render('job/it_support/cop-page');
})->name('cop.page');

Route::get('/im', function () {
    return Inertia::render('job/it_support/im-page');
})->name('im.page');

Route::get('/database', function () {
    return Inertia::render('job/it_support/database-page');
})->name('database.page');

Route::get('/administrator', function () {
    return Inertia::render('job/administrator/administrator-page');
})->name('administrator.page');

Route::get('/administrator-user-sb', function () {
    return Inertia::render('job/administrator/administrator-user-sb');
})->name('administrator-user-sb.page');



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
