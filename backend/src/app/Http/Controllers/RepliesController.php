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
  }

  /**
   * Get a cursor paginated list of Replies for a specific Comment.
   *
   * @return \Illuminate\Http\Response
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
   * Store a newly created resource in storage.
   *
   * @param  \App\Http\Requests\StoreRepliesRequest  $request
   * @return \Illuminate\Http\Response
   */
  public function store(StoreRepliesRequest $request)
  {
    //
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Replies  $replies
   * @return \Illuminate\Http\Response
   */
  public function show(Replies $replies)
  {
    //
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
