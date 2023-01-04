<?php

use App\Http\Controllers\BookmarksController;
use Illuminate\Support\Facades\Route;

Route::middleware("auth:sanctum")->name("bookmarks.")->group(function () {
    Route::get("bookmarks", [BookmarksController::class, "index"])->name("index");

    Route::post("bookmarks", [BookmarksController::class, "store"])->name("store");

    Route::delete("bookmarks", [BookmarksController::class, "destroy"])->name("destroy");

    Route::get('bookmarks/search/{slug}', [BookmarksController::class, 'search'])->name("search");
});
