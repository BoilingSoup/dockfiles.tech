<?php

use App\Http\Controllers\ConfigurationsController;

Route::get('environments/{name}', [ConfigurationsController::class, 'index'])->name('configurations.index');

Route::get('environments/{name}/{id}', [ConfigurationsController::class, 'show'])->name('configurations.show');

Route::get('environments/search/{phrase}', [ConfigurationsController::class, 'search'])->name('configurations.search');
