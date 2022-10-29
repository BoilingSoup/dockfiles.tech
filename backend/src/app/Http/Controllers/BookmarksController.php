<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookmarksRequest;
use App\Http\Requests\UpdateBookmarksRequest;
use App\Models\Bookmarks;

class BookmarksController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreBookmarksRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBookmarksRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Bookmarks  $bookmarks
     * @return \Illuminate\Http\Response
     */
    public function show(Bookmarks $bookmarks)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateBookmarksRequest  $request
     * @param  \App\Models\Bookmarks  $bookmarks
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBookmarksRequest $request, Bookmarks $bookmarks)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Bookmarks  $bookmarks
     * @return \Illuminate\Http\Response
     */
    public function destroy(Bookmarks $bookmarks)
    {
        //
    }
}
