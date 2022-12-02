<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;

class FormattedApiResponse extends JsonResponse
{
    /**
     * @param  bool  $success True if request was succesful
     * @param  string  $message A message to show the consumer
     * @param  array | null  $data (Optional) Response data
     */
    public function __construct(
        $success,
        $message = null,
        $data = null,
        $status = 200,
        $headers = [],
        $options = 0,
        $json = false
    ) {
        parent::__construct(
            data: $this->format($data, $message, $success),
            status: $status,
            headers: $headers,
            options: $options,
            json: $json
        );
    }

    private function format($data, $message, $success)
    {
        if (is_array($data)) {
            return [
                'success' => $success,
                'data' => $data,
            ];
        }

        return [
            'success' => $success,
            'message' => $message,
        ];
    }
}
