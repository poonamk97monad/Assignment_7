<?php

namespace App\Module;

use Illuminate\Support\Facades\Redis;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Collection extends Model
{

    protected $fillable = [
        'title', 'slug','description'
    ];
    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['is_favortted'];

    public function resources() {

        return $this->belongsToMany(Resource::class, 'collection_resources', 'collection_id', 'resource_id');
    }

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    public function getIsFavorttedAttribute() {
        return Redis::SISMEMBER('favorite:vuecollection', $this->getKey());
    }

    public function isFavortted() {
        return Redis::SISMEMBER('favorite:vuecollection', $this->getKey());
    }
}
