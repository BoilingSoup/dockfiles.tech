<?php

namespace App\Models;

use Database\Helpers\ForeignKeyCol;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Replies extends Model
{
    use HasFactory;

    protected $hidden = [
        ForeignKeyCol::reply_author,
        ForeignKeyCol::reply_recipient,
        'updated_at',
    ];

    protected $casts = [
        'is_meta' => 'boolean',
        'is_read' => 'boolean',
        'created_at' => 'datetime:Y-m-d',
    ];

    public function comment()
    {
        return $this->belongsTo(Comments::class, ForeignKeyCol::comments);
    }

    public function author()
    {
        return $this->belongsTo(User::class, ForeignKeyCol::reply_author);
    }

    public function recipient()
    {
        return $this->belongsTo(User::class, ForeignKeyCol::reply_recipient);
    }
}
