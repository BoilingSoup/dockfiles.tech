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
                'description' => 'angular js javascript typescript ts frontend front web webdev',
                'github_link' => 'https://github.com/dockfiles/Angular'
            ],
            [
                'name' => 'ASP.NET Core + MS SQL',
                'category_id' => CategoriesId::webDev,
                'description' => 'asp asp.net core .net dotnet mssql ms sql api c# csharp sharp backend back web webdev',
                'github_link' => 'https://github.com/dockfiles/ASP.NET-MS-SQL'
            ],
            [
                'name' => 'Django',
                'category_id' => CategoriesId::webDev,
                'description' => 'python django py web webdev backend back api',
                'github_link' => 'https://github.com/dockfiles/Django'

            ],
            [
                'name' => 'Elasticsearch + Logstash + Kibana',
                'category_id' => CategoriesId::utilities,
                'description' => 'elastic elasticsearch search logstash kibana',
                'github_link' => 'https://github.com/dockfiles/Elasticsearch-Logstash-Kibana'

            ],
            [
                'name' => 'FastAPI',
                'category_id' => CategoriesId::webDev,
                'description' => 'python py web webdev backend back fastapi fast api',
                'github_link' => 'https://github.com/dockfiles/FastAPI'
            ],
            [
                'name' => 'Flask',
                'category_id' => CategoriesId::webDev,
                'description' => 'python py web webdev backend back flask api',
                'github_link' => 'https://github.com/dockfiles/Flask'
            ],
            [
                'name' => 'Flask + Redis',
                'category_id' => CategoriesId::webDev,
                'description' => 'python py web webdev backend back flask api redis nosql',
                'github_link' => 'https://github.com/dockfiles/Flask-Redis'
            ],
            [
                'name' => 'ASP.NET Core + MySQL',
                'category_id' => CategoriesId::webDev,
                'description' => 'asp asp.net core .net dotnet mysql sql c# csharp sharp backend api back web webdev',
                'github_link' => 'https://github.com/dockfiles/ASP.NET-MYSQL'
            ],
            [
                'name' => 'Flask + Mongo',
                'category_id' => CategoriesId::webDev,
                'description' => 'python py web webdev backend back flask api mongo mongodb nosql',
                'github_link' => 'https://github.com/dockfiles/Flask-Mongo'
            ],
            [
                'name' => 'Flask + MySQL',
                'category_id' => CategoriesId::webDev,
                'description' => 'python py web webdev backend back flask api mysql sql',
                'github_link' => 'https://github.com/dockfiles/Flask-MYSQL'
            ],
            [
                'name' => 'Gitea',
                'category_id' => CategoriesId::utilities,
                'description' => 'gitea git github self selfhost host vcs version control system',
                'github_link' => 'https://github.com/dockfiles/Gitea'
            ],
            [
                'name' => 'Golang Chi',
                'category_id' => CategoriesId::webDev,
                'description' => 'go golang chi router backend back web webdev api',
                'github_link' => 'https://github.com/dockfiles/Golang-Chi'
            ],
            [
                'name' => 'Golang Gorilla Mux + MySQL',
                'category_id' => CategoriesId::webDev,
                'description' => 'go golang gorilla mux backend back web webdev api mysql sql',
                'github_link' => 'https://github.com/dockfiles/Golang-Gorilla-Mux-MYSQL'
            ],
            [
                'name' => 'Golang Gorilla Mux + Postgres',
                'category_id' => CategoriesId::webDev,
                'description' => 'go golang gorilla mux backend back web webdev api postgres sql postgresql',
                'github_link' => 'https://github.com/dockfiles/Golang-Gorilla-Mux-Postgres'
            ],
            [
                'name' => 'ExpressJS + Redis',
                'category_id' => CategoriesId::webDev,
                'description' => 'express expressjs ts typescript javascript js redis api nosql nodejs node',
                'github_link' => 'https://github.com/dockfiles/Node-Express-Redis'
            ],
            [
                'name' => 'pgAdmin',
                'category_id' => CategoriesId::utilities,
                'description' => 'postgres sql postgresql pg pgadmin database',
                'github_link' => 'https://github.com/dockfiles/pgAdmin'
            ],
            [
                'name' => 'React + ExpressJS + Mongo',
                'category_id' => CategoriesId::webDev,
                'description' => 'javascript js react reactjs express expressjs node nodejs api mongo mongodb fullstack full',
                'github_link' => 'https://github.com/dockfiles/React-Express-Mongo'
            ],
            [
                'name' => 'React + ExpressJS + MySQL',
                'category_id' => CategoriesId::webDev,
                'description' => 'javascript js react reactjs express expressjs node nodejs mysql sql api fullstack full',
                'github_link' => 'https://github.com/dockfiles/React-Express-MYSQL'
            ],
            [
                'name' => 'React + Java Spring + MySQL',
                'category_id' => CategoriesId::webDev,
                'description' => 'typescript ts javascript js react reactjs java spring boot mysql sql api fullstack full',
                'github_link' => 'https://github.com/dockfiles/React-Java-Spring-MYSQL'
            ],
            [
                'name' => 'React + Rust Tokio + Postgres',
                'category_id' => CategoriesId::webDev,
                'description' => 'javascript js react reactjs rust tokio postgres postgresql sql api fullstack full',
                'github_link' => 'https://github.com/dockfiles/React-Rust-Tokio-Postgres'
            ],
            [
                'name' => 'Java Spark + MySQL',
                'category_id' => CategoriesId::webDev,
                'description' => 'java spark mysql sql back backend api',
                'github_link' => 'https://github.com/dockfiles/Java-Spark-MYSQL'
            ],
            [
                'name' => 'Java Spring + Postgres',
                'category_id' => CategoriesId::webDev,
                'description' => 'java spring postgres postgresql sql back backend api',
                'github_link' => 'https://github.com/dockfiles/Java-Spring-Postgres'
            ],
            [
                'name' => 'WordPress',
                'category_id' => CategoriesId::webDev,
                'description' => 'wordpress php web webdev mysql sql mariadb maria db',
                'github_link' => 'https://github.com/dockfiles/WordPress'
            ],
            [
                'name' => 'JupyterLab',
                'category_id' => CategoriesId::dataSci,
                'description' => 'jupyter jupyterlab notebook jupyternotebook python py data science',
                'github_link' => 'https://github.com/dockfiles/JupyterLab'
            ],
            [
                'name' => 'DVWA - Damn Vulnerable Web App',
                'category_id' => CategoriesId::penTesting,
                'description' => 'owasp dvwa damn vulnerable web app pen testing pentest test penetration security',
                'github_link' => 'https://github.com/dockfiles/Damn-Vulnerable-Web-App'
            ],
            [
                'name' => 'bWAPP - A Buggy Web Application',
                'category_id' => CategoriesId::penTesting,
                'description' => 'owasp bwapp buggy web application pen testing pentest test penetration security',
                'github_link' => 'https://github.com/dockfiles/bWAPP-a-buggy-web-application'
            ],
            [
                'name' => 'OWASP Juice Shop',
                'category_id' => CategoriesId::penTesting,
                'description' => 'owasp juice shop pen testing pentest test penetration security',
                'github_link' => 'https://github.com/dockfiles/OWASP-Juice-Shop'
            ],
            [
                'name' => 'PHP + Postgres + Nginx + Composer',
                'category_id' => CategoriesId::webDev,
                'description' => 'php postgres sql postgresql nginx composer web webdev back backend api',
                'github_link' => 'https://github.com/dockfiles/PHP-Postgres-Nginx-Composer'
            ],
            [
                'name' => 'PHP + MySQL + Nginx + Composer',
                'category_id' => CategoriesId::webDev,
                'description' => 'php mysql sql nginx composer web webdev back backend api',
                'github_link' => 'https://github.com/dockfiles/PHP-MYSQL-Nginx-Composer'
            ],
            [
                'name' => 'Laravel + Nginx + Postgres + Composer + Memcached',
                'category_id' => CategoriesId::webDev,
                'description' => 'laravel php nginx postgres postgresql sql composer memcached backend back web webdev',
                'github_link' => 'https://github.com/dockfiles/Laravel-Postgres'
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
