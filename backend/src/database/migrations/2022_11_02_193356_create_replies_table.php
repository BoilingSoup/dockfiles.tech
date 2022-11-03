<?php

use Database\Helpers\ForeignKeyCol;
use Database\Helpers\MaxLength;
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
        Schema::create('replies', function (Blueprint $table) {
            $table->id();
            $table->string('content', MaxLength::comments);
            $table->foreignId(ForeignKeyCol::reply_author); // PlanetScale doesn't allow foreign key constraints. Enforce data consistency at app-level.
            $table->foreignId(ForeignKeyCol::reply_recipient);
            $table->foreignId(ForeignKeyCol::comments);
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
