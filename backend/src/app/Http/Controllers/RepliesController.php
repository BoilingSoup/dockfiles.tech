<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRepliesRequest;
use App\Http\Requests\UpdateRepliesRequest;
use App\Models\Replies;

class RepliesController extends Controller
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
     * @param  \App\Http\Requests\StoreRepliesRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRepliesRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Replies  $replies
     * @return \Illuminate\Http\Response
     */
    public function show(Replies $replies)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateRepliesRequest  $request
     * @param  \App\Models\Replies  $replies
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRepliesRequest $request, Replies $replies)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Replies  $replies
     * @return \Illuminate\Http\Response
     */
    public function destroy(Replies $replies)
    {
        //
    }
}
