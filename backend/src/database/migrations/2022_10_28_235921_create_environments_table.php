<?php

use Database\Helpers\ForeignKeyCol;
use Database\Helpers\MaxLength;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('environments', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description', MaxLength::description)->fulltext();
            $table->string('github_link');
            $table->string('direct_link');
            $table->foreignId(ForeignKeyCol::categories)->index(); // PlanetScale doesn't allow foreign key constraints. Enforce data consistency at app-level.
            $table->foreignId(ForeignKeyCol::users)->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('environments');
    }
};
