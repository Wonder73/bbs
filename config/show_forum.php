<?php
    /*显示帖子*/
    require'config.php';

    $show_type=$_POST['show_type'];


    if($show_type=='forum'){       //显示forum.php页的帖子
        $max_row=10;
        $limit=isset($_POST['limit'])?$_POST['limit']:1;
        $limit_start=($limit-1)*$max_row;
        $game_id = $_POST['game_id'];

        if(!empty($_POST['type'])){
            $type=$_POST['type'];
            if($type === 'new_date'){
                $order = "order by date desc";
            }else if($type === 'old_date'){
                $order = "order by date asc";
            }else{
                $order = "order by $type desc";
            }
        }else{
            $order='';
        }
        $sql = "select (select COUNT(*) from forum where game_id = {$game_id}) as count,forum_id as id,user.user_id,title,forum.date,replay,comment,nickname as username,top_img from forum,user where forum.user_id=user.user_id and game_id = {$game_id} {$order} limit $limit_start,$max_row";
        $res = mysql_query($sql);
        $info='';
        while($row = mysql_fetch_assoc($res)){
            foreach($row as $k=>$v){
                $row[$k] = urlencode(str_replace('\n','',$v));
            }
            $info .= urldecode(json_encode($row)).',';
        }
        echo '['.substr($info,0,strlen($info)-1).']';
    }else if($show_type == 'overhead'){             //显示置顶帖子
        $game_id=$_POST['game_id'];
        if(!isset($_POST['replay'])){
            $sql = "select (select COUNT(*) from forum where game_id={$game_id}) as count,forum_id as id,forum.user_id,title,forum.date,replay,comment,nickname as username,top_img from forum,user where forum.user_id=user.user_id and overhead=1 and game_id = {$game_id} order by date limit 0,4";
            $res = mysql_query($sql);

            $info = '';
            while($row = mysql_fetch_assoc($res)){
                foreach($row as $k=>$v){
                    $row[$k] = urlencode(str_replace('\n','',$v));
                }
                $info .= urldecode(json_encode($row)).',';
            }

            echo '['.substr($info,0,strlen($info)-1).']';
        }else{
            $forum_id=$_POST['forum_id'];
            $sql = "update forum set replay=replay+1 where forum_id={$forum_id}";
            mysql_query($sql);
            echo mysql_affected_rows();
        }
    }else if($show_type == 'big_com'){         //显示大评论
        $forum_id = $_POST['forum_id'];
        $game_id = $_POST['game_id'];

        $max_row=10;
        $limit=isset($_POST['limit'])?$_POST['limit']:1   ;
        $limit_start=($limit-1)*$max_row;


        $sql = "select (select COUNT(*) from forum_big_com where forum_id={$forum_id} and game_id={$game_id}) as count,big_com_id as id,forum_big_com.user_id,text,forum_big_com.date,position,nickname as username,top_img from forum_big_com,user  where forum_big_com.user_id=user.user_id and forum_id={$forum_id} and game_id={$game_id} order by forum_big_com.date limit $limit_start,$max_row";
        $res = mysql_query($sql);
        $info='';
        while($row = mysql_fetch_assoc($res)){
            foreach($row as $k=>$v){
                $row[$k] = urlencode(str_replace('\n','',$v));
            }
            $info .= urldecode(json_encode($row)).',';
        }
        echo '['.substr($info,0,strlen($info)-1).']';
    }else if($show_type == 'user_forum'){              //home页面的用户帖子
        $user_id = $_POST['user_id'];
        $max_row=10;
        $limit=isset($_POST['limit'])?$_POST['limit']:1;
        $limit_start=($limit-1)*$max_row;

        $sql = "select (select COUNT(*) from forum where user_id={$user_id}) as count,forum_id as id,title,forum.date,replay,comment,forum.game_id,game_name,game_name_cn from forum,game where forum.game_id = game.game_id and user_id={$user_id} order by forum.date desc limit $limit_start,$max_row";
        $res = mysql_query($sql);
        $info='';
        while($row = mysql_fetch_assoc($res)){
            foreach($row as $k=>$v){
                $row[$k] = urlencode(str_replace('\n','',$v));
            }
            $info .= urldecode(json_encode($row)).',';
        }
        echo '['.substr($info,0,strlen($info)-1).']';
    }else if($show_type == 'show_user'){            //超级管理员显示用户
        $max_row=10;
        $limit=isset($_POST['limit'])?$_POST['limit']:1;
        $limit_start=($limit-1)*$max_row;

        $sql = "select (select COUNT(*) from user) as count,user_id as id,username,top_img,login_date,type,date,(select game_name_cn from game where admin_id=user_id)as game_name from user order by type desc limit $limit_start,$max_row";
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
