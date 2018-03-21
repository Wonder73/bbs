<?php
  require "config.php";
  $userId = isset($_POST['cookie_id'])?$_POST['cookie_id']:(isset($_POST['user_id'])?$_POST['user_id']:"");        //用户ID
  $forumId = isset($_POST['forum_id'])?$_POST['forum_id']:"";     //帖子ID
  $type = isset($_POST['type'])?$_POST['type']:"";               //操作类型
  if($type === "collect"){           //收藏
    mysql_query("select * from collect where user_id = {$userId} and forum_id={$forumId}");
    if(!mysql_affected_rows()){
      $sql = "insert into collect(user_id,forum_id) values({$userId},{$forumId})";
      mysql_query($sql);
      $sql = "update forum set collect=collect+1 where forum_id={$forumId}";
      mysql_query($sql);
      echo mysql_affected_rows();
    }else{
      echo 0;
    }
  }else if($type === "uncollect"){     //取消收藏
    mysql_query("delete from collect where user_id={$userId} and forum_id={$forumId}");
    echo mysql_affected_rows();
  }else if($type === "showCollect"){     //显示收藏
    $listNum = 10;
    $limit = isset($_POST['limit'])?$_POST['limit']:1;
    $limitStart = ($limit-1)*$listNum;

    $sql = "select (select COUNT(*) from collect where user_id={$userId}) as count,collect.forum_id,title,game_id,forum.user_id,collect.date from collect,forum where forum.forum_id=collect.forum_id and collect.user_id={$userId} order by collect.date desc limit {$limitStart},{$listNum}";
    $result = mysql_query($sql);
    $info = "";
    while($row = mysql_fetch_assoc($result)){
      foreach($row as $k=>$v){
        $row[$k] = urlencode(str_replace('\n','',$v));
      }
      $info .= urldecode(json_encode($row)).',';
    }
    echo '['.substr($info,0,strlen($info)-1).']';
  }
?>
