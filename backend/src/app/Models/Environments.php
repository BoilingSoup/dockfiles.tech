<?php

namespace App\Models;

use Database\Helpers\ForeignKeyCol;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Environments extends Model
{
  use HasFactory;

  public function category()
  {
    return $this->belongsTo(Categories::class, ForeignKeyCol::categories);
  }

  public function comments()
  {
    return $this->hasMany(Comments::class, ForeignKeyCol::environments);
  }

  public function user()
  {
    return $this->belongsTo(User::class, ForeignKeyCol::users);
  }

  public function likes()
  {
    return $this->belongsToMany(User::class, 'likes', ForeignKeyCol::environments, ForeignKeyCol::users);
  }

  public function bookmarkedBy()
  {
    return $this->belongsToMany(User::class, 'bookmarks', ForeignKeyCol::environments, ForeignKeyCol::users);
  }
}
