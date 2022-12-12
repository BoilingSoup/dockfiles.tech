<?php

namespace Tests\Feature\Traits;

trait PaginatedEnvironmentsJsonStructure
{
    private function paginatedEnvironmentsJsonStructure()
    {
        return [
                  "success",
                  "data" => [
                    "data" => [
                      "*" => [
                          "id",
                          "name",
                          "string_id",
                          "comments_count"
                        ],
                      ],
                    "path",
                    "per_page",
                    "next_cursor",
                    "next_page_url",
                    "prev_cursor",
                    "prev_page_url"
                  ]
                ];
    }
}
