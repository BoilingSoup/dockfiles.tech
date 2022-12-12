<?php

namespace App\Models;

use Database\Helpers\ForeignKeyCol;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Environments extends Model
{
    use HasFactory;

    public function categories()
    {
        return $this->belongsTo(Categories::class, ForeignKeyCol::categories);
    }

    public function comments()
    {
        return $this->hasMany(Comments::class, ForeignKeyCol::environments);
    }
}
