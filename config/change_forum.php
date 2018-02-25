<?php
/*操作帖子*/
    require'config.php';

    $type = $_POST['type'];

    if($type == 'del'){
        $game_name = $_POST['game_name'];
        $forum_id = $_POST['forum_id'];
        mysql_query("delete from ready_table where id={$forum_id} and game_id = (select game_id from game where game_name = '{$game_name}')");
        mysql_query("delete from {$game_name}_small_com where big_id=(select {$game_name}_big_com_id from {$game_name}_big_com where forum_id={$forum_id})");
        mysql_query("delete from {$game_name}_big_com where forum_id={$forum_id}");
        mysql_query("delete from {$game_name} where {$game_name}_id={$forum_id}");
    }else if($type =='edit'){
        $game_name = $_POST['game_name'];
        $forum_id = $_POST['forum_id'];
        $title = $_POST['title'];
        $content = $_POST['content'];
        $sql = "update {$game_name} set title='{$title}',forum_content='{$content}' where {$game_name}_id={$forum_id}";
        mysql_query($sql);
        echo mysql_affected_rows();
    }else if($type == 'get_content'){
        $game_name = $_POST['game_name'];
        $forum_id = $_POST['forum_id'];
        $sql = "select forum_content from {$game_name} where {$game_name}_id = {$forum_id}";
        $res = mysql_query($sql);
        $row = mysql_fetch_assoc($res);
        echo $row['forum_content'];
    }else if($type == 'clear_head'){
        $game_name = $_POST['game_name'];
        $forum_id = $_POST['forum_id'];
        mysql_query("update {$game_name} set overhead=0 where {$game_name}_id={$forum_id}");
        echo mysql_affected_rows();
    }else if($type == 'head'){
        $game_name = $_POST['game_name'];
        $forum_id = $_POST['forum_id'];
        mysql_query("select * from {$game_name} where overhead=1");
        if(mysql_affected_rows()<4){
            mysql_query("update {$game_name} set overhead=1 where {$game_name}_id={$forum_id}");
            echo mysql_affected_rows();
        }else{
            echo '0';
        }

    }
