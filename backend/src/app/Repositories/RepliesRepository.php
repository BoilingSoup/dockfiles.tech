<?php

namespace App\Repositories;

use App\Helpers\Cache\CACHE_KEYS;
use App\Helpers\Cache\CACHE_TAGS;
use App\Http\Requests\StoreRepliesRequest;
use App\Models\Comments;
use App\Models\Replies;
use Database\Helpers\ForeignKeyCol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class RepliesRepository
{
    /**
     * Get a paginated list of Replies for a specific Comment.
     *
     * @return Replies
     */
    public function index(Request $request)
    {
        $commentId = $request->id;
        $page = $request->page;

        return Cache::tags([CACHE_TAGS::REPLIES_($commentId)])->rememberForever(
            CACHE_KEYS::REPLIES_($commentId, $page),
            function () use ($commentId) {
                return Replies::where(ForeignKeyCol::comments, $commentId)
                  ->with('recipient:id,name')
                  ->with('author:id,name,avatar,is_admin')
                  ->orderBy('created_at', 'desc')
                  ->paginate(perPage: 3);
            }
        );
    }

    /**
     * Store a Reply to a Comment in the database.
     *
     * @return Replies
     */
    public function store(StoreRepliesRequest $request)
    {
        $validated = (array) $request->validated();
        $content = $validated['content'];
        $recipientId = array_key_exists('recipient_id', $validated) ? $validated['recipient_id'] : null;

        $commentId = $request->id;
        $comment = Comments::findOrFail($commentId);

        $reply = Replies::create([
            'content' => $content,
            'is_meta' => is_null($recipientId) ? false : true,
            ForeignKeyCol::reply_author => Auth::user()->id,
            ForeignKeyCol::reply_recipient => $recipientId ?? $comment[ForeignKeyCol::users],
            ForeignKeyCol::comments => $comment->id,
        ]);

        Cache::tags([CACHE_TAGS::COMMENTS])->flush();
        Cache::tags([CACHE_TAGS::REPLIES_($commentId)])->flush();

        return $reply;
    }

    public function destroy(Request $request)
    {
        $reply = Replies::findOrFail($request->reply_id);

        $isOwner = $reply->author_id === Auth::user()?->id;
        abort_if(! $isOwner, 403);

        $reply->content = 'This comment was deleted.';
        $reply->is_deleted = true;
        $reply->saveOrFail();

        Cache::tags([CACHE_TAGS::COMMENTS])->flush();
        Cache::tags([CACHE_TAGS::REPLIES_($reply->comment_id)])->flush();
    }
}
