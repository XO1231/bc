$(function(){
    var maishui_bg_arr = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ?  [
        {
            y : '-0rem'
        },
        {
            y : '-4.4rem'
        },
        {
            y : '-8.5rem'
        },
        {
            y : '-12.45rem'
        },
        {
            y : '-16.38rem'
        },
        {
            y : '-20.3rem'
        },
    ] : [
        {
            y : '-20px'
        },
        {
            y : '-502px'
        },
        {
            y : '-948px'
        },
        {
            y : '-1376px'
        },
        {
            y : '-1804px'
        },
        {
            y : '-2232px'
        },
    ];

    var Index = {
        countDown_timer : null,
        common_ling_data: {},
        special_ling_data : {}, 
        init: function(){
            var self = this;
            this.check_suer_login();
            // 登录
            $('.login-in-btn').on('click', function(){
                var username = $('#username').val();
                var password = $('#password').val();
                if(!username){
                    Func.toast({
                        time: 1500,
                        message: '请输入账号！'
                    })
                    return;
                }
                if(!password){
                    Func.toast({
                        time: 1500,
                        message: '请输入密码！'
                    })
                    return;
                }
                var params = {
                    username : username,
                    password : password
                }
                console.log(username, password);
                self.user_login(params);
            })
            $('.login-out-btn').on('click',function(){
                self.login_out();
            })
            
            // 右侧导航滚动
            Func.fixed_move('fixed');
            // 回到顶部

            $('.go-top').on('click',function(){
                Func.go_top();
            })
            // 许愿滚动
            
            Func.marquee_.roll('.ph-list-inner-ul', '.ph-list-inner');

            // 关闭普通领取前弹窗
            $('.ordinary').on('click',function(e){
                if(e.target.className === 'close-ordinary-inner' || e.target.className === 'ordinary'){
                    $('.ordinary').fadeOut();
                }
            });
            
            $('.cont-list').on('click','li',function(){
                var index = $(this).index();
                var id = $(this).attr('data-id')
                // var params = {id : id};
                // self.get_model_by_id(params,function(){
                // });
                if(index !== 0){
                    var date = $(this).attr('data-date');
                    var model_status = $(this).attr('data-model_status');
                    var name_arr = ['超级劳模','农夫模范' , '渔民榜样', '工人楷模' , '匠师典范', '教师之星', '蓝领功模', '白领之光'];
                    // 普通称号等点击
                    $('.ordinary-img').attr('src', './img/tan/pic-'+id + '.png');
                    
                    if(!Func.cookie.get('token')){
                        $('.ordinary-inner>h1').text(name_arr[index]);
                        $('.tan-today').text(date);
                    }
                    if(Func.cookie.get('token')){
                        self.models_get_reward_page(id,index);
                    }

                    if( model_status == 2 ||  model_status == 3){
                        $('.ordEnd-inner-pic').attr('src', './img/tan/pic-'+index + '.png');
                        $('.ordEnd').fadeIn(100);
                        clearTimeout(timer_1);
                        clearTimeout(timer_2);
                        var timer_1 = setTimeout(function(){
                            $('.ordEnd-inner').addClass('active');  
                            clearTimeout(timer_1);
                        },300)
                        var timer_2 = setTimeout(function(){
                            $('.ordEnd-inner-yin').addClass('active');  
                            clearTimeout(timer_2);
                        },800)
                        self.models_get_all_models();
                    }else{
                        $('.ordinary').fadeIn();
                    }
                  
                }else{
                    var get_status = $(this).attr('data-get_status');
                    console.log(get_status);
                     // 超级劳模
                    $('.special-img,.speEnd-inner-pic').attr('src', './img/tan/pic-0.png');
                    if(Func.cookie.get('token')){
                        self.models_supder_model_page();
                    }

                    if(get_status == 5){
                        $('.speEnd').fadeIn(100);
                        clearTimeout(timer_1);
                        clearTimeout(timer_2);
        
                        var timer_1 = setTimeout(function(){
                            $('.speEnd-inner').addClass('active');  
                            clearTimeout(timer_1);
                        },300)
                        var timer_2 = setTimeout(function(){
                            $('.speEnd-inner-yin').addClass('active');  
                            clearTimeout(timer_2);
                        },800)
                    }else{
                        $('.special').fadeIn();
                    }   
                   
                }
              
               
            });
            // 关闭普通称号弹窗领取后
            $('.ordEnd').on('click',function(e){
                if(e.target.className === 'close-ordEnd-inner' || e.target.className === 'ordEnd'){
                    $('.ordEnd').fadeOut(function(){
                        $('.ordEnd-inner-yin').removeClass('active');
                        $('.ordEnd-inner').removeClass('active');
                    })
                }
                self.models_get_all_models();
                // self.models_get_reward_page();
            })
            // 关闭超级称号弹窗领取后
            $('.speEnd').on('click',function(e){
                if(e.target.className === 'close-speEnd-inner' || e.target.className === 'speEnd'){
                    $('.speEnd').fadeOut(function(){
                        $('.speEnd-inner-yin').removeClass('active');
                        $('.speEnd-inner').removeClass('active');
                    })
                }
                self.models_get_all_models();
                // self.models_supder_model_page();
            })
            // 打开登录弹窗
            $('.show-login-box').on('click',function(){
                $('html , body').animate({scrollTop: 0},'slow');
                $('.login-box').fadeIn();
            })
            // 关闭登录弹窗
            $('.login-box').on('click', function(e){
                if(e.target.className === 'close-login-box' || e.target.className === 'login-box' ){
                    $('.login-box').fadeOut();
                }
            })
            // 普通点击领取
            self.hanle_ling_click_witch();
           
            // 超级点击领取
            self.hanle_special_ling_click_witch();
            // 关闭超级劳模领取前
            $('.special').on('click',function(e){
                if(e.target.className === 'close-special-inner' || e.target.className === 'special'){
                    $('.special').fadeOut();
                }
            })

        },
        check_suer_login(){
            var self = this;
            // 荣誉排行榜
            self.get_all_reward_list();
            // 普通劳模星级奖励
            self.init_get_all_rewards();
            // 超级劳模奖励
            self.get_all_super_rewards();
            // $('.toady')
            if( Func.cookie.get('token')){
                $('.login-before').hide();
                $('.login-after').show();
                $('.after-login-username').text(Func.cookie.get('username'));
                self.models_get_all_models();
            }else{
                $('.login-after').hide();
                $('.login-before').show();
                self.init_get_all_models();
            }
            // var year = new Date().getFullYear();
            // var month = (new Date().getMonth() + 1);
            // var date = new Date().getDate();
            // const sign_date = year + '年' + month + '月' + date + '日';
            // console.log(sign_date);
            // const tan_date = month + '月' + date + '日';
            
           
        },
        // 登录
        user_login(params){
            var self = this;
            Func.loading.open();
            Api.login(params, function(res){
                var res = JSON.parse(res);
                // console.log(res);
                if(res.code === Api.CODE){
                    $('.login-box') && $('.login-box').fadeOut();
                    Func.cookie.set('token', res.data.token, 0.75);
                    Func.cookie.set('username', res.data.username, 0.75);
                    Func.toast({
                        time : 1500,
                        message : res.msg
                    });

                    self.check_suer_login();
                    let timer = setTimeout(() => {
                        Func.cookie.clear();
                        Func.toast({
                            time : 1500,
                            message : '会话已过期，请重新登录！'
                        });
                        clearTimeout(timer);
                        self.check_suer_login();
                    }, 1000 * 60 * 60 * 1.5);
                }else{
                    Func.toast({
                        time : 1500,
                        message : res.msg
                    });
                }
                Func.loading.close();
            }, function(err){
                console.log(err);
                Func.toast({
                    time: 1500,
                    message : Api.ERROR
                });
            })
        },
        // 登出
        login_out(){
            var self = this;
            Func.cookie.clear();
            self.check_suer_login();
            Func.toast({
                time : 1500,
                message : '退出登录成功！'
            });
            window.location.reload();
        },
        // 获取劳模列表
        init_get_all_models (){
            Api.init_get_all_models({},function(res){
                var res = JSON.parse(res);
                // console.log(res);
                if(res.code === Api.CODE){
                    var str = '<li class="cont-li">'
                        str += '<div class="cont-li-wrap">'
                        str += '<div class="cont-li-light"></div>'
                        str += '<div class="cont-li-bg"></div>'
                        str += '<span class="cont-li-star cont-li-star-1"></span>'
                        str += '<span class="cont-li-star cont-li-star-2"></span>'
                        str += '<span class="cont-li-star cont-li-star-3"></span>'
                        str += '<span class="cont-li-star cont-li-star-4"></span>'
                        str += '<span class="cont-li-star cont-li-star-5"></span>'
                        str += '<div class="cont-li-hui-left"></div>'
                        str += '<div class="cont-li-hui-right"></div>'
                        str += '<div class="cont-li-progress">'
                        str += '<span class="active"></span>'
                        str += '<span class="active"></span>'
                        str += '<span class="active"></span>'
                        str += '<span class="active"></span>'
                        str += '<span class="active"></span>'
                        str += '</div></div></li>';
                    res.data.res.forEach(function(ele,index){
                        var arr = ele.date.split('-');
                        var date = arr[0] + '月' + arr[1] + '日'
                        // var date = ele
                        str += ' <li class="cont-li" data-id='+ele.id+'  data-date='+date+'><img src="./img/li-'+ele.id+'-active.png"/></li>'
                    })
                    $('.cont-list').html(str);
                }
            }, function(err){
                console.log(err);
                Func.toast({
                    time: 1500,
                    message : Api.ERROR
                });
            })
        },
        
        get_model_by_id(params, fn){
            Func.loading.open();
            Api.get_model_by_id(params,function(res){
                var res = JSON.parse(res);
                if(res.code === Api.CODE){
                    // console.log(res);
                    fn && fn();
                }else{
                    Func.toast({
                        time: 1500,
                        message : res.msg
                    });
                }
                // console.log(111);
                Func.loading.close();
            }, function(err){
                console.log(err);
                Func.toast({
                    time: 1500,
                    message : Api.ERROR
                });
            })
        },
        // 获取普通星级奖励列表数据
        init_get_all_rewards(fn){
            var self = this;
            if(sessionStorage.getItem('stars_rule')){
                var data = JSON.parse(sessionStorage.getItem('stars_rule'));
                self.login_before_stars_rule(data);
                return;
            }
            Api.init_get_all_rewards({}, function(res){
                var res = JSON.parse(res);
                if(res.code === Api.CODE){
                    sessionStorage.setItem('stars_rule', JSON.stringify(res.data.res));
                    self.login_before_stars_rule(res.data.res);
                }else{
                    Func.toast({
                        time: 1500,
                        message : res.msg
                    });
                }
            }, function(err){
                console.log(err);
                Func.toast({
                    time: 1500,
                    message : Api.ERROR
                });
            })
        },
        
        login_before_stars_rule(data){
            var str = '';
            data.forEach(function(ele,index){
                str += '<li><span>'+ele.grade+'</span><span>当日累充'+ele.deposit+'</span><span>奖励彩金<i>'+ele.reward_money+'元</i></span></li>';
            })
            $('.ordinary-list').html(str);
        },
        // 获取超级劳模星级奖励列表数据
        get_all_super_rewards(){
            var self = this;
            if(sessionStorage.getItem('spe_stars_rule')){
                var data = JSON.parse(sessionStorage.getItem('spe_stars_rule'));
                self.spe_login_before_stars_rule(data);
                return;
            }
            Api.get_all_super_rewards({}, function(res){
                var res = JSON.parse(res);
                if(res.code === Api.CODE){
                    sessionStorage.setItem('spe_stars_rule', JSON.stringify(res.data.res));
                    self.spe_login_before_stars_rule(res.data.res);
                }else{
                    Func.toast({
                        time: 1500,
                        message : res.msg
                    });
                }
            },function(err){
                console.log(err);
                Func.toast({
                    time: 1500,
                    message : Api.ERROR
                });
            })
        },
        spe_login_before_stars_rule(data){
            var str = '';
            data.forEach(function(ele,index){
                var multiple = ele.multiple  ?  ele.multiple  : 0;
                str += ' <li><span>'+ele.grade+'</span><span>累计5个及以上</span><span>彩金<i> × '+ multiple +'倍</i></span></li>';
            })
            $('.special-list').html(str);
        },
        // 获取荣誉排行榜
        get_all_reward_list(){
            var self = this;
            if(sessionStorage.getItem('ry_list')){
                var data = JSON.parse(sessionStorage.getItem('ry_list'));
                self.render_ry_list(data);
                return;
            }
            Api.get_all_reward_list({num: 150}, function(res){
                var res = JSON.parse(res);
                if(res.code === Api.CODE){
                    sessionStorage.setItem('ry_list', JSON.stringify(res.data.res));  
                    self.render_ry_list(res.data.res);
                }
            }, function(err){
                console.log(err);
                Func.toast({
                    time: 1500,
                    message : Api.ERROR
                });
            })
        },
        render_ry_list(data){
            var str = '';
            data.forEach(function(ele){
                var level = '';
                if(ele.grade == 1){
                    level = '一';
                }else if(ele.grade == 2){
                    level = '二';
                }else if(ele.grade == 3){
                    level = '三';
                }else if(ele.grade == 4){
                    level = '四';
                }else if(ele.grade == 5){
                    level = '五';
                }
                if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
                    str += '<li><span>恭喜</span><span><i>'+ele.account+'</i>同志</span><span>获得<i>'+level+'星'+(ele.name ? ele.name : '')+'</i></span><span>奖励彩金<i>'+ele.reward_money+'</i>元</span></li>';
                }else{
                    str += '<li><span>恭喜</span><span><i>'+ele.account+'</i>同志</span><span>获得<i>'+level+'星'+(ele.name ? ele.name : '')+'</i>劳模证书</span><span>奖励劳模彩金<i>'+ele.reward_money+'</i>元</span></li>';
                }
            })
            $('.ph-list-inner-ul').html(str);
        },
        // 获取登陆后的劳模列表和超级劳模的星级
        models_get_all_models(){
            var self = this;
            Api.models_get_all_models({_token : Func.cookie.get('token')}, 
                function(res){
                    // console.log(res);
                    var res = JSON.parse(res);
                    if(res.code === Api.CODE){
                        self.render_after_login_mo_list(res.data);
                    }else{
                        Func.toast({
                            time: 1500,
                            message : res.msg
                        });
                    }
                }, function(err){
                    console.log(err);
                    Func.toast({
                        time: 1500,
                        message : Api.ERROR
                    });
            })
        },

        render_after_login_mo_list(data){
            // console.log(data);
            var num = parseInt(data.super_model.count);
            if(num >= 5){
                num = 5;
            }
            var str = '';
            if(data.super_model.get_status == 1){
                str = '<li class="cont-li active" data-get_status="'+data.super_model.get_status+'">'
            } else{
                str = '<li class="cont-li" data-get_status="'+data.super_model.get_status+'">'
            }
            str += '<div class="cont-li-wrap">'
            str += '<div class="cont-li-light"></div>'
            str += '<div class="cont-li-bg"></div>'
            str += '<span class="cont-li-star cont-li-star-1"></span>'
            str += '<span class="cont-li-star cont-li-star-2"></span>'
            str += '<span class="cont-li-star cont-li-star-3"></span>'
            str += '<span class="cont-li-star cont-li-star-4"></span>'
            str += '<span class="cont-li-star cont-li-star-5"></span>'
            str += '<div class="cont-li-hui-left" style="background-position-y:'+maishui_bg_arr[num].y+'"></div>'
            str += '<div class="cont-li-hui-right" style="background-position-y:'+maishui_bg_arr[num].y+'"></div>'
            str += '<div class="cont-li-progress">'
            // 区分星级层级
            
            for(var i = 0; i  < num; i++){
                str += '<span class="active"></span>'
            }
            for(var i = 0; i  < 5-num; i++){
                str += '<span class=""></span>'
            }
            str += '</div></div></li>';
            data.res.forEach(function(ele){
                if(ele.model_status == 1){
                    str += ' <li class="cont-li active" data-id='+ele.id+' data-model_status="'+ele.model_status+'"><img src="./img/li-'+ele.id+'.png"/></li>'
                }else if(ele.model_status == 2 || ele.model_status == 3){
                    str += ' <li class="cont-li" data-id='+ele.id+' data-model_status="'+ele.model_status+'"><img src="./img/li-'+ele.id+'-active.png"/></li>'
                }else if(ele.model_status == 0){
                    str += ' <li class="cont-li" data-id='+ele.id+' data-model_status="'+ele.model_status+'"><img src="./img/li-'+ele.id+'.png"/></li>'
                }
            })
            $('.cont-list').html(str);

        } , 
        // 获取登陆后该用户的劳模领取状态
        models_get_reward_page(id,index){
            Func.loading.open();
            var self = this;
            Api.models_get_reward_page({
                _token : Func.cookie.get('token'),
                id : id
            }, function(res){
                var res = JSON.parse(res);
                if(res.code === Api.CODE){
                    self.render_ordinary_data(res.data.res, index);
                }else{
                    Func.toast({
                        time: 1500,
                        message : res.msg
                    });
                }
                Func.loading.close();
            }, function(err){
                console.log(err);
                Func.toast({
                    time: 1500,
                    message : Api.ERROR
                });
            })
        },
        // 渲染用户登录后劳模领取状态及数据
        render_ordinary_data(data, index){
            var self = this;
            clearInterval(self.countDown_timer);
            var star_cn = ''
            if(data.grade == '1星'){
                star_cn = '一星'
            }else if(data.grade == '2星'){
                star_cn = '二星'
            }else if(data.grade == '3星'){
                star_cn = '三星'
            }else if(data.grade == '4星'){
                star_cn = '四星'
            }else if(data.grade == '5星'){
                star_cn = '五星'
            }
            $('.ordinary-inner>h1').text(star_cn+ data.name);
            $('.ordinary-inner>h2').text(data.deposit_date + '累充：' +data.deposit);
            
            // 领取时间
            $('.today').text(data.get_reward_date);
            
            // 劳模星级
            var stars = '';
            
            for(var i = 0;  i< parseInt(data.grade); i++){
                stars += '<span class="active"></span>'
            }
            for(var i = 0;  i< 5-(parseInt(data.grade)); i++){
                stars += '<span class=""></span>'
            }
            $('.ordinary-spans').html(stars);

            $('.account-level').text(star_cn+ data.name);
            $('.ordEnd-inner>h1').text(star_cn+ data.name);
            $('.ordEnd-spans').html(stars);
            $('.account-name').text(Func.cookie.get('username'));
            $('.common-total-charge').text((data.deposit ? data.deposit : 0));
            $('.common-total-reward').text(data.reward_money);
            // $('.speEnd-account-money>i').text(data.reward_money)
           
            // 开始时间
            var end_time = 0;
            // 领取结束时间
            var start_time = 0;
            //此时此刻
            start_time = Func.format_to_timeSamp( Func.format_to_time(new Date()).replace(/-/g, '/') );
            if(data.reward_final_deadline){
                var temp_date = data.reward_final_deadline.replace(/-/g, '/');
                end_time = Func.format_to_timeSamp(Func.format_to_time(temp_date));
            }

            // 领取时间已过
            if(start_time - end_time > 0){
                $('.lingqu').addClass('canNotLing');
            }
            
            // 可以领取 并且未领取
            if(start_time - end_time <= 0 &&  data.status == 1){
                $('.lingqu').removeClass('canNotLing');
                var sec = (end_time - start_time) / 1000;
                // 普通领取时间倒计时
                //  var sec = 900000;
                 var time = Func.SecondToDate(sec);
                 $('.countDownTime').text('领取倒计时：' + time);
                 self.countDown_timer = setInterval(function(){
                     if(sec <=0 ){
                         clearInterval(self.countDown_timer);
                         return;
                     }
                     sec--;
                     time = Func.SecondToDate(sec);
                     $('.countDownTime').text('领取倒计时：' + time);
                },1000)

            }

            if(start_time - end_time > 0 &&  data.status == 1){
                $('.countDownTime').text('领取时间已过期，请联系客服领取');
            }
            // 已领取
            if( data.status == 2 || data.status == 3){
                $('.lingqu').addClass('canNotLing');
                $('.countDownTime').text('已领取奖励')
            }
            // 未达到条件
            else if(data.status == 5){
                $('.lingqu').addClass('canNotLing');
                $('.countDownTime').text('暂未达到领取条件')
            }

            $('.ordEnd-inner-pic').attr('src', './img/tan/pic-'+index + '.png');
            self.hanle_ling_click_witch(start_time, end_time, data);
        },
        // 登录前和登录后的领取点击事件切换
        hanle_ling_click_witch(start_time, end_time, data){
            var self = this;
            var index = $(self).index();
            $('.lingqu').off('click')
            if(Func.cookie.get('token')){
                $('.lingqu').on('click',function(){
                    if(start_time - end_time <= 0  &&  data.status == 1){
                        self.models_get_common_reward(data.model_id, function(){
                            $('.ordinary').fadeOut(100, function(){
                                $('.ordEnd').fadeIn(100);
                            });
                            clearTimeout(timer_1);
                            clearTimeout(timer_2);
            
                            var timer_1 = setTimeout(function(){
                                $('.ordEnd-inner').addClass('active');  
                                clearTimeout(timer_1);
                            },300)
                            var timer_2 = setTimeout(function(){
                                $('.ordEnd-inner-yin').addClass('active');  
                                clearTimeout(timer_2);
                            },800)
                            self.models_get_all_models();
                        })
                    }
                    if(start_time - end_time > 0  &&  data.status == 1){
                        Func.toast({
                            time : 1500,
                            message : '领取时间已过期，请联系客服！'
                        })
                    }
                    // console.log(data.status)
                    if( data.status == 2 || data.status == 3){
                        Func.toast({
                            time : 1500,
                            message : '您已经领取过了'
                        })
                    }
                    if(data.status == 5){
                        Func.toast({
                            time : 1500,
                            message : '暂未达到领取条件'
                        })
                    }

                })
            }else{
                $('.lingqu').on('click',function(){
                    if(!Func.cookie.get('token')){
                        Func.toast({
                            time : 1500,
                            message : '请先登录！'
                        })
                    }
                })
            }
        },
        // 领取日常劳模奖励
        models_get_common_reward(id , fn){
            Func.loading.open();
            Api.models_get_common_reward({
                _token : Func.cookie.get('token'),
                id : id
            }, function(res){
                Func.loading.close();
                var res = JSON.parse(res);
                if(res.code === Api.CODE){
                    Func.toast({
                        time: 1500,
                        message : res.msg
                    });
                    fn && fn()
                }else{
                    Func.toast({
                        time: 1500,
                        message : res.msg
                    });
                }
            },function(err){
                console.log(err);
                Func.toast({
                    time: 1500,
                    message : Api.ERROR
                });
            })
        },
        // 用户登录后超级劳模领取状态及数据
        models_supder_model_page(){
            var self = this;
            Api.models_supder_model_page({
                _token: Func.cookie.get('token')
            },function(res){
                var res = JSON.parse(res);
                if(res.code === Api.CODE){
                    self.render_special_data(res.data.res)
                }else{
                    Func.toast({
                        time: 1500,
                        message : res.msg
                    });
                }
            }, function(err){
                console.log(err);
                Func.toast({
                    time: 1500,
                    message : Api.ERROR
                });
            })
        },
        // 渲染登录后超级劳模领取状态及数据
        render_special_data(data){
            var self = this;
            var star_cn = ''
            if(data.grade == '1星'){
                star_cn = '一星'
            }else if(data.grade == '2星'){
                star_cn = '二星'
            }else if(data.grade == '3星'){
                star_cn = '三星'
            }else if(data.grade == '4星'){
                star_cn = '四星'
            }else if(data.grade == '5星'){
                star_cn = '五星'
            }
            $('.special-inner>h1').text(star_cn+'超级劳模');
            $('.special-inner>h2').text('本次活动累充：' + data.totaldeposit); //data.date;
            // 劳模星级
            var stars = '';
        
            for(var i = 0;  i< parseInt(data.grade); i++){
                stars += '<span class="active"></span>'
            }
            for(var i = 0;  i< 5-(parseInt(data.grade)); i++){
                stars += '<span class=""></span>'
            }
            $('.special-spans').html(stars);
            // 领后弹窗
            $('.account-name').text(Func.cookie.get('username'));
            $('.speEnd-spans').html(stars);
            $('.special-total-charge').text(data.totaldeposit);
            $('.speEnd-account-money').text(data.super_reward_money);
            $('.speEnd-account-level').text(star_cn+'超级劳模');

            var start_time = 0, end_time = 0;

            if(data.superRewardStartTime){
                start_time = Func.format_to_timeSamp(Func.format_to_time(new Date()));
            }
            if(data.superRewardEndTime){
                end_time = Func.format_to_timeSamp(data.superRewardEndTime);
            }
            // 可以领取 并且未领取
            if(data.get_status == 1){
                $('.special-lingqu').removeClass('canNotLing');
                var sec = (end_time - start_time) / 1000;
                // 普通领取时间倒计时
                //  var sec = 900000;
                 var time = Func.SecondToDate(sec);
                 $('.special-countDownTime').text('领取倒计时：' + time);
                 self.countDown_timer = setInterval(function(){
                     if(sec <=0 ){
                         clearInterval(self.countDown_timer);
                         return;
                     }
                     sec--;
                     time = Func.SecondToDate(sec);
                     $('.special-countDownTime').text('领取倒计时：' + time);
                 },1000)
            }

            else if(data.get_status == 2 || data.get_status == 3 || data.get_status == 4 || data.get_status ==5){
                $('.special-lingqu').addClass('canNotLing');
                if(data.get_status == 2){
                    $('.special-countDownTime').text('领取时间未开始');
                }else if(data.get_status == 3){
                    $('.special-countDownTime').text('领取时间已结束,请联系客服');
                }else if(data.get_status == 4){
                    $('.special-countDownTime').text('暂未达到条件');
                }else if(data.get_status == 5){
                    $('.special-countDownTime').text('已领取奖励');
                }
            }
            self.hanle_special_ling_click_witch(start_time,end_time, data);
        },
         // 登录前和登录后的领取点击事件切换
        hanle_special_ling_click_witch(start_time, end_time, data){
            var self = this;
            $('.special-lingqu').off('click')
            if(Func.cookie.get('token')){
                $('.special-lingqu').on('click',function(){
                    console.log(data.get_status);
                    // start_time - end_time <= 0  && 
                    if( data.get_status == 1){

                        self.models_get_super_reward(function(){
                            $('.special').fadeOut(100, function(){
                                $('.speEnd').fadeIn(100);
                            });
                            clearTimeout(timer_1);
                            clearTimeout(timer_2);
            
                            var timer_1 = setTimeout(function(){
                                $('.speEnd-inner').addClass('active');  
                                clearTimeout(timer_1);
                            },300)
                            var timer_2 = setTimeout(function(){
                                $('.speEnd-inner-yin').addClass('active');  
                                clearTimeout(timer_2);
                            },800)
                        })
                        self.models_get_all_models();
                    }
                    if( data.get_status == 2 ){
                        Func.toast({
                            time : 1500,
                            message : '领取时间未开始'
                        })
                    }else if(data.get_status == 3){
                        Func.toast({
                            time : 1500,
                            message : ':领取时间已结束,请联系客服'
                        })
                    }else  if(data.get_status == 4){
                        Func.toast({
                            time : 1500,
                            message : '日常劳模的领取不够5个'
                        })
                    }else  if(data.get_status == 5){
                        Func.toast({
                            time : 1500,
                            message : '您已经领取过了'
                        })
                    }
                })
            }else{
                $('.special-lingqu').on('click',function(){
                    if(!Func.cookie.get('token')){
                        Func.toast({
                            time : 1500,
                            message : '请先登录！'
                        })
                    }
                })
            }
        },
        // 领取超级劳模奖励
        models_get_super_reward(fn){
            Func.loading.open();
            Api.models_get_super_reward({
                _token : Func.cookie.get('token'),
            }, function(res){
                Func.loading.close();
                var res = JSON.parse(res);
                if(res.code === Api.CODE){
                    Func.toast({
                        time: 1500,
                        message : res.msg
                    });
                    fn && fn()
                }else{
                    Func.toast({
                        time: 1500,
                        message : res.msg
                    });
                }
            },function(err){
                console.log(err);
                Func.toast({
                    time: 1500,
                    message : Api.ERROR
                });
            })
        }

    }
    

    Index.init();

})