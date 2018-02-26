<?php
    /*点赞功能*/
    require 'config.php';
    $type=$_POST['type'];
    $game_id = $_POST['game_id'];
    $user_id = $_POST['user_id'];
    $forum_id = $_POST['forum_id'];
    $time = date('Y-m-d');

    mysql_query("select * from end_opp where game_id = '{$game_id}' and user_id = {$user_id} and forum_id={$forum_id}");
    $list = mysql_affected_rows();
    if($list<=0){
        if($type === 'end'){
            $sql = "insert end_opp(user_id,game_id,forum_id,type) values({$user_id},{$game_id},{$forum_id},1)";
            mysql_query($sql);
            echo mysql_affected_rows();
            mysql_query("update forum set end=end+1 where forum_id={$forum_id}");
            mysql_query("update user set exp = exp+1 where user_id = {$user_id}");
        }else{
            $sql = "insert end_opp(user_id,game_id,forum_id,type) values({$user_id},{$game_id},{$forum_id},0)";
            mysql_query($sql);
            echo mysql_affected_rows();
            mysql_query("update forum set opp=opp+1 where forum_id={$forum_id}");
            mysql_query("update user set exp = exp+1 where user_id = {$user_id}");
        }
    }else{
        echo 0;
    }
