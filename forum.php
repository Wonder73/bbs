<?php
//f098e67aeacca172a0c2e069b2e6a660aacff975
    require 'top.php';
    require 'config/config.php';

    $game_id = $_GET['game_id'];
    $time = date('Y-m-d');
    $res = mysql_query("select game_name,game_name_cn,(select COUNT(*) from sign_in where date > '{$time}' and game_id = {$game_id}) as sign_in from game where game_id={$_GET['game_id']}");
    $info = mysql_fetch_assoc($res);

    $game_name=$info['game_name'];
    $date=date('Y-m-d');
    mysql_query("select * from forum where game_id = $game_id");
    $count_forum=mysql_affected_rows();
    mysql_query("select * from forum where game_id = $game_id and date>'{$date}'");
    $today_count_forum=mysql_affected_rows();
?>
    <link rel="stylesheet" href="css/forum.css" type="text/css">
    <script src="js/wangEditor.min.js" type="text/javascript"></script>
    <script src="js/forum.js" type="text/javascript"></script>
<div class="top_span"></div>
<div class="clear_float"></div>
<!--导航-->
    <p class="nav document-width">> <a href="index.php">社区</a> > <a href="#"><?php echo $info['game_name_cn']?></a></p>
<!--标题-->
<div class="forum_top document-width" game_name="<?php echo $info['game_name']?>">
    <h2><?php echo $info['game_name_cn']?></h2>
    <ul>
        <li>今日：<span><?php echo $today_count_forum?></span></li>
        <li>帖子数：<span><?php echo $count_forum?></span></li>
    </ul>
</div><!--forum_top-->
<!--主体内容-->
<div class="forum_body document-width">
    <div class="forum_body-left">
        <!--分类-->
        <ul class="cate">
            <li  type="new_date">
                <i class="newHead"></i>最新
            </li>
            <li type="replay">
                <i class="hostHead"></i>最热门
            </li>
            <li type="comment">
                <i class="veryHead"></i>评论最多
            </li>
            <li type="old_date">
                <i class="lastHead"></i>最后发表
            </li>
            <div class="clear_float"></div>
        </ul>
        <!--顶置的4条数据-->
        <ul class="overHead forum_title">
            <!--加载顶置的帖子-->
        </ul>
        <ul class="not_overHead forum_title">
            <!--后台加载-->
        </ul>
        <!--导航条-->
        <ul class="list">
            <!--后台加载-->

        </ul>

    </div><!--forum_body-left-->
    <div class="forum_body-right">
        <!--签到 -->
        <div class="sign_in">
            <i><img src="images/tou.png"><span>签到</span></i>
            <p>签到人数：<?php echo $info['sign_in']?>人</p>
            <div class="clear_float"></div>
        </div><!--sign_in-->

        <!--发帖-->
        <div class="post_msg">
            <img src="images/post_big.png" alt="">
        </div><!--post_msg-->

        <div class="clear_float"></div>
        <!--二维码-->
        <div class="QR_code">
            <p>绝望之地订阅号</p>
            <img src="images/QR_code.JPG" alt="">
            <p>绝望之地QQ群</p>
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div><!--QR_code-->


    </div><!--forum_bodu-right-->
</div><!--forum_body-->


<div class="clear_float"></div>
<div id="shadow"><!--我是一个阴影--></div>
<div class="editor_msg">
    <h2>编辑文章</h2>
    <form action="">
        <label for="msg_title">标题：</label><input type="text" placeholder="输入您的标题" id="msg_title" class="msg_title">
        <div class="editor_msg-title" id="editor_title"></div>
        <div class="editor_msg-centent" id="editor_centent"></div>
        <input type="button" value="发表文章" class="post_editor">
    </form>
    <div class="close"></div>
</div>
<?php require 'bottom.php';?>
