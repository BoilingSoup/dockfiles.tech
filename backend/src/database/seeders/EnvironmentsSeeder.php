<?php

namespace Database\Seeders;

use App\Models\Environments;
use App\Models\User;
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
                'description' => 'angular js javascript typescript ts frontend front web webdev',
                'github_link' => 'https://github.com/dockfiles/Angular',
                'direct_link' => 'https://github.com/dockfiles/Angular/archive/refs/heads/master.zip',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'ASP.NET Core + MS SQL',
                'description' => 'asp asp.net core .net dotnet mssql ms sql api c# csharp sharp backend back web webdev',
                'github_link' => 'https://github.com/dockfiles/ASP.NET-MS-SQL',
                'direct_link' => 'https://github.com/dockfiles/ASP.NET-MS-SQL/archive/refs/heads/master.zip',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Django',
                'description' => 'python django py web webdev backend back api',
                'github_link' => 'https://github.com/dockfiles/Django',
                'direct_link' => 'https://github.com/dockfiles/Django/archive/refs/heads/master.zip',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Elasticsearch + Logstash + Kibana',
                'description' => 'elastic elasticsearch search logstash kibana',
                'github_link' => 'https://github.com/dockfiles/Elasticsearch-Logstash-Kibana',
                'direct_link' => 'https://github.com/dockfiles/Elasticsearch-Logstash-Kibana/archive/refs/heads/master.zip',
                'category_id' => CategoriesId::utilities,
            ],
            [
                'name' => 'FastAPI',
                'description' => 'python py web webdev backend back fastapi fast api',
                'github_link' => 'https://github.com/dockfiles/FastAPI',
                'direct_link' => 'https://github.com/dockfiles/FastAPI/archive/refs/heads/master.zip',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Flask',
                'description' => 'python py web webdev backend back flask api',
                'github_link' => 'https://github.com/dockfiles/Flask',
                'direct_link' => 'https://github.com/dockfiles/Flask/archive/refs/heads/master.zip',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Flask + Redis',
                'description' => 'python py web webdev backend back flask api redis nosql',
                'github_link' => 'https://github.com/dockfiles/Flask-Redis',
                'direct_link' => 'https://github.com/dockfiles/Flask-Redis/archive/refs/heads/master.zip',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'ASP.NET Core + MySQL',
                'description' => 'asp asp.net core .net dotnet mysql sql c# csharp sharp backend api back web webdev',
                'github_link' => 'https://github.com/dockfiles/ASP.NET-MYSQL',
                'direct_link' => 'https://github.com/dockfiles/ASP.NET-MYSQL/archive/refs/heads/master.zip',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Flask + Mongo',
                'description' => 'python py web webdev backend back flask api mongo mongodb nosql',
                'github_link' => 'https://github.com/dockfiles/Flask-Mongo',
                'direct_link' => 'https://github.com/dockfiles/Flask-Mongo/archive/refs/heads/master.zip',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Flask + MySQL',
                'description' => 'python py web webdev backend back flask api mysql sql',
                'github_link' => 'https://github.com/dockfiles/Flask-MYSQL',
                'direct_link' => 'https://github.com/dockfiles/Flask-MYSQL/archive/refs/heads/master.zip',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Gitea',
                'description' => 'gitea git github self selfhost host vcs version control system',
                'github_link' => 'https://github.com/dockfiles/Gitea',
                'direct_link' => 'https://github.com/dockfiles/Gitea/archive/refs/heads/master.zip',
                'category_id' => CategoriesId::utilities,
            ],
            [
                'name' => 'Golang Chi',
                'description' => 'go golang chi router backend back web webdev api',
                'github_link' => 'https://github.com/dockfiles/Golang-Chi',
                'direct_link' => 'https://github.com/dockfiles/Golant-Chi/archive/refs/heads/master.zip',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Golang Gorilla Mux + MySQL',
                'description' => 'go golang gorilla mux backend back web webdev api mysql sql',
                'github_link' => 'https://github.com/dockfiles/Golang-Gorilla-Mux-MYSQL',
                'direct_link' => 'https://github.com/dockfiles/Golang-Gorilla-Mux-MYSQL/archive/refs/heads/master.zip',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Golang Gorilla Mux + Postgres',
                'description' => 'go golang gorilla mux backend back web webdev api postgres sql postgresql',
                'github_link' => 'https://github.com/dockfiles/Golang-Gorilla-Mux-Postgres',
                'direct_link' => 'https://github.com/dockfiles/Golang-Gorilla-Mux-Postgres/archive/refs/heads/master.zip',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'ExpressJS + Redis',
                'description' => 'express expressjs ts typescript javascript js redis api nosql nodejs node',
                'github_link' => 'https://github.com/dockfiles/Node-Express-Redis',
                'direct_link' => 'https://github.com/dockfiles/Node-Express-Redis/archive/refs/heads/master.zip',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'pgAdmin',
                'description' => 'postgres sql postgresql pg pgadmin database',
                'github_link' => 'https://github.com/dockfiles/pgAdmin',
                'direct_link' => 'https://github.com/dockfiles/pgAdmin/archive/refs/heads/master.zip',
                'category_id' => CategoriesId::utilities,
            ],
            [
                'name' => 'React + ExpressJS + Mongo',
                'description' => 'javascript js react reactjs express expressjs node nodejs api mongo mongodb fullstack full',
                'github_link' => 'https://github.com/dockfiles/React-Express-Mongo',
                'direct_link' => 'https://github.com/dockfiles/React-Express-Mongo/archive/refs/heads/master.zip',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'React + ExpressJS + MySQL',
                'description' => 'javascript js react reactjs express expressjs node nodejs mysql sql api fullstack full',
                'github_link' => 'https://github.com/dockfiles/React-Express-MYSQL',
                'direct_link' => 'https://github.com/dockfiles/React-Express-MYSQL/archive/refs/heads/master.zip',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'React + Java Spring + MySQL',
                'description' => 'typescript ts javascript js react reactjs java spring boot mysql sql api fullstack full',
                'github_link' => 'https://github.com/dockfiles/React-Java-Spring-MYSQL',
                'direct_link' => 'https://github.com/dockfiles/React-Java-Spring-MYSQL/archive/refs/heads/master.zip',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'React + Rust Tokio + Postgres',
                'description' => 'javascript js react reactjs rust tokio postgres postgresql sql api fullstack full',
                'github_link' => 'https://github.com/dockfiles/React-Rust-Tokio-Postgres',
                'direct_link' => 'https://github.com/dockfiles/React-Rust-Tokio-Postgres/archive/refs/heads/master.zip',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Java Spark + MySQL',
                'description' => 'java spark mysql sql back backend api',
                'github_link' => 'https://github.com/dockfiles/Java-Spark-MYSQL',
                'direct_link' => 'https://github.com/dockfiles/Java-Spark-MYSQL/archive/refs/heads/master.zip',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Java Spring + Postgres',
                'description' => 'java spring postgres postgresql sql back backend api',
                'github_link' => 'https://github.com/dockfiles/Java-Spring-Postgres',
                'direct_link' => 'https://github.com/dockfiles/Java-Spring-Postgres/archive/refs/heads/master.zip',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'WordPress',
                'description' => 'wordpress php web webdev mysql sql mariadb maria db',
                'github_link' => 'https://github.com/dockfiles/WordPress',
                'direct_link' => 'https://github.com/dockfiles/WordPress/archive/refs/heads/master.zip',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'JupyterLab',
                'description' => 'jupyter jupyterlab notebook jupyternotebook python py data science',
                'github_link' => 'https://github.com/dockfiles/JupyterLab',
                'direct_link' => 'https://github.com/dockfiles/JupyterLab/archive/refs/heads/master.zip',
                'category_id' => CategoriesId::dataSci,
            ],
            [
                'name' => 'DVWA - Damn Vulnerable Web App',
                'description' => 'owasp dvwa damn vulnerable web app pen testing pentest test penetration security',
                'github_link' => 'https://github.com/dockfiles/Damn-Vulnerable-Web-App',
                'direct_link' => 'https://github.com/dockfiles/Damn-Vulnerable-Web-App/archive/refs/heads/master.zip',
                'category_id' => CategoriesId::penTesting,
            ],
            [
                'name' => 'bWAPP - A Buggy Web Application',
                'description' => 'owasp bwapp buggy web application pen testing pentest test penetration security',
                'github_link' => 'https://github.com/dockfiles/bWAPP-a-buggy-web-application',
                'direct_link' => 'https://github.com/dockfiles/bWAPP-a-buggy-web-application/archive/refs/heads/master.zip',
                'category_id' => CategoriesId::penTesting,
            ],
            [
                'name' => 'OWASP Juice Shop',
                'description' => 'owasp juice shop pen testing pentest test penetration security',
                'github_link' => 'https://github.com/dockfiles/OWASP-Juice-Shop',
                'direct_link' => 'https://github.com/dockfiles/OWASP-Juice-Shop/archive/refs/heads/master.zip',
                'category_id' => CategoriesId::penTesting,
            ],
            [
                'name' => 'PHP + Postgres + Nginx + Composer',
                'description' => 'php postgres sql postgresql nginx composer web webdev back backend api',
                'github_link' => 'https://github.com/dockfiles/PHP-Postgres-Nginx-Composer',
                'direct_link' => 'https://github.com/dockfiles/PHP-Postgres-Nginx-Composer/archive/refs/heads/master.zip',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'PHP + MySQL + Nginx + Composer',
                'description' => 'php mysql sql nginx composer web webdev back backend api',
                'github_link' => 'https://github.com/dockfiles/PHP-MYSQL-Nginx-Composer',
                'direct_link' => 'https://github.com/dockfiles/PHP-MYSQL-Nginx-Composer/archive/refs/heads/master.zip',
                'category_id' => CategoriesId::webDev,
            ],
            [
                'name' => 'Laravel + Nginx + Postgres + Composer + Memcached',
                'description' => 'laravel php nginx postgres postgresql sql composer memcached backend back web webdev',
                'github_link' => 'https://github.com/dockfiles/Laravel-Postgres',
                'direct_link' => 'https://github.com/dockfiles/Laravel-Postgres/archive/refs/heads/master.zip',
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
        $adminId = User::admin()->id;

        $this->environments()->each(
            fn ($environment) => Environments::create([
                'name' => $environment['name'],
                'description' => $environment['description'],
                'github_link' => $environment['github_link'],
                'direct_link' => $environment['direct_link'],
                'category_id' => $environment['category_id'],
                'user_id' => $adminId
            ])
        );
    }
}
