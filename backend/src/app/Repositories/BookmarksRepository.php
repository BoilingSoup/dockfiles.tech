<?php

namespace App\Repositories;

use App\Helpers\Cache\CACHE_KEYS;
use App\Helpers\Cache\CACHE_TAGS;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $userId = Auth::user()->id;
        return Cache::tags([CACHE_TAGS::USER_BOOKMARKS_($userId), CACHE_TAGS::USER_BOOKMARKS_INDEX])->rememberForever(
            CACHE_KEYS::USER_BOOKMARKS_INDEX_CURSOR_($userId, $request->cursor),
            fn () => Auth::user()->bookmarks()->orderByPivot(Model::CREATED_AT)->cursorPaginate()
        );
    }
}
