<?php

namespace App\Repositories;

use App\Helpers\Cache\CACHE_KEYS;
use App\Helpers\Cache\CACHE_TAGS;
use App\Http\Requests\DeleteBookmarksRequest;
use App\Models\Bookmarks;
use App\Models\Environments;
use App\Repositories\Traits\HandleSearchWords;
use Database\Helpers\ForeignKeyCol;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class BookmarksRepository
{
    use HandleSearchWords;

    /**
     * Retrieve a CursorPaginator object of all the requesting User's Bookmarks.
     *
     * @return \Illuminate\Contracts\Pagination\CursorPaginator
     */
    public function index(Request $request)
    {
        $userId = (string) Auth::user()->id;

        return Cache::tags([CACHE_TAGS::USER_BOOKMARKS_($userId), CACHE_TAGS::USER_BOOKMARKS_INDEX])->rememberForever(
            CACHE_KEYS::USER_BOOKMARKS_INDEX_CURSOR_($userId, $request->cursor),
            fn () => Environments::select('id', 'name', 'string_id') // likes ?
              ->withCount('comments')
              ->whereIn('id', $this->allBookmarkedIds($userId))
              ->cursorPaginate()
        );
    }

    /**
     * Retrieve a Collection of all IDs of the Environments Bookmarked by the User
     *
     * @return Collection
     */
    public function allBookmarkedIds(string $userId)
    {
        $userId = $userId ?? (string) Auth::user()->id;

        return Cache::tags([CACHE_TAGS::USER_BOOKMARKS_($userId), CACHE_TAGS::USER_ALL_BOOKMARKS_IDS])->rememberForever(
            CACHE_KEYS::USER_ALL_BOOKMARKS_IDS_($userId),
            fn () => Auth::user()->bookmarks()->allRelatedIds()
        );
    }

    /**
     * Retrieve a CursorPaginator object of Bookmarked Environments filtered by search param.
     *
     * @return \Illuminate\Contracts\Pagination\CursorPaginator
     */
    public function search(Request $request)
    {
        $searchWords = $this->getKeyWords($request->search);
        $cacheId = $this->generateSearchWordsCacheId($searchWords);
        $userId = (string) Auth::user()->id;

        return Cache::tags([CACHE_TAGS::USER_BOOKMARKS_($userId), CACHE_TAGS::USER_BOOKMARKS_SEARCH])->rememberForever(
            CACHE_KEYS::USER_BOOKMARKS_SEARCH_($userId, $cacheId, $request->cursor),
            fn () => Environments::select('id', 'name', 'string_id') // likes ?
              ->withCount('comments')
              ->whereIn('id', $this->allBookmarkedIds($userId))
              ->where(function ($query) use ($searchWords) {
                  foreach ($searchWords as $keyword) {
                      $query->orWhere('description', 'like', "%$keyword%");
                  }
              })->orderBy('id')->cursorPaginate()
        );
    }

    /**
     * Delete a bookmark from the database and flush the User's Bookmarks cache.
     */
    public function destroy(string $userId, string $environmentId)
    {
        $deleted = Bookmarks::where(ForeignKeyCol::environments, $environmentId)
        ->where(ForeignKeyCol::users, $userId)
        ->delete();

        if ($deleted) {
            Cache::tags(CACHE_TAGS::USER_BOOKMARKS_($userId))->flush();
        }
    }

    /**
       * Use the cache to quickly confirm if a given numeric (string) value is a valid Environment ID.
       *
       * @return bool
       */
    public function validateEnvironmentId(string $environmentId)
    {
        $idsLookup = Cache::tags([CACHE_TAGS::ENVIRONMENTS, CACHE_TAGS::ENVIRONMENTS_IDS])->rememberForever(
            CACHE_KEYS::ENVIRONMENTS_VALID_IDS,
            function () {
                $idsCollection = Environments::all()->pluck('id');
                $lookup = [];

                $idsCollection->each(function ($id) use (&$lookup) {
                    $lookup[(string) $id] = 1;
                });

                return $lookup;
            }
        );

        return isset($idsLookup[$environmentId]);
    }
}
