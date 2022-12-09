<?php

namespace App\Repositories;

use App\Helpers\Cache\CACHE_KEYS;
use App\Helpers\Cache\CACHE_TAGS;
use App\Models\Environments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class EnvironmentsRepository
{
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
        $cacheId = $this->generateCacheId($searchWords);

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
     * Convert the search param into an array of lower case words.
     *
     * @return array
     */
    private function getKeyWords(string $param)
    {
        $searchTerms = array_filter(explode(" ", $param), fn ($el) => $el !== "");
        return array_map(fn ($el) => strtolower($el), $searchTerms);
    }

    /**
       * Convert the words array into a consistent cache-ID string. A search of the same terms [ "redis", "flask" ], ["flask", "redis"] returns the same ID "flaskredis" regardless of order.
       *
       * @return string
       */
    private function generateCacheId(array $words)
    {
        // Sort the words array alphabetically
        sort($words);

        // Join the array into a string
        return implode("", $words);
    }

    /**
     * Retrieve Environment data by string_id.
     *
     * @return Environments
     */
    public function show(string $string_id)
    {
        return Cache::tags([CACHE_TAGS::ENVIRONMENTS, CACHE_TAGS::ENVIRONMENTS_SHOW])->remember(
            CACHE_KEYS::ENVIRONMENTS_SHOW_($string_id),
            60 * 60 * 24,
            fn () => Environments::where('string_id', '=', $string_id)->select(
                "id",
                "name",
                "repo_owner",
                "repo_name",
                "repo_branch"
            )->get()->first()
        );
    }
}
