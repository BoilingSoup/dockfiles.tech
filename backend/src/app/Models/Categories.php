<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    /**
     * Retrieve a flattened Collection object of category IDs.
     *
     * @return \Illuminate\Support\Collection
     */
    public static function idsCollection()
    {
        $categories = static::select("id")->get();
        return $categories->map(fn ($category) => $category->id);
    }
}
