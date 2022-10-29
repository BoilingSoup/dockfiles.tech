<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEnvironmentsRequest;
use App\Http\Requests\UpdateEnvironmentsRequest;
use App\Models\Environments;

class EnvironmentsController extends Controller
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
     * @param  \App\Http\Requests\StoreEnvironmentsRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreEnvironmentsRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Environments  $environments
     * @return \Illuminate\Http\Response
     */
    public function show(Environments $environments)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateEnvironmentsRequest  $request
     * @param  \App\Models\Environments  $environments
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateEnvironmentsRequest $request, Environments $environments)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Environments  $environments
     * @return \Illuminate\Http\Response
     */
    public function destroy(Environments $environments)
    {
        //
    }
}
