<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreConfigurationsRequest;
use App\Http\Requests\UpdateConfigurationsRequest;
use App\Models\Configurations;

class ConfigurationsController extends Controller
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
     * @param  \App\Http\Requests\StoreConfigurationsRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreConfigurationsRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Configurations  $configurations
     * @return \Illuminate\Http\Response
     */
    public function show(Configurations $configurations)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateConfigurationsRequest  $request
     * @param  \App\Models\Configurations  $configurations
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateConfigurationsRequest $request, Configurations $configurations)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Configurations  $configurations
     * @return \Illuminate\Http\Response
     */
    public function destroy(Configurations $configurations)
    {
        //
    }
}
