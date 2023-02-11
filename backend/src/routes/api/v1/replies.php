<?php

use App\Http\Controllers\RepliesController;
use Illuminate\Support\Facades\Route;

Route::get("/comments/{id}/replies", [RepliesController::class, "index"]);
