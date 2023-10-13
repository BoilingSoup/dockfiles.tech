<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRepliesRequest;
use App\Http\Responses\FormattedApiResponse;
use App\Models\Replies;
use App\Repositories\RepliesRepository;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RepliesController extends Controller
{
    protected RepliesRepository $repository;

    public function __construct(RepliesRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Get a cursor paginated list of Replies for a specific Comment.
     *
     * @return FormattedApiResponse
     */
    public function index(Request $request)
    {
        $data = $this->repository->index($request);

        return new FormattedApiResponse(
            success: true,
            data: $data,
        );
    }

    public function received()
    {
        $user = Auth::user();

        $replies = Replies::whereRecipientId($user->id)
              ->whereNot('author_id', '=', $user->id)
              ->where('is_deleted', false)
              ->with('author:id,name,avatar')
              ->orderByDesc(Model::CREATED_AT)
              ->paginate(perPage: 7);

        return $replies;
    }

    /**
     * Reply to a Comment.
     *
     * @param  \App\Http\Requests\StoreRepliesRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRepliesRequest $request)
    {
        // content body is validated in repository
        $reply = $this->repository->store($request);

        return new FormattedApiResponse(
            success: true,
            data: $reply,
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Replies  $replies
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $this->repository->destroy($request);

        return response()->noContent();
    }
}
