<?php

namespace App\Exceptions;

use App\Http\Responses\FormattedApiResponse;
use Exception;

class MissingValidationException extends Exception
{
    public function render()
    {
        return new FormattedApiResponse(
            message: 'The request was not validated.',
            success: false,
            status: 403
        );
    }
}
