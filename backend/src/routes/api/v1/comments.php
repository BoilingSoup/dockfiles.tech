<?php

use App\Http\Controllers\CommentsController;

Route::get("configuration/{configuration}/comments/", [CommentsController::class, "index"]);

Route::post("configurations/{configuration}/comments/{comment}", [CommentsController::class, "store"]);

Route::delete("configurations/{configuration}/comments/{comment}", [CommentsController::class, "destroy"]);
