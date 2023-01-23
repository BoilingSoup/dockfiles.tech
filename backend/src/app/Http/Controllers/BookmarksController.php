<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeleteBookmarksRequest;
use App\Http\Requests\StoreBookmarksRequest;
use App\Http\Responses\FormattedApiResponse;
use App\Repositories\BookmarksRepository;
use Database\Helpers\ForeignKeyCol;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class BookmarksController extends Controller
{
    protected BookmarksRepository $repository;

    public function __construct(BookmarksRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Get a cursor paginated JSON response of the authenticated User's Bookmarks.
     * (Optional) filter with query params:
     *     - category_id
     *     - search
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
     * Get a cursor paginated JSON response of Bookmarked Environments names and IDs filtered by search query param and (optionally) by Category.
     *
     * @return FormattedApiResponse
     */
    public function search(Request $request)
    {
        $data = $this->repository->search($request);

        return new FormattedApiResponse(
            success: true,
            data: collect($data)
        );
    }

    /**
     * Add an Environment to the User's Bookmarks.
     *
     * @return FormattedApiResponse
     */
    public function store(StoreBookmarksRequest $request)
    {
        $environmentId = (string) $request->validated()[ForeignKeyCol::environments];
        $this->validateEnvironmentId($environmentId);
        $userId = $request->user()->id;

        $bookmark = $this->repository->store($userId, $environmentId);

        return new FormattedApiResponse(
            success: true,
            data: $bookmark,
            status: 201
        );
    }

    /**
     * Delete a Bookmark.
     *
     * @return Response
     */
    public function destroy(DeleteBookmarksRequest $request)
    {
        $environmentId = (string) $request->validated()[ForeignKeyCol::environments];
        $this->validateEnvironmentId($environmentId);
        $userId = (string) $request->user()->id;

        $this->repository->destroy($userId, $environmentId);

        return response()->noContent();
    }

    /**
     * Confirm if the numeric (string) value is a valid Environment ID because PlanetScale DB does not allow foreign keys constraints for data integrity.
     */
    private function validateEnvironmentId(string $environmentId)
    {
        $isValid = $this->repository->validateEnvironmentId($environmentId);
        throw_if(! $isValid);
    }
}
