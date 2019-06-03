var Func = {
    is_show_fixed : false,
    switch_music : true,
    loading: {
        open: function () {
            $('.loading').show();
        },
        close: function () {
            $('.loading').hide()
        }
    },

    // 许愿滚动
    marquee_: {
        roll: function (ul_class_1, ul_parent_class) {
            var t =  60;
            $(ul_parent_class).scrollTop(0);
            
            var timer = setInterval(rollStart, t);
            if( !(sessionStorage.getItem('is_mobile') === 'yes')){
                $(ul_parent_class).on('mouseover',function () {
                    clearInterval(timer)
                }) 

                $(ul_parent_class).on('mouseout',function () {
                    timer = setInterval(rollStart, t);
                })
            }

            function rollStart() {
                if ( $(ul_parent_class).scrollTop() >= $(ul_class_1).height() - $(ul_parent_class).height()) {
                    $(ul_parent_class).scrollTop(0);
                    clearInterval(timer);
                    timer = setInterval(rollStart, t);
                } else {
                    var num = $(ul_parent_class).scrollTop();
                    num = Number(num);
                    num++;
                    $(ul_parent_class).scrollTop(num);
                }
            }
        },
     
    },
    toast_login: function(){
        var userInfo = sessionStorage.getItem('userInfo');
        if(!userInfo){
            this.toast({
                message : '请先登录！',
                time : 1500
            })
            return false;
        }
        return true;
    },
    // 验证用户是否登录
    check_user_login: function (no_login_fn) {
        var userInfo = sessionStorage.getItem('userInfo');
        if (!userInfo) {
            $('.self-center') && $('.self-center').fadeOut(); 
            $('.head-login-before').show();
            $('.head-login-after').hide();
            $('.cunkuan-info').hide()
            $('.qiandao-days').text(0);
            no_login_fn && no_login_fn();
            return false;
        }
        userInfo = JSON.parse(userInfo);
        $('.user-name').text(userInfo.username);
        $('.user-score').text(userInfo.points);
        $('.all-money').text(Number(userInfo.money));
        $('.head-login-before').hide();
        $('.head-login-after').show();
        $('.cunkuan-money').text(userInfo.depositAmount)
        if(userInfo.readychaoji <= 0 &&  userInfo.readychuji <= 0 && userInfo.readygaoji <= 0 && userInfo.readyzhongji <= 0){
            $('.cunkuan-btn').hide();
        }
        $('.readychuji').text(userInfo.readychuji);
        $('.readyzhongji').text(userInfo.readyzhongji);
        $('.readygaoji').text(userInfo.readygaoji);
        $('.readychaoji').text(userInfo.readychaoji);
        $('.cunkuan-info').show()
        
        $('.hb-count').text(userInfo.username);
        return true;
    },
    // 提示框
    toast: function (params) {
        var el = document.createElement("div");
        el.setAttribute("id", "toast");
        el.innerHTML = params.message;
        document.body.appendChild(el);
        el.classList.add("fadeIn");
        setTimeout(function () {
            el.classList.remove("fadeIn");
            el.classList.add("fadeOut");
            el.addEventListener("animationend", function () {
                el.classList.add("hide");
            });
        }, params.time);
    },
    // 背景音乐的开关
    music: {
        open: function(){
            document.getElementById('myaudio').play();
         },
        close: function(){
            document.getElementById('myaudio').pause();
        },
    },

    /*雪花效果*/
    snow : function(){
        $(".snowflakeList img").each(function(index,element){
                var mar = index * 30;
                topmar = Math.floor(Math.random()*900+1),
                randNum = Math.floor(Math.random()*10+6);
            $(this).css({"left":mar+"px","top":"-" + topmar+"px","animation": "xuehua "+randNum+"s infinite","-moz-animation": "xuehua "+randNum+"s infinite","-webkit-animation": "xuehua "+randNum+"s infinite","-o-animation": "xuehua "+randNum+"s infinite"});
        });
    },
    lp_str2num : function(str){
        str = str.substr(1);
        var num = Number(str);
        return num;
    },
    // 轮盘
    lunpan:{
        isture   : true,
        is_click  : true,
        play_game_is_click  : true,
        rotateFunc :  function(tag, obj, fn) {
            if(!this.isture){
                return;
            }
            this.isture = false;
            var that = this;
            tag.stopRotate();
            tag.rotate({
                angle: 0,
                duration: 4000,
                animateTo: obj.angle + 1440,
                callback: function () {
                    fn && fn(obj);
                    that.isture = true;
                }
            });
        },
        
        startGame : function (obj, fn , $tag, deg) {
            if(!this.is_click){
                return;
            }
            this.is_click = false;
    
            obj.angle = -((obj.prize_id - 1) * deg); 
    
            this.rotateFunc($tag, obj,function(obj){
                fn && fn(obj);
            });
            this.is_click = true;
        },
    },
    // 获取token
    get_token: function(){
        var str = sessionStorage.getItem('userInfo');
        if(str){
            str = JSON.parse(str);
            return str.token;
        }

    },
    // 格式化时间戳
    format_time : function(timestamp) { 
        var date = new Date(timestamp * 1000);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        // return Y+M+D+h+m+s;
        return Y+M+D;
    },
    // 抽奖后更新用户信息
    update_userInfo : function(obj){
        var userInfo = sessionStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        for(var k in obj){
            userInfo[k] = obj[k];
        }
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
    },
    // 更新轮盘标题
    refresh_lunpan_title : function(index){
        var index = index || Init.lunpan_type;
        var userInfo = sessionStorage.getItem('userInfo');

        if(!userInfo){
            $('.panel-2-box-top-2>h3>span').text(0)
        }else{
            userInfo =JSON.parse(userInfo)
            $('.user-score').text(userInfo.points);
        }
        if(userInfo && index === 1){
            $('.panel-2-box-top-2>h3>span').text(userInfo.chuji)
        }else if(userInfo && index === 2){
            $('.panel-2-box-top-2>h3>span').text(userInfo.zhongji)
        }else if(userInfo && index === 3){
            $('.panel-2-box-top-2>h3>span').text(userInfo.gaoji)
        }else if(userInfo && index === 4){
            $('.panel-2-box-top-2>h3>span').text(userInfo.chaoji)
        }

        switch (index) {
            case 1:
                $('.panel-2-box-top-2>h4').text('5次青铜抽奖可兑换1次白银抽奖').css('opacity', 1);
                break;
            case 2:
                $('.panel-2-box-top-2>h4').text('5次白银抽奖可兑换1次黄金抽奖').css('opacity', 1);
                break;
            case 3:
                $('.panel-2-box-top-2>h4').css('opacity',0);
                break;
            case 4:
                $('.panel-2-box-top-2>h4').css('opacity',0);
                break;
            default:
                break;
        }
    },
    // 倒计时时间
    // SecondToDate: function (msd) {
    //     var time = msd
    //     if (null != time && "" != time) {
    //         if (time > 60 && time < 60 * 60) {
    //             time = '0天' + '0小时' + parseInt(time / 60.0) + "分" + parseInt((parseFloat(time / 60.0) -
    //                 parseInt(time / 60.0)) * 60) + "秒";
    //         }
    //         else if (time >= 60 * 60 && time < 60 * 60 * 24) {
    //             time = '0天' +  parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
    //                 parseInt(time / 3600.0)) * 60) + "分" +
    //                 parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
    //                 parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
    //         } else if (time >= 60 * 60 * 24) {
    //             time = parseInt(time / 3600.0/24) + "天" +parseInt((parseFloat(time / 3600.0/24)-
    //                 parseInt(time / 3600.0/24))*24) + "小时" + parseInt((parseFloat(time / 3600.0) -
    //                 parseInt(time / 3600.0)) * 60) + "分" +
    //                 parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
    //                 parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
    //         }
    //         else {
    //             time ='0天0小时0分' + parseInt(time) + "秒";
    //         }
    //     }else{
    //         time ='0天0小时0分0秒';
    //     }
    //     return time;
    // },
    SecondToDate : function(second_time){
        var time = parseInt(second_time) + "秒";
        if( parseInt(second_time )> 60){
            var second = parseInt(second_time) % 60;
            var min = parseInt(second_time / 60);
            time = '0天0小时' +  min + "分" + second + "秒";
            if( min > 60 ){
                min = parseInt(second_time / 60) % 60;
                var hour = parseInt( parseInt(second_time / 60) /60 );
                time = '0天' +  hour + "小时" + min + "分" + second + "秒";
        
                if( hour > 24 ){
                    hour = parseInt( parseInt(second_time / 60) /60 ) % 24;
                    var day = parseInt( parseInt( parseInt(second_time / 60) /60 ) / 24 );
                    time = day + "天" + hour + "小时" + min + "分" + second + "秒";
                }
            }
        return time;		
        }

        return time = '0天0小时0分' + second_time + "秒";
    }
}