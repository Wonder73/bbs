<?php
    /*点赞功能*/
    require 'config.php';
    $type=$_POST['type'];
    $game_name = $_POST['game_name'];
    $user_id = $_POST['user_id'];
    $forum_id = $_POST['forum_id'];
    $time = date('Y-m-d');

    mysql_query("select * from end_opp where game_name = '{$game_name}' and user_id = {$user_id} and forum_id={$forum_id}");
    $list = mysql_affected_rows();
    if($list<=0){
        if($type === 'end'){
            $sql = "insert end_opp(user_id,game_name,forum_id,type) values({$user_id},'{$game_name}',{$forum_id},1)";
            mysql_query($sql);
            echo mysql_affected_rows();
            mysql_query("update {$game_name} set end=end+1 where  {$game_name}_id={$forum_id}");
            mysql_query("update user set exp = exp+1 where user_id = {$user_id}");
        }else{
            $sql = "insert end_opp(user_id,game_name,forum_id,type) values({$user_id},'{$game_name}',{$forum_id},0)";
            mysql_query($sql);
            echo mysql_affected_rows();
            mysql_query("update {$game_name} set opp=opp+1 where  {$game_name}_id={$forum_id}");
            mysql_query("update user set exp = exp+1 where user_id = {$user_id}");
        }
    }else{
        echo 0;
    }

