<?php

    /*留言板*/
    require'config.php';

    $type = $_POST['type'];
    $max_row=10;
    $limit=isset($_POST['limit'])?$_POST['limit']:1   ;
    $limit_start=($limit-1)*$max_row;

    if($type == 'show'){
        $user_id = $_POST['user_id'];
        $sql = "select (select COUNT(*) from message where user_id={$user_id})as count, msg_id,cookie_id,message_content,message.date,username,top_img from message,user where message.cookie_id=user.user_id and message.user_id={$user_id} order by message.date desc limit $limit_start,$max_row";
        $res = mysql_query($sql);
        $info='';
        while($row = mysql_fetch_assoc($res)){
            foreach($row as $k=>$v){
                $row[$k] = urlencode(str_replace('\n','',$v));
            }
            $info .= urldecode(json_encode($row)).',';
        }
        echo '['.substr($info,0,strlen($info)-1).']';
    }else if($type =='insert'){
        $user_id = $_POST['user_id'];
        $cookie_id = $_POST['cookie_id'];
        $message_content = $_POST['message_content'];
        $date = date('Y-m-d');
       mysql_query("select * from message where user_id={$user_id} and date>'{$date}'");
       if(mysql_affected_rows()<20){
            $sql = "insert message(user_id,cookie_id,message_content) values ({$user_id},{$cookie_id},'{$message_content}')";
            mysql_query($sql);
            echo mysql_affected_rows();
        }
    }