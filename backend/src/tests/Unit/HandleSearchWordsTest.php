<?php

namespace Tests\Unit;

use App\Repositories\Traits\HandleSearchWords;
use PHPUnit\Framework\TestCase;

class HandleSearchWordsTest extends TestCase
{
    public function test_getKeyWords_function_converts_a_search_string_into_an_array_of_lowercase_characters()
    {
        $trait = new class()
        {
            use HandleSearchWords;
        };

        $result = $trait->getKeyWords('pYtHon PYTHON python PyThON');
        $expected = ['python', 'python', 'python', 'python'];

        $this->assertEquals($result, $expected);
    }

    public function test_generateSearchWordsCacheId_function_sorts_an_array_of_words_and_removes_whitespace_to_make_a_consistent_cache_key()
    {
        $trait = new class()
        {
            use HandleSearchWords;
        };
        $searchTerms1 = $trait->getKeyWords('python redis');
        $searchTerms2 = $trait->getKeyWords('redis python');

        $result1 = $trait->generateSearchWordsCacheId($searchTerms1);
        $result2 = $trait->generateSearchWordsCacheId($searchTerms2);

        $this->assertEquals($result1, $result2);
    }
}
