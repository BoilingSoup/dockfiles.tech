<?php

namespace App\Models;

use Database\Helpers\ForeignKeyCol;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Likes extends Model
{
    use HasFactory;

    public function environment()
    {
        return $this->belongsTo(Environments::class, ForeignKeyCol::environments);
    }

    public function user()
    {
        return $this->belongsTo(User::class, ForeignKeyCol::users);
    }
}
