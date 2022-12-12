<?php

namespace App\Models;

use Database\Helpers\ForeignKeyCol;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comments extends Model
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

    public function replies()
    {
        return $this->hasMany(Replies::class, ForeignKeyCol::comments);
    }
}
