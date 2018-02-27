$(function (){
    var game_name = $('.forum_body-left').attr('game_name');
    var game_id = window.location.search.slice(1).split('&')[1].split('=')[1];
    var forum_id = $('.forum_body-left .forum_body-detail h1').attr('forum_id');
    var user_id= $('.forum_body-info').attr('user_id');       //作者
    var cookie_id= getCookie('user_id');         //自己
    setTimeout(function (){
        document.documentElement.scrollTop=0;
    },100);

    //点击评论跳到评论区
    $('.forum_body-detail .end_opp ul li:nth-child(3)').click(function (){
        var top=$('.post_comment .input_comment-top').offset().top;
        var timer = setInterval(function (){
            var scroll1=document.documentElement.scrollTop;
            document.documentElement.scrollTop +=10;
            var scroll2=document.documentElement.scrollTop;
            if(document.documentElement.scrollTop >= top || scroll1===scroll2){
                clearInterval(timer);
            }
        },1);

    });

    /*加载楼主的热帖*/
    $.post('config/insert_show_small_com.php',{'type':'hot','game_id':game_id,'user_id':user_id,'forum_id':forum_id},function (data){
        var json = $.parseJSON(data);
        var html ='';
        for(var i=0;i<json.length;i++){
            html+='<li forum_id="'+json[i].id+'"><a href="forum_detail.php?forum_id='+json[i].id+'&game_id='+game_id+'&user_id='+user_id+'">'+json[i].title+'</a></li>';
        }
        $('.forum_body-info .username_correlation ul').html(html).find('li').click(function (){
            var id=$(this).attr('forum_id');
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
    });

    //跳转的限制
    $('.forum_body-left ul.list li.jump_li input:first-child').bind('input',function (){
        var value= $(this).val();
        $(this).val(value.replace(/\D+/g,''));
        value = +$(this).val();
        var num=$(this).parent().parent().find('li').length-4;
        if(value>num){
            $(this).val(num);
        }
    }).next().click(function (){
        var value = +$(this).prev().val();
    });


    //发评论时的的编辑框
    var E = window.wangEditor;
    var editor1 = new E('#editor_top1','#editor_text1');
    editor1.customConfig.menus=[
        'bold',
        'italic',
        'underline',
        'foreColor',
        'link',
        'list',
        'quote',
        'emoticon',
        'image'
    ];
    editor1.create();

    /*发表评论*/
    $('.post_comment input.post_but').click(function (){
        if(ver_login()){
            var text=editor1.txt.text();
            if(text === '输入大于五个字的评论' || !text){
                alert('请输入评论！！！');
            }else if(text.length <5){
                alert('请输入大于五个字的评论');
            }else{
                var html=editor1.txt.html();

                $.ajax({
                    url:'config/add_forum_com.php',
                    data:{
                        type:'add_big_com',
                        'game_id':game_id,
                        'forum_id':forum_id,
                        'user_id':cookie_id,
                        'html':html
                    },
                    type:'post',
                    async:true,
                    beforeSend:function (){
                        //loading居中
                        center($('.loading'));
                        $('.loading').show();
                        $('.loading').css('background','#fff url(images/loading.gif) no-repeat 0 center');
                        $('.loading').html('发表中.........');
                        $('.post_comment input.post_but').attr('disabled','disabled');
                    },
                    success:function (data){
                        if(data>0){
                            //loading居中
                            center($('.loading'));
                            $('.loading').show();
                            $('.loading').css('background','#fff url(images/green.png) no-repeat 0 center');
                            $('.loading').html('发表成功！！！');
                            $('.post_comment input.post_but').removeAttr('disabled');
                            setTimeout(function (){
                                $('.loading').fadeOut(500,function (){
                                    location.reload();
                                });
                            },500);
                        }
                    }
                });
            }
        }
    });

    /*加载评论*/
    //加载数据
    if(getCookie('username') !== null){
        $('.forum_body-comment>ul.comment span.comment_login').hide();
        $(window).load('config/show_forum.php',{'game_id':game_id,'forum_id':forum_id,'show_type':'big_com'},function (responseText){
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
            add_list($('.forum_body-comment>ul.comment'),json);

            //跳转页数
            $('.forum_body-comment ul.list li').click(function (){
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
                    $('.forum_body-comment ul.list li.jump_li input:first-child').bind('input',function (){
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
    }else{
        $('.forum_body-comment>ul.comment span.comment_login').show();
    }


    function page_event(_this,index,page_num){
        $(window).load('config/show_forum.php',{'game_id':game_id,'forum_id':forum_id,'limit':index,'show_type':'big_com'},function (responseText){
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

    //增加内容
    function add_list(obj,json){
        var html='';
        for(var i=0;i<json.length;i++){
            var num = +json[i].position;
            var position = '';
            switch(num){
                case 2: position = '沙发';break;
                case 3: position = '板凳';break;
                case 4: position = '地板';break;
                default: position = num+'楼';break;
            }
            html+='<li comment_id="'+json[i].id+'" user_id="'+json[i].user_id+'"><i style="background:url(images/'+json[i].top_img+') center center;background-size:60px 60px;"></i><!--头像--><div class="comment_info"><ul><li><a href="home.php?user_id='+json[i].user_id+'" target="_blank">'+json[i].username+'</a></li><li>'+json[i].date+'</li><li>'+position+'</li><div class="clear_float"></div></ul><!--用户发表的时间和楼数--><p>'+json[i].text+'</p><!--评论中的小评论--><div class="small_comment"><p>加载回复信息........</p><ul></ul></div><!--small_comment--></div><!--comment_info--><div class="clear_float"></div></li>';
        }

        //点击加载回复
        obj.html(html).find('li div.comment_info div.small_comment p').click(function (){
            var big_comment_id = $(this).parent().parent().parent().attr('comment_id');       //获取该条评论的ID
            var next=$(this).next();
            //var next = $('.forum_body-comment ul.comment>li div.comment_info div.small_comment>ul');
            //var next = $('.forum_body-comment ul.comment>li div.comment_info div.small_comment>ul');
            var _this= this;
            if(next.is(':hidden')){
                show_small(next,_this);
            }else{
                next.slideUp(400,function (){
                    $(_this).html('加载回复信息........');
                });
            }


            function show_small(next,_this){
                $.post('config/insert_show_small_com',{'type':'show','game_id':game_id,'big_id':big_comment_id},function (data){
                    var json = $.parseJSON(data);
                    var html = "";
                    for(var i=0; i<json.length;i++){
                        html+='<li><span class="username"><a href="home.php?user_id='+json[i].user_id+'" target="_blank">'+json[i].username+'</a>：</span><span class="small_content">'+json[i].text+'</span><span class="date">'+json[i].date+'</span></li><div class="clear_float"></div>';
                    }
                    html +='<li><input type="text" placeholder="你的回复"class="your_replay"><input type="button"value="回复"class="replay"></li>';
                    next.html(html);
                    next.slideDown();
                    $(_this).html('收起');

                    next.last().find('.replay').click(function (){
                        var text = $(this).prev().val();
                        if(!!text){
                            $.ajax({
                                url:'config/insert_show_small_com.php',
                                data:{
                                    'type':'insert',
                                    'game_id':game_id,
                                    'user_id':cookie_id,
                                    'big_id':big_comment_id,
                                    'text':text
                                },
                                type:'post',
                                async:true,
                                beforeSend:function (){
                                    //loading居中
                                    center($('.loading'));
                                    $('.loading').show();
                                    $('.loading').css('background','#fff url(images/loading.gif) no-repeat 0 center');
                                    $('.loading').html('发表中.........');
                                    next.last().find('.replay').attr('disabled','disabled');
                                },
                                success:function (data){
                                    if(data>0){
                                        //loading居中
                                        center($('.loading'));
                                        $('.loading').show();
                                        $('.loading').css('background','#fff url(images/green.png) no-repeat 0 center');
                                        $('.loading').html('发表成功！！！');
                                        next.last().find('.replay').removeAttr('disabled');
                                        setTimeout(function (){
                                            $('.loading').fadeOut(500);
                                        },500);
                                        show_small(next,_this);
                                    }
                                }
                            });
                        }else{
                            alert('请输入回复的内容！！！');
                        }

                    });
                });
            }
        });
    }






    //点击赞同和反对的效果
    $('.end_opp ul li:nth-child(1)').click(function (){
        if(ver_login()){
            end_opp('end');
        }
    }).next().click(function (){
        if(ver_login()){
            end_opp('opp');
        }
    });
    function end_opp(type){
        $(window).load('config/end_opp',{'type':type,'game_id':game_id,'user_id':cookie_id,'forum_id':forum_id},function (responseText){
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
    }

});
