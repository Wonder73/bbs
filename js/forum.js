$(function (){
    /*获取一些必要的数据，要不然这个网页都会崩*/
    var game_name=$('.forum_top').attr('game_name');
    var game_id = window.location.search.slice(1).split('=')[1];
    var user_id=getCookie('user_id');
    var lv =  getCookie('lv');       //用于限制发帖

    //页面第一次加载时初始化数据
    load_forum();

    //点击发帖时的效果
    $('.forum_body-right .post_msg').click(function (){
        if(ver_login()){
            if($.browser.version >9){
                $('#shadow').fadeIn(400);
                $('.editor_msg').fadeIn(400);
                document.documentElement.style.overflow='hidden';
                center($('.editor_msg'));
                document.documentElement.scrollTop=0;
            }else{
                alert('浏览器版本太低，无法发帖！！！！');
            }
        }
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

    //发表文章
    $('.editor_msg input.post_editor').click(function (){
        var title=$('.editor_msg input.msg_title').val();
        var content_html=editor.txt.html();
        var content_text=editor.txt.text();
        if(!title){
            alert('标题不可为空');
        }else if(!content_text){
            alert('内容不可为空');
        }else{
            $.ajax({
                url:'config/add_forum_com.php',
                data:{
                    lv:lv,
                    type:'add_forum',
                    game_name:game_name,
                    user_id:user_id,
                    title:title,
                    game_id:game_id,
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
                        $('.loading').css('background','#fff url(images/green.png) no-repeat 0 center');
                        $('.loading').html('今天已经发过超过的等级的数量，请隔日在来！！！');
                        $('.editor_msg input.post_editor').removeAttr('disabled');
                        setTimeout(function (){
                            $('.loading').fadeOut(500,function (){
                                $('#shadow').fadeOut(400);
                                $('.editor_msg').fadeOut(400);
                                location.reload();
                            });
                        },500);
                    }
                }
            });

        }

    });

    //获取顶置的帖子
    $(window).load('config/show_forum.php',{'game_id':game_id,'show_type':'overhead'},function (responseText){
        var json = $.parseJSON(responseText);
        add_list($('.forum_body-left ul.overHead'),json);

    });
    //点击签到
    $('.forum_body-right .sign_in').click(function (){
        if(ver_login()){
            $(window).load('config/like_visit.php',{'game_id':game_id,'user_id':user_id,'type':'sign_in'},function (responseText){
                if(responseText>0){
                    //loading居中
                    center($('.loading'));
                    $('.loading').show();
                    $('.loading').css('background','#fff url(images/green.png) no-repeat 0 center');
                    $('.loading').html('签到成功！！！');
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
                    $('.loading').html('您今日已经签到过了！！');
                    setTimeout(function (){
                        $('.loading').fadeOut(500);
                    },1000);
                }
            });
        }
    });

    //点击类型时的特换加载
    $('.forum_body-left ul.cate li').click(function (){
        $(this).addClass('cate_high').siblings().removeClass('cate_high');
        var type=$(this).attr('type');
        load_forum(type);
    });


    //加载数据
    function load_forum(type){
        var types;
        if(type){
            types=type;
        }else{
            types='';
        }
        $(window).load('config/show_forum.php',{'game_id':game_id,'type':types,show_type:'forum'},function (responseText){
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
                list+='<li title="2" class="next">下一页</li><li title="'+page_num+'"  class="bottom_page">尾页</li><li class="jump_li"><input type="text" value="0" class="jump_num"><input type="button" value="跳转" class="jump"></li><li>共<span>'+page_num+'</span>页</li>';
                $('.forum_body-left ul.list').html(list);
            } else{
                $('.forum_body-left ul.list').html(' ');
            }
            add_list($('.forum_body-left ul.not_overHead'),json);

            //跳转页数
            $('.forum_body-left ul.list li').click(function (){
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
                    $('.forum_body-left ul.list li.jump_li input:first-child').bind('input',function (){
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
            $(window).load('config/show_forum.php',{'game_id':game_id,'limit':index,'type':types,show_type:'forum'},function (responseText){
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
        var overHead = obj.hasClass('overHead')?'置顶':'';
        var html='';
        for(var i=0;i<json.length;i++){
            html+='<li><div class="user_img" style="background:url(images/'+json[i].top_img+') center center;background-size:60px 60px;"></div><div class="user_info"><h3  forum_id="'+json[i].id+'"  user_id="'+json[i].user_id+'"><a href="forum_detail.php?forum_id='+json[i].id+'&game_id='+game_id+'&user_id='+json[i].user_id+'" target="_blank">'+json[i].title+'</a><span>'+overHead+'</span></h3><ul class="username_date"><li><a href="home.php?user_id='+json[i].user_id+'" target="_blank">'+json[i].username+'</a></li><li>'+json[i].date+'</li><li>    <i class="s_view"></i>'+json[i].replay+'</li><li><i class="s_real"></i>'+json[i].comment+'</li><div class="clear_float"></div></ul></div><div class="clear_float"></div></li>';
        }
        //点击增加阅读数
        obj.html(html).find('li h3').click(function (){
            var id=$(this).attr('forum_id');
            var user_id = $(this).attr('user_id');
            $(window).load('config/show_forum.php',{
                'show_type':'overhead',
                'replay':'true',
                'game_id':game_id,
                'forum_id':id
            },function (responseText){
                if(responseText>0){
                    location.reload();
                    //window.open('forum_detail?forum_id='+id+'&game_name='+game_name+'&user_id='+user_id);
                }
            });
        });
    }

});
