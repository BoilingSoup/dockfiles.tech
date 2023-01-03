<?php

use App\Http\Controllers\BookmarksController;
use Illuminate\Support\Facades\Route;

Route::apiResource('bookmarks', BookmarksController::class)
->except(['show', 'update'])
->middleware('auth:sanctum');

Route::get('bookmarks/search/{slug}', [BookmarksController::class, 'search'])
->middleware('auth')
->name('bookmarks.search');
