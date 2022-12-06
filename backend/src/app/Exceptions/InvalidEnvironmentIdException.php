<?php

namespace App\Exceptions;

use App\Http\Responses\FormattedApiResponse;
use Exception;

class InvalidEnvironmentIdException extends Exception
{
    public function render()
    {
        return new FormattedApiResponse(
            message: 'An Environment with the ID does not exist.',
            success: false,
            status: 404
        );
    }
}
