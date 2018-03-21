$(function (){
    var userAgent = navigator.userAgent.toLowerCase();
    var error_num=0;

    // 获取浏览器
    jQuery.browser = {
        version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
        safari: /webkit/.test(userAgent),
        opera: /opera/.test(userAgent),
        msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
        mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
    };

    //滚动时头部的效果
    $(window).bind('scroll',function (){
        var scrollTop=document.documentElement.scrollTop;
        var head = $('.top_big');
        var height=head.height();
        if(scrollTop>=height){
            head.slideUp();
        }else{
            head.stop();
            head.slideDown();
        }
    }).trigger('scroll');

    /*登录和注册拖拽*/
    drag($('.login h2'));
    drag($('.registration h2'));


    //点击登录时的效果
    $('.top_big2 .ul_2 li:nth-child(1),.forum_body-comment>ul.comment span.comment_login').click(function (){
            //每次点击都要居中登录框
            center($('.login'));
            $('#shadow').fadeIn(400);
            $('.login').fadeIn(400);
            /*每次点击验证码都更改*/
            $('#code_img2').attr('src','config/code.php?t='+Math.random());
            if(error_num > 5){
                $('.captcha_show').slideDown();
            }
            document.documentElement.style.overflow='hidden';
            document.documentElement.scrollTop=0;
    });
    $('.login .close').click(function (){
        $('#shadow').fadeOut(400);
        $('.login').fadeOut(400);
        document.documentElement.style.overflow='scroll';
    });
    //点击注册时的效果
    $('.top_big2 .ul_2 li:nth-child(2)').click(function (){
        /*居中注册框*/
        center($('.registration'));
        $('#shadow').fadeIn(400);
        $('.registration').fadeIn(400);
        document.documentElement.style.overflow='hidden';
        $('#code_img').attr('src','config/code.php?t='+Math.random());
        document.documentElement.scrollTop=0;
    });
    $('.registration .close').click(function (){
        $('#shadow').fadeOut(400);
        $('.registration').fadeOut(400);
        document.documentElement.style.overflow='scroll';
    });
    /*在登录框点击注册时*/
    $('#actions a:nth-child(2)').click(function (){
        /*居中注册框*/
        center($('.registration'));
        $('.login').fadeOut(400);
        $('.registration').fadeIn(400);
        document.documentElement.scrollTop=0;
    });

    /*表单验证和用户注册*/
    (function (){
        var parent = $('#inputs_2');

        //用户名验证
        var username = parent.find('#username2');
        var username_value = username.val();
        username.focus(function (){
            $(this).removeClass('error');
            parent.find('.username_error').show().html('请输入长度大于2且小于16的用户名！').addClass('ver');
        }).blur(function (){
            username_value = username.val();
            if(ver_username(username_value)){
                parent.find('.username_error').hide().removeClass('ver');
            }
        });
        /*用户名的验证函数*/
        function ver_username(username_value){
            if(!username_value){
                username.addClass('error');
                parent.find('.username_error').html('用户名不可以为空！！').show().removeClass('ver');
                $('.username_suc').hide();
                return false;
            }else if(username_value.length<2 || username_value.length>16){
                username.addClass('error');
                parent.find('.username_error').html('请输入长度大于2且小于16的字符串').show().removeClass('ver');
                $('.username_suc').hide();
                return false;
            }else if(/\W/.test(username_value)){
                username.addClass('error');
                parent.find('.username_error').html('用户名不能是中文或字符！！').show().removeClass('ver');
                $('.username_suc').hide();
                return false;
            }else{
                /*判断用户名是否存在*/
                var flag = true;
                $.ajax({
                    url:'config/select_user.php',
                    data:{'username':username_value,'type':'reg'},
                    type:'post',
                    async:false,
                    success:function (data){
                        if(data>0) {
                            username.addClass('error');
                            parent.find('.username_error').html('用户名已存在！！').show().removeClass('ver');
                            $('.phone_suc').hide();
                            flag=false;
                        }else{
                            $('.username_suc').show();
                            flag=true;
                        }
                    }
                });
                return flag;
            }

        }

        //密码确认
        var password = parent.find('#password2');
        var password_value = password.val();
        password.focus(function (){
            $('.ver_password').slideDown();
            $(this).removeClass('error');
            parent.find('.password_error').hide();
            $('.error').animate({top:'+=100'},400);
        }).blur(function (){
            var _this=this;
            password_value = password.val();
            $('.ver_password').slideUp(400,function (){
                ver_password_ver(password_value)
            });
            $('.error').animate({'top':'-=100'},400);
        }).bind('input',function (){
            var ul2 = $('.ver_password ul:nth-child(2)');
            var ul1 = $('.ver_password ul:nth-child(1)');
            var strong=false;
            password_value = password.val();
            strong = ver_password(password_value);
            //密码强度
            if(password_value.length >=6){
                ul1.find('li:nth-child(1)').css('background','#f14537');
                if(strong){
                    ul1.find('li:nth-child(1)').css('background','orange');
                    ul1.find('li:nth-child(2)').css('background','orange');
                    if(password_value.length >=12){
                        ul1.find('li:nth-child(1)').css('background','#79bc1f');
                        ul1.find('li:nth-child(2)').css('background','#79bc1f');
                        ul1.find('li:nth-child(3)').css('background','#79bc1f');
                    }else{
                        ul1.find('li:nth-child(1)').css('background','orange');
                        ul1.find('li:nth-child(2)').css('background','orange');
                        ul1.find('li:nth-child(3)').css('background','#ccc');
                    }
                }else{
                    ul1.find('li:nth-child(3)').css('background','#ccc');
                    ul1.find('li:nth-child(2)').css('background','#ccc');
                    ul1.find('li:nth-child(1)').css('background','#f14537');
                }
            }else{
                ul1.find('li').css('background','#ccc');
            }
        });
        /*密码验证函数*/
        function ver_password_ver(password_value){
            if(!password_value){
                password.addClass('error');
                parent.find('.password_error').show().html('密码不可以为空！！').removeClass('ver');
                $('.password_suc').hide();
                return false
            }else if(!ver_password(password_value)){
                password.addClass('error');
                parent.find('.password_error').show().html('密码格式不正确！！').removeClass('ver');
                $('.password_suc').hide();
                return false;
            }
            $('.password_suc').show();
            return true;
        }
        /*密码强度的验证*/
        function ver_password(password_value){
            var ul2 = $('.ver_password ul:nth-child(2)');
            var flag = true;
            //非空格
            if(/\s/.test(password_value)){
                ul2.find('li:nth-child(1)').removeClass('ok');
                flag = false;
            }else{
                ul2.find('li:nth-child(1)').addClass('ok');
            }
            //长度
            if(password_value.length >=6 && password_value.length <= 16){
                ul2.find('li:nth-child(2)').addClass('ok');
            }else{
                ul2.find('li:nth-child(2)').removeClass('ok');
                flag = false;
            }
            //任意两种字符
            if((/[0-9]/.test(password_value)&&/[a-zA-Z]/.test(password_value))||(/[0-9]/.test(password_value)&&/\W/.test(password_value))||(/[a-zA-Z]/.test(password_value)&&/\W/.test(password_value))){
                ul2.find('li:nth-child(3)').addClass('ok');
            }else{
                ul2.find('li:nth-child(3)').removeClass('ok');
                flag = false;
            }

            return flag;
        }

        //确认密码验证
        var con_password = parent.find('#con_password');
        var con_password_value = con_password.val();
        con_password.focus(function (){
            $(this).removeClass('error');
            parent.find('.con_password_error').show().html('再次输入密码！').addClass('ver');
        }).blur(function (){
            con_password_value = con_password.val();
            password_value = password.val();
            if(ver_con_password(password_value,con_password_value)){
                parent.find('.con_password_error').hide().removeClass('ver');
            }
        });
        /*确认密码验证函数*/
        function ver_con_password(password_value,con_password_value){
            if(!con_password_value){
                con_password.addClass('error');
                parent.find('.con_password_error').html('确认密码不可以为空！！').show().removeClass('ver');
                $('.con_password_suc').hide();
                return false;
            }else if(password_value !== con_password_value){
                con_password.addClass('error');
                parent.find('.con_password_error').html('密码不一致！！').show().removeClass('ver');
                $('.con_password_suc').hide();
                return false;
            }
            $('.con_password_suc').show();
            return true;
        }

        //电子邮件验证
        var email = parent.find('#email');
        var email_value = email.val();
        var email_slide =  $('.email_slide');
        email.focus(function (){
            $(this).removeClass('error');
            parent.find('.email_error').show().html('请输入邮箱。例：xxx@xx.xxx！').addClass('ver');
        }).blur(function (){

            setTimeout(function (){
                email_value = email.val();
                if(ver_email(email_value)){
                    parent.find('.email_error').hide().removeClass('ver');
                }
                $('.email_slide').hide();
                $(window).unbind('keydown.email');
            },200);
        }).bind('input',function (){         //输入时激活下拉列表
            var value = $(this).val();
            email_slide.show().find('ul li span').html(value);
            if(value.indexOf('@')>0){
                email_slide.hide();
            }
            /*给下拉列表绑定事件*/
            email_slide.find('ul li').mouseenter(function (){
                $(this).addClass('select').siblings().removeClass('select');
            }).click(function (){
                email.val($(this).text());
            });
        }).bind('keydown.email',function (e){
            var keyCode = e.keyCode;
            var select = email_slide.find('ul li.select');
            if(keyCode === 13){
                email.val(select.text());
                $('.email_slide').hide();
                $(window).unbind('keydown.email');
                return false;
            }
            var li = select.parent().find('li');
            var li_count = li.size()-1;
            if(keyCode === 40){
                email.val(select.text());
                if(select.index()+1 > 6){
                    li.eq(0).addClass('select').siblings().removeClass('select');
                }else{
                    li.eq(select.index()+1).addClass('select').siblings().removeClass('select');
                }
            }else if(keyCode === 38){
                email.val(select.text());
                if(select.index()-1 < 0){
                    li.eq(li_count).addClass('select').siblings().removeClass('select');
                }else{
                    li.eq(select.index()-1).addClass('select').siblings().removeClass('select');
                }
            }
        });
        /*电子邮箱验证函数*/
        function ver_email(email_value){
            if(!email_value){
                email.addClass('error');
                parent.find('.email_error').html('邮箱不可以为空！！').show().removeClass('ver');
                $('.email_suc').hide();
                return false;
            }else if(!/^[0-9a-zA-Z._-]+@[a-zA-Z0-9]{1,7}.[a-zA-z]{2,3}$/.test(email_value)){
                email.addClass('error');
                parent.find('.email_error').html('邮箱格式不正确。例：xxx@xx.xxx').show().removeClass('ver');
                $('.email_suc').hide();
                return false;
            }else{
                /*后台确认电子邮箱是否存在*/
                var flag = true;
                $.ajax({
                    url:'config/select_user.php',
                    data:{'email':email_value,'type':'reg'},
                    type:'post',
                    async:false,
                    success:function (data){
                        if(data>0) {
                            email.addClass('error');
                            parent.find('.email_error').html('该邮箱已被注册！！').show().removeClass('ver');
                            $('.email_suc').hide();
                            flag=false;
                        }else{
                            $('.email_suc').show();
                            flag=true;
                        }
                    }
                });
                return flag;
            }

        }



        //手机号码确认
        var phone = parent.find('#phone');
        var phone_value = phone.val();
        phone.focus(function (){
            $(this).removeClass('error');
            parent.find('.phone_error').show().html('请输入11位的手机号码！').addClass('ver');
        }).blur(function (){
            phone_value = phone.val();
            if(ver_phone(phone_value)){
                parent.find('.phone_error').hide().removeClass('ver');
            }
        });
        /*手机号码验证函数*/
        function ver_phone(phone_value){
            if(!phone_value){
                phone.addClass('error');
                parent.find('.phone_error').html('手机号码不可以为空！！').show().removeClass('ver');
                $('.phone_suc').hide();
                return false;
            }else if(!/^1\d{10}$/.test(phone_value)){
                phone.addClass('error');
                parent.find('.phone_error').html('手机号码格式不正确。例：1xxxxxxxxxxx').show().removeClass('ver');
                $('.phone_suc').hide();
                return false;
            }else{
                /*后台确认手机号码是否存在*/
                var flag = true;
                $.ajax({
                    url:'config/select_user.php',
                    data:{'phone':phone_value,'type':'reg'},
                    type:'post',
                    async:false,
                    success:function (data){
                        if(data>0) {
                            phone.addClass('error');
                            parent.find('.phone_error').html('该手机号码已被注册').show().removeClass('ver');
                            $('.phone_suc').hide();
                            flag=false;
                        }else{
                            $('.phone_suc').show();
                            flag=true;
                        }
                    }
                });
                return flag;
            }

        }



        $('.registration #actions_2 .sub').click(function (){
            var flag = true;


            //用户验证
            username_value = username.val();
            if(!ver_username(username_value)){
                return false;
            }

            password_value = password.val();
            if(!ver_password_ver(password_value)){
                return false;
            }


            //再次输入密码验证
            con_password_value = con_password.val();
            if(!ver_con_password(password_value,con_password_value)){
                return false;
            }else{
                con_password.removeClass('error');
                parent.find('.con_password_error').hide().removeClass('ver');
            }


            //电子邮件验证
            email_value = email.val();
            if(!ver_email(email_value)){
                return false;
            }

            //手机号码确认
            phone_value = phone.val();
            if(!ver_phone(phone_value)){
                return false;
            }

            /*验证码确认*/
            var catpcha = parent.find('.captcha');
            var catpcha_value = catpcha.val();
            if(!catpcha_value){
                catpcha.addClass('error');
                parent.find('.captcha_error').html('验证码不能为空').show();
                return false;
            }

            if(flag){
                $.ajax({
                    url:'config/reg_login.php',
                    data:$('.reg').serialize()+'&type=reg',
                    type:'post',
                    async:true,
                    beforeSend:function (){
                        //loading居中
                        center($('.loading'));
                        $('.loading').css('background','#fff url(images/loading.gif) no-repeat 0 center');
                        $('.loading').html('正在注册中..........');
                        $('.loading').show();
                        /*禁用按钮防止用户重复点击*/
                        $('#actions_2 .sub').attr('disabled','disabled');
                    },
                    success:function (data){
                        if(data>0){
                            catpcha.removeClass('error');
                            parent.find('.captcha_error').hide();
                            //loading居中
                            center($('.loading'));
                            $('.loading').css('background','#fff url(images/green.png) no-repeat 0 center');
                            $('.loading').html('注册成功，请登录........');
                            setTimeout(function (){
                                $('.loading').hide();
                                center('.login');
                                $('.login').fadeIn(400);
                                $('.registration').fadeOut(400);
                                $('#actions_2 .sub').removeAttr('disabled');
                                $('#code_img2').attr('src','config/code.php?t='+Math.random());
                                $('.reg').get(0).reset();
                                $('.username_suc').hide();
                                $('.password_suc').hide();
                                $('.con_password_suc').hide();
                                $('.email_suc').hide();
                                $('.phone_suc').hide();
                            },2000);

                        }else{
                            if(data === '-1'){
                                $('.loading').hide();
                                $('#actions_2 .sub').removeAttr('disabled');
                                con_password.val('');
                                password.val('');
                                catpcha.addClass('error');
                                parent.find('.captcha_error').html('验证码错误！！').show();
                            }else if(data === '-2'){
                                $('.loading').hide();
                                $('#actions_2 .sub').removeAttr('disabled');
                                con_password.val('');
                                password.val('');
                                catpcha.addClass('error');
                                parent.find('.captcha_error').html('验证码过期，请重新注册！！').show();
                            }
                        }
                    }
                });
            }

        });
    })();

    /*用户登录*/
    (function (){
        var parent = $('#inputs');
        var username = parent.find('#username');
        var password = parent.find('#password');
        var username_value = username.val();
        /*用户名验证*/
        username.focus(function (){
            $(this).removeClass('error');
            $('.login_username_error').hide();
        }).blur(function (){
            username_value = username.val();
            if(!ver_login_user(username_value)){
                error_num-=1;
            }
        });
        /*用户名验证函数*/
        function ver_login_user(username_value){
            if(!username_value){
                username.addClass('error');
                parent.find('.login_username_error').html('用户名不可以为空！！').show().removeClass('ver');
                $('.username_suc').hide();
                error_num+=1;
                return false;
            }else if(username_value.length<2){
                username.addClass('error');
                parent.find('.login_username_error').html('请输入长度大于2的字符串').show();
                error_num+=1;
                return false;
            }else if(!/^[0-9a-zA-Z._-]+@[a-zA-Z0-9]{1,7}.[a-zA-z]{2,3}$/.test(username_value) && /\W/.test(username_value)){
                username.addClass('error');
                parent.find('.login_username_error').html('用户名不能是中文或字符！！').show();
                error_num+=1;
                return false;
            }
            return true;
        }

        /*密码验证*/
        var password_value = password.val();
        password.focus(function (){
            $(this).removeClass('error');
            $('.login_password_error').hide();
        }).blur(function (){
            password_value = password.val();
            if(!ver_login_pass(password_value)){
                error_num--;
            }
        });
        /*密码验证函数*/
        function ver_login_pass(password_value){
            if(!password_value){
                password.addClass('error');
                $('.login_password_error').show().html('密码不可以为空！！！');
                error_num+=1;
                return false;
            }
            return true;
        }

        $('#submit').click(function (){
            username_value = username.val();
            if(!ver_login_user(username_value)){
                return false;
            }
            password_value = password.val();
            if(!ver_login_pass(password_value)){
                return false;
            }
            var captcha = parent.find('.captcha');
            var catpcha_value = captcha.val();
            if(!$('.captcha_show').is(':hidden')){

                if(!catpcha_value){
                    captcha.addClass('error');
                    parent.find('.login_captcha_error').html('验证码不能为空').show();
                    return false;
                }
            }


            $.ajax({
                url:'config/reg_login.php',
                data:$(this).parent().parent().serialize()+'&type=login',
                type:'post',
                async:true,
                beforeSend:function (){
                    //loading居中
                    center($('.loading'));
                    $('.loading').css('background','#fff url(images/loading.gif) no-repeat 0 center');
                     $('.loading').show().html('正在登录中......');
                    $('#submit').attr('disabled','disabled');
                },
                success:function (data){
                    if(data === '-1'){
                        $('.loading').hide();
                        $('#submit').removeAttr('disabled');
                        password.val('');
                        captcha.addClass('error');
                        parent.find('.login_captcha_error').html('验证码错误！！').show();
                    }else if(data === '-2'){
                        $('.loading').hide();
                        $('#submit').removeAttr('disabled');
                        password.val('');
                        captcha.addClass('error');
                        parent.find('.login_captcha_error').html('验证码过期，请重新登录！！').show();
                    }else if(data!=0){
                        error_num=0;
                        $('.captcha_show').hide();
                        captcha.removeClass('error');
                        parent.find('.login_captcha_error').hide();
                        password.removeClass('error');
                        $('.login_password_error').hide();
                        //loading居中
                        center($('.loading'));
                        $('.loading').css('background','#fff url(images/green.png) no-repeat 0 center');
                        $('.loading').html('登录成功,正在跳转页面.......');
                        document.documentElement.style.overflow='scroll';
                        var json = $.parseJSON(data);
                        setTimeout(function (){
                            $('.loading').hide();
                            $('#shadow').fadeOut(400);
                            $('.login').fadeOut(400);
                            $('#submit').removeAttr('disabled');
                            var expires = '';
                            if($('#check').prop('checked')){
                                 var date = new Date();
                                date.setDate(date.getDate()+7);
                                expires = ';expires='+date;
                            }
                            var lv = (+json.exp).toString(2).length-1;
                            document.cookie='username='+json.username+expires;
                            document.cookie='password='+json.password+expires;
                             document.cookie='user_id='+json.user_id+expires;
                             document.cookie='userType='+json.type+expires;
                             document.cookie='lv='+lv+expires;
                            $('#submit').parent().parent().get(0).reset();
                            location.reload();
                        },2000)


                    }else{
                        $('.loading').hide();
                        password.addClass('error');
                        $('.login_password_error').show().html('密码或用户名错误！！！');
                        captcha.removeClass('error');
                        parent.find('.login_captcha_error').hide();
                        $('#submit').removeAttr('disabled');
                        error_num+=1;
                        if(error_num > 5){
                            $('.captcha_show').slideDown();
                        }
                    }
                }
            });

        });
    })();


    /*验证码切换*/
    $('#change').click(function (){
        $(this).prev().attr('src','config/code.php?t='+Math.random());
        return false;
    });


    //判断cookie存不存在，
    if(getCookie('username') !== null){
        var username = getCookie('username');
        var password = getCookie('password');
        var user_id = getCookie('user_id');
        $.post('config/login_info_mode.php',{
            'type':'login_info',
            'user_id':user_id,
            'username':username,
            'password':password
        },function (data){
            if(data !== '0'){
                var json = $.parseJSON(data);
                var exp =parseInt(json.exp);
                var lv = exp.toString(2).length-1;
                var name = json.nickname?json.nickname:json.username;
                $('.ul_2').hide();
                $('.login_info').show().html('<p>你好！<span>'+(name.length<=6?name:name.slice(0,6)+'...')+'</span></p><div class="login_down"><img src="images/'+json.top_img+'" alt=""><div class="user_info"><p>Lv <span>'+lv+'</span></p> <p>'+json.nickname+'</p><p>'+json.description+'</p></div><span><a href="home.php?user_id='+json.user_id+'">查看更多</a></span><span class="exit_login">退出登录</span></div>');
                $('.top_big2 div.search_div .search_list').css('right',"+=25px");
            }
        });
    }

    /*退出登录*/
    $('.login_info').on('click','.exit_login',function (){
        $('.ul_2').show();
        $('.login_info').hide();
        var data = new Date();
        data.setDate(data.getDate()-1);
        document.cookie='username="1";expires='+data;
        document.cookie='password="1";expires='+data;
        document.cookie='user_id="1";expires='+data;
        document.cookie='userType="1";expires='+data;
        location.reload();
    });


    /*手机菜单的点击效果*/
    $('.menu').click(function (){
        $('.top_big2 .phone_menu').stop().slideToggle();
    });
    $('.top_big2 .phone_menu>ul>li:not(:last-child)').click(function (){
        var _this = this;
        if($(this).find('ul').is(':hidden')){
            $(this).find('ul').show().animate({'height':'160px'},300);
        }else{
            $(this).find('ul').animate({'height':'-100px'},500,function (){
                $(_this).find('ul').hide();
            });
        }

    });

    /*轮播图*/
    function img_nav(index){
        $('.lunBo .lunBo_nav .move_div').animate({'top':(20*index)+'%'},400);
    };

    /*初始化*/
    var img_li = $('.lunBo .lunBo_img ul li');
    $('.lunBo .lunBo_img ul li').eq(0).show();
    var index = 0;
    var timer = setInterval(lunBo,3000);
    function lunBo(){
        index++;
        if(index>img_li.size()-1){
            index = 0;
        }
        var before = (index-1<0)?img_li.size()-1:index-1;
        img_li.eq(before).animate({'top':'100%'},1000,function (){
            img_li.eq(before).hide();
        });
        img_li.eq(index).show().css('top','-100%').animate({'top':'0'},1000);
        img_nav(index);
    }

    /*鼠标经过*/
    $('.lunBo .lunBo_nav .not_img li').hover(function (){
        if(index !== $(this).index()){
            img_li.stop(true,true);
            img_li.eq(index).animate({'top':'100%'},1000);
            index = $(this).index();
            img_li.eq(index).show().css('top','-100%').animate({'top':'0'},1000);
            img_nav(index);
        }
        clearInterval(timer);
    },function (){
        timer = setInterval(lunBo,3000);
    }).click(function (){
        if(index !== $(this).index()){
            img_li.stop(true,true);
            img_li.eq(index).animate({'top':'100%'},1000);
            index = $(this).index();
            img_li.eq(index).show().css('top','-100%').animate({'top':'0'},1000);
            img_nav(index);
        }
    });

    //当有存储数据时初始化搜索列表
    reder();
    function reder(){
      if(window.localStorage.record){
        let lists = window.localStorage.record.split(',').reverse();
        let html = '';
        if(lists.length >5){     //如果lists超出五个就截取最新的五个
          lists = lists.splice(0,5);
        }
        for(let list of lists){
          html += `<li>${list}</li>`;
        }
        html += '<li class="clearSearch">清除搜索数据！！！</li>'
        $('.search_list').html(html);
      }else{
        $('.search_list').html('<li>暂无搜索数据！！！</li>');
      }
    }
    $('.search_list').on('click','.clearSearch',function (){    //清除后台数据
      window.localStorage.removeItem('record');
      reder();
    });
    // 点击搜索
    $('.search_2').click(function (){
      if(!window.localStorage.record){
        var record = [];
      }else{
        var record = window.localStorage.record.split(',');
      }
      var content = $(this).parent().find('.search').val();
      if(content){         //判断搜索框有么有输入内容
        if(record.indexOf(content)<0){
          record.push(content);
          record = record.toString();
          window.localStorage.record = record;
          reder();      //获得焦点时加载搜索记录
        }
        var search = $('input.search').val();
        window.open('./search.php?search='+search);
        $('input.search').val('');        //搜索完成后，清除记录
      }
    });
    // 当搜索框获得焦点时
    $('.search').click(function (){
      var index=0;
      $('.top_big2 div.search_div .search_list,.top_big2 .phone_menu>ul>li>ul.search_list').slideDown(200);
      $(window).keydown(function (e){
        var keyCode = e.keyCode;
        var count = $('.top_big2 .phone_menu>ul>li>ul.search_list li').size()-1;
        if(keyCode === 40){
          if(++index > count){
            index =  1;
          }
          $('.top_big2 .phone_menu>ul>li>ul.search_list li:nth-child('+index+')').addClass('move').siblings().removeClass('move');
          $('.top_big2 div.search_div .search_list li:nth-child('+index+')').addClass('move').siblings().removeClass('move');
          var text = $('.top_big2 .phone_menu>ul>li>ul.search_list li:nth-child('+index+')').text();
          $('input.search').val(text);
        }else if(keyCode === 38){
          if(--index <= 0){
            index =  count;
          }
          $('.top_big2 .phone_menu>ul>li>ul.search_list li:nth-child('+index+')').addClass('move').siblings().removeClass('move');
          $('.top_big2 div.search_div .search_list li:nth-child('+index+')').addClass('move').siblings().removeClass('move');
          var text = $('.top_big2 .phone_menu>ul>li>ul.search_list li:nth-child('+index+')').text();
          $('input.search').val(text);
        }
      });
      reder();
    }).blur(function (){       //当搜索框失去焦点时
      $('.top_big2 div.search_div .search_list,.top_big2 .phone_menu>ul>li>ul.search_list').slideUp(200);
    }).on('input',function (){
      var html = '';      //后台搜索的数据的存储
      var searchVal = $(this).val();     //获得搜索框的内容
      if(searchVal){         //判断搜索的值是否为空，空就不执行下列操作
        $.ajax({
          url:'./config/search_result.php',
          data:{
            search:$.trim(searchVal),
            type:'searchIndex'
          },
          type:'post',
          async:'false',
          success:function (data){
            var json = $.parseJSON(data);
            var len = json.length>6?6:json.length;
            for(let i=0;i<len;i++){
              html +='<li>'+json[i].title+'</li>';
            }
            html+="<li></li>"
            $('.search_list').html(html);
              //初始化搜索列表
          }
        });
      }else{    //当搜索栏为空时显示搜索记录
        reder();
      }
    });
    $('.search_list').on('click',' li',function (){      //点击搜索列表，使得选中列表的内容，赋值到输入框
      var val = $(this).text();
      $('input.search').val(val);
    });

});

//获取cookie的值
function getCookie(name){
    var cookieName = name+'=';
    var cookieStart = document.cookie.indexOf(cookieName);
    var cookieEnd = null;
    var cookieValue =null;

    if(cookieStart > -1){
        cookieEnd = document.cookie.indexOf(';',cookieStart);
        if(cookieEnd === -1){
            cookieEnd = document.cookie.length;
        }
        cookieValue = document.cookie.substring(cookieStart+cookieName.length,cookieEnd);
    }

    return cookieValue;

}


//实现拖拽效果
function drag(element_obj){

    element_obj.mousedown(function (e){
        var _this=this;
        var pageX=e.pageX;
        var pageY=e.pageY;
        var x=pageX-$(this).offset().left;
        var y=pageY-$(this).offset().top;
        var parent = $(this).parent();
        var parent_top=pageY-y;
        var parent_left=pageX-x;
        var max_left=$(window).width()-parent.width();
        var max_top=$(window).height()-parent.height();
        parent.css({
            'top':parent_top,
            'left':parent_left
        });
        $(window).bind('mousemove',function (e){
            // x=pageX-$(_this).offset().left;
            // y=pageY-$(_this).offset().top;
            pageX=e.pageX;
            pageY=e.pageY;
            parent_top=pageY-y;
            parent_left=pageX-x;
            parent_top=(parent_top)>0?(parent_top>max_top?max_top:parent_top):0;
            parent_left=(parent_left)>0?(parent_left>max_left?max_left:parent_left):0;
            parent.css({
                'top':parent_top,
                'left':parent_left
            });
        });
        $(window).bind('mouseup',function (){
            $(this).unbind('mousemove');
            $(this).unbind('mouseup');
        });
    });
}
/*让盒子居中*/
function center(obj){
    var width=obj.width();
    var height =obj.height();
    var screen_width=$(window).width();
    var screen_height=$(window).height();
    obj.css({
        top:(screen_height-height)/2,
        left:(screen_width-width)/2
    });
}

/*检测用户是否有登录*/
function ver_login(){
    if(getCookie('username') === null){
        var username = getCookie('username');
        var password = getCookie('password');
        var user_id = getCookie('user_id');
        $.post('config/login_info_mode.php',{
            'type':'login_info',
            'user_id':user_id,
            'username':username,
            'password':password
        },function (data){
            if(data !== '0'){
                var loading = $('.loading');
                center(loading);
                loading.show().css('background','#fff url(images/info.png) no-repeat 0 center').html('抱歉，您尚未登录，没有权限操作！！！');
                setTimeout(function (){
                    document.documentElement.scrollTop=0;
                    loading.hide();
                    center($('.login'));
                    $('#shadow').fadeIn(400);
                    $('.login').fadeIn(400);
                    /*每次点击验证码都更改*/
                    $('#code_img2').attr('src','config/code.php?t='+Math.random());
                    if(error_num > 5){
                        $('.captcha_show').slideDown();
                    }
                    document.documentElement.style.overflow='hidden';
                    document.documentElement.scrollTop=0;
                },500);
            }
        });
    }else{
        return true;
    }


}
