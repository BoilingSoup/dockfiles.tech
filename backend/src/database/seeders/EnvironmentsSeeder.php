<?php

namespace Database\Seeders;

use App\Models\Environments;
use Database\Helpers\CategoriesId;
use Illuminate\Database\Seeder;

class EnvironmentsSeeder extends Seeder
{
    /**
     * Get available environments.
     *
     * @return \Illuminate\Support\Collection
     */
    private function environments()
    {
        return collect([
            [
                'name' => 'Angular',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'ASP.NET Core',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Django',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Elasticsearch + Logstash + Kibana',
                'category_id' => CategoriesId::utilities,
            ],
            [
                'name' => 'FastAPI',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Flask',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Gitea',
                'category_id' => CategoriesId::utilities,
            ],
            [
                'name' => 'Golang Chi',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Golang Gorilla Mux',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'ExpressJS',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'pgAdmin',
                'category_id' => CategoriesId::utilities,
            ],
            [
                'name' => 'React + ExpressJS',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'React + Java Spring',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'React + Rust Tokio',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Java Spark',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Java Spring',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'WordPress',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'JupyterLab',
                'category_id' => CategoriesId::dataSci,
            ],
            [
                'name' => 'DVWA - Damn Vulnerable Web App',
                'category_id' => CategoriesId::penTesting,
            ],
            [
                'name' => 'bWAPP - A Buggy Web Application',
                'category_id' => CategoriesId::penTesting,
            ],
            [
                'name' => 'OWASP Juice Shop',
                'category_id' => CategoriesId::penTesting,
            ],
            [
                'name' => 'PHP LEMP Stack',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Laravel',
                'category_id' => CategoriesId::webDev,
            ],
        ]);
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->environments()->each(
            fn ($environment) => Environments::create([
                'name' => $environment['name'],
                'category_id' => $environment['category_id'],
            ])
        );
    }
}
