<?php

namespace App\Http\Controllers;

use App\Repositories\CategoriesRepository;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    protected CategoriesRepository $repository;

    public function __construct(CategoriesRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Get a list of all category names and ids.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->repository->index();
    }

    /**
     * Get a list of environments by category id.
     *
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $isValidId = $this->repository->checkValidCategoryId($request->id);
        abort_if(!$isValidId, 404);

        return $this->repository->show($request->id);
    }
}
