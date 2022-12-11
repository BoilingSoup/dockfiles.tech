<?php

namespace App\Repositories;

use App\Helpers\Cache\CACHE_KEYS;
use App\Helpers\Cache\CACHE_TAGS;
use App\Models\Environments;
use App\Repositories\Traits\HandleSearchWords;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class EnvironmentsRepository
{
    use HandleSearchWords;

    /**
     * Retrieve a CursorPaginator object of all Environments. (Cached for 1 day.)
     *
     * @return \Illuminate\Contracts\Pagination\CursorPaginator
     */
    public function index(Request $request)
    {
        return Cache::tags([CACHE_TAGS::ENVIRONMENTS, CACHE_TAGS::ENVIRONMENTS_INDEX])->remember(
            CACHE_KEYS::ENVIRONMENTS_INDEX_CURSOR_($request->cursor),
            60 * 60 * 24, // Cache for 1 day
            fn () => Environments::select(
                "id",
                "name",
                "string_id"
                // likes ?
                // comments count ?
            )->orderBy("id")->cursorPaginate()
        );
    }

    /**
     * Retrieve a CursorPaginator object of Environments filtered by search param. (Cached for 1 day.)
     *
     * @return \Illuminate\Contracts\Pagination\CursorPaginator
     */
    public function search(Request $request)
    {
        $searchWords = $this->getKeyWords($request->search);
        $cacheId = $this->generateSearchWordsCacheId($searchWords);

        return Cache::tags([CACHE_TAGS::ENVIRONMENTS, CACHE_TAGS::ENVIRONMENTS_SEARCH])->remember(
            CACHE_KEYS::ENVIRONMENTS_SEARCH_($cacheId, $request->cursor),
            60 * 60 * 24, // Cache for 1 day
            fn () => Environments::select(
                "id",
                "name",
                "string_id"
                // likes ?
                // comments count ?
            )->where(function ($query) use ($searchWords) {
                foreach ($searchWords as $keyword) {
                    $query->orWhere('description', 'like', "%$keyword%");
                }
            })->orderBy("id")->cursorPaginate()
        );
    }

    /**
     * Retrieve Environment data by string_id.
     *
     * @return Environments
     */
    public function show(Request $request)
    {
        $stringId = $request->string_id;
        return Cache::tags([CACHE_TAGS::ENVIRONMENTS, CACHE_TAGS::ENVIRONMENTS_SHOW])->remember(
            CACHE_KEYS::ENVIRONMENTS_SHOW_($stringId),
            60 * 60 * 24,
            fn () => Environments::where('string_id', '=', $stringId)->select(
                "id",
                "name",
                "repo_owner",
                "repo_name",
                "repo_branch"
            )->get()->first()
        );
    }
}
