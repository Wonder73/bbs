<?php
  //用于返回搜索到的结过
  require 'config.php';
  $searchContent = isset($_POST['search'])?$_POST['search']:'';     //用于保存要检索项
  $type = isset($_POST['type'])?$_POST['type']:'';


  if($type === 'searchIndex'){         //头部的搜索返回
    if($searchContent != ''){
      $sql = "select title from forum where title like '%{$searchContent}%'order by comment desc";
      $res = mysql_query($sql);
      $info = '';
      while($row = mysql_fetch_assoc($res)){
        foreach($row as $k=>$v){
          $row[$k] = urlencode(str_replace('\n','',$v));
        }
        //if(strpos(urldecode($row['title']),$searchContent) !==false){
        $info .= urldecode(json_encode($row)).',';
        //}
      }
      echo '['.substr($info,0,strlen($info)-1).']';
    }
  }else if($type === "showSearch"){      //搜索页面内容的返回
    $max_row = 10;   //一页最多显示的个数；
    $limit = isset($_POST['limit'])?$_POST['limit']:1;     //前台获得数据，如果没有就是1，用于切换页
    $limitState =($limit-1)*$max_row;
    $sql = "select (select COUNT(*) from forum where title like '%{$searchContent}%' or forum_content like '%{$searchContent}%') as count,forum_id as id,game_id,user_id,title,forum_content,date from forum where title like '%{$searchContent}%' or forum_content like '%{$searchContent}%' order by replay,comment desc limit {$limitState},{$max_row}";
    $result = mysql_query($sql);
    $info = '';
    while($row = mysql_fetch_assoc($result)){
      foreach($row as $k=>$v){
        $row[$k] = urlencode(str_replace('\n','',$v));
      }
      $info .= urldecode(JSON_encode($row)).',';
    }
    echo '['.substr($info,0,strlen($info)-1).']';
  }
