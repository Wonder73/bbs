<?php
    require 'config.php';

    $type = $_POST['type'];

    if($type == 'visit'){         //home访问
        $user_id = $_POST['user_id'];
        mysql_query("update user set visit=visit+1 where user_id ={$user_id}");
    }else if($type == 'like'){       //home点赞
        $user_id = $_POST['user_id'];
        $cookie_id = $_POST['cookie_id'];
        $time = date('Y-m-d');



        mysql_query("select * from `like` where cookie_id = {$cookie_id} and date<'{$time}'");
        $list = mysql_affected_rows();
        if($list<=0){
            mysql_query("update user set `like`=`like`+1 where user_id ={$user_id}");
            $sql = "insert `like`(user_id,cookie_id) values({$user_id},{$cookie_id})";
            mysql_query($sql);
            echo mysql_affected_rows();
        }else{
            echo 0;
        }

    }else if($type == 'sign_in'){
        $user_id=$_POST['user_id'];
        $game_id=$_POST['game_id'];
        $time = date('Y-m-d');
        mysql_query("select * from sign_in where date>'{$time}' and user_id={$user_id} and game_id='{$game_id}'");
        if(mysql_affected_rows()<=0){
            $sql = "insert sign_in(user_id,game_id) values('{$user_id}','{$game_id}')";
            mysql_query($sql);
            echo mysql_affected_rows();
            mysql_query("update game set sign_in=sign_in+1 where game_id='{$game_id}'");
            mysql_query("update user set exp = exp+5 where user_id = {$user_id}");
        }else{
            echo 0;
        }
    }
