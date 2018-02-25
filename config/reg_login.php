<?php
    require'config.php';

    $type = $_POST['type'];

    if($type == 'login'){
        /*用户登录*/
        $username = $_POST['username'];
        $password = md5($_POST['password']);
        $captcha = !empty($_POST['captcha'] != '')?$_POST['captcha']:'';
        $date = date('Y-m-d');

        $sql = "select user_id,username,password,exp from user where username='{$username}' or email='{$username}' or phone='{$username}'";
        $res = mysql_query($sql);

        if(!empty($captcha)){
            //开启session
            session_start();
            //判断SESSION中是否存在验证码
            if(empty($_SESSION['captcha_code'])){
                echo -2;
            }

            //将字符串都转成小写然后再进行比较
            if (strtolower($captcha) == strtolower($_SESSION['captcha_code'])){
                if($row = mysql_fetch_assoc($res)){
                    if($row['password'] === $password){
                        echo json_encode($row);
                        mysql_query("update user set exp = exp+10,login_date = '$date' where username = '$username' and login_date < '$date'");
                    }else{
                        echo '0';
                    }
                }else{
                    echo '0';
                }
            } else{
                echo -1;
            }
        }else{
            if($row = mysql_fetch_assoc($res)){
                if($row['password'] === $password){
                    echo json_encode($row);
                    mysql_query("update user set exp = exp+10,login_date = '$date' where username = '$username' and login_date < '$date'");
                }else{
                    echo '0';
                }
            }else{
                echo '0';
            }
        }
    }else if($type == 'reg'){
        $username = $_POST['username'];
        $password = md5($_POST['password']);
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $sex = ($_POST['sex'] === 'male') ? '男':'女';
        $captcha = $_POST['captcha'];

        //开启session
        session_start();

        //判断SESSION中是否存在验证码
        if(empty($_SESSION['captcha_code'])){
            echo -2;
        }

        //将字符串都转成小写然后再进行比较
        if (strtolower($captcha) == strtolower($_SESSION['captcha_code'])){
            $sql = "insert user(username,password,email,phone,sex) values('{$username}','{$password}','{$email}','{$phone}','{$sex}')";
            mysql_query($sql);
            echo mysql_affected_rows();
        } else{
            echo -1;
        }
    }



