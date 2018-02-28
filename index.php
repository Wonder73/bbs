<?php
    require 'top.php';
    require 'config/config.php';
    $today_date = date('Y-m-d');
    $yester_date = date('Y-m-d',strtotime("-1 day"));

    mysql_query("select * from forum" );
    $count = mysql_affected_rows();
    mysql_query("select * from forum where date>'{$yester_date}' and date<'{$today_date}'" );
    $yester_count = mysql_affected_rows();
    mysql_query("select * from forum where date>'{$today_date}'" );
    $today_count = mysql_affected_rows();
    mysql_query("select * from user");
    $user_count = mysql_affected_rows();


    $res  = mysql_query("select * from game where game_type='角色扮演类'");
    $rpg=[];
    while($row = mysql_fetch_assoc($res)){
        $rpg[]=$row;
    }
    $res  = mysql_query("select * from game where game_type='竞速赛车类' order by date desc");
    $speed=[];
    while($row = mysql_fetch_assoc($res)){
        $speed[]=$row;
    }

    $res  = mysql_query("select * from game where game_type='独立游戏类'");
    $duli=[];
    while($row = mysql_fetch_assoc($res)){
        $duli[]=$row;
    }


?>

<link rel="stylesheet" href="css/index.css" type="text/css">
<script src="js/index.js" type="text/javascript"></script>

<div class="top_span"></div>
<div class="clear_float"></div>
<section>
    <div class="index_top">
        <div class="lunBo document-width">
            <div class="lunBo_img">
                <ul>
                    <li><a href="forum.php?game_id=33"><img src="images/lunbo1.jpg"><a></li>
                    <li><a href="forum.php?game_id=37"><img src="images/lunbo2.jpg"><a></li>
                    <li><a href="forum.php?game_id=28"><img src="images/lunbo3.jpg"><a></li>
                    <li><a href="forum.php?game_id=27"><img src="images/lunbo4.jpg"><a></li>
                    <li><a href="forum.php?game_id=39"><img src="images/lunbo5.jpg"><a></li>
                </ul>
            </div>
            <div class="lunBo_nav">
                <ul class="img">
                    <li><img src="images/lunbo1.jpg"></li>
                    <li><img src="images/lunbo2.jpg"></li>
                    <li><img src="images/lunbo3.jpg"></li>
                    <li><img src="images/lunbo4.jpg"></li>
                    <li><img src="images/lunbo5.jpg"></li>
                </ul>
                <ul class="not_img">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <div class="move_div"></div>
            </div>
        </div>
    </div>

    <div id="postamount" class="document-width">
        <ul><li>今日：<?php echo $today_count?></li><li>昨日：<?php echo $yester_count?></li><li>帖子：<?php echo $count?></li><li>会员：<?php echo $user_count?></li></ul>
        <div class="clear_float"></div>
    </div>

    <div class="zj document-width">
        <div class="zj_1">
            <div class="zj_m"><a href="forum.php?game_id=1">异星探险家2</a></div>
            <ul>
                <?php
                    $res = mysql_query("select title,user_id,forum_id as id from forum where game_id = (select game_id from game where game_name = 'astroneer') order by comment desc limit 0,9");
                    $info = [];
                    while($row = mysql_fetch_assoc($res)){
                        $info[] = $row;
                    }
                    for($i=0;$i<count($info);$i++){
                        echo '<li><a href="forum_detail.php?forum_id='.$info[$i]['id'].'&game_id=1&user_id='.$info[$i]['user_id'].'">'.$info[$i]['title'].'</a></li>';
                    }
                ?>
            </ul>
        </div>

        <div class="zj_1">
            <div class="zj_m"><a href="forum.php?game_id=4">异星探险家2</a></div>
            <ul>
                    <?php
                    $res = mysql_query("select title,user_id,forum_id as id from forum where game_id = (select game_id from game where game_name = 'astroneer1') order by comment desc limit 0,9");
                    $info = [];
                    while($row = mysql_fetch_assoc($res)){
                        $info[] = $row;
                    }
                    for($i=0;$i<count($info);$i++){
                        echo '<li><a href="forum_detail.php?forum_id='.$info[$i]['id'].'&game_1id=4&user_id='.$info[$i]['user_id'].'">'.$info[$i]['title'].'</a></li>';
                    }
                    ?>
            </ul>
        </div>

        <div class="zj_1">
            <div class="zj_m"><a href="forum.php?game_id=38">FIFA18</a></div>
            <ul>
                <ul>
                    <?php
                    $res = mysql_query("select title,user_id,forum_id as id from forum where game_id = (select game_id from game where game_name = 'fifa18') order by comment desc limit 0,9");
                    $info = [];
                    while($row = mysql_fetch_assoc($res)){
                        $info[] = $row;
                    }
                    for($i=0;$i<count($info);$i++){
                        echo '<li><a href="forum_detail.php?forum_id='.$info[$i]['id'].'&game_id=38&user_id='.$info[$i]['user_id'].'">'.$info[$i]['title'].'</a></li>';
                    }
                    ?>
                </ul>
            </ul>
        </div>

        <div class="zj_1">
            <div class="zj_m"><a href="forum.php?game_id=23">暗黑破坏神3</a></div>
            <ul>
                <?php
                $res = mysql_query("select title,user_id,forum_id as id from forum where game_id = (select game_id from game where game_name = 'Diablo3') order by comment desc limit 0,9");
                $info = [];
                while($row = mysql_fetch_assoc($res)){
                    $info[] = $row;
                }
                for($i=0;$i<count($info);$i++){
                    echo '<li><a href="forum_detail.php?forum_id='.$info[$i]['id'].'&game_id=23&user_id='.$info[$i]['user_id'].'">'.$info[$i]['title'].'</a></li>';
                }
                ?>
            </ul>
        </div>
        <div class="clear_float"></div>
    </div>
    <div class="clear_float"></div>
    <div class="rpg document-width">
        <div class="tag">
            <h2>角色扮演类</h2>
        </div>
        <div class="content">
            <ul class="1">
                <?php
                    $count = count( $rpg)>6?6:count( $rpg);
                    for($i=0;$i<$count ;$i++){
                        echo     '<li><img src="images/'.$rpg[$i]['game_img'].'" width="120" height="70"><div class="game_info"><a href="forum.php?game_id='.$rpg[$i]['game_id'].'">'.$rpg[$i]['game_name_cn'].'</a><span>'.$rpg[$i]['game_description'].'</span><p>帖子：<span>'.$rpg[$i]['forum_count'].'</span></p></div></li>';
                   }
                ?>
                <div class="clear_float"></div>
            </ul>
        </div>
    </div>
    <div class="speed document-width">
        <div class="tag">
            <h2>体育竞速类</h2>
        </div>
        <div class="content">
            <ul class="1">
                <?php
                $count = count( $speed)>6?6:count( $speed);
                for($i=0;$i<$count;$i++){
                    echo     '<li><img src="images/'.$speed[$i]['game_img'].'" width="120" height="70"><div class="game_info"><a href="forum.php?game_id='.$speed[$i]['game_id'].'">'.$speed[$i]['game_name_cn'].'</a><span>'.$speed[$i]['game_description'].'</span><p>帖子：<span>'.$speed[$i]['forum_count'].'</span></p></div></li>';
                }
                ?>
                <div class="clear_float"></div>
            </ul>
        </div>
    </div>
    <div class="duli document-width">
        <div class="tag">
            <h2>独立游戏类</h2>
        </div>
        <div class="content">
            <ul class="1">
                <?php
                $count = count( $duli)>6?6:count( $duli);
                for($i=0;$i<$count;$i++){
                    echo     '<li><img src="images/'.$duli[$i]['game_img'].'" width="120" height="70"><div class="game_info"><a href="forum.php?game_id='.$duli[$i]['game_id'].'">'.$duli[$i]['game_name_cn'].'</a><span>'.$duli[$i]['game_description'].'</span><p>帖子：<span>'.$duli[$i]['forum_count'].'</span></p></div></li>';
                }
                ?>
                <div class="clear_float"></div>
            </ul>
        </div>
    </div>
</section>

<div class="clear_float"></div>

<?php require 'bottom.php'?>
