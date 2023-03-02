<?php

use Database\Helpers\ForeignKeyCol;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('replies', function (Blueprint $table) {
            $table->id();
            $table->string('content');
            $table->boolean('is_read')->default(false)->index();
            $table->boolean('is_meta');
            $table->foreignId(ForeignKeyCol::reply_author)->index(); // PlanetScale doesn't allow foreign key constraints. Enforce data consistency at app-level.
            $table->foreignId(ForeignKeyCol::reply_recipient)->index();
            $table->foreignId(ForeignKeyCol::comments)->index();
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
        Schema::dropIfExists('replies');
    }
};
