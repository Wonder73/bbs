<?php
    /*登录方式和注册*/
    require'config.php';
    $username = isset($_POST['username']) ? $_POST['username']:'';
    $nickname= isset($_POST['nickname']) ? $_POST['nickname']:'';
    $email = isset($_POST['email']) ? $_POST['email']:'';
    $phone = isset($_POST['phone']) ? $_POST['phone']:'';
    $type = $_POST['type'];
    $user_id = isset($_POST['user_id'] ) ?$_POST['user_id'] :'';

    if($type === 'reg'){
        if($username != ''){
            $sql = "select * from user where username='{$username}'";
        }else if($email != ''){
            $sql = "select * from user where email='{$email}'";
        }else if($phone != ''){
            $sql = "select * from user where phone='{$phone}'";
        }
    }else{
        if($nickname != ''){
            $sql = "select * from user where nickname='{$nickname}' and user_id <> {$user_id}";
        }else if($email != ''){
            $sql = "select * from user where email='{$email}' and user_id <> {$user_id}";
        }else if($phone != ''){
            $sql = "select * from user where phone='{$phone}' and user_id <> {$user_id}";
        }
    }
    mysql_query($sql);
    echo mysql_affected_rows();
