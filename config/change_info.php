<?php
/*修改信息*/
require'config.php';

    $type = $_POST['type'];

    if($type === 'info'){
        $nickname = $_POST['nickname'];
        $sex = ($_POST['sex'] === 'male') ? '男':'女';
        $age = empty($_POST['age'])?'null':$_POST['age'];
        $birth_date = empty($_POST['birth_date'])?'null':$_POST['birth_date'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $address = empty($_POST['address'])?'null':$_POST['address'];
        $description = empty($_POST['description'])?'我这个人很懒什么都没留下......':$_POST['description'];
        $user_id = $_POST['user_id'];


        $sql = "update user set nickname='{$nickname}', sex='{$sex}', age='{$age}', birth_date='{$birth_date}', email='{$email}', phone='{$phone}', address='{$address}', description='{$description}' where user_id ={$user_id}";
        mysql_query($sql);
        echo mysql_affected_rows();
    }else if($type === 'password'){
        $password = md5($_POST['password']);
        $captcha = $_POST['captcha'];
        $user_id = $_POST['cookie_id'];

    //开启session
        session_start();

    //判断SESSION中是否存在验证码
        if(empty($_SESSION['captcha_code'])){
            echo -2;
        }
    //将字符串都转成小写然后再进行比较
        if (strtolower($captcha) == strtolower($_SESSION['captcha_code'])){
            $sql = "update user set password = '{$password}' where user_id = {$user_id}";
            mysql_query($sql);
            echo mysql_affected_rows();
        } else{
            echo -1;
        }
    }else if($type === 'privacy'){
        $privacy = $_POST['privacy'];
        $user_id = $_POST['user_id'];
        $sql = "update user set privacy = '{$privacy}' where user_id = {$user_id}";
        mysql_query($sql);
        echo mysql_affected_rows();
    }else if($type === 'get_privacy'){
        $user_id = $_POST['user_id'];
        $sql = "select privacy from user where user_id={$user_id}";
        $res = mysql_query($sql);
        $row = mysql_fetch_assoc($res);
        echo $row['privacy'];
    }
