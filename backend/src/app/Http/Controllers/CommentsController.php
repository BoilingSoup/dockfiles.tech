<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentsRequest;
use App\Http\Resources\CommentsCollection;
use App\Http\Responses\FormattedApiResponse;
use App\Models\Comments;
use App\Repositories\CommentsRepository;
use Illuminate\Http\Request;

class CommentsController extends Controller
{
  protected CommentsRepository $repository;

  public function __construct(CommentsRepository $repository)
  {
    $this->repository = $repository;
  }

  /**
   * Get cursor paginated list of Comments by Environment string_id.
   *
   * @return FormattedApiResponse
   */
  public function index(Request $request)
  {
    $data = $this->repository->index($request);

    return new CommentsCollection($data);
  }

  /**
   * Get count of Comments by Environment string_id.
   *
   * @return FormattedApiResponse
   */
  public function count(Request $request)
  {
    $data = $this->repository->count($request);

    return new FormattedApiResponse(
      success: true,
      data: ['comments_count' => $data]
    );
  }


  /**
   * Store a Authenticated User's Comment in the database.
   *
   * @return FormattedApiResponse
   */
  public function store(StoreCommentsRequest $request)
  {
    // content body is validated in repository
    $comment = $this->repository->store($request);

    return new FormattedApiResponse(
      success: true,
      data: $comment
    );
  }

  public function destroy(Comments $comments)
  {
    //
  }
}
