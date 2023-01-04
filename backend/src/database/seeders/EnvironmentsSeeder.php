<?php

namespace Database\Seeders;

use App\Models\Environments;
use App\Models\User;
use Database\Helpers\CategoriesId;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class EnvironmentsSeeder extends Seeder
{
    /**
     * Get available environments.
     *
     * @return \Illuminate\Support\Collection
     */
    private static function environments()
    {
        return collect([
            [
                'name' => 'Angular',
                'description' => 'angular js javascript typescript ts frontend front web webdev',
                'repo_name' => 'Angular',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'ASP.NET Core + MS SQL',
                'description' => 'asp asp.net core .net dotnet mssql ms sql api c# csharp sharp backend back web webdev',
                'repo_name' => 'ASP.NET-MS-SQL',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Django',
                'description' => 'python django py web webdev backend back api',
                'repo_name' => 'Django',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Elasticsearch + Logstash + Kibana',
                'description' => 'elastic elasticsearch search logstash kibana',
                'repo_name' => 'Elasticsearch-Logstash-Kibana',
                'category_id' => CategoriesId::utilities,
            ],
            [
                'name' => 'FastAPI',
                'description' => 'python py web webdev backend back fastapi fast api',
                'repo_name' => 'FastAPI',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Flask',
                'description' => 'python py web webdev backend back flask api',
                'repo_name' => 'Flask',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Flask + Redis',
                'description' => 'python py web webdev backend back flask api redis nosql',
                'repo_name' => 'Flask-Redis',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'ASP.NET Core + MySQL',
                'description' => 'asp asp.net core .net dotnet mysql sql c# csharp sharp backend api back web webdev',
                'repo_name' => 'ASP.NET-MYSQL',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Flask + Mongo',
                'description' => 'python py web webdev backend back flask api mongo mongodb nosql',
                'repo_name' => 'Flask-Mongo',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Flask + MySQL',
                'description' => 'python py web webdev backend back flask api mysql sql',
                'repo_name' => 'Flask-MYSQL',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Gitea',
                'description' => 'gitea git github self selfhost host vcs version control system',
                'repo_name' => 'Gitea',
                'category_id' => CategoriesId::utilities,
            ],
            [
                'name' => 'Golang Chi',
                'description' => 'go golang chi router backend back web webdev api',
                'repo_name' => 'Golang-Chi',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Golang Gorilla Mux + MySQL',
                'description' => 'go golang gorilla mux backend back web webdev api mysql sql',
                'repo_name' => 'Golang-Gorilla-Mux-MYSQL',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Golang Gorilla Mux + Postgres',
                'description' => 'go golang gorilla mux backend back web webdev api postgres sql postgresql',
                'repo_name' => 'Golang-Gorilla-Mux-Postgres',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'ExpressJS + Redis',
                'description' => 'express expressjs ts typescript javascript js redis api nosql nodejs node',
                'repo_name' => 'Node-Express-Redis',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'pgAdmin',
                'description' => 'postgres sql postgresql pg pgadmin database',
                'repo_name' => 'pgAdmin',
                'category_id' => CategoriesId::utilities,
            ],
            [
                'name' => 'React + ExpressJS + Mongo',
                'description' => 'javascript js react reactjs express expressjs node nodejs api mongo mongodb fullstack full',
                'repo_name' => 'React-Express-Mongo',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'React + ExpressJS + MySQL',
                'description' => 'javascript js react reactjs express expressjs node nodejs mysql sql api fullstack full',
                'repo_name' => 'React-Express-MYSQL',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'React + Java Spring + MySQL',
                'description' => 'typescript ts javascript js react reactjs java spring boot mysql sql api fullstack full',
                'repo_name' => 'React-Java-Spring-MYSQL',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'React + Rust Tokio + Postgres',
                'description' => 'javascript js react reactjs rust tokio postgres postgresql sql api fullstack full',
                'repo_name' => 'React-Rust-Tokio-Postgres',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Java Spark + MySQL',
                'description' => 'java spark mysql sql back backend api',
                'repo_name' => 'Java-Spark-MYSQL',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Java Spring + Postgres',
                'description' => 'java spring postgres postgresql sql back backend api',
                'repo_name' => 'Java-Spring-Postgres',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'WordPress',
                'description' => 'wordpress php web webdev mysql sql mariadb maria db',
                'repo_name' => 'WordPress',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'JupyterLab',
                'description' => 'jupyter jupyterlab notebook jupyternotebook python py data science',
                'repo_name' => 'JupyterLab',
                'category_id' => CategoriesId::dataSci,
            ],
            [
                'name' => 'DVWA - Damn Vulnerable Web App',
                'description' => 'owasp dvwa damn vulnerable web app pen testing pentest test penetration security',
                'repo_name' => 'Damn-Vulnerable-Web-App',
                'category_id' => CategoriesId::penTesting,
            ],
            [
                'name' => 'bWAPP - A Buggy Web Application',
                'description' => 'owasp bwapp buggy web application pen testing pentest test penetration security',
                'repo_name' => 'bWAPP-a-buggy-web-application',
                'category_id' => CategoriesId::penTesting,
            ],
            [
                'name' => 'OWASP Juice Shop',
                'description' => 'owasp juice shop pen testing pentest test penetration security',
                'repo_name' => 'OWASP-Juice-Shop',
                'category_id' => CategoriesId::penTesting,
            ],
            [
                'name' => 'PHP + Postgres + Nginx + Composer',
                'description' => 'php postgres sql postgresql nginx composer web webdev back backend api',
                'repo_name' => 'PHP-Postgres-Nginx-Composer',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'PHP + MySQL + Nginx + Composer',
                'description' => 'php mysql sql nginx composer web webdev back backend api',
                'repo_name' => 'PHP-MYSQL-Nginx-Composer',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Laravel + Nginx + Postgres + Composer + Memcached',
                'description' => 'laravel php nginx postgres postgresql sql composer memcached backend back web webdev',
                'repo_name' => 'Laravel-Postgres',
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
        $seedEnvironments = $this->command->confirm(question: 'Seed environments?', default: true);
        if (! $seedEnvironments) {
            return;
        }

        $adminId = User::admin()->id;

        $this->environments()->each(
            fn ($environment) => Environments::create([
                'name' => $environment['name'],
                'description' => $environment['description'],
                'string_id' => EnvironmentsSeeder::formatStringId($environment['name']),
                'repo_owner' => 'dockfiles',
                'repo_name' => $environment['repo_name'],
                'repo_branch' => 'master',
                'category_id' => $environment['category_id'],
                'user_id' => $adminId,
            ])
        );
    }

    private static function formatStringId(string $name)
    {
        $formattedName = Str::lower($name);
        $formattedName = Str::replace(' + ', '_', $formattedName);
        $formattedName = Str::replace(' - ', '_', $formattedName);
        $formattedName = Str::replace(' ', '_', $formattedName);
        $formattedName = Str::replace('-', '_', $formattedName);
        $formattedName = Str::replace('.', '', $formattedName);

        return $formattedName;
    }

    public static function seedTest()
    {
        $admin = User::admin() ?? User::factory()->admin()->create();
        $adminId = $admin->id;

        EnvironmentsSeeder::environments()->each(
            fn ($environment) => Environments::create([
                'name' => $environment['name'],
                'description' => $environment['description'],
                'string_id' => EnvironmentsSeeder::formatStringId($environment['name']),
                'repo_owner' => 'dockfiles',
                'repo_name' => $environment['repo_name'],
                'repo_branch' => 'master',
                'category_id' => $environment['category_id'],
                'user_id' => $adminId,
            ])
        );
    }
}
