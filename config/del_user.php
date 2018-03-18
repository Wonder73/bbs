<?php
    //删除用户
    require 'config.php';

    $user_id = $_POST['user_id'];

    $res = mysql_query('select game_name from game');

    while($row = mysql_fetch_assoc($res)){
        mysql_query("delete from forum where user_id = {$user_id}");
        mysql_query("delete from forum_big_con where user_id = {$user_id}");
        mysql_query("delete from forum_small_con where user_id = {$user_id}");
    }

    mysql_query("delete from user where user_id={$user_id}");
