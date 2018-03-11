<?php
/*管理员显示全部帖子*/
require'config.php';

$type = $_POST['type'];

if($type == 'show'){
    $max_row=10;
    $limit=isset($_POST['limit'])?$_POST['limit']:1;
    $limit_start=($limit-1)*$max_row;

    $sql = "select (select COUNT(*) from game) as count,game_id as id,game_name,game_name_cn,game_img,game_type,game.date,forum_count,(select username from user where user_id=admin_id) as admin_name, admin_id as user_id from game order by game.date desc limit $limit_start,$max_row";
    $res = mysql_query($sql);
    $info='';
    while($row = mysql_fetch_assoc($res)){
        foreach($row as $k=>$v){
            $row[$k] = urlencode(str_replace('\n','',$v));
        }
        $info .= urldecode(json_encode($row)).',';
    }
    echo '['.substr($info,0,strlen($info)-1).']';
}else if($type == 'insert'){
    $game_name =$_POST['game_name'];
    $game_name_cn = $_POST['game_name_cn'];
    $game_img = $game_name;
    $game_type = $_POST['game_type'];
    $game_description = $_POST['game_description'];
    mysql_query("select * from game where game_name='{$game_name}'");
    if(mysql_affected_rows()>1){
        echo '游戏已存在！！';
    }else{
        mysql_query("insert game(game_name,game_name_cn,game_img,game_type,game_description) values('{$game_name}','{$game_name_cn}','{$game_img}.jpg','{$game_type}','{$game_description}')");
        echo mysql_affected_rows();
    }
}else if($type == 'del'){
    $game_id=$_POST['game_id'];
    $game_name=$_POST['game_name'];
    mysql_query("delete from forum_small_com where big_id=(select big_com_id from forum_big_com where game_id={$game_id})");
    mysql_query("delete from forum_big_com where game_id={$game_id}");
    mysql_query("delete from forum where game_id={$game_id}");
    mysql_query("delete from game where game_id={$game_id}");
}else if($type == 'show_all'){           //加载所有游戏
    $max_row=10;
    $limit=isset($_POST['limit'])?$_POST['limit']:1;
    $limit_start=($limit-1)*$max_row;

    $sql = "select (select COUNT(*) from game) as count,game_id as id,game_name_cn,game_img,forum_count,date from game order by date desc limit $limit_start,$max_row";
    // echo $sql;
    $res = mysql_query($sql);
    $info='';
    while($row = mysql_fetch_assoc($res)){
        foreach($row as $k=>$v){
            $row[$k] = urlencode(str_replace('\n','',$v));
        }
        $info .= urldecode(json_encode($row)).',';
    }
    echo '['.substr($info,0,strlen($info)-1).']';
}
