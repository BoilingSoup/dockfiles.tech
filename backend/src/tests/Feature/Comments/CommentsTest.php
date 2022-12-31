<?php

namespace Tests\Feature\Environments;

use App\Models\User;
use Database\Seeders\CategoriesSeeder;
use Database\Seeders\EnvironmentsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Feature\Traits\PaginatedEnvironmentsJsonStructure;
use Tests\TestCase;

class CommentsTest extends TestCase
{
    use RefreshDatabase;
}
