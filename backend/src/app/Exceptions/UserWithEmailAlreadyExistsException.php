<?php

namespace App\Exceptions;

use App\Http\Responses\FormattedApiResponse;
use Exception;

class UserWithEmailAlreadyExistsException extends Exception
{
    // for asserting response shape in tests
    public const message = [
      "success" =>  false,
      "message" => "A user with that email already exists.",
      "data" => []
    ];

    public function render()
    {
        return new FormattedApiResponse(
            message: "A user with that email already exists.",
            success: false,
            status: 403
        );
    }
}
