<?php
/*管理员显示全部帖子*/
require'config.php';
$admin_id =$_POST['admin_id'];
$res = mysql_query("select game_id from game where admin_id ={$admin_id}");
$row = mysql_fetch_assoc($res);
$game_id = $row['game_id'];

$max_row=10;
$limit=isset($_POST['limit'])?$_POST['limit']:1;
$limit_start=($limit-1)*$max_row;

$sql = "select (select COUNT(*) from forum where game_id={$game_id}) as count,forum_id as id,user_id,title,date,replay,comment,overhead,(select game_id from game where admin_id ={$admin_id}) as game_id,(select game_name_cn from game where admin_id ={$admin_id}) as game_name_cn from forum where game_id={$game_id} order by overhead desc,date desc limit $limit_start,$max_row";
$res = mysql_query($sql);
$info='';
while($row = mysql_fetch_assoc($res)){
    foreach($row as $k=>$v){
        $row[$k] = urlencode(str_replace('\n','',$v));
    }
    $info .= urldecode(json_encode($row)).',';
}
echo '['.substr($info,0,strlen($info)-1).']';
