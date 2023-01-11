<?php

namespace App\Models;

use Database\Helpers\ForeignKeyCol;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    use HasFactory;

    public function environments()
    {
        return $this->hasMany(Environments::class, ForeignKeyCol::categories);
    }

    /**
     * Retrieve a flattened Collection object of category IDs.
     *
     * @return \Illuminate\Support\Collection
     */
    public static function idsCollection()
    {
        $categories = static::select('id')->get();

        return $categories->map(fn ($category) => $category->id);
    }

    /**
     * Retrieve an associative array with category IDs as keys. *Values are bool(True)*
     *
     * @return array
     */
    public static function idsMap()
    {
        $idsArray = Categories::idsCollection()->toArray();
        $idsMap = [];
        foreach ($idsArray as $value) {
            $idsMap[$value] = true;
        }

        return $idsMap;
    }
}
