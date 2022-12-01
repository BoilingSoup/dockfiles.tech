<?php

namespace App\Http\Controllers;

use App\Repositories\CategoriesRepository;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    public function index(CategoriesRepository $repository)
    {
        return $repository->index();
    }

    public function show(Request $request)
    {
        //
    }
}
