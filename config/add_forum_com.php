<?php
    /*添加帖子和评论*/
    require'config.php';

    $type = $_POST['type'];

    if($type == 'add_forum'){     //添加帖子
        $date = date('Y-m-d');
        mysql_query("select * from forum where user_id ={$_POST['user_id']} and date>'$date' and game_id={$_POST['game_id']} ");
        if($_POST['lv'] >= mysql_affected_rows()){
//            $sql = "insert into {$_POST['game_name']}(user_id,title,forum_content,game_id) values('{$_POST['user_id']}','{$_POST['title']}','{$_POST['content']}','{$_POST['game_id']}')";
            $sql = "insert into forum(user_id,title,forum_content,game_id) values('{$_POST['user_id']}','{$_POST['title']}','{$_POST['content']}','{$_POST['game_id']}')";
            mysql_query($sql);
            echo mysql_affected_rows();
            mysql_query("update game set forum_count=forum_count+1 where game_name='{$_POST['game_name']}'");
            mysql_query("update user set exp = exp+10 where user_id = {$_POST['user_id']}");
        }else{
            echo '0';
        }

    }else if($type=='add_big_com'){         //添加评论
        $game_id = $_POST['game_id'];
        $user_id = $_POST['user_id'];
        $forum_id = $_POST['forum_id'];
        $text = $_POST['html'];
        mysql_query("select * from forum_big_com where forum_id={$forum_id} and game_id={$game_id}");
        $position = mysql_affected_rows()+2;

        $sql = "insert forum_big_com(forum_id,user_id,game_id,text,position) values({$forum_id},{$user_id},{$game_id},'{$text}',{$position})";
        mysql_query($sql);
        echo mysql_affected_rows();
        mysql_query("update forum set comment=comment+1 where forum_id={$forum_id}");
        mysql_query("update user set exp = exp+3 where user_id = {$user_id}");
    }
