<!doctype html>
<!--[if lte IE 8]><script>window.location.href="error/index.html"</script><![endif]-->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico" media="screen" />
    <script src="js/jquery-1.10.1.js" type="text/javascript"></script>
    <script src="js/public.js" type="text/javascript"></script>
    <link rel="stylesheet" href="css/public.css" type="text/css">
    <title>绝望之地 论坛</title>
</head>
<body>

<header>
    <div class="green"></div>
    <div class="red"></div>
    <!--在这里写头部-->
    <div class="top">
        <div class="top_big">
            <div class="document-width">
                <ul>
                    <li><a href="#"><p>设为首页</p></a></li>
                    <li><a href="#"><p>收藏本站</p></a></li>
                    <li><a href="#"><p>广播</p></a></li>
                    <li><a href="#"><p>导读</p></a></li>
                    <li><a href="#"><p>收藏的帖子</p></a></li>
                </ul>
            </div>
        </div> <!--导航1 end-->
        <div class="top_big2">
            <div class="document-width">
                <div class="imgd">
                    <a href="index.php"><img src="images/logo.png" alt=""></a>
                </div>
                <ul class="pc_menu">
                        <li><a href="index.php"><p>社区</p></a></li>
                        <li><a href="game_list.php"><p>所有游戏</p></a></li>
                        <li><a href="#"><p>热门游戏</p></a>
                            <ul>
                                <?php
                                    require 'config/config.php';
                                    $res = mysql_query("select * from game order by forum_count desc limit 0,4");
                                    $info=[];
                                    while($row = mysql_fetch_assoc($res)){
                                        $info[]= $row;
                                    }
                                    for($i=0;$i<count($info);$i++){
                                        echo "<li>-<a href='forum.php?game_id={$info[$i]['game_id']}'>{$info[$i]['game_name_cn']}-</a></li>";
                                    }
                                ?>
                            </ul>
                        </li>
                        <li><a href="lianxi.php"><p>关于我们</p></a>
                            <ul class="xiala4">
                                <li><a href="lianxi.php">-关于我们-</a></li>
                                <li><a href="lianxi.php">-联系我们-</a></li>
                                <li><a href="lianxi.php">-等级制度-</a></li>
                                <li><a href="lianxi.php">-用户协议-</a></li>
                            </ul>
                        </li>
                </ul>
                <ul class="ul_2">
                    <li><a href="#"><p>登录</p></a></li>
                    <li><a href="#"><p>注册</p></a></li>
                </ul>
                <div class="login_info">
                    <!--后台加载-->
                </div>
                <div class="search_div">
                  <input type="button" class="search_2 pc" value="搜索">
                  <input type="text" class="search pc" placeholder="输入你要搜索的内容">
                  <ul class="search_list">
                  </ul>
                </div>
            </div>
            <i class="menu"></i>           <!--手机的菜单-->
            <div class="phone_menu">
                <ul>
                    <li><a href="index.php"><p>社区</p></a></li>
                    <li><a href="game_list.php"><p>所有游戏</p></a></li>
                    <li><a href="#"><p>热门游戏</p></a>
                        <ul>
                            <?php
                                require 'config/config.php';
                                $res = mysql_query("select * from game order by forum_count desc limit 0,4");
                                $info=[];
                                while($row = mysql_fetch_assoc($res)){
                                    $info[]= $row;
                                }
                                for($i=0;$i<count($info);$i++){
                                    echo "<li>-<a href='forum.php?game_id={$info[$i]['game_id']}'>{$info[$i]['game_name_cn']}-</a></li>";
                                }
                            ?>
                        </ul>
                    </li>
                    <li><a href="#"><p>关于我们</p></a>
                        <ul class="xiala4">
                            <li><a href="lianxi.php">-关于我们-</a></li>
                            <li><a href="lianxi.php">-联系我们-</a></li>
                            <li><a href="lianxi.php">-等级制度-</a></li>
                            <li><a href="lianxi.php">-用户协议-</a></li>
                        </ul>
                    </li>
                    <li>
                        <input type="text" class="phone_search search" placeholder="输入你要搜索的内容">
                        <input type="button" class="search_2 phone_search2" value="搜索">
                        <ul class="search_list">
                        </ul>
                    </li>
                </ul>
            </div>
        </div> <!--导航2 end-->
    </div>


    <div id="shadow"><!--我是一个阴影--></div>
    <div class="login" id="login">
            <h2>用户登录</h2>
            <div class="close"></div>
        <form action="">
            <fieldset id="inputs">
                <label for="username">账号：</label><input type="text" name="username" placeholder="输入用户名、邮箱或手机号码" id="username"><br>
                <div class="login_username_error">111111111</div>
                <label for="password">密码：</label><input type="password" name="password" placeholder="输入您的密码" id="password">
                <div class="login_password_error">111111111</div>
                <div class="captcha_show">
                    <label for="captcha">验 证 码 ：</label><input type="text" name="captcha" placeholder="输入验证码" id="captcha" class="captcha"><img src="config/code.php"  id="code_img2"><a id="change">看不清，换一张</a><br>
                    <div class="login_captcha_error error">11111111</div>
                </div>
                <input type="checkbox" name="check" class="check" id="check"><label for="check">7天内自动登录</label>
            </fieldset>
            <hr style="border:1px solid #ccc;"/>
            <fieldset id="actions">
                <input type="button" id="submit" value="登录">
                <a href="#">注册</a>
            </fieldset>
        </form>
    </div><!--登录 -->

    <div class="registration">
            <h2>用户注册</h2>
            <div class="close"></div>
        <form action="" class="reg">
            <fieldset id="inputs_2">
                <label for="username2">用 户 名 ：</label><input type="text" name="username" placeholder="请输入用户名" id="username2" class="form_phone"><br>
                <div class="username_error">111111111</div>
                <div class="username_suc"></div>
                <label>性　　别：</label><input type="radio" name="sex" value="male" class="radio" id="male" checked="checked"><label for="male">男</label><input type="radio" name="sex"  class="radio"  value="female" id="female"><label for="female">女</label><br>
                <label for="password2">密　　码：</label><input type="password" name="password" placeholder="请输入密码" id="password2"  class="form_phone"><br>
                <div class="password_error">111111111</div>
                <div class="password_suc"></div>
                <div class="ver_password">
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
                <div class="con_password_error error">111111111</div>
                <div class="con_password_suc error"></div>
                <label for="email">你的邮箱：</label><input type="text" name="email" placeholder="请输入你的邮箱" id="email"  class="form_phone"><br>
                <div class="email_error error">111111111</div>
                <div class="email_suc error"></div>
                <div class="email_slide">
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
                <div class="phone_error error">111111111</div>
                <div class="phone_suc error"></div>
                <label for="captcha">验 证 码 ：</label><input type="text" name="captcha" placeholder="输入验证码" id="captcha" class="captcha"><img src="config/code.php"  id="code_img"><a id="change">看不清，换一张</a><br>
                <div class="captcha_error error">11111111</div>
            </fieldset>
            <fieldset id="actions_2">
                <input type="button"  value="注册" class="sub">
            </fieldset>
        </form>
    </div><!--注册 -->

    <div class="loading">正在注册中..........</div>

</header>
