<?php

namespace App\Http\Controllers;

use App\Http\Responses\FormattedApiResponse;
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
     * @return FormattedApiResponse
     */
    public function index()
    {
        $data = $this->repository->index();

        return new FormattedApiResponse(
            success: true,
            data: $data
        );
    }

    /**
     * Get environments by category id.
     *
     * @return FormattedApiResponse
     */
    public function show(Request $request)
    {
        $isValidId = $this->repository->checkValidCategoryId($request->id);
        abort_if(!$isValidId, 404);

        $data = $this->repository->show($request->id);

        return new FormattedApiResponse(
            success: true,
            data: $data
        );
    }
}
