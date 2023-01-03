<?php

namespace App\Repositories;

use App\Helpers\Cache\CACHE_KEYS;
use App\Helpers\Cache\CACHE_TAGS;
use App\Models\Bookmarks;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class BookmarksRepository
{
    /**
     * Retrieve a CursorPaginator object of all the requesting User's Bookmarks.
     *
     * @return \Illuminate\Contracts\Pagination\CursorPaginator
     */
    public function index(Request $request)
    {
        return Cache::tags([CACHE_TAGS::BOOKMARKS, CACHE_TAGS::BOOKMARKS_INDEX])->rememberForever(
            CACHE_KEYS::BOOKMARKS_INDEX_CURSOR_($request->cursor),
            fn () => Bookmarks::select(
                "id",
                "name",
                "string_id",
                // likes ?
            )->withCount('comments')->orderBy("id")->cursorPaginate()
        );
    }
}
