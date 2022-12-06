<?php

namespace App\Http\Controllers;

use App\Exceptions\InvalidEnvironmentIdException;
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
     * Get a cursor paginated JSON response of all Environments names and IDs.
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

    /**
     * Get Environment data by string_id.
     *
     * @return FormattedApiResponse
     */
    public function show(Request $request)
    {
        $data = $this->repository->show($request->string_id);

        throw_if(!$data, new InvalidEnvironmentIdException());

        return new FormattedApiResponse(
            success: true,
            data: $data
        );
    }

    public function search()
    {
        //
    }
}
