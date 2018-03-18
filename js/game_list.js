$(function (){

    load_game();
    //加载全部游戏数据
    function load_game(){
        $(window).load('config/opera_game.php',{'type':'show_all'},function (responseText){
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
                $('.game_list ul.list').html(list);
            } else{
                $('.game_list ul.list').html(' ');
            }
            game_add_list($('.game_list .game_title'),json);

            //跳转页数
            $('.game_list ul.list li').click(function (){
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
                    var length = $(this).parent().find('li').size();
                    if(top_index_bottom===1){                   //首页
                        $(this).parent().find('li').eq(2).html(top_index_bottom).attr('title',top_index_bottom).addClass('highlight').siblings().removeClass('highlight');
                        if(length === 12){
                          for(var i=3;i<8;i++){
                            $(this).parent().find('li').eq(i).html(top_index_bottom+(i-2)).attr('title',top_index_bottom+(i-2));
                          }
                        }
                    }else if(top_index_bottom === page_num){      //尾页
                        if(length === 12){
                          for(var i=2;i<7;i++){
                            $(this).parent().find('li').eq(i).html(top_index_bottom+(i-7)).attr('title',top_index_bottom+(i-7));
                          }
                        }
                        $(this).parent().find('li').eq(length-5).html(top_index_bottom).attr('title',top_index_bottom).addClass('highlight').siblings().removeClass('highlight');
                    }
                    page_event(_this,top_index_bottom,page_num);
                }else{                        //输入跳转
                    $('.game_list ul.list li.jump_li input:first-child').bind('input',function (){
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
            $(window).load('config/opera_game.php',{'limit':index,'type':'show_all'},function (responseText){
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
    //增加全部内容
    function game_add_list(obj,json){
        var html='';
        for(var i=0;i<json.length;i++){
            html+='<li><div class="game_img" style="background:url(images/'+json[i].game_img+') center center;background-size:cover"></div><div class="game_info"><h3  forum_id="30"  user_id="1"><a href="forum.php?game_id='+json[i].id+'" target="_blank">'+json[i].game_name_cn+'</a></h3><ul class="game_date"><li>'+json[i].date+'</li><li><i class="forum_count"></i>'+json[i].forum_count+'</li><div class="clear_float"></div></ul></div><div class="clear_float"></div></li>';
        }
         // alert(html);
        //点击增加阅读数
        obj.html(html);
    }
});
