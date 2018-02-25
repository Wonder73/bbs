
$(function (){
    var user_id = +(window.location.search.slice(1).split('=')[1]);
    var cookie_id =+getCookie('user_id');
    true_false()?cookie_id=user_id:'';
    var cookie_username = getCookie('username');
    var cookie_password = getCookie('password');
    if(!true_false()){
        $('.home_middle .edit').remove();
        $('.home_middle .home_middle-user_info').append('<img src="images/like.png" alt="" class="like">');
        if(cookie_id){
            $.post('config/like_visit.php',{'type':'visit','user_id':user_id},function (data){});
            $('.home_middle .home_middle-user_info').on('click','.like',function (){
                $(window).load('config/like_visit.php',{'type':'like','user_id':user_id,'cookie_id':cookie_id},function (responseText){
                    if(responseText>0){
                        //loading居中
                        center($('.loading'));
                        $('.loading').show();
                        $('.loading').css('background','#fff url(images/green.png) no-repeat 0 center');
                        $('.loading').html('谢谢您的参与！！！');
                        setTimeout(function (){
                            $('.loading').fadeOut(500,function (){
                                location.reload();
                            });
                        },1000);
                    }else{
                        //loading居中
                        center($('.loading'));
                        $('.loading').show();
                        $('.loading').css('background','#fff url(images/info.png) no-repeat 0 center');
                        $('.loading').html('你已经点击过了，请不要重复点击，谢谢合作！！');
                        setTimeout(function (){
                            $('.loading').fadeOut(500);
                        },1000);
                    }
                });
            });
        }
    }
    /*判断是不是自己进入自己的空间*/
    function true_false(){
        if(cookie_id == 1){
            return true;
        }else{
            if(user_id === cookie_id){
                return true;
            }
            return false;
        }

    }
    /*中间导航条点击效果*/
    $('.home_middle .home_middle-nav').on('click','li',function (){
        $(this).addClass('highlight').siblings().removeClass('highlight');
        var index = $(this).index();
        if(index === 0){
            index_user_info();
            $('.home_bottom ul.list').html('');
        }else if(index === 1){
            load_forum();
            $('.home_bottom .content').html('');
        }else if(index === 2){
            $('.home_bottom ul.list').html('');
            $('.home_bottom .content').html('<div class="post_msg"><input type="text" name="con_message" class="con_message" placeholder="输入你要对我的话！！！"><input type="button" name="msg_but" class="msg_but" value="留言"></div>');
            load_msg();
        }else if(index === 3){
            if($(this).html()==='用户'){
                $('.home_bottom .content').html('');
                load_user();
            }else{
                $('.home_bottom .content').html('');
                load_all();
            }

        }else if(index === 4){
            $('.home_bottom .content').html('');
            load_game();
        }
    });
    //加载数据
    function load_forum(){
        $.post('config/show_forum.php',{'show_type':'user_forum'},function (responseText){
            var json=$.parseJSON(responseText);
            var list_num = 10;
            var count = json[0].count;
            var page_num= Math.ceil(count/list_num);
            //页数
            var list='<li title="1" class="top_page">首页</li><li title="1" class="prev">上一页</li><li class="highlight" title="1">1</li>';
            //判断总页数是否大于1，大于1就加载，如果不是就不加载
            if(page_num>1){
                var max_page_num =6;   //最大的显示是6，
                if(page_num>max_page_num){
                    for(var i=2;i<=max_page_num;i++){
                        list+='<li title="'+i+'">'+i+'</li>';
                    }
                }else{
                    for(var i=2;i<=page_num;i++){
                        list+='<li title="'+i+'">'+i+'</li>';
                    }
                }
                list+='<li title="2" class="next">下一页</li><li title="'+page_num+'"  class="bottom_page">尾页</li><li class="jump_li"><input type="text" value="0" class="jump_num"><input type="button" value="跳转" class="jump"></li><li>共<span>'+page_num+'</span>页</li><div class="clear_float"></div>';
                $('.home_bottom ul.list').html(list);
            } else{
                $('.home_bottom ul.list').html(' ');
            }
            add_list($('.home_bottom .content'),json);

            //跳转页数
            $('.home_bottom ul.list li').click(function (){
                var _this = this;
                //数字跳转
                if(!!(+$(this).html())){
                    var title=$(this).addClass('highlight').siblings().removeClass('highlight').end().attr('title');
                    title=+title;
                    page_event(_this,title,page_num);
                }else if($(this).hasClass('prev') || $(this).hasClass('next')){         //上下页跳转
                    var index = +$(this).attr('title');
                    $(this).parent().find('li:contains('+index+')').eq(0).addClass('highlight').siblings().removeClass('highlight');
                    page_event(_this,index,page_num);
                }else if($(this).hasClass('top_page') || $(this).hasClass('bottom_page')){            //首页和尾页
                    var top_index_bottom = +$(this).attr('title');
                    if(top_index_bottom===1){                   //首页
                        $(this).parent().find('li').eq(2).html(top_index_bottom).attr('title',top_index_bottom).addClass('highlight').siblings().removeClass('highlight');
                        for(var i=3;i<8;i++){
                            $(this).parent().find('li').eq(i).html(top_index_bottom+(i-2)).attr('title',top_index_bottom+(i-2));
                        }
                    }else if(top_index_bottom === page_num){      //尾页
                        for(var i=2;i<7;i++){
                            $(this).parent().find('li').eq(i).html(top_index_bottom+(i-7)).attr('title',top_index_bottom+(i-7));
                        }
                        $(this).parent().find('li').eq(7).html(top_index_bottom).attr('title',top_index_bottom).addClass('highlight').siblings().removeClass('highlight');
                    }
                    page_event(_this,top_index_bottom,page_num);
                }else{                        //输入跳转
                    $('.home_bottom ul.list li.jump_li input:first-child').bind('input',function (){
                        var value= $(this).val();
                        $(this).val(value.replace(/\D+/g,''));
                        value = +$(this).val();
                        var num=page_num;
                        if(value>num){
                            $(this).val(num);
                        }
                    }).next().click(function (e){
                        if(page_num>6){
                            var value = +$(this).prev().val();
                            page_event(_this,value,page_num);
                            if(value-3<=0){
                                $(_this).parent().find('li').eq(2).html(value).attr('title',value).addClass('highlight').siblings().removeClass('highlight');
                                for(var i=3;i<8;i++){
                                    $(_this).parent().find('li').eq(i).html(value+(i-2)).attr('title',value+(i-2));
                                }
                            }else if(value+2>page_num){
                                for(var i=2;i<7;i++){
                                    $(_this).parent().find('li').eq(i).html(value+(i-7)).attr('title',value+(i-7));
                                }
                                $(_this).parent().find('li').eq(7).html(value).attr('title',value).addClass('highlight').siblings().removeClass('highlight');
                            }else{
                                $(_this).parent().find('li').eq(5).html(value).attr('title',value).addClass('highlight').siblings().removeClass('highlight');
                                for(var i=1;i<3;i++){
                                    $(_this).parent().find('li').eq((5+i)).html(value+i).attr('title',value+i);
                                }
                                for(var i=1;i<4;i++){
                                    $(_this).parent().find('li').eq((5-i)).html(value-i).attr('title',value-i);
                                }
                            }
                        }
                    });
                }
            });

        });

        function page_event(_this,index,page_num){
            $.post('config/show_forum.php',{'limit':index,'show_type':'user_forum'},function (responseText){
                var json=$.parseJSON(responseText);
                add_list($(_this).parent().prev(),json);
                //点击时，改变上下页的title
                $(_this).parent().find('.prev').attr('title',(index-1>0?index-1:1)).end().parent().find('.next').attr('title',(index+1<page_num?index+1:page_num));
                var parent = $(_this).parent();
                var num=parent.find('li:contains('+index+')').eq(0).index();
                if(num>6 && index+1<=page_num){
                    parent.find('li.next').before(parent.find('li').eq(2).html(index+1).attr('title',index+1));
                }else if(num<3 && index-1>0){
                    parent.find('li.prev').after(parent.find('li').eq(7).html(index-1).attr('title',index-1));
                }
            });
        }
    }
    //增加内容
    function add_list(obj,json){
        var html='<table class="home_bottom-forum" cellspacing="0" cellpadding="0"><tr>'+(true_false()?'<td><input type="checkbox" name="check_All" class="check_All" id="all"><label for="all">全选/全不选</label></td>':'<td width="0"></td>')+'<td>帖子名称</td><td>版块</td><td>评论数/访问数</td><td>发表时间</td>'+(true_false()?'<td colspan="2">操作</td>':'<td></td>')+'</tr>';
        for(var i=0;i<json.length;i++){
            html+='<tr forum_id="'+json[i].id+'" game_name="'+json[i].game_name+'">'+(true_false()?'<td><input type="checkbox" name="table_check" class="table_check"></td>':'<td  width="0"></td>')+'<td><a href="forum_detail.php?forum_id='+json[i].id+'&game_name='+json[i].game_name+'&user_id='+user_id+'">'+json[i].title+'</a></td><td>'+json[i].game_name_cn+'</td><td>'+json[i].comment+'/'+json[i].replay+'</td><td>'+json[i].date+'</td>'+(true_false()?'<td class="edit_user-forum">编辑</td><td class="del_user-forum">删除</td>':"<td></td>")+'</tr>';
        }
        html+='</table>'+(true_false()?'<input type="button" name="del_select" class="del_select" value="删除选中">':'');
        //alert(html);
        //点击增加阅读数
        obj.html(html).find('table tr td:nth-child(2)').click(function (){
            var id=$(this).parent().attr('forum_id');
            var game_name =$(this).parent().attr('game_name');
            $(window).load('config/show_overHead.php',{
                'replay':'true',
                'game_name':game_name,
                'forum_id':id
            },function (responseText){
                if(responseText>0){
                    location.reload();
                    //window.open('forum_detail?forum_id='+id+'&game_name='+game_name+'&user_id='+user_id);
                }
            });
        });
    }

    //加载留言数据
    function load_msg(){
        $(window).load('config/message.php',{'type':'show','user_id':user_id},function (responseText){
            var json=$.parseJSON(responseText);
            var list_num = 10;
            var count = json[0].count;
            var page_num= Math.ceil(count/list_num);
            //页数
            var list='<li title="1" class="top_page">首页</li><li title="1" class="prev">上一页</li><li class="highlight" title="1">1</li>';
            //判断总页数是否大于1，大于1就加载，如果不是就不加载
            if(page_num>1){
                var max_page_num =6;   //最大的显示是6，
                if(page_num>max_page_num){
                    for(var i=2;i<=max_page_num;i++){
                        list+='<li title="'+i+'">'+i+'</li>';
                    }
                }else{
                    for(var i=2;i<=page_num;i++){
                        list+='<li title="'+i+'">'+i+'</li>';
                    }
                }
                list+='<li title="2" class="next">下一页</li><li title="'+page_num+'"  class="bottom_page">尾页</li><li class="jump_li"><input type="text" value="0" class="jump_num"><input type="button" value="跳转" class="jump"></li><li>共<span>'+page_num+'</span>页</li><div class="clear_float"></div>';
                $('.home_bottom ul.list').html(list);
            } else{
                $('.home_bottom ul.list').html(' ');
            }
            msg_add_list($('.home_bottom .content'),json);

            //跳转页数
            $('.home_bottom ul.list li').click(function (){
                var _this = this;
                //数字跳转
                if(!!(+$(this).html())){
                    var title=$(this).addClass('highlight').siblings().removeClass('highlight').end().attr('title');
                    title=+title;
                    page_event(_this,title,page_num);
                }else if($(this).hasClass('prev') || $(this).hasClass('next')){         //上下页跳转
                    var index = +$(this).attr('title');
                    $(this).parent().find('li:contains('+index+')').eq(0).addClass('highlight').siblings().removeClass('highlight');
                    page_event(_this,index,page_num);
                }else if($(this).hasClass('top_page') || $(this).hasClass('bottom_page')){            //首页和尾页
                    var top_index_bottom = +$(this).attr('title');
                    if(top_index_bottom===1){                   //首页
                        $(this).parent().find('li').eq(2).html(top_index_bottom).attr('title',top_index_bottom).addClass('highlight').siblings().removeClass('highlight');
                        for(var i=3;i<8;i++){
                            $(this).parent().find('li').eq(i).html(top_index_bottom+(i-2)).attr('title',top_index_bottom+(i-2));
                        }
                    }else if(top_index_bottom === page_num){      //尾页
                        for(var i=2;i<7;i++){
                            $(this).parent().find('li').eq(i).html(top_index_bottom+(i-7)).attr('title',top_index_bottom+(i-7));
                        }
                        $(this).parent().find('li').eq(7).html(top_index_bottom).attr('title',top_index_bottom).addClass('highlight').siblings().removeClass('highlight');
                    }
                    page_event(_this,top_index_bottom,page_num);
                }else{                        //输入跳转
                    $('.home_bottom ul.list li.jump_li input:first-child').bind('input',function (){
                        var value= $(this).val();
                        $(this).val(value.replace(/\D+/g,''));
                        value = +$(this).val();
                        var num=page_num;
                        if(value>num){
                            $(this).val(num);
                        }
                    }).next().click(function (e){
                        if(page_num>6){
                            var value = +$(this).prev().val();
                            page_event(_this,value,page_num);
                            if(value-3<=0){
                                $(_this).parent().find('li').eq(2).html(value).attr('title',value).addClass('highlight').siblings().removeClass('highlight');
                                for(var i=3;i<8;i++){
                                    $(_this).parent().find('li').eq(i).html(value+(i-2)).attr('title',value+(i-2));
                                }
                            }else if(value+2>page_num){
                                for(var i=2;i<7;i++){
                                    $(_this).parent().find('li').eq(i).html(value+(i-7)).attr('title',value+(i-7));
                                }
                                $(_this).parent().find('li').eq(7).html(value).attr('title',value).addClass('highlight').siblings().removeClass('highlight');
                            }else{
                                $(_this).parent().find('li').eq(5).html(value).attr('title',value).addClass('highlight').siblings().removeClass('highlight');
                                for(var i=1;i<3;i++){
                                    $(_this).parent().find('li').eq((5+i)).html(value+i).attr('title',value+i);
                                }
                                for(var i=1;i<4;i++){
                                    $(_this).parent().find('li').eq((5-i)).html(value-i).attr('title',value-i);
                                }
                            }
                        }
                    });
                }
            });

        });

        function page_event(_this,index,page_num){
            $(window).load('config/message.php',{'limit':index,'type':'show','user_id':user_id},function (responseText){
                var json=$.parseJSON(responseText);
                msg_add_list($(_this).parent().prev(),json);
                //点击时，改变上下页的title
                $(_this).parent().find('.prev').attr('title',(index-1>0?index-1:1)).end().parent().find('.next').attr('title',(index+1<page_num?index+1:page_num));
                var parent = $(_this).parent();
                var num=parent.find('li:contains('+index+')').eq(0).index();
                if(num>6 && index+1<=page_num){
                    parent.find('li.next').before(parent.find('li').eq(2).html(index+1).attr('title',index+1));
                }else if(num<3 && index-1>0){
                    parent.find('li.prev').after(parent.find('li').eq(7).html(index-1).attr('title',index-1));
                }
            });
        }
    }
    //增加内容
    function msg_add_list(obj,json){
        var html='<div class="post_msg"><input type="text" name="con_message" class="con_message" placeholder="输入你要对我的话！！！"><input type="button" name="msg_but" class="msg_but" value="留言"></div><ul class="message">';
        for(var i=0;i<json.length;i++){
            html+='<li><img src="images/'+json[i].top_img+'" alt=""><div class="msg_info"><p><span class="username">'+json[i].username+'</span><span class="date">'+json[i].date+'</span></p><p>'+json[i].message_content+'</p></div><div class="clear_float"></div></li>';
        }
        html+='</ul>';
        //alert(html);
        //点击增加阅读数
        obj.html(html);
    }

    //管理员加载全部数据
    function load_all(){
        $(window).load('config/admin_show.php',{'admin_id':cookie_id},function (responseText){
            var json=$.parseJSON(responseText);
            var list_num = 10;
            var count = json[0].count;
            var page_num= Math.ceil(count/list_num);
            //页数
            var list='<li title="1" class="top_page">首页</li><li title="1" class="prev">上一页</li><li class="highlight" title="1">1</li>';
            //判断总页数是否大于1，大于1就加载，如果不是就不加载
            if(page_num>1){
                var max_page_num =6;   //最大的显示是6，
                if(page_num>max_page_num){
                    for(var i=2;i<=max_page_num;i++){
                        list+='<li title="'+i+'">'+i+'</li>';
                    }
                }else{
                    for(var i=2;i<=page_num;i++){
                        list+='<li title="'+i+'">'+i+'</li>';
                    }
                }
                list+='<li title="2" class="next">下一页</li><li title="'+page_num+'"  class="bottom_page">尾页</li><li class="jump_li"><input type="text" value="0" class="jump_num"><input type="button" value="跳转" class="jump"></li><li>共<span>'+page_num+'</span>页</li><div class="clear_float"></div>';
                $('.home_bottom ul.list').html(list);
            } else{
                $('.home_bottom ul.list').html(' ');
            }
            all_add_list($('.home_bottom .content'),json);

            //跳转页数
            $('.home_bottom ul.list li').click(function (){
                var _this = this;
                //数字跳转
                if(!!(+$(this).html())){
                    var title=$(this).addClass('highlight').siblings().removeClass('highlight').end().attr('title');
                    title=+title;
                    page_event(_this,title,page_num);
                }else if($(this).hasClass('prev') || $(this).hasClass('next')){         //上下页跳转
                    var index = +$(this).attr('title');
                    $(this).parent().find('li:contains('+index+')').eq(0).addClass('highlight').siblings().removeClass('highlight');
                    page_event(_this,index,page_num);
                }else if($(this).hasClass('top_page') || $(this).hasClass('bottom_page')){            //首页和尾页
                    var top_index_bottom = +$(this).attr('title');
                    if(top_index_bottom===1){                   //首页
                        $(this).parent().find('li').eq(2).html(top_index_bottom).attr('title',top_index_bottom).addClass('highlight').siblings().removeClass('highlight');
                        for(var i=3;i<8;i++){
                            $(this).parent().find('li').eq(i).html(top_index_bottom+(i-2)).attr('title',top_index_bottom+(i-2));
                        }
                    }else if(top_index_bottom === page_num){      //尾页
                        for(var i=2;i<7;i++){
                            $(this).parent().find('li').eq(i).html(top_index_bottom+(i-7)).attr('title',top_index_bottom+(i-7));
                        }
                        $(this).parent().find('li').eq(7).html(top_index_bottom).attr('title',top_index_bottom).addClass('highlight').siblings().removeClass('highlight');
                    }
                    page_event(_this,top_index_bottom,page_num);
                }else{                        //输入跳转
                    $('.home_bottom ul.list li.jump_li input:first-child').bind('input',function (){
                        var value= $(this).val();
                        $(this).val(value.replace(/\D+/g,''));
                        value = +$(this).val();
                        var num=page_num;
                        if(value>num){
                            $(this).val(num);
                        }
                    }).next().click(function (e){
                        if(page_num>6){
                            var value = +$(this).prev().val();
                            page_event(_this,value,page_num);
                            if(value-3<=0){
                                $(_this).parent().find('li').eq(2).html(value).attr('title',value).addClass('highlight').siblings().removeClass('highlight');
                                for(var i=3;i<8;i++){
                                    $(_this).parent().find('li').eq(i).html(value+(i-2)).attr('title',value+(i-2));
                                }
                            }else if(value+2>page_num){
                                for(var i=2;i<7;i++){
                                    $(_this).parent().find('li').eq(i).html(value+(i-7)).attr('title',value+(i-7));
                                }
                                $(_this).parent().find('li').eq(7).html(value).attr('title',value).addClass('highlight').siblings().removeClass('highlight');
                            }else{
                                $(_this).parent().find('li').eq(5).html(value).attr('title',value).addClass('highlight').siblings().removeClass('highlight');
                                for(var i=1;i<3;i++){
                                    $(_this).parent().find('li').eq((5+i)).html(value+i).attr('title',value+i);
                                }
                                for(var i=1;i<4;i++){
                                    $(_this).parent().find('li').eq((5-i)).html(value-i).attr('title',value-i);
                                }
                            }
                        }
                    });
                }
            });

        });

        function page_event(_this,index,page_num){
            $(window).load('config/admin_show.php',{'limit':index,'admin_id':cookie_id},function (responseText){
                var json=$.parseJSON(responseText);
                all_add_list($(_this).parent().prev(),json);
                //点击时，改变上下页的title
                $(_this).parent().find('.prev').attr('title',(index-1>0?index-1:1)).end().parent().find('.next').attr('title',(index+1<page_num?index+1:page_num));
                var parent = $(_this).parent();
                var num=parent.find('li:contains('+index+')').eq(0).index();
                if(num>6 && index+1<=page_num){
                    parent.find('li.next').before(parent.find('li').eq(2).html(index+1).attr('title',index+1));
                }else if(num<3 && index-1>0){
                    parent.find('li.prev').after(parent.find('li').eq(7).html(index-1).attr('title',index-1));
                }
            });
        }
    }
    //管理员增加内容
    function all_add_list(obj,json){
        var html='<table class="home_bottom-forum" cellspacing="0" cellpadding="0"><tr>'+(true_false()?'<td><input type="checkbox" name="check_All" class="check_All" id="all"><label for="all">全选/全不选</label></td>':'<td width="0"></td>')+'<td>帖子名称</td><td>版块</td><td>评论数/访问数</td><td>发表时间</td>'+(true_false()?'<td colspan="2">操作</td>':'<td></td>')+'</tr>';
        for(var i=0;i<json.length;i++){
            html+='<tr user_id="'+json[i].user_id+'" forum_id="'+json[i].id+'" game_name="'+json[i].game_name+'">'+(true_false()?'<td><input type="checkbox" name="table_check" class="table_check"></td>':'<td  width="0"></td>')+'<td><a href="forum_detail.php?forum_id='+json[i].id+'&game_name='+json[i].game_name+'&user_id='+json[i].user_id+'">'+json[i].title+'</a></td><td>'+json[i].game_name_cn+'</td><td>'+json[i].comment+'/'+json[i].replay+'</td><td>'+json[i].date+'</td>'+(true_false()?'<td class="del_user-forum">删除</td>':"<td></td>")+''+(json[i].overhead !=='1'?'<td class="head">置顶</td>':'<td class="clear_head">取消置顶</td>')+'</tr>';
        }
        html+='</table>'+(true_false()?'<input type="button" name="del_select" class="del_select" value="删除选中">':'');
        //alert(html);
        //点击增加阅读数
        obj.html(html).find('table tr td:nth-child(2)').click(function (){
            var id=$(this).parent().attr('forum_id');
            var user_id=$(this).parent().attr('user_id');
            var game_name =$(this).parent().attr('game_name');
            $(window).load('config/show_overHead.php',{
                'replay':'true',
                'game_name':game_name,
                'forum_id':id
            },function (responseText){
                if(responseText>0){
                    location.reload();
                    //window.open('forum_detail?forum_id='+id+'&game_name='+game_name+'&user_id='+user_id);
                }
            });
        });
    }

    //超级管理员加载全部数据
    function load_user(){
        $(window).load('config/show_forum.php',{'show_type':'show_user'},function (responseText){
            var json=$.parseJSON(responseText);
            var list_num = 10;
            var count = json[0].count;
            var page_num= Math.ceil(count/list_num);
            //页数
            var list='<li title="1" class="top_page">首页</li><li title="1" class="prev">上一页</li><li class="highlight" title="1">1</li>';
            //判断总页数是否大于1，大于1就加载，如果不是就不加载
            if(page_num>1){
                var max_page_num =6;   //最大的显示是6，
                if(page_num>max_page_num){
                    for(var i=2;i<=max_page_num;i++){
                        list+='<li title="'+i+'">'+i+'</li>';
                    }
                }else{
                    for(var i=2;i<=page_num;i++){
                        list+='<li title="'+i+'">'+i+'</li>';
                    }
                }
                list+='<li title="2" class="next">下一页</li><li title="'+page_num+'"  class="bottom_page">尾页</li><li class="jump_li"><input type="text" value="0" class="jump_num"><input type="button" value="跳转" class="jump"></li><li>共<span>'+page_num+'</span>页</li><div class="clear_float"></div>';
                $('.home_bottom ul.list').html(list);
            } else{
                $('.home_bottom ul.list').html(' ');
            }
            user_add_list($('.home_bottom .content'),json);

            //跳转页数
            $('.home_bottom ul.list li').click(function (){
                var _this = this;
                //数字跳转
                if(!!(+$(this).html())){
                    var title=$(this).addClass('highlight').siblings().removeClass('highlight').end().attr('title');
                    title=+title;
                    page_event(_this,title,page_num);
                }else if($(this).hasClass('prev') || $(this).hasClass('next')){         //上下页跳转
                    var index = +$(this).attr('title');
                    $(this).parent().find('li:contains('+index+')').eq(0).addClass('highlight').siblings().removeClass('highlight');
                    page_event(_this,index,page_num);
                }else if($(this).hasClass('top_page') || $(this).hasClass('bottom_page')){            //首页和尾页
                    var top_index_bottom = +$(this).attr('title');
                    if(top_index_bottom===1){                   //首页
                        $(this).parent().find('li').eq(2).html(top_index_bottom).attr('title',top_index_bottom).addClass('highlight').siblings().removeClass('highlight');
                        for(var i=3;i<8;i++){
                            $(this).parent().find('li').eq(i).html(top_index_bottom+(i-2)).attr('title',top_index_bottom+(i-2));
                        }
                    }else if(top_index_bottom === page_num){      //尾页
                        for(var i=2;i<7;i++){
                            $(this).parent().find('li').eq(i).html(top_index_bottom+(i-7)).attr('title',top_index_bottom+(i-7));
                        }
                        $(this).parent().find('li').eq(7).html(top_index_bottom).attr('title',top_index_bottom).addClass('highlight').siblings().removeClass('highlight');
                    }
                    page_event(_this,top_index_bottom,page_num);
                }else{                        //输入跳转
                    $('.home_bottom ul.list li.jump_li input:first-child').bind('input',function (){
                        var value= $(this).val();
                        $(this).val(value.replace(/\D+/g,''));
                        value = +$(this).val();
                        var num=page_num;
                        if(value>num){
                            $(this).val(num);
                        }
                    }).next().click(function (e){
                        if(page_num>6){
                            var value = +$(this).prev().val();
                            page_event(_this,value,page_num);
                            if(value-3<=0){
                                $(_this).parent().find('li').eq(2).html(value).attr('title',value).addClass('highlight').siblings().removeClass('highlight');
                                for(var i=3;i<8;i++){
                                    $(_this).parent().find('li').eq(i).html(value+(i-2)).attr('title',value+(i-2));
                                }
                            }else if(value+2>page_num){
                                for(var i=2;i<7;i++){
                                    $(_this).parent().find('li').eq(i).html(value+(i-7)).attr('title',value+(i-7));
                                }
                                $(_this).parent().find('li').eq(7).html(value).attr('title',value).addClass('highlight').siblings().removeClass('highlight');
                            }else{
                                $(_this).parent().find('li').eq(5).html(value).attr('title',value).addClass('highlight').siblings().removeClass('highlight');
                                for(var i=1;i<3;i++){
                                    $(_this).parent().find('li').eq((5+i)).html(value+i).attr('title',value+i);
                                }
                                for(var i=1;i<4;i++){
                                    $(_this).parent().find('li').eq((5-i)).html(value-i).attr('title',value-i);
                                }
                            }
                        }
                    });
                }
            });

        });

        function page_event(_this,index,page_num){
            $(window).load('config/show_forum.php',{'limit':index,'show_type':'show_user'},function (responseText){
                var json=$.parseJSON(responseText);
                user_add_list($(_this).parent().prev(),json);
                //点击时，改变上下页的title
                $(_this).parent().find('.prev').attr('title',(index-1>0?index-1:1)).end().parent().find('.next').attr('title',(index+1<page_num?index+1:page_num));
                var parent = $(_this).parent();
                var num=parent.find('li:contains('+index+')').eq(0).index();
                if(num>6 && index+1<=page_num){
                    parent.find('li.next').before(parent.find('li').eq(2).html(index+1).attr('title',index+1));
                }else if(num<3 && index-1>0){
                    parent.find('li.prev').after(parent.find('li').eq(7).html(index-1).attr('title',index-1));
                }
            });
        }
    }
    //超级管理员增加内容
    function user_add_list(obj,json){
        var html='<table class="home_bottom-forum" cellspacing="0" cellpadding="0"><tr><td><input type="checkbox" name="check_All" class="check_All" id="all"><label for="all">全选/全不选</label></td><td style="width:10%">头像</td><td style="width:10%">用户名</td><td>最近登录</td><td style="width:10%">注册时间</td><td  colspan="3">操作</td> </tr>';
        for(var i=0;i<json.length;i++){
            html+='<tr user_id="'+json[i].id+'"><td><input type="checkbox" name="table_check" class="table_check"></td><td style="width:10%;text-align:center;"><img src="images/'+json[i].top_img+'" alt=""></td><td style="width:10%">'+json[i].username+'/'+json[i].type+''+(json[i].game_name !=''?'/'+json[i].game_name:'')+'</td><td>'+json[i].login_date+'</td><td>'+json[i].date+'</td><td style="width:2%"><a href="home.php?user_id='+json[i].id+'">查看</a></td><td style="width:2%" class="user_del">删除</td><td style="width:3%" class="admin">管理员</td></tr>';
        }
        html+='</table>'+(true_false()?'<input type="button" name="user_del_select" class="user_del_select" value="删除选中">':'');
        // alert(html);
        //点击增加阅读数
        obj.html(html);
    }

    //超级管理员加载游戏数据
    function load_game(){
        $(window).load('config/opera_game.php',{'type':'show'},function (responseText){
            // alert(responseText);
            var json=$.parseJSON(responseText);
            var list_num = 10;
            var count = json[0].count;
            var page_num= Math.ceil(count/list_num);
            //页数
            var list='<li title="1" class="top_page">首页</li><li title="1" class="prev">上一页</li><li class="highlight" title="1">1</li>';
            //判断总页数是否大于1，大于1就加载，如果不是就不加载
            if(page_num>1){
                var max_page_num =6;   //最大的显示是6，
                if(page_num>max_page_num){
                    for(var i=2;i<=max_page_num;i++){
                        list+='<li title="'+i+'">'+i+'</li>';
                    }
                }else{
                    for(var i=2;i<=page_num;i++){
                        list+='<li title="'+i+'">'+i+'</li>';
                    }
                }
                list+='<li title="2" class="next">下一页</li><li title="'+page_num+'"  class="bottom_page">尾页</li><li class="jump_li"><input type="text" value="0" class="jump_num"><input type="button" value="跳转" class="jump"></li><li>共<span>'+page_num+'</span>页</li><div class="clear_float"></div>';
                $('.home_bottom ul.list').html(list);
            } else{
                $('.home_bottom ul.list').html(' ');
            }
            game_add_list($('.home_bottom .content'),json);

            //跳转页数
            $('.home_bottom ul.list li').click(function (){
                var _this = this;
                //数字跳转
                if(!!(+$(this).html())){
                    var title=$(this).addClass('highlight').siblings().removeClass('highlight').end().attr('title');
                    title=+title;
                    page_event(_this,title,page_num);
                }else if($(this).hasClass('prev') || $(this).hasClass('next')){         //上下页跳转
                    var index = +$(this).attr('title');
                    $(this).parent().find('li:contains('+index+')').eq(0).addClass('highlight').siblings().removeClass('highlight');
                    page_event(_this,index,page_num);
                }else if($(this).hasClass('top_page') || $(this).hasClass('bottom_page')){            //首页和尾页
                    var top_index_bottom = +$(this).attr('title');
                    if(top_index_bottom===1){                   //首页
                        $(this).parent().find('li').eq(2).html(top_index_bottom).attr('title',top_index_bottom).addClass('highlight').siblings().removeClass('highlight');
                        for(var i=3;i<8;i++){
                            $(this).parent().find('li').eq(i).html(top_index_bottom+(i-2)).attr('title',top_index_bottom+(i-2));
                        }
                    }else if(top_index_bottom === page_num){      //尾页
                        for(var i=2;i<7;i++){
                            $(this).parent().find('li').eq(i).html(top_index_bottom+(i-7)).attr('title',top_index_bottom+(i-7));
                        }
                        $(this).parent().find('li').eq(7).html(top_index_bottom).attr('title',top_index_bottom).addClass('highlight').siblings().removeClass('highlight');
                    }
                    page_event(_this,top_index_bottom,page_num);
                }else{                        //输入跳转
                    $('.home_bottom ul.list li.jump_li input:first-child').bind('input',function (){
                        var value= $(this).val();
                        $(this).val(value.replace(/\D+/g,''));
                        value = +$(this).val();
                        var num=page_num;
                        if(value>num){
                            $(this).val(num);
                        }
                    }).next().click(function (e){
                        if(page_num>6){
                            var value = +$(this).prev().val();
                            page_event(_this,value,page_num);
                            if(value-3<=0){
                                $(_this).parent().find('li').eq(2).html(value).attr('title',value).addClass('highlight').siblings().removeClass('highlight');
                                for(var i=3;i<8;i++){
                                    $(_this).parent().find('li').eq(i).html(value+(i-2)).attr('title',value+(i-2));
                                }
                            }else if(value+2>page_num){
                                for(var i=2;i<7;i++){
                                    $(_this).parent().find('li').eq(i).html(value+(i-7)).attr('title',value+(i-7));
                                }
                                $(_this).parent().find('li').eq(7).html(value).attr('title',value).addClass('highlight').siblings().removeClass('highlight');
                            }else{
                                $(_this).parent().find('li').eq(5).html(value).attr('title',value).addClass('highlight').siblings().removeClass('highlight');
                                for(var i=1;i<3;i++){
                                    $(_this).parent().find('li').eq((5+i)).html(value+i).attr('title',value+i);
                                }
                                for(var i=1;i<4;i++){
                                    $(_this).parent().find('li').eq((5-i)).html(value-i).attr('title',value-i);
                                }
                            }
                        }
                    });
                }
            });

        });

        function page_event(_this,index,page_num){
            $(window).load('config/opera_game.php',{'limit':index,'type':'show'},function (responseText){
                var json=$.parseJSON(responseText);
                game_add_list($(_this).parent().prev(),json);
                //点击时，改变上下页的title
                $(_this).parent().find('.prev').attr('title',(index-1>0?index-1:1)).end().parent().find('.next').attr('title',(index+1<page_num?index+1:page_num));
                var parent = $(_this).parent();
                var num=parent.find('li:contains('+index+')').eq(0).index();
                if(num>6 && index+1<=page_num){
                    parent.find('li.next').before(parent.find('li').eq(2).html(index+1).attr('title',index+1));
                }else if(num<3 && index-1>0){
                    parent.find('li.prev').after(parent.find('li').eq(7).html(index-1).attr('title',index-1));
                }
            });
        }
    }
    //超级管理员增加内容
    function game_add_list(obj,json){
        var html='<table class="home_bottom-forum" cellspacing="0" cellpadding="0"><tr><td><input type="checkbox" name="check_All" class="check_All" id="all"><label for="all">全选/全不选</label></td><td style="width:10%">游戏头像</td><td style="width:10%">游戏名</td><td>游戏类型</td><td>帖子数</td><td>管理员</td><td style="width:10%">创建时间</td><td  colspan="3">操作</td></tr>';
        for(var i=0;i<json.length;i++){
            html+='<tr game_id="'+json[i].id+'" game_name="'+json[i].game_name+'"><td><input type="checkbox" name="table_check" class="table_check"></td><td style="width:10%;text-align:center;"><img src="images/'+json[i].game_img+'" alt=""></td><td style="width:10%" game_name="'+json[i].game_name+'"><a href="forum.php?game_id='+json[i].id+'">'+json[i].game_name_cn+'</a></td><td>'+json[i].game_type+'</td><td>'+json[i].forum_count+'</td><td  style="width:10%"><a href="home.php?user_id='+json[i].user_id+'" target="_blank">'+json[i].admin_name+'</a></td><td>'+json[i].date+'</td><td style="width:10%" class="game_del">删除</td></tr>';
        }
        html+='</table><input type="button" name="game_del_select" class="game_del_select" value="删除选中"><input type="button" name="add_game" class="add_game" value="添加游戏">';
        // alert(html);
        //点击增加阅读数
        obj.html(html);
    }




    /*全选/全不选*/
    $('.home_bottom .content').on('click','.check_All',function (){
        $('.home_bottom .home_bottom-forum td input').prop('checked',$(this).prop('checked'));
    }).on('click','.table_check',function (){
        var flag = true;
        $('.table_check').each(function (){
            if(!$(this).prop('checked')){
                flag = false;
            }
        });
        $('.check_All').prop('checked',flag);
    }).on('click','.del_select',function (){          //删除选中的
        var table=$(this).prev();
        table.find('tr td:nth-child(1) input[name=table_check]').each(function (){
            if($(this).prop('checked')){
                var id=$(this).parent().parent().attr('forum_id');
                var game_name =$(this).parent().parent().attr('game_name');
                $.post('config/change_forum.php',{
                    'type':'del',
                    'forum_id':id,
                    'game_name':game_name
                },function (data){
                    load_forum();
                    load_all();
                });
            }


        });
    }).on('click','.del_user-forum',function (){          //删除特定的
        var id=$(this).parent().attr('forum_id');
        var game_name =$(this).parent().attr('game_name');
        $.post('config/change_forum.php',{
            'type':'del',
            'forum_id':id,
            'game_name':game_name
        },function (data){
            load_forum();
            load_all();
        });
    }).on('click','.edit_user-forum',function (){      //编辑帖子
        var id=$(this).parent().attr('forum_id');
        var game_name =$(this).parent().attr('game_name');
        var game_name_cn =$(this).parent().find('td:nth-child(3)').html();
        var title =$(this).parent().find('td:nth-child(2)').html();
        if($.browser.version >9){
            var editor_msg=$('.editor_msg');
            $('#shadow').fadeIn(400);
            editor_msg.fadeIn(400);
            document.documentElement.style.overflow='hidden';
            center(editor_msg);
            document.documentElement.scrollTop=0;
            editor_msg.find('p').attr('game_name',game_name).attr('forum_id',id).find('span').html(game_name_cn);
            editor_msg.find('.msg_title').val(title);
            $.post('config/change_forum.php',{
                'type':'get_content',
                'game_name':game_name,
                'forum_id':id
            },function (data){
                editor.txt.html(data);
            });

        }else{
            alert('浏览器版本太低，无法发帖！！！！');
        }
    }).on('click','.post_msg input.msg_but',function (){     //发表留言
        var _this=this;
        if(ver_login()){
            var message_content = $(this).prev().val();
            $.ajax({
                url:'config/message.php',
                data:{
                    'type':'insert',
                    'user_id':user_id,
                    'cookie_id':cookie_id,
                    'message_content':message_content
                },
                type:'post',
                async:'true',
                beforeSend:function (){
                    //loading居中
                    center($('.loading'));
                    $('.loading').show();
                    $('.loading').css('background','#fff url(images/loading.gif) no-repeat 0 center');
                    $('.loading').html('发表中.........');
                    $('.post_msg input.msg_but').attr('disabled','disabled');
                },
                success:function (data){
                    if(data>0) {
                        $(this).prev().val(' ');
                        //loading居中
                        center($('.loading'));
                        $('.loading').show();
                        $('.loading').css('background','#fff url(images/green.png) no-repeat 0 center');
                        $('.loading').html('发表成功！！！');
                        $('.post_msg input.msg_but').removeAttr('disabled');
                        setTimeout(function (){
                            $('.loading').fadeOut(500,function (){
                                load_msg();
                            });
                        },500);
                    }else{
                        center($('.loading'));
                        $('.loading').show();
                        $('.loading').css('background','#fff url(images/info.png) no-repeat 0 center');
                        $('.loading').html('发表失败，请重新发表！！！');
                        $('.post_msg input.msg_but').removeAttr('disabled');
                        setTimeout(function (){
                            $('.loading').fadeOut(500,function (){});
                        },500);
                    }
                }
            });
        }
    }).on('click','.user_del_select',function (){          //删除选中的
        var table=$(this).prev();
        table.find('tr td:nth-child(1) input[name=table_check]').each(function (){
            if($(this).prop('checked')){
                var id=$(this).parent().parent().attr('user_id');
                $.post('config/del_user.php',{
                    'user_id':id
                },function (data){
                    load_user();
                });
            }


        });
    }).on('click','.user_del',function (){          //删除特定的
        var id=$(this).parent().attr('user_id');
        $.post('config/del_user.php',{
            'user_id':id
        },function (data){
            //alert(data);
            load_user();
        });
    }).on('click','.clear_head',function (){        //取消顶置
        var forum_id=$(this).parent().attr('forum_id');
        var game_name =$(this).parent().attr('game_name');
        $.post('config/change_forum.php',{
            'type':'clear_head',
            'forum_id':forum_id,
            'game_name':game_name
        },function (data){
            location.reload();
        });
    }).on('click','.head',function (){       //顶置
        var forum_id=$(this).parent().attr('forum_id');
        var game_name =$(this).parent().attr('game_name');
        $.post('config/change_forum.php',{
            'type':'head',
            'forum_id':forum_id,
            'game_name':game_name
        },function (data){
            if(data == '1'){
                location.reload();
            }else{
                alert('置顶失败，最多只能置顶4条！！！！');
            }

        });
    }).on('click','.game_del',function (){
        var id=$(this).parent().attr('game_id');
        var game_name=$(this).parent().attr('game_name');
        $.post('config/opera_game.php',{
            'type':'del',
            'game_id':id,
            'game_name':game_name
        },function (data){
            load_game();
        });
    }).on('click','.game_del_select',function (){
        var table=$(this).prev();
        table.find('tr td:nth-child(1) input[name=table_check]').each(function (){
            if($(this).prop('checked')){
                var id=$(this).parent().parent().attr('game_id');
                var game_name=$(this).parent().parent().attr('game_name');
                $.post('config/opera_game.php',{
                    'type':'del',
                    'game_id':id,
                    'game_name':game_name
                },function (data){
                    load_game();
                });
            }


        });
    }).on('click','.add_game',function (){
        $('.game').fadeIn(400);
        $('#shadow').fadeIn(400);
        document.documentElement.style.overflow='hidden';
        document.documentElement.scrollTop=0;
    });

    $('.editor_msg .close').click(function (){
        $('#shadow').fadeOut(400);
        $('.editor_msg').fadeOut(400);
        document.documentElement.style.overflow='scroll';
    });


    //一富文本插件
    var E = window.wangEditor;
    var editor = new E('#editor_title','#editor_centent');
    editor.create();
    //移动编辑框
    drag( $('.editor_msg h2'));
    //修改的帖子发表
    //发表文章
    $('.editor_msg input.post_editor').click(function (){
        var title=$('.editor_msg input.msg_title').val();
        var content_html=editor.txt.html();
        var content_text=editor.txt.text();
        var game_name =$('.editor_msg p').attr('game_name');
        var forum_id =$('.editor_msg p').attr('forum_id');
        if(!title){
            alert('标题不可为空');
        }else if(!content_text){
            alert('内容不可为空');
        }else{
            $.ajax({
                url:'config/change_forum.php',
                data:{
                    type:'edit',
                    game_name:game_name,
                    forum_id:forum_id,
                    title:title,
                    content:content_html
                },
                type:'post',
                async:true,
                beforeSend:function (){
                    //loading居中
                    center($('.loading'));
                    $('.loading').show();
                    $('.loading').css('background','#fff url(images/loading.gif) no-repeat 0 center');
                    $('.loading').html('发表中.........');
                    $('.editor_msg input.post_editor').attr('disabled','disabled');
                },
                success:function (data){
                    if(data>0) {
                        $('.editor_msg input.msg_title').val(' ');
                        editor.txt.html(' ');
                        //loading居中
                        center($('.loading'));
                        $('.loading').show();
                        $('.loading').css('background','#fff url(images/green.png) no-repeat 0 center');
                        $('.loading').html('发表成功！！！');
                        $('.editor_msg input.post_editor').removeAttr('disabled');
                        setTimeout(function (){
                            $('.loading').fadeOut(500,function (){
                                $('#shadow').fadeOut(400);
                                $('.editor_msg').fadeOut(400);
                                location.reload();
                            });
                        },500);
                        //document.documentElement.style.overflow='scroll';
                    }else{
                        center($('.loading'));
                        $('.loading').show();
                        $('.loading').css('background','#fff url(images/info.png) no-repeat 0 center');
                        $('.loading').html('请修改内容后再发！！！');
                        $('.editor_msg input.post_editor').removeAttr('disabled');
                        setTimeout(function (){
                            $('.loading').fadeOut(500);
                        },1000);
                    }
                }
            });

        }

    });




    /*获取首页的用户信息*/
    index_user_info();
    function index_user_info(){

        $.post('config/get_info.php',{
            'user_id':user_id,
            'cookie_id':cookie_id,
            'sup_admin':true_false(),
            'cookie_username':cookie_username,
            'cookie_password':cookie_password
        },function (data){

            var array = true_false()?data.split('?'):[];
            if(array[0] === '超级管理员'){
                var ul = $('.home_middle .home_middle-nav ul');
                if(ul.find('li').size()<4){
                    ul.css('width','490px').append('<li>用户</li>\<li>游戏</li>');
                }
            }else if(array[0] === '管理员'){
                var ul = $('.home_middle .home_middle-nav ul');
                if(ul.find('li').size()<4){
                    ul.css('width','400px').append('<li>全部帖子</li>');
                }
            }
            var str = true_false()?array[1]:data;
            var json = $.parseJSON(str);
            var html = '<div class="home_bottom-user_info"><ul><li>基本资料</li><li>用户名：<span>'+json.username+'</span></li><li>昵　称：<span>'+json.nickname+'</span></li><li>类　型：<span>'+json.type+'</span></li><li>性　别：<span>'+json.sex +'</span></li><li>年　龄：<span>'+json.age+'</span></li><li>生　日：<span>'+json.birth_date+'</span></li><li>邮　箱：<span>'+json.email+'</span></li><li>手　机：<span>'+json.phone+'</span></li><li>地　址：<span>'+json.address+'</span></li> <li>描　述：<span>'+json.description+'</span></li></ul></div><!--home_bottom-user_info-->'+ (true_false()?'<span class="edit">编辑资料</span>':'');
            $('.home_bottom .content').html(html);
            var sum_exp = 0;
            var exp = +json.exp;
            var lv = (exp.toString(2)).length-1;
            for(var i=0;i<=lv;i++){
                sum_exp+=Math.pow(2,i);
            }
            var ratio = Math.floor((exp/sum_exp)*100);
            $('.home_middle .home_middle-user_info .top_img').css('background','url(images/'+json.top_img+')');
            $('.home_middle .home_middle-user_info .username').html(json.nickname);
            $('.home_middle .home_middle-user_info .lv li:nth-child(1) span').html(lv);
            $('.home_middle .home_middle-user_info .lv li:nth-child(2)').attr('title',exp+'/'+sum_exp).find('span').width(ratio+'%');
            $('.home_middle .home_middle-user_info .description').html(json.description);
            $('.alter_top_img img').attr('src','images/'+json.top_img);

        });
    }


    /*编辑框居中*/
    center($('.edit_info'));
    drag($('.edit_info h2'));
    /*点击编辑资料时的效果*/
    $('.home_bottom .edit,.home_middle .home_middle-user_info .edit li:nth-child(1)').click(function (){
        show_edit();
    });
    $('.home_bottom').on('click','.edit',function (){
        show_edit();
    });
    function show_edit(){
        //每次点击都要居中登录框
        center($('.edit_info'));
        $('.edit_info').fadeIn(400);
        $('#shadow').fadeIn(400);
        document.documentElement.style.overflow='hidden';
        document.documentElement.scrollTop=0;
        $('.edit_form #nickname').val($('.home_bottom-user_info ul li:eq(2) span').html());
        $('.edit_form #age').val($('.home_bottom-user_info ul li:eq(5) span').html());
        $('.edit_form #birth_date').val($('.home_bottom-user_info ul li:eq(6) span').html());
        $('.edit_form #email').val($('.home_bottom-user_info ul li:eq(7) span').html());
        $('.edit_form #phone').val($('.home_bottom-user_info ul li:eq(8) span').html());
        $('.edit_form #address').val($('.home_bottom-user_info ul li:eq(9) span').html());
        $('.edit_form #description').val($('.home_bottom-user_info ul li:eq(10) span').html());
        if($('.home_bottom-user_info ul li:eq(4) span').html() === '男'){
            $('.edit_form input[name=sex]').eq(0).prop('checked','true');
        }else{
            $('.edit_form input[name=sex]').eq(1).prop('checked','true');
        }
    }
    $('.edit_info .close').click(function (){
        $('.edit_info').fadeOut(400);
        $('#shadow').fadeOut(400);
        document.documentElement.style.overflow='scroll';
    });

    /*选项卡的点击*/
    $('.edit_info .form_option li').click(function (){
        var index = $(this).addClass('option').siblings().removeClass('option').end().index();
        $('.edit_info form').hide();
        $('.edit_info form').eq(index).show();
        if(index === 2){
            $.post('config/change_info',{'type':'get_privacy','user_id':cookie_id},function (data){
                var array = data.split(',');
                for(var i=0; i<array.length;i++){
                    $('.privacy .privacy_check[name='+array[i]+']').prop('checked','true');
                }
            });
        }
    });


    /*表单验证和个人资料*/
    (function (){
        var parent = $('#edit_inputs');

        //用户名验证
        var nickname = parent.find('#nickname');
        var nickname_value = nickname.val();
        nickname.focus(function (){
            $(this).removeClass('error2');
            parent.find('.nickname_error2').show().html('请输入长度大于2且小于16的用户名！').addClass('ver');
        }).blur(function (){
            nickname_value = nickname.val();
            if(ver_nickname(nickname_value)){
                parent.find('.nickname_error2').hide().removeClass('ver');
            }
        });
        /*用户名的验证函数*/
        function ver_nickname(nickname_value){
            if(!nickname_value){
                nickname.addClass('error2');
                parent.find('.nickname_error2').html('用户名不可以为空！！').show().removeClass('ver');
                $('.nickname_suc2').hide();
                return false;
            }else if(nickname_value.length<2 || nickname_value.length>16){
                nickname.addClass('error2');
                parent.find('.nickname_error2').html('请输入长度大于2且小于16的字符串').show().removeClass('ver');
                $('.nickname_suc2').hide();
                return false;
            }else{
                /*判断用户名是否存在*/
                var flag = true;
                $.ajax({
                    url:'config/select_user.php',
                    data:{'nickname':nickname_value,'type':'edit','user_id':user_id},
                    type:'post',
                    async:false,
                    success:function (data){
                        if(data>0) {
                            nickname.addClass('error2');
                            parent.find('.nickname_error2').html('用户名已存在！！').show().removeClass('ver');
                            $('.phone_suc2').hide();
                            flag=false;
                        }else{
                            $('.nickname_suc2').show();
                            flag=true;
                        }
                    }
                });
                return flag;
            }

        }

        //电子邮件验证
        var email = parent.find('#email');
        var email_value = email.val();
        var email_slide2 =  $('.email_slide2');
        email.focus(function (){
            $(this).removeClass('error2');
            parent.find('.email_error2').show().html('请输入邮箱。例：xxx@xx.xxx！').addClass('ver');
        }).blur(function (){

            setTimeout(function (){
                email_value = email.val();
                if(ver_email(email_value)){
                    parent.find('.email_error2').hide().removeClass('ver');
                }
                $('.email_slide2').hide();
                $(window).unbind('keydown.email');
            },200);
        }).bind('input',function (){         //输入时激活下拉列表
            var value = $(this).val();
            email_slide2.show().find('ul li span').html(value);
            if(value.indexOf('@')>0){
                email_slide2.hide();
            }
            /*给下拉列表绑定事件*/
            email_slide2.find('ul li').mouseenter(function (){
                $(this).addClass('select').siblings().removeClass('select');
            }).click(function (){
                email.val($(this).text());
            });
        }).bind('keydown.email',function (e){
            var keyCode = e.keyCode;
            var select = email_slide2.find('ul li.select');
            if(keyCode === 13){
                email.val(select.text());
                $('.email_slide2').hide();
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
                email.addClass('error2');
                parent.find('.email_error2').html('邮箱不可以为空！！').show().removeClass('ver');
                $('.email_suc2').hide();
                return false;
            }else if(!/^[0-9a-zA-Z._-]+@[a-zA-Z0-9]{1,7}.[a-zA-z]{2,3}$/.test(email_value)){
                email.addClass('error2');
                parent.find('.email_error2').html('邮箱格式不正确。例：xxx@xx.xxx').show().removeClass('ver');
                $('.email_suc2').hide();
                return false;
            }else{
                /*后台确认电子邮箱是否存在*/
                var flag = true;
                $.ajax({
                    url:'config/select_user.php',
                    data:{'email':email_value,'type':'edit','user_id':user_id},
                    type:'post',
                    async:false,
                    success:function (data){
                        if(data>0) {
                            email.addClass('error2');
                            parent.find('.email_error2').html('该邮箱已被注册！！').show().removeClass('ver');
                            $('.email_suc2').hide();
                            flag=false;
                        }else{
                            $('.email_suc2').show();
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
            $(this).removeClass('error2');
            parent.find('.phone_error2').show().html('请输入11位的手机号码！').addClass('ver');
        }).blur(function (){
            phone_value = phone.val();
            if(ver_phone(phone_value)){
                parent.find('.phone_error2').hide().removeClass('ver');
            }
        });
        /*手机号码验证函数*/
        function ver_phone(phone_value){
            if(!phone_value){
                phone.addClass('error2');
                parent.find('.phone_error2').html('手机号码不可以为空！！').show().removeClass('ver');
                $('.phone_suc2').hide();
                return false;
            }else if(!/^1\d{10}$/.test(phone_value)){
                phone.addClass('error2');
                parent.find('.phone_error2').html('手机号码格式不正确。例：1xxxxxxxxxxx').show().removeClass('ver');
                $('.phone_suc2').hide();
                return false;
            }else{
                /*后台确认手机号码是否存在*/
                var flag = true;
                $.ajax({
                    url:'config/select_user.php',
                    data:{'phone':phone_value,'type':'edit','user_id':user_id},
                    type:'post',
                    async:false,
                    success:function (data){
                        if(data>0) {
                            phone.addClass('error2');
                            parent.find('.phone_error2').html('该手机号码已被注册').show().removeClass('ver');
                            $('.phone_suc2').hide();
                            flag=false;
                        }else{
                            $('.phone_suc2').show();
                            flag=true;
                        }
                    }
                });
                return flag;
            }

        }



        $('.edit_info #edit_but .edit_sub').click(function (){
            var flag = true;

            //用户验证
            nickname_value = nickname.val();
            if(!ver_nickname(nickname_value)){
                return false;
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

            if(flag){
                $.ajax({
                    url:'config/change_info.php',
                    data:$('.edit_form').serialize()+'&user_id='+user_id+'&type=info',
                    type:'post',
                    async:true,
                    beforeSend:function (){
                        //loading居中
                        center($('.loading'));
                        $('.loading').css('background','#fff url(images/loading.gif) no-repeat 0 center');
                        $('.loading').html('正在提交中..........');
                        $('.loading').show();
                        /*禁用按钮防止用户重复点击*/
                        $('.edit_info #edit_but .edit_sub').attr('disabled','disabled');
                    },
                    success:function (data){
                        if(data>0){
                            //loading居中
                            center($('.loading'));
                            $('.loading').css('background','#fff url(images/green.png) no-repeat 0 center');
                            $('.loading').html('提交成功！！！.');
                            setTimeout(function (){
                                $('.loading').hide();
                                $('.edit_info').fadeOut(400);
                                $('#shadow').fadeOut(400);
                                $('.edit_info #edit_but .edit_sub').removeAttr('disabled');
                                $('#code_img2').attr('src','config/code.php?t='+Math.random());
                                $('.edit_form').get(0).reset();
                                $('.nickname_suc2').hide();
                                $('.email_suc2').hide();
                                $('.phone_suc2').hide();
                                location.reload();
                            },2000);

                        }
                    }
                });
            }

        });
    })();

    /*点击换验证码*/
    $('#password_inputs a').click(function (){
        $('#code_img3').attr('src','config/code.php?t='+Math.random());
    });
    /*表单验证和修改密码*/
    (function (){
        var parent = $('#password_inputs');
        //密码确认
        var password = parent.find('#password');
        var password_value = password.val();
        password.focus(function (){
            $('.ver_password2').slideDown();
            $(this).removeClass('error2');
            parent.find('.password_error2').hide();
            $('.error2').animate({top:'+=100'},400);
        }).blur(function (){
            var _this=this;
            password_value = password.val();
            $('.ver_password2').slideUp(400,function (){
                ver_password_ver(password_value)
            });
            $('.error2').animate({'top':'-=100'},400);
        }).bind('input',function (){
            var ul2 = $('.ver_password2 ul:nth-child(2)');
            var ul1 = $('.ver_password2 ul:nth-child(1)');
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
                password.addClass('error2');
                parent.find('.password_error2').show().html('密码不可以为空！！').removeClass('ver');
                $('.password_suc2').hide();
                return false
            }else if(!ver_password(password_value)){
                password.addClass('error2');
                parent.find('.password_error2').show().html('密码格式不正确！！').removeClass('ver');
                $('.password_suc2').hide();
                return false;
            }
            $('#password_inputs .password_suc2').show();
            return true;
        }
        /*密码强度的验证*/
        function ver_password(password_value){
            var ul2 = $('.ver_password2 ul:nth-child(2)');
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
            $(this).removeClass('error2');
            parent.find('.con_password_error2').show().html('再次输入密码！').addClass('ver');
        }).blur(function (){
            con_password_value = con_password.val();
            password_value = password.val();
            if(ver_con_password(password_value,con_password_value)){
                parent.find('.con_password_error2').hide().removeClass('ver');
            }
        });
        /*确认密码验证函数*/
        function ver_con_password(password_value,con_password_value){
            if(!con_password_value){
                con_password.addClass('error2');
                parent.find('.con_password_error2').html('确认密码不可以为空！！').show().removeClass('ver');
                $('.con_password_suc2').hide();
                return false;
            }else if(password_value !== con_password_value){
                con_password.addClass('error2');
                parent.find('.con_password_error2').html('密码不一致！！').show().removeClass('ver');
                $('.con_password_suc2').hide();
                return false;
            }
            $('#password_inputs .con_password_suc2').show();
            return true;
        }

        $('#password_but input').click(function (){
            var flag = true;


            password_value = password.val();
            if(!ver_password_ver(password_value)){
                return false;
            }


            //再次输入密码验证
            con_password_value = con_password.val();
            if(!ver_con_password(password_value,con_password_value)){
                return false;
            }else{
                con_password.removeClass('error2');
                parent.find('.con_password_error2').hide().removeClass('ver');
            }

            /*验证码确认*/
            var catpcha = parent.find('.captcha');
            var catpcha_value = catpcha.val();
            if(!catpcha_value){
                catpcha.addClass('error2');
                parent.find('.captcha_error2').html('验证码不能为空').show();
                return false;
            }

            if(flag){
                $.ajax({
                    url:'config/change_info.php',
                    data:$('.edit_possword').serialize()+'&cookie_id='+cookie_id+'&type=password',
                    type:'post',
                    async:true,
                    beforeSend:function (){
                        //loading居中
                        center($('.loading'));
                        $('.loading').css('background','#fff url(images/loading.gif) no-repeat 0 center');
                        $('.loading').html('正在提交中..........');
                        $('.loading').show();
                        /*禁用按钮防止用户重复点击*/
                        $('#password_but input').attr('disabled','disabled');
                    },
                    success:function (data){
                        if(data>0){

                            catpcha.removeClass('error2');
                            parent.find('.captcha_error2').hide();
                            //loading居中
                            center($('.loading'));
                            $('.loading').css('background','#fff url(images/green.png) no-repeat 0 center');
                            $('.loading').html('修改成功，请重新登录........');
                            setTimeout(function (){
                                $('.loading').hide();
                                center($('.login'));
                                $('.login').fadeIn(400);
                                $('.edit_info').fadeOut(400);
                                $('#password_but input').removeAttr('disabled');
                                $('#code_img3').attr('src','config/code.php?t='+Math.random());
                                $('.edit_possword').get(0).reset();
                                $('.password_suc2').hide();
                                $('.con_password_suc2').hide();
                            },2000);

                        }else{
                            if(data === '-1'){
                                $('.loading').hide();
                                $('#password_but input').removeAttr('disabled');
                                con_password.val('');
                                password.val('');
                                catpcha.addClass('error2');
                                parent.find('.captcha_error2').html('验证码错误！！').show();
                            }else if(data === '-2'){
                                $('.loading').hide();
                                $('#password_but input').removeAttr('disabled');
                                con_password.val('');
                                password.val('');
                                catpcha.addClass('error2');
                                parent.find('.captcha_error2').html('验证码过期，请重新注册！！').show();
                            }
                        }
                    }
                });
            }

        });
    })();

    /*隐私设置*/
    $('#privacy_but input').click(function (){
        var privacy = '';
        var array = $('.privacy').serialize().split('&');
        for(var i=0;i<array.length;i++){
            privacy +=(array[i].split('='))[0]+','
        }
        privacy = privacy.substring(0,(privacy.length)-1);
        $.ajax({
            url:'config/change_info.php',
            data:'privacy='+privacy+'&user_id='+cookie_id+'&type=privacy',
            type:'post',
            async:'true',
            beforeSend:function (){
                //loading居中
                center($('.loading'));
                $('.loading').css('background','#fff url(images/loading.gif) no-repeat 0 center');
                $('.loading').html('正在提交中..........');
                $('.loading').show();
                /*禁用按钮防止用户重复点击*/
                $('#privacy_but input').attr('disabled','disabled');
            },
            success:function (data){
                if(data>0){
                    //loading居中
                    center($('.loading'));
                    $('.loading').css('background','#fff url(images/green.png) no-repeat 0 center');
                    $('.loading').html('提交成功！！！.');
                    setTimeout(function (){
                        $('.privacy').get(0).reset();
                        $('.loading').hide();
                        $('.edit_info').fadeOut(400);
                        $('#shadow').fadeOut(400);
                        $('#privacy_but input').removeAttr('disabled');
                        location.reload();
                    },2000);

                }
            }
        });
    });


    /*修改头像*/
    center($('.alter_top_img'));
    drag($('.alter_top_img h2'));
    $('.home_middle .home_middle-user_info .edit li:nth-child(2)').click(function (){
        center($('.alter_top_img'));
        $('.alter_top_img').fadeIn(400);
        $('#shadow').fadeIn(400);
        document.documentElement.style.overflow='hidden';
        document.documentElement.scrollTop=0;
    });
    $('.alter_top_img .close').click(function (){
        $('.alter_top_img').fadeOut(400);
        $('#shadow').fadeOut(400);
        document.documentElement.style.overflow='scroll';
        location.reload();
    });
    $('.alter_top_img .file_but').click(function (){
        $.ajaxFileUpload({
            url:'config/upload_img.php?user_id='+cookie_id,
            fileElementId:'top_img',
            type:'post',
            secureuri:false,
            dataType:'JSON',
            success:function (data){

               if(data === '1'){
                   $('.alter_top_img img').attr('src',data);
                   location.reload();
               }else{
                   alert(data);
               }

            }
        });
    });

    /*授权*/
    center($('.root'));
    drag($('.root h2'));
    $('.root .close').click(function (){
        $('.root').fadeOut(400);
        $('#shadow').fadeOut(400);
        document.documentElement.style.overflow='scroll';
    });
    $('.home_bottom .content').on('click','.admin',function (){
        var id=$(this).parent().attr('user_id');
        var name = $(this).parent().find('td:nth-child(3)').html();
        $('.root').find('p span').html(name);
        $.post('config/root.php',{'type':'show'},function (data){
            var json = $.parseJSON(data);
            var html = '';
            for(var i=0;i<json.length;i++){
                html+='<option value="'+json[i].game_name+'">'+json[i].game_name_cn+'</option>';
            }
            $('#game_select').html(html);
        });
        $('.root').fadeIn(400);
        $('#shadow').fadeIn(400);
        $('.root .file_but').click(function (){
            var game_name=$(this).prev().prev().val();
            $.ajax({
                url:'config/root.php',
                data:{
                    'type':'root',
                    'game_name':game_name,
                    'user_id':id
                },
                type:'post',
                async:true,
                beforeSend:function (){
                    //loading居中
                    center($('.loading'));
                    $('.loading').css('background','#fff url(images/loading.gif) no-repeat 0 center');
                    $('.loading').html('正在提交中..........');
                    $('.loading').show();
                    /*禁用按钮防止用户重复点击*/
                    $('.root .file_but').attr('disabled','disabled');
                },
                success:function (data){
                        //loading居中
                        center($('.loading'));
                        $('.loading').css('background','#fff url(images/green.png) no-repeat 0 center');
                        $('.loading').html('授权成功!!!!');
                        setTimeout(function (){
                            $('.loading').hide();
                            center($('.login'));
                            $('.root').fadeOut(400);
                            $('#shadow').fadeOut(400);
                            $('.root .file_but').removeAttr('disabled');
                        },2000);
                }
            });
        });
    });


    center($('.game'));
    drag($('.game h2'));
    $('.game .close').click(function (){
        $('.game').fadeOut(400);
        $('#shadow').fadeOut(400);
        document.documentElement.style.overflow='scroll';
    });
    $('.game .game_but').click(function (){
        var value = $('.game_name').val();
        if(!/\W/.test(value)){
            var serialize = $('#game_form').serialize();
            $.ajaxFileUpload({            /*上传图片*/
                url:'config/load_img.php?name='+value,
                fileElementId:'game_img',
                type:'post',
                secureuri:false,
                dataType:'JSON',
                success:function (data){}
            });
            $.post('config/opera_game.php',serialize+'&type=insert',function (data){
                if(data == '0'){
                    $('#game_form').get(0).reset();
                    location.reload();
                }else{
                    alert('游戏已存在！！');
                }

            });
        }else{
            alert('第二个表单必须要中文名！！！');
        }

    })
});