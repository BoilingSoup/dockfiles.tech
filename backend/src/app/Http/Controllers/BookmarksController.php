<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeleteBookmarksRequest;
use App\Http\Requests\StoreBookmarksRequest;
use App\Http\Responses\FormattedApiResponse;
use App\Models\Bookmarks;
use App\Repositories\BookmarksRepository;
use Database\Helpers\ForeignKeyCol;
use Illuminate\Http\Request;

class BookmarksController extends Controller
{
    protected BookmarksRepository $repository;

    public function __construct(BookmarksRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Get a cursor paginated JSON response of the authenticated User's Bookmarks.
     *
     * @return FormattedApiResponse
     */
    public function index(Request $request)
    {
        $data = $this->repository->index($request);

        return new FormattedApiResponse(
            success: true,
            data: collect($data)
        );
    }

    /**
     * Add an Environment to the User's Bookmarks.
     *
     * @return
     */
    public function store(StoreBookmarksRequest $request)
    {
        $environmentId = $request->validated()[ForeignKeyCol::environments];
        $this->validateEnvironmentId($environmentId);

        $userId = $request->user()->id;

        $bookmark = Bookmarks::create([
          ForeignKeyCol::environments => $environmentId,
          ForeignKeyCol::users => $userId
        ]);

        return new FormattedApiResponse(
            success: true,
            data: $bookmark,
            status: 201
        );
    }

    /**
     *
     */
    public function destroy(DeleteBookmarksRequest $request)
    {
        $environmentId = $request->validated()[ForeignKeyCol::environments];
        $this->validateEnvironmentId($environmentId);

        $userId = $request->user()->id;

        Bookmarks::where(ForeignKeyCol::environments, $environmentId)
        ->where(ForeignKeyCol::users, $userId)
        ->delete();

        return response()->noContent();
    }

    /**
     * Confirm if the int is a valid Environment ID because PlanetScale DB does not allow foreign keys for data integrity.
     */
    private function validateEnvironmentId(int $environmentId)
    {
        $isValid = $this->repository->validateEnvironmentId($environmentId);
        throw_if(!$isValid);
    }

    public function search()
    {
      //
    }
}
