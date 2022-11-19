<?php

namespace App\Exceptions;

use App\Http\Responses\FormattedApiResponse;
use Exception;

class TokenMismatchException extends Exception
{
    public function render()
    {
        return new FormattedApiResponse(
            message: 'CSRF token mismatch',
            success: false,
            status: 419
        );
    }
}
