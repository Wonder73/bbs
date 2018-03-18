<?php
  //用于关注的各项操作
  require 'config.php';
  $userId = isset($_POST['user_id'])?$_POST['user_id']:'';       //用户的ID
  $cookieId = isset($_POST['cookie_id'])?$_POST['cookie_id']:'';   //被关注人的ID
  $type = isset($_POST['type'])?$_POST['type']:'';    //用户要执行的操作

  if($type === 'no'){            //关注
    mysql_query("select * from follow where user_id={$cookieId} and follow_user_id={$userId}");
    if(mysql_affected_rows()<=0){
      $sql = "insert follow(user_id,follow_user_id) values({$cookieId},{$userId})";
      mysql_query($sql);
      echo mysql_affected_rows();
    }else{
      echo -1;
    }
  }else if($type === 'off'){
    $sql = "delete from follow where user_id={$cookieId} and follow_user_id={$userId}";
    mysql_query($sql);
    echo mysql_affected_rows();
  }else if($type === 'show'){
    $show_type = isset($_POST['show_type'])?$_POST['show_type']:'';    //用户要显示的关注类型

    $show_row = 10;    //显示行数
    $limit_num = isset($_POST['limit'])?$_POST['limit']:1;    //第几页 ，默认第一页
    $limit_start =  ($limit_num-1) * $show_row;            //每一页的开始位置
    $limit = "limit {$limit_start},{$show_row}";

    $sql = '';
    if($show_type === 'follow'){       //关注的人
      //$sql = "select (select COUNT(*) from follow where user_id={$userId}) as count,follow_user_id as id,username,nickname,top_img from follow,user where follow.follow_user_id=user.user_id and follow.user_id={$userId} order by date desc {$limit}";
      $sql = "select (select COUNT(*) from follow where user_id={$userId}) as count,follow_user_id as id,username,nickname,top_img from follow,user where follow.follow_user_id=user.user_id and follow.user_id={$userId} order by date desc {$limit}";
    }else if($show_type === 'already'){    //被关注的人
      $sql = "select (select COUNT(*) from follow where follow_user_id={$userId}) as count,follow.user_id as id,username,nickname,top_img from follow,user where follow.user_id=user.user_id and follow_user_id={$userId} order by date desc {$limit}";
    }
    $res = mysql_query($sql);
    if(mysql_affected_rows()<=0) echo $sql;
    $info = "";
    while($row = mysql_fetch_assoc($res)){
      foreach($row as $k=>$v){
        $row[$k] = urlencode(str_replace('\n','',$v));
      }
      $info .= urldecode(json_encode($row)).',';
    }
    echo '['.substr($info,0,strlen($info)-1).']';

  }else if($type === 'check'){      //查看是否被关注
    mysql_query("select * from follow where user_id={$cookieId} and follow_user_id={$userId}");
    echo mysql_affected_rows();
  }else if($type === 'count'){      //计数
    mysql_query("select * from follow where user_id={$userId}");
    echo mysql_affected_rows().',';
    mysql_query("select * from follow where follow_user_id={$userId}");
    echo mysql_affected_rows();
  }
?>
