<?php
/*加载小评论，随便客串一下楼主的热帖*/
    require'config.php';

    $type = $_POST['type'];
    $big_id = isset($_POST['big_id'])?$_POST['big_id']:'';
    $user_id = isset($_POST['user_id'])?$_POST['user_id']:'';
    $game_id = $_POST['game_id'];
    $text = isset($_POST['text'])?$_POST['text']:'';

    if($type === 'hot'){
        $sql = "select forum_id as id,title from forum where user_id={$user_id} order by replay desc limit 0,10";
        $res = mysql_query($sql);
        $info = '';
        while($row = mysql_fetch_assoc($res)){
            foreach($row as $k=>$v){
                $row[$k] = urlencode(str_replace('\n','',$v));
            }
            $info.=urldecode(json_encode($row)).',';
        }
        echo '['.substr($info,0,strlen($info)-1).']';
    }else if($type === 'insert'){
        $sql = "insert forum_small_com(big_id,user_id,text) values({$big_id},{$user_id},'{$text}')";
        mysql_query($sql);
        echo mysql_affected_rows();
        mysql_query("update user set exp = exp+2 where user_id = {$user_id}");
    }else{
        $sql = "select nickname as username,text,forum_small_com.date,forum_small_com.user_id from forum_small_com,user where forum_small_com.user_id=user.user_id and big_id={$big_id} order by date asc";
        $res = mysql_query($sql);
        $info = '';
        while($row = mysql_fetch_assoc($res)){
            foreach($row as $k=>$v){
                $row[$k] = urlencode(str_replace('\n','',$v));
            }
            $info.=urldecode(json_encode($row)).',';
        }
        echo '['.substr($info,0,strlen($info)-1).']';
    }
