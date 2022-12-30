<?php

namespace App\Repositories;

use App\Helpers\Cache\CACHE_KEYS;
use App\Helpers\Cache\CACHE_TAGS;
use App\Models\Comments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class CommentsRepository
{
    /**
     * Retrieve cursor paginated list of Environment Comments data and Comments count by string_id.
     *
     * @return array
     */
    public function index(Request $request)
    {
        $stringId = $request->string_id;
        $cursor = $request->cursor;

        return Cache::tags([CACHE_TAGS::COMMENTS, CACHE_TAGS::COMMENTS_INDEX])->rememberForever(
            CACHE_KEYS::ENVIRONMENTS_COMMENTS_($stringId, $cursor),
            function () use ($stringId) {
                $comments = DB::table('comments')                                             // FROM Comments table...
                ->where("environments.string_id", "=", $stringId)                             // only Environments that match the given string_id...
                    ->join("environments", "comments.environment_id", "=", "environments.id") // join the Comments.environment_id to Environments table...
                    ->join("users", "comments.user_id", "=", "users.id")                      // join the Comments.user_id to Users table...
                ->select("comments.id", "users.name", "comments.content", "comments.created_at") // Select these fields...
                ->orderByDesc("comments.created_at")->cursorPaginate(perPage: 10);             // order by newest comment

                $commentsCount = Comments::join("environments", "comments.environment_id", "=", "environments.id")
                ->where("environments.string_id", "=", $stringId)->count();

                return [
                  "data" => [
                    ...collect($comments),
                    "comments_count" => $commentsCount
                  ]
                ];
            }
        );
    }
}
