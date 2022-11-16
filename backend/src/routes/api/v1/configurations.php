<?php

use App\Http\Controllers\ConfigurationsController;

Route::get("environments/{name}", [ConfigurationsController::class, "index"]);

Route::get("environments/{name}/{id}", [ConfigurationsController::class, "show"]);

Route::get("search/{phrase}", [ConfigurationsController::class, "search"]);
