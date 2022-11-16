<?php

namespace App\Exceptions;

use App\Http\Responses\FormattedApiResponse;
use Exception;

class InvalidSignatureException extends Exception
{
    public function render()
    {
        return new FormattedApiResponse(
            message: "Invalid signature.",
            success: false,
            status: 403
        );
    }
}
