<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Thread;
use App\Models\Post;
use App\Http\Resources\ThreadProfileResource;
use App\Http\Resources\PostInfoResource;
use App\Http\Resources\VolumnResource;
use App\Http\Resources\PaginateResource;
use App\Http\Resources\PostBriefResource;

class BookController extends Controller
{
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */

    public function __construct()
    {
        $this->middleware('filter_thread');
    }

    public function show(Thread $thread)
    {
        $thread->load('author', 'tags', 'recommendations.authors');
        $chapters = Post::postBrief()
        ->with('chapter.volumn')
        ->join('chapters', 'chapters.post_id','=','posts.id')
        ->where('posts.thread_id',$thread->id)
        ->where('posts.type', '=', 'chapter')
        ->orderBy('chapter.order_by', 'asc')
        ->get();
        //以后注意不要显示所有的chapter，显示排名靠前的几个
        $chapters->sortBy('chapter.order_by');
        $volumns = $chapters->pluck('chapter.volumn')->unique();
        return response()->success([
            'thread' => new ThreadProfileResource($thread),
            'chapters' => PostInfoResource::collection($chapters),
            'volumns' => VolumnResource::collection($volumns),
            'most_upvoted' => new PostBriefResource($thread->favorite()),
            'newest_comment' => new PostBriefResource($thread->last_component),
        ]);
    }


}