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
     * Get a cursor paginated JSON response of Environment names and IDs. Search query param is optional to search by description field.
     *
     * @return FormattedApiResponse
     */
    public function index(Request $request)
    {
        if ($request->search) {
            return $this->search($request->search);
        }

        $data = $this->repository->index($request->cursor);

        return new FormattedApiResponse(
            success: true,
            data: collect($data)
        );
    }

    /**
     * Get a cursor paginated JSON response of Environment names and IDs filtered by search query param.
     *
     * @return FormattedApiResponse
     */
    private function search(string $param)
    {
        $data = $this->repository->search($param);

        return new FormattedApiResponse(
            success: true,
            data: [$data]
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
}
