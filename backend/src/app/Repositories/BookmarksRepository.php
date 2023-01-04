<?php

namespace App\Repositories;

use App\Helpers\Cache\CACHE_KEYS;
use App\Helpers\Cache\CACHE_TAGS;
use App\Models\Environments;
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
            fn () => Environments::select('id', 'name', 'string_id')
              ->withCount('comments')
              ->whereIn('id', Auth::user()->bookmarks()->allRelatedIds())
              ->cursorPaginate()
        );
    }

    /**
     * Use the cache to quickly confirm if a given integer is a valid Environment ID.
     *
     * @return bool
     */
    public function validateEnvironmentId(int $environmentId)
    {
        $idsLookup = Cache::tags([CACHE_TAGS::ENVIRONMENTS, CACHE_TAGS::ENVIRONMENTS_IDS])->rememberForever(
            CACHE_KEYS::ENVIRONMENTS_VALID_IDS,
            function () {
                $idsCollection = Environments::all()->pluck('id');
                $lookup = [];

                $idsCollection->each(function ($id) use (&$lookup) {
                    $lookup[$id] = 1;
                });

                return $lookup;
            }
        );

        return isset($idsLookup[$environmentId]);
    }
}
