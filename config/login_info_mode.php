<?php
    /*登录信息*/
    require 'config.php';

    $type=$_POST['type'];

    if($type == 'login_info'){
        $user_id = $_POST['user_id'];
        $username = $_POST['username'];
        $password = $_POST['password'];


        $res = mysql_query("select user_id,username,password,nickname,description,exp,top_img from user where user_id=$user_id");
        if($row = mysql_fetch_assoc($res)){

            if($username === $row['username'] && $password === $row['password']){

                foreach($row as $k => $v){
                    $row[$k] = urlencode($v);
                }
                echo urldecode(json_encode($row));
            }else{
                echo '0';
            }
        }else{
            echo '0';
        }

    }

