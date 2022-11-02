<?php

use Database\Helpers\ForeignKeyCol;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('likes', function (Blueprint $table) {
            $table->id();
            $table->foreignId(ForeignKeyCol::configurations); // PlanetScale doesn't allow foreign key constraints. Enforce data consistency at app-level.
            $table->foreignId(ForeignKeyCol::users);
            $table->unique([ForeignKeyCol::configurations, ForeignKeyCol::users]);
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
        Schema::dropIfExists('likes');
    }
};
