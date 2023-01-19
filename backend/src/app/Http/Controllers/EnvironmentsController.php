<?php

namespace App\Http\Controllers;

use App\Exceptions\InvalidEnvironmentIdException;
use App\Http\Responses\FormattedApiResponse;
use App\Models\Likes;
use App\Repositories\EnvironmentsRepository;
use Database\Helpers\ForeignKeyCol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        if ($request->search !== null) {
            return $this->search($request);
        }

        $data = $this->repository->index($request);

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
    private function search(Request $request)
    {
        $data = $this->repository->search($request);

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
        $data = $this->repository->show($request);

        throw_if(!$data, new InvalidEnvironmentIdException());

        return new FormattedApiResponse(
            success: true,
            data: $data
        );
    }

    /**
     * Like Environment by numeric id.
     *
     * @return \Illuminate\Http\Response
     */
    public function like(Request $request)
    {
        $environmentId = $request->id;

        $like = Likes::make([
          ForeignKeyCol::environments => $environmentId,
          ForeignKeyCol::users => Auth::user()->id
        ]);

        $like->saveOrFail();

        return response()->noContent();
    }

    /**
     * Unlike Environment by numeric id.
     *
     * @return \Illuminate\Http\Response
     */
    public function unlike(Request $request)
    {
        $environmentId = $request->id;

        Auth::user()->likes()->detach($environmentId);

        return response()->noContent();
    }
}
