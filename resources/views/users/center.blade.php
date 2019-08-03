@extends('layouts.default')
@section('title', $user->name."的个人中心")

@section('content')
<div class="container-fluid">
    <div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
        <div class="panel panel-default">
            <div class="panel-body text-center">
                @include('users._user_profile')
                @include('users._user_center_action')
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-body">
                <div class="">
                    <div class="text-center font-4">
                        我的发布
                    </div>
                    <hr>
                    <a href="{{route('user.show', $user->id)}}" class="btn btn-lg btn-info btn-block sosad-button">
                        我的书籍
                    </a>
                    <a href="{{route('user.threads', $user->id)}}" class="btn btn-lg btn-info btn-block sosad-button">
                        我的讨论
                    </a>
                    <a href="{{route('user.lists', $user->id)}}" class="btn btn-lg btn-info btn-block sosad-button">
                        我的清单
                    </a>
                    <a href="#" class="btn btn-lg btn-info btn-block sosad-button">
                        我的提问（待做）
                    </a>
                </div>
            </div>
        </div>

        <div class="panel panel-default">
            <div class="panel-body">
                <div class="">
                    <div class="text-center font-4">
                        我的社区
                    </div>
                    <hr>
                    <a href="{{ route('quote.mine') }}" class="btn btn-lg btn-info btn-block sosad-button">
                        我的题头
                    </a>
                    <a href="{{ route('vote.received') }}" class="btn btn-lg btn-info btn-block sosad-button">
                        我的评票
                    </a>
                    <a href="{{ route('reward.received') }}" class="btn btn-lg btn-info btn-block sosad-button">
                        我的打赏
                    </a>
                    <a href="{{ route('quiz.quiz_entry') }}" class="btn btn-lg btn-info btn-block sosad-button">
                        答题挑战
                    </a>
                    @if($user->level>=4)
                    <a href="{{ route('invitation_token.my_token') }}" class="btn btn-lg btn-info btn-block sosad-button">
                        邀请好友
                    </a>
                    @endif
                </div>
            </div>
        </div>

        <div class="panel panel-default">
            <div class="panel-body">
                <div class="">
                    <div class="text-center font-4">
                        我的设置
                    </div>
                    <hr>
                    <a href="{{ route('user.edit_preference') }}" class="btn btn-lg btn-info btn-block sosad-button">
                        偏好及隐私设置
                    </a>
                    <a href="{{ route('user.edit', $user->id) }}" class="btn btn-lg btn-info btn-block sosad-button">
                        修改账户资料
                    </a>
                    <a href="{{ route('linkedaccounts.index') }}" class="btn btn-lg btn-info btn-block sosad-button">
                        管理马甲账户
                    </a>
                </div>
            </div>
        </div>

        <div class="panel panel-default">
            <div class="panel-body">
                <div class="">
                    <div class="text-center font-4">
                        其他信息
                    </div>
                    <hr>
                    <a href="{{ route('about') }}" class="btn btn-lg btn-info btn-block sosad-button">
                        关于本站/使用规范
                    </a>
                    <a href="{{ route('help') }}" class="btn btn-lg btn-info btn-block sosad-button">
                        帮助FAQ
                    </a>
                    <a href="{{ route('contacts') }}" class="btn btn-lg btn-info btn-block sosad-button">
                        联系我们
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
@stop
