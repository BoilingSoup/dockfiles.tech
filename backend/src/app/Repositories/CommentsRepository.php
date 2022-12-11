<?php

namespace App\Repositories;

use App\Helpers\Cache\CACHE_KEYS;
use App\Helpers\Cache\CACHE_TAGS;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class CommentsRepository
{
    /**
     * Retrieve Environment Comments data by string_id.
     *
     * @return Illuminate\Contracts\Pagination\CursorPaginator
     */
    public function index(Request $request)
    {
        $stringId = $request->string_id;
        $cursor = $request->cursor;

        return Cache::tags([CACHE_TAGS::COMMENTS, CACHE_TAGS::COMMENTS_INDEX])->remember(
            CACHE_KEYS::ENVIRONMENTS_COMMENTS_($stringId, $cursor),
            60 * 60 * 24,
            fn () =>
              DB::table('comments')                                                         // FROM Comments table...
              ->where("environments.string_id", "=", $stringId)                             // only Environments that match the given string_id...
                  ->join("environments", "comments.environment_id", "=", "environments.id") // join the Comments.environment_id to Environments table...
                  ->join("users", "comments.user_id", "=", "users.id")                      // join the Comments.user_id to Users table...
              ->select("users.id", "users.name", "comments.content", "comments.created_at") // Select these fields...
              ->orderByDesc("comments.created_at")->cursorPaginate()                        // order by newest comment
        );
    }
}
