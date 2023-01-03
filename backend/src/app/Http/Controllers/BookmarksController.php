<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookmarksRequest;
use App\Http\Responses\FormattedApiResponse;
use App\Models\Bookmarks;
use App\Repositories\BookmarksRepository;
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

    public function store(StoreBookmarksRequest $request)
    {
        //
    }

    public function destroy(Bookmarks $bookmarks)
    {
        //
    }

    public function search()
    {
      //
    }
}
