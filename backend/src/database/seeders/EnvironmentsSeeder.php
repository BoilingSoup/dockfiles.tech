<?php

namespace Database\Seeders;

use App\Models\Environments;
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
                'category_id' => 1,
            ],
            [
                'name' => 'ASP.NET Core',
                'category_id' => 1,
            ],
            [
                'name' => 'Django',
                'category_id' => 1,
            ],
            [
                'name' => 'Elasticsearch + Logstash + Kibana',
                'category_id' => 4,
            ],
            [
                'name' => 'FastAPI',
                'category_id' => 1,
            ],
            [
                'name' => 'Flask',
                'category_id' => 1,
            ],
            [
                'name' => 'Gitea',
                'category_id' => 4,
            ],
            [
                'name' => 'Golang Chi',
                'category_id' => 1,
            ],
            [
                'name' => 'Golang Gorilla Mux',
                'category_id' => 1,
            ],
            [
                'name' => 'ExpressJS',
                'category_id' => 1,
            ],
            [
                'name' => 'pgAdmin',
                'category_id' => 4,
            ],
            [
                'name' => 'React + ExpressJS',
                'category_id' => 1,
            ],
            [
                'name' => 'React + Java Spring',
                'category_id' => 1,
            ],
            [
                'name' => 'React + Rust Tokio',
                'category_id' => 1,
            ],
            [
                'name' => 'Java Spark',
                'category_id' => 1,
            ],
            [
                'name' => 'Java Spring',
                'category_id' => 1,
            ],
            [
                'name' => 'WordPress',
                'category_id' => 1,
            ],
      ['name' => 'JupyterLab',
        'category_id' => 3,
      ],
      ['name' => 'DVWA - Damn Vulnerable Web App',
        'category_id' => 2,
      ],
      ['name' => 'bWAPP - A Buggy Web Application',
        'category_id' => 2,
      ],
      ['name' => 'OWASP Juice Shop',
        'category_id' => 2,
      ],
      ['name' => 'PHP LEMP Stack',
        'category_id' => 1,
      ],
      ['name' => 'Laravel',
        'category_id' => 1,
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
