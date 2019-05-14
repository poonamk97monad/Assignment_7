<?php

namespace App\Module;

use Illuminate\Support\Facades\Redis;
use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{

    protected $fillable = [
        'title','slug', 'description', 'file_upload', 'store_file'
    ];

    /**
     * The accessors to append to the model's array form.
     * @var array
     */
    protected $appends = ['is_favortted'];

    /**
     * for many to many relationship
     */
    public function collections() {
        return $this->belongsToMany(Collection::class, 'collection_resources', 'resource_id', 'collection_id');
    }

    /**
     * The accessors to append to the model's array form.
     */
    public function getIsFavorttedAttribute() {
        return Redis::SISMEMBER('favorite:vueresource', $this->getKey());
    }

    /**
     * The method for add key in redis
     */
    public function isFavortted() {
        return Redis::SISMEMBER('favorite:vueresource', $this->getKey());
    }
}
