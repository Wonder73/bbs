<?php
    require 'top.php';
    require 'config/config.php';

    $game_id = $_GET['game_id'];
    $user_id = $_GET['user_id'];
    $forum_id = $_GET['forum_id'];
    $sql = "select game_id,game_name_cn from game where game_id={$game_id}";
    $res = mysql_query($sql);
    $game_info = mysql_fetch_assoc($res);
    $sql = "select nickname as username,type,top_img,title,forum_content,replay,comment,end,opp,forum.date,forum.user_id from forum,user where forum.user_id=user.user_id and forum_id={$forum_id} and forum.user_id ={$user_id}";
    $res = mysql_query($sql);
    $forum_info = mysql_fetch_assoc($res);
?>
    <link rel="stylesheet" href="css/forum_detail.css" type="text/css">
    <script src="js/wangEditor.min.js" type="text/javascript"></script>
    <script src="js/forum_detail.js" type="text/javascript"></script>
    <div class="top_span"></div>
<div class="clear_float"></div>
<!--导航-->
    <p class="nav document-width">> <a href="index.php">社区</a> > <a href="forum.php?game_id=<?php echo $game_info['game_id'];?>"><?php echo $game_info['game_name_cn'];?></a>> <a href="#"><?php echo $forum_info['title'];?></a></p>
<!--主体内容-->
<div class="forum_body document-width">
    <div class="forum_body-left" game_name="<?php echo $game_info['game_name_cn'];?>">
        <!--帖子详情-->
        <div class="forum_body-detail">
            <h1 forum_id="<?php echo $forum_id;?>"><?php echo $forum_info['title'];?></h1>
            <ul>
                <li><span><a href="home.php?user_id=<?php echo $forum_info['user_id'];?>"><?php echo $forum_info['username'];?></a></span> <?php echo $forum_info['date'];?></li>
                <li><i></i><?php echo $forum_info['comment'];?></li>
                <li><i></i><?php echo $forum_info['replay'];?></li>
                <div class="clear_float"></div>
            </ul>
            <div class="content">
                <?php echo $forum_info['forum_content'];?>
            </div><!--content-->

            <div class="end_opp">
                <ul>
                    <li><img src="images/rec_add.png" alt="">赞同<span><?php echo $forum_info['end'];?></span></li>
                    <li><img src="images/rec_subtract.png" alt="">反对<span><?php echo $forum_info['opp'];?></span></li>
                    <li><img src="images/zhuanbo.png" alt="">评论</li>
                    <div class="clear_float"></div>
                </ul>
            </div><!--end_opp-->
        </div><!--forum_body-detail-->

        <!--留言板-->
        <div class="forum_body-comment">
            <p><?php echo $forum_info['comment'];?>个回复</p>
            <!--评论-->
            <ul class="comment">
                <span class="comment_login">抱歉，您尚未登录，无发查看评论！！！点击登录</span>
                <!--后台加载-->
            </ul>
            <!--导航条-->
            <ul class="list">
                <!--后台加载-->
            </ul>
            <div class="clear_float"></div>
        </div><!--forum_body-comment-->

        <!--发表留言-->
        <div class="post_comment">
            <div class="input_comment-top" id="editor_top1"></div>
            <div class="input_comment-text" id="editor_text1"><p>输入大于五个字的评论</p></div>
            <input type="button" class="post_but" name="post_but" value="发表">
        </div>

    </div><!--forum_body-left-->

    <div class="forum_body-info" user_id="<?php echo $user_id;?>">
        <div class="username_info">
            <img src="images/<?php echo $forum_info['top_img'];?>" class="top_img" alt="">
            <h4 class="forum_username"><a href="home.php?user_id=<?php echo $forum_info['user_id'];?>"><?php echo $forum_info['username'];?></a></h4>
            <h4 class="username_title"><?php echo $forum_info['type'];?></h4>
        </div>
        <div class="username_correlation">
            <h4>楼主相关热帖</h4>
            <ul>

            </ul>
        </div>
    </div><!--forum_body-info-->
</div><!--forum_body-->

<div class="clear_float"></div>
<?php require 'bottom.php';?>
