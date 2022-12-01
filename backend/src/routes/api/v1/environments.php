<?php

use App\Http\Controllers\EnvironmentsController;

Route::get('environments', [EnvironmentsController::class, 'index'])->name('environments.index');

Route::get('environments/search/{slug}', [EnvironmentsController::class, 'search'])->name('environments.search');
