<?php
    require 'top.php';
    require 'config/config.php';
    /*y一开始就准备数据*/
    mysql_query('delete from ready_table');
    $res = mysql_query('select game_name from game');
    $count =0;
    while($row = mysql_fetch_assoc($res)){
        $sql = "insert ready_table (select * from {$row['game_name']} where user_id = {$_GET['user_id']})";
        mysql_query($sql);
        $count += mysql_affected_rows();
    }
    $res = mysql_query("select * from message where user_id = {$_GET['user_id']}");
    $msg_count = mysql_affected_rows();
    $res = mysql_query("select visit,`like` from user where user_id = {$_GET['user_id']}");
    $user_info = mysql_fetch_assoc($res);
?>

<link rel="stylesheet" href="css/home.css" type="text/css">
<script src="js/wangEditor.min.js" type="text/javascript"></script>
<script src="js/ajaxfileupload.js" type="text/javascript"></script>
<script src="js/home.js" type="text/javascript"></script>
<div class="top_span"></div>
<div class="clear_float"></div>

<section>
    <div class="home_top">
        <ul class="home_top-ul document-width">
            <li>
                <p>帖子</p>
                <p><?php echo $count ?></p>
            </li>
            <li>
                <p>留言</p>
                <p><?php echo $msg_count ?></p>
            </li>
            <li>
                <p>访问</p>
                <p><?php echo $user_info['visit'] ?></p>
            </li>
            <li>
                <p>点赞</p>
                <p><?php echo $user_info['like'] ?></p>
            </li>
            <div class="clear_float"></div>
        </ul><!--home_top-ul-->
    </div><!--home_top-->
    <div class="home_middle">
        <div class="home_middle-user_info">
            <i class="top_img"></i><!--头像-->
            <p class="username"></p> <!--用户名-->
            <ul class="lv">   <!--经验值-->
                <li>lv <span>100</span></li>
                <li title="100/100">
                    <span></span>
                </li>
                <div class="clear_float"></div>
            </ul><!--lv-->
            <p class="description">我这个人很懒什么都没留下......我这个人很懒什么都没留下......我这个人很懒什么都没留下......</p>     <!--个性签名-->
            <ul class="edit">     <!--编辑头像和编辑资料-->
                <li>编辑资料</li>
                <li>修改头像</li>
                <div class="clear_float"></div>
            </ul><!--edit-->
        </div><!--home_middle-user_info-->
        <div class="home_middle-nav document-width">
            <ul>
                <li  class="highlight">首页</li>
                <li>帖子</li>
                <li>留言</li>
            </ul>
        </div><!--home_middle-nav-->
    </div><!--home_middle-->
    <div class="home_bottom document-width">
        <!--基本资料-->
        <!--后台加载-->
        <!--帖子-->
        <!--导航条-->
        <div class="content">
            <!--后台加载-->
        </div>
        <ul class="list">
            <!--后台加载-->
        </ul>
    </div><!--home_bottom-->

</section>
<div class="clear_float"></div>
<div class="edit_info">
    <h2>个人资料</h2>
    <div class="close"></div>
    <ul class="form_option">
        <li class="option">编辑个人资料</li>
        <li>修改密码</li>
        <li>隐私</li>
        <div class="clear_float"></div>
    </ul>
    <form action="" class="edit_form">
        <fieldset id="edit_inputs">
            <label for="nickname">昵　　称：</label><input type="text" name="nickname" placeholder="请输入昵称" id="nickname" class="form_phone"><br>
            <div class="nickname_error2">111111111</div>
            <div class="nickname_suc2"></div>
            <label>性　　别：</label><input type="radio" name="sex" value="male" class="radio" id="male" checked="checked"><label for="male">男</label><input type="radio" name="sex"  class="radio"  value="female" id="female"><label for="female">女</label><br>
            <label for="age">年　　龄：</label><input type="text" name="age" placeholder="请输入年龄" id="age" class="form_phone"><br>
            <label for="birth_date">生　　日：</label><input type="text" name="birth_date" placeholder="请输入生日" id="birth_date" class="form_phone"><br>
            <label for="email">你的邮箱：</label><input type="text" name="email" placeholder="请输入你的邮箱" id="email"  class="form_phone"><br>
            <div class="email_error2 error2">111111111</div>
            <div class="email_suc2 suc2"></div>
            <div class="email_slide2">
                <ul>
                    <li class="select"><span></span>@qq.com</li>
                    <li><span></span>@163.com</li>
                    <li><span></span>@sina.com</li>
                    <li><span></span>@sohu.com</li>
                    <li><span></span>@yahoo.com</li>
                    <li><span></span>@gamil.com</li>
                    <li><span></span>@hotmail.com</li>
                </ul>
            </div>
            <label for="phone">手　　机：</label><input type="text" name="phone" placeholder="请输入你的手机号码" id="phone"  class="form_phone"><br>
            <div class="phone_error2 error2">111111111</div>
            <div class="phone_suc2 suc2"></div>
            <label for="address">地　　址：</label><input type="text" name="address" placeholder="请输入地址" id="address" class="form_phone"><br>
            <label for="description" style="vertical-align: top;">个性签名：</label><textarea name="description" placeholder="你的个性签名" id="description" class="form_phone"></textarea><br>
        </fieldset>
        <fieldset id="edit_but">
            <input type="button"  value="提交" class="edit_sub">
        </fieldset>
    </form>
    <form action="" class="edit_possword">
        <fieldset id="password_inputs">
           <label for="password">密　　码：</label><input type="password" name="password" placeholder="请输入密码" id="password"  class="form_phone"><br>
            <div class="password_error2">111111111</div>
            <div class="password_suc2"></div>
            <div class="ver_password2">
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <div class="clear_float"></div>
                </ul>
                <ul>
                    <li class="ok">不能包含空格</li>
                    <li>长度为6-16个字符</li>
                    <li>必须包含字母、数字、符号中至少2种</li>
                </ul>
            </div>
            <label for="con_password">确认密码：</label><input type="password" name="con_password" placeholder="请再次输入密码" id="con_password"  class="form_phone"><br>
            <div class="con_password_error2 error2">111111111</div>
            <div class="con_password_suc2 error2"></div>
            <label for="captcha">验 证 码 ：</label><input type="text" name="captcha" placeholder="输入验证码" id="captcha" class="captcha"><img src="config/code.php"  id="code_img3"><a id="change">看不清，换一张</a><br>
            <div class="captcha_error2 error2">11111111</div>
        </fieldset>
        <fieldset id="password_but">
            <input type="button"  value="提交" class="edit_sub">
        </fieldset>
    </form>
    <form action="" class="privacy">
        <fieldset id="privacy_inputs">
            <input type="checkbox" name="sex" class="privacy_check" id="privacy_sex"><label for="privacy_sex">性别</label>
            <input type="checkbox" name="age" class="privacy_check" id="privacy_age"><label for="privacy_age">年龄</label>
            <input type="checkbox" name="birth_date" class="privacy_check" id="privacy_date"><label for="privacy_date">生日</label>
            <input type="checkbox" name="email" class="privacy_check" id="privacy_email"><label for="privacy_email">邮箱</label>
            <input type="checkbox" name="phone" class="privacy_check" id="privacy_phone"><label for="privacy_phone">手机</label>
            <input type="checkbox" name="address" class="privacy_check" id="privacy_address"><label for="privacy_address">地址</label>
        </fieldset>
        <fieldset id="privacy_but">
            <input type="button"  value="提交" class="privacy_sub">
        </fieldset>
    </form>
</div>
<div class="alter_top_img">
        <h2>修改头像</h2>
        <div class="close"></div>
        <label for="">现在的头像：</label><img src="" alt="原来的头像方" class="img_one">
        <img src="" alt="原来的头像圆" class="img_two"><br/>
        <label for="img_file">选择头像：</label><input type="file" name="top_img" class="img_file" id="top_img"><br/>
        <input type="button" class="file_but" value="提交">
</div>
<div class="editor_msg">
    <h2>编辑文章</h2>
    <p>版块：<span></span></p>
    <form action="">
        <label for="msg_title">标题：</label><input type="text" placeholder="输入您的标题" id="msg_title" class="msg_title">
        <div class="editor_msg-title" id="editor_title"></div>
        <div class="editor_msg-centent" id="editor_centent"></div>
        <input type="button" value="发表文章" class="post_editor">
    </form>
    <div class="close"></div>
</div>
<div class="root">
    <h2>权限</h2>
    <div class="close"></div>
    <p>用户：<span>Wonder</span></p>
    <label for="game_select">游戏名：</label>
    <select name="" id="game_select">
        <!--后台加载-->
    </select><br/>
    <input type="button" class="file_but" value="提交">
</div>
<div class="game">
    <h2>添加游戏</h2>
    <div class="close"></div>
    <form action="" id="game_form" >
        <label for="game_name_cn">游戏中文名：</label><input type="text" name="game_name_cn" class="game_name_cn" id="game_name_cn"><br/>
        <label for="game_name">游戏英文名：</label><input type="text" name="game_name" class="game_name" id="game_name"><br/>
        <label for="game_type"> 　　　 类型：</label><input type="text" name="game_type" class="game_type" id="game_type"><br/>
        <label for="game_img">　   游戏头像：</label><input type="file" name="game_img" id="game_img" class="game_img"><br/>
        <label for="game_description" style="vertical-align: top;">　  游戏描述：</label><textarea name="game_description" id="" cols="30" rows="10"></textarea>
        <input type="button" class="game_but" value="提交">
    </form>
</div>
<?php require 'bottom.php'?>