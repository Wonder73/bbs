<?php
    //设置权限
    require'config.php';

    $type =$_POST['type'];

    if($type == 'show'){
        $sql = "select game_name,game_name_cn from game";
        $res = mysql_query($sql);
        $info='';
        while($row = mysql_fetch_assoc($res)){
            foreach($row as $k=>$v){
                $row[$k] = urlencode(str_replace('\n','',$v));
            }
            $info .= urldecode(json_encode($row)).',';
        }
        echo '['.substr($info,0,strlen($info)-1).']';
    }else if($type == 'root'){
        $game_name = $_POST['game_name'];
        $user_id =$_POST['user_id'];
        mysql_query("update user set type='普通用户' where user_id = (select admin_id from game where game_name='{$game_name}')");
        mysql_query("update user set type='管理员' where user_id ={$user_id} ");
        mysql_query("update game set admin_id={$user_id} where game_name='{$game_name}'");

    }