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
    $cursor = $request->cursor;

    return Cache::tags([CACHE_TAGS::REPLIES_($commentId)])->rememberForever(
      CACHE_KEYS::REPLIES_($commentId, $cursor),
      function () use ($commentId) {
        return Replies::where(ForeignKeyCol::comments, $commentId)
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

    $commentId = $request->id;
    $comment = Comments::findOrFail($commentId);

    $reply = Replies::create([
      'content' => $content,
      ForeignKeyCol::reply_author => Auth::user()->id,
      ForeignKeyCol::reply_recipient => $comment[ForeignKeyCol::users],
      ForeignKeyCol::comments => $comment->id,
    ]);

    Cache::tags([CACHE_TAGS::COMMENTS])->flush();
    Cache::tags([CACHE_TAGS::REPLIES_($commentId)])->flush();

    return $reply;
  }
}
