<?php
    require'config.php';

    if(!empty($_FILES['top_img'])){

        $user_id = $_GET['user_id'];
        $pic_info = $_FILES['top_img'];
        if($pic_info['error']>0){
            $error_msg="上传错误:";
            switch($pic_info['error']){
                case 1:$error_msg.='文件大小超过了php.ini中upload_max_filesize选项限制的值！';break;
                case 2:$error_msg.='文件大小超过了表单中max_file_size选项指定的值！';break;
                case 3:$error_msg.='文件只有部分被上传！';break;
                case 4:$error_msg.='没有文件本上传！';break;
                case 6:$error_msg.='找不到临时文件！';break;
                case 7:$error_msg.='文件写入失败！';break;
                default:$error_msg .='未知错误！';break;
            }
            echo $error_msg;
            return false;
        }
        $type = strtolower(substr(strrchr($pic_info['name'],'.'),1));
        list ($width,$height) = getimagesize($pic_info['tmp_name']);
        $newheight = $newwidth = 120;
        $thumb = imagecreatetruecolor($newwidth,$newheight);
        if($type == 'jpg'){
            $source=imagecreatefromjpeg($pic_info['tmp_name']);
        }else if($type =='png'){
            $source=imagecreatefrompng($pic_info['tmp_name']);
        }else if($type == 'gif'){
            $source=imagecreatefromgif($pic_info['tmp_name']);
        }else{
            echo '图片格式符合！！！';
            return false;
        }

        imagecopyresized($thumb,$source,0,0,0,0,$newwidth,$newheight,$width,$height);
        $img_name=$user_id.'_avatar.jpg';
        $new_file = '../images/'.$img_name;
        $flag = imagejpeg($thumb,$new_file,100);
        if($flag == '1'){
            $sql = "update user set top_img ='{$img_name}' where user_id = {$user_id} ";
            mysql_query($sql);
            echo 1;
        }

        //echo $pic_info['name'];
    }