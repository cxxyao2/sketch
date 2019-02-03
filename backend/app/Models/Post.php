<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Sosadfun\Traits\ColumnTrait;

class Post extends Model
{
    use SoftDeletes, ColumnTrait;

    protected $guarded = [];
    protected $post_types = array('chapter', 'question', 'answer', 'request', 'post', 'comment', 'review'); // post的分类类别

    const UPDATED_AT = null;

    protected $hidden = [
        'creation_ip',
    ];

    public function thread()
    {
        return $this->belongsTo(Thread::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Post::class, 'reply_to_post_id');
    }

    public function parent()
    {
        return $this->belongsTo(Post::class, 'reply_to_post_id');
    }

    public function votes()
    {
        return $this->morphMany('App\Models\Vote', 'votable');
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id')->select('id','name');
    }

    public function chapter()
    {
        return $this->hasOne(Chapter::class, 'post_id');
    }
    public function review()
    {
        return $this->hasOne(Review::class, 'post_id');
    }

    public function scopeExclude($query, $value = array())
    {
        return $query->select( array_diff( $this->post_columns,(array) $value));
    }
    public function scopeUserOnly($query, $userOnly)
    {
        if($userOnly){
            return $query->where('user_id', $userOnly)->where('is_anonymous', false);
        }
        return $query;
    }
    public function scopeWithType($query, $withType)
    {
        if(in_array($withType, $this->post_types)){
            return $query->where('type', $withType);
        }
        return $query;
    }

    public function scopeWithReplyTo($query, $withReplyTo)
    {
        if($withReplyTo){
            return $query->where('reply_to_post_id', $withReplyTo);
        }
        return $query;
    }

    public function scopePostBrief($query)
    {
        return $query->select($this->postbrief_columns);
    }

    public function scopeOrdered($query, $ordered)
    {
        switch ($ordered) {
            case 'latest_created'://最新
            return $query->orderBy('created_at', 'desc');
            break;
            case 'most_replied'://按回应数量倒序
            return $query->orderBy('replies', 'desc');
            break;
            case 'most_upvoted'://按赞数倒序
            return $query->orderBy('upvotes', 'desc');
            break;
            case 'latest_responded'://按最新被回应时间倒序
            return $query->orderBy('last_responded_at', 'desc');
            break;
            default://默认按时间顺序排列
            return $query->orderBy('created_at', 'asc');
        }
    }

    public function favorite_reply()//这个post里面，回复它的postcomment中，最多赞的
    {
        return Post::postBrief()
        ->where('reply_to_post_id', $this->id)
        ->with('author')
        ->orderBy('up_votes', 'desc')
        ->first();
    }

    public function newest_reply()//这个post里面，回复它的里面，最新的
    {
        return Post::postBrief()
        ->where('reply_to_post_id', $this->id)
        ->with('author')
        ->orderBy('created_at', 'desc')
        ->first();
    }

}