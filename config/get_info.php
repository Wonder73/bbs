<?php
    require 'config.php';
    //获取home页面的首页的用户信息；
    $user_id = $_POST['user_id'];
    $cookie_id = $_POST['cookie_id'];
    $cookie_username = $_POST['cookie_username'];
    $cookie_password = $_POST['cookie_password'];
    $sup_admin = $_POST['sup_admin'];

    $row = mysql_fetch_assoc(mysql_query("select username,password,type from user where user_id = {$user_id}"));

    if(($user_id === $cookie_id && $cookie_username === $row['username'] && $cookie_password === $row['password']) || $sup_admin == 'true'){
        $type = $row['type'];
            $sql = "select  username,nickname,sex,email,phone,type,birth_date,age,address,top_img,exp,description from user where user_id = {$cookie_id}";
            $res = mysql_query($sql);
            $row = mysql_fetch_assoc($res);
            foreach($row as $k =>$v){
                $row[$k] = urlencode(str_replace('\n','',$v));
            }
            echo $type.'?';
            echo urldecode(json_encode($row));
    }else{
        $sql = "select  username,nickname,sex,email,phone,type,birth_date,age,address,top_img,exp,description,privacy from user where user_id = {$user_id}";
        $res = mysql_query($sql);
        $row = mysql_fetch_assoc($res);
        $array = explode(',',$row['privacy']);
        foreach($row as $k =>$v){
            if(in_array($k,$array)){
                $row[$k] = urlencode('保密');
            }else{
                $row[$k] = urlencode(str_replace('\n','',$v));
            }

        }
        echo urldecode(json_encode($row));
    }
