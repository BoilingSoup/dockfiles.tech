<?php

use App\Http\Controllers\EnvironmentsController;

Route::get("environments", [EnvironmentsController::class, "index"])->name("environments.index");
