<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookmarksRequest;
use App\Http\Responses\FormattedApiResponse;
use App\Models\Bookmarks;
use App\Models\User;
use App\Repositories\BookmarksRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookmarksController extends Controller
{
    protected BookmarksRepository $repository;

    public function __construct(BookmarksRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index(Request $request)
    {
        // $data = $this->repository->index($request);
        $data = Auth::user()->bookmarks()->cursorPaginate();

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
