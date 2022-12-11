<?php

namespace App\Repositories\Traits;

trait HandleSearchWords
{
    /**
     * Convert the search param into an array of lower case words.
     *
     * @return array
     */
    private function getKeyWords(string $param)
    {
        $searchTerms = array_filter(explode(" ", $param), fn ($el) => $el !== "");
        return array_map(fn ($el) => strtolower($el), $searchTerms);
    }

    /**
       * Convert the words array into a consistent cache-ID string. A search of the same terms [ "redis", "flask" ], ["flask", "redis"] returns the same ID "flaskredis" regardless of order.
       *
       * @return string
       */
    private function generateSearchWordsCacheId(array $words)
    {
        // Sort the words array alphabetically
        sort($words);

        // Join the array into a string
        return implode("", $words);
    }
}
