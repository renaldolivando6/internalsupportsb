<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BukaSJController;
use App\Http\Controllers\BukaLpController;
use App\Http\Controllers\RpsBulananController;
use App\Http\Controllers\AdministratorUserSbController;

Route::prefix('buka-sj')->middleware('api')->group(function () {
    Route::post('/check', [BukaSJController::class, 'check'])->name('api.buka-sj.check');
    Route::post('/run', [BukaSJController::class, 'run'])->name('api.buka-sj.run');
    Route::get('/session', [BukaSJController::class, 'getSessionData'])->name('api.buka-sj.session');
    Route::post('/session/update', [BukaSJController::class, 'updateSessionData'])->name('api.buka-sj.session.update');
});

Route::prefix('buka-lp')->middleware('api')->group(function () {
    Route::post('/check', [BukaLpController::class, 'check'])->name('api.buka-lp.check');
    Route::post('/run', [BukaLpController::class, 'run'])->name('api.buka-lp.run');
});

Route::prefix('rps-bulanan')->middleware('api')->group(function () {
    Route::post('/check', [RpsBulananController::class, 'check'])->name('api.rps-bulanan.check');
});
