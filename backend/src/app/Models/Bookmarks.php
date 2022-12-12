<?php

namespace App\Models;

use Database\Helpers\ForeignKeyCol;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bookmarks extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class, ForeignKeyCol::users);
    }

    public function environment()
    {
        return $this->hasOne(Environments::class, ForeignKeyCol::environments);
    }
}
