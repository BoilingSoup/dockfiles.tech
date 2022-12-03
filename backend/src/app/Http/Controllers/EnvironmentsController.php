<?php

namespace App\Http\Controllers;

use App\Http\Responses\FormattedApiResponse;
use App\Repositories\EnvironmentsRepository;
use Illuminate\Http\Request;

class EnvironmentsController extends Controller
{
    protected EnvironmentsRepository $repository;

    public function __construct(EnvironmentsRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Get a cursor paginated list of all Environments names and IDs.
     *
     * @return FormattedApiResponse
     */
    public function index(Request $request)
    {
        $cursor = $request->cursor;
        $data = $this->repository->index($cursor);

        return new FormattedApiResponse(
            success: true,
            data: collect($data)
        );
    }

    public function search()
    {
        //
    }
}
