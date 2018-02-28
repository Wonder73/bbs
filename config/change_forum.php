<?php
/*操作帖子*/
    require'config.php';

    $type = $_POST['type'];
    $game_id = $_POST['game_id'];
    $forum_id = $_POST['forum_id'];

    if($type == 'del'){
        mysql_query("delete from forum_small_com where big_id=(select big_com_id from forum_big_com where forum_id={$forum_id})");
        mysql_query("delete from forum_big_com where forum_id={$forum_id}");
        mysql_query("delete from forum where forum_id={$forum_id}");
    }else if($type =='edit'){
        $title = $_POST['title'];
        $content = $_POST['content'];
        $sql = "update forum set title='{$title}',forum_content='{$content}' where forum_id={$forum_id}";
        mysql_query($sql);
        echo mysql_affected_rows();
    }else if($type == 'get_content'){
        $sql = "select forum_content from forum where forum_id = {$forum_id}";
        $res = mysql_query($sql);
        $row = mysql_fetch_assoc($res);
        echo $row['forum_content'];
    }else if($type == 'clear_head'){
        mysql_query("update forum set overhead=0 where forum_id={$forum_id}");
        echo mysql_affected_rows();
    }else if($type == 'head'){
        mysql_query("select * from forum where overhead=1");
        if(mysql_affected_rows()<4){
            mysql_query("update forum set overhead=1 where forum_id={$forum_id}");
            echo mysql_affected_rows();
        }else{
            echo '0';
        }

    }
