<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRepliesRequest;
use App\Http\Requests\UpdateRepliesRequest;
use App\Http\Responses\FormattedApiResponse;
use App\Models\Replies;
use App\Repositories\RepliesRepository;
use Illuminate\Http\Request;

class RepliesController extends Controller
{
  protected RepliesRepository $repository;

  public function __construct(RepliesRepository $repository)
  {
    $this->repository = $repository;
    $this->middleware(["verified", "auth:sanctum"])->except("index");
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
   * Update the specified resource in storage.
   *
   * @param  \App\Http\Requests\UpdateRepliesRequest  $request
   * @param  \App\Models\Replies  $replies
   * @return \Illuminate\Http\Response
   */
  public function update(UpdateRepliesRequest $request, Replies $replies)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Replies  $replies
   * @return \Illuminate\Http\Response
   */
  public function destroy(Replies $replies)
  {
    //
  }
}
