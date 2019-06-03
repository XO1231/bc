
$(function(){
    var Init = {
        rules_btn_top : 0,
        lunpan_type : 0,
        timer : null,
        scroll_click : true,
        rool_flag : true,

        init: function(){
          
            var that = this;
            // 首次验证用户登录
            Func.check_user_login();
            
            // 下雪花
            Func.snow();
             // 打开背景音乐;
            if(sessionStorage.getItem('is_mobile') === 'yes'){
                $(document.body).one("touchstart",function(){
                    Func.music.open();
                });
            }else{
                $(window).one('scroll',function(){
                    Func.music.open();
                })
            }
            // this.countDown();

            // 轮盘轮播
            var swiper = new Swiper('.swiper-container', {
                effect: 'coverflow',
                grabCursor: false,
                centeredSlides: true,
                slidesPerView: 'auto',
                coverflowEffect: {
                rotate: 60,
                stretch: 1,
                depth:  sessionStorage.getItem('is_mobile') === 'yes' ? 20 : 300,
                modifier: sessionStorage.getItem('is_mobile') === 'yes' ? 5 : 2,
                slideShadows : true,
                },
                spaceBetween: sessionStorage.getItem('is_mobile') === 'yes' ? 20 : 30,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                on: {
                    slideChangeTransitionEnd: function(){
                        console.log(this.activeIndex)
                        switch (this.activeIndex) {
                            case 3:
                                that.lunpan_type = 4;
                                break;
                            case 4:
                                that.lunpan_type = 1;
                                break;
                            case 5:
                                that.lunpan_type = 2;
                                break;
                            case 6:
                                that.lunpan_type = 3;
                                break;
                            case 7:
                                that.lunpan_type = 4;
                                break;
                            case 8:
                                that.lunpan_type = 1;
                                break;
                            default:
                                break;
                        }
                        // console.log(this.activeIndex);
                        Func.refresh_lunpan_title(that.lunpan_type)
                    },
                },
                loop :true
            });
            
            Func.refresh_lunpan_title(that.lunpan_type);
            that.lunpan_log();

            if(!sessionStorage.getItem('userInfo')){
                that.wishlist(true);
            }else{
                that.getwishlist(false);
            }

            that.datelist();
            that.signlist();
            if(sessionStorage.getItem('userInfo')){
                // clearInterval(that.timer);
                // that.timer  = setInterval(function(){
                //     that.heartbeat();
                // },1000)
            }
            
            $('.cunkuan-btn').on('click',function(){
                Func.loading.open();
                that.getdepositreward()
            })
            // 兑换高级轮盘
            $('.exhcange-more-high').on('click',function(){
               var flag = Func.toast_login();
               if(!flag){
                   return;
               }
               that.lunpan_upgrade();
            })

            // 爱心点赞
            $('.panel-3-box-inner').on('click', '.love-btn',function(){
                if(!sessionStorage.getItem('userInfo')){
                    Func.toast({
                        message : '请先登录',
                        time : 1500
                    })
                    return;
                }
                var self = this;
                var id = $(self).attr('data-id');
                console.log(id);
                Func.loading.open();
                that.wish_like(id, function(data){
                    Func.loading.close()
                    if(data.code === Api.code){
                        if($(self).hasClass('active')){
                            $(self).removeClass('active');
                        }else{
                            $(self).addClass('active');
                        }
                        Func.toast({
                            message : data.msg,
                            time : 1500
                        });
                        that.getwishlist(false);
                    }else{
                        Func.toast({
                            message : data.msg,
                            time : 1500
                        });
                    }
                })
                
            })
            
            // 打开登录弹窗
            $('.ready-login-btn').on('click',function(){
                $('html , body').animate({scrollTop: 0},'slow');
                $('.login-box').fadeIn();
            })

            $(document).on('keydown',function(e){
                if(e.keyCode === 13){
                    $('.login-btn').trigger('click');
                }
            })
            // 关闭登录弹窗
            $('.login-box').on('click',function(e){
                if(e.target.className === 'close-login-box' || e.target.className === 'login-box'){
                    $('.login-box').fadeOut();
                }
            })

            // 打开个人中心弹窗
            $('.open-mobile-center').on('click',function(e){
                $('.self-center').fadeIn();
            })
            // 关闭个人中心弹窗
            $('.self-center').on('click',function(e){
                if(e.target.className === 'self-center' || e.target.className === 'close-self-center'){
                    $('.self-center').fadeOut();
                }
            })
            // 登录
            $('.login-btn').on('click',function(){
                that.login();
            })

            // 退出登录
            $('.login-out').on('click',function(){
                sessionStorage.clear();
                Func.check_user_login();
                that.init();
                clearInterval(that.timer);
                window.location.reload();
            })

            // 返回顶部
            $('.go-top').click(function(){
                $('html , body').animate({scrollTop: 0},'slow');
            });

            // 关闭背景音乐
            $('.close-music').on('click',function(){
                if(Func.switch_music){
                    $(this).text('打开音乐')
                    Func.music.close();
                }else{
                    $(this).text('关闭音乐')
                    Func.music.open();
                }
                Func.switch_music = !Func.switch_music
            })
            
            // 签到
            $('.qiandao-ul-wrap').on('click', 'li',function(){
                // var data_sign = $(this).attr('data-sign');
                // if(data_sign === '1'){
                //     return;
                // }
                if(!sessionStorage.getItem('userInfo')){
                    Func.toast({
                        message : '请先登录！',
                        time : 1500
                    })
                    return
                }
                var data_date = $(this).attr('data-date');
                Func.loading.open();
                that.sign(data_date);
            })

            // 关闭签到成功弹窗
            $('.qiandao-succ').on('click',function(e){
                if(e.target.className === 'qiandao-succ fixed-item' || e.target.className === 'close-qiandao-succ'){
                    $('.qiandao-succ').fadeOut();
                }
            })

            //关闭签到失败
            $('.qiandao-faild').on('click',function(e){
                if(e.target.className === 'qiandao-faild fixed-item' || e.target.className === 'close-qiandao-faild'){
                    $('.qiandao-faild').fadeOut();
                }
            })


            // 关闭轮盘没抽到
            $('.lunpan-faild').on('click',function(e){
                if(e.target.className === 'lunpan-faild fixed-item' || e.target.className === 'close-lunpan-faild'){
                    $('.lunpan-faild').fadeOut();
                }
            })
            // 关闭轮盘抽到
            $('.lunpan-succ').on('click',function(e){
                if(e.target.className === 'lunpan-succ fixed-item' || e.target.className === 'close-lunpan-succ'){
                    $('.lunpan-succ').fadeOut();
                }
            })

            // 打开中奖历史
            $('.show-self-his').on('click',function(){
                var userInfo = sessionStorage.getItem('userInfo');
                if(!userInfo){
                    Func.toast({
                        message : '请先登录！',
                        time : 1500
                    })
                    return;
                }
                that.lunpan_history(1);
                $('.self-his').fadeIn();
              
                // $('.self-his').fadeIn();
                // var data = sessionStorage.getItem('first_lunpan_history');
                // if(data){
                //     data = JSON.parse(data);
                // }
                // var str = '<table><tbody>'
                // data.history.forEach(function(ele,index){
                //     str += '<tr><td>'+ ele.prize_name +'</td><td>'+ele.addtime+'</td></tr>';
                // });
                // str += '</tbody></table>';
                // $('.self-his-box-son').html(str);
                // $('.self-his-panigation').html(data.page);
            })
            // 中奖历史分页
            $('.self-his-panigation').on('click','a',function(e){
                e.preventDefault();
                var href = $(this).attr('href');
                var page = href.split('=')[1];
                page = Number(page);
                that.lunpan_history(page);
            })
            // 关闭中奖历史
            $('.self-his').on('click',function(e){
                if(e.target.className === 'self-his fixed-item' || e.target.className === 'close-self-his'){
                    $('.self-his').fadeOut();
                }
            })
            // 打开中奖名单
            $('.show-list-his').on('click',function(){
                $('.list-his').fadeIn();
            })
            // 关闭中奖名单
            $('.list-his').on('click',function(e){
                if(e.target.className === 'list-his fixed-item' || e.target.className === 'close-list-his'){
                    $('.list-his').fadeOut();
                }
            })
            // 打开许愿框   
            $('.xuyuan-btn').on('click',function(){
                if(!sessionStorage.getItem('userInfo')){
                    Func.toast({
                        message : '请先登录！',
                        time : 1500
                    })
                    return;
                }
                $('.i-want').fadeIn();
            })
            // 关闭许愿框
            $('.i-want').on('click',function(e){
                if(e.target.className === 'i-want fixed-item' || e.target.className === 'close-i-want'){
                    $('.i-want').fadeOut();
                }
            })

            // 打开许愿成功
            $('.i-want-btn').on('click',function(){
                that.makeawish();
            })
            // 关闭许愿成功
            $('.want-done').on('click',function(e){
                if(e.target.className === 'want-done fixed-item' || e.target.className === 'close-want-done'){
                    $('.want-done').fadeOut();
                }
            })

            // 打开活动规则
            $('.show-rules-wrap').on('click',function(e){
                // Init.rules_btn_top = $(this).offset().top
                // Init.rules_btn_top = e.pageY;
                Init.rules_btn_top = e.pageY - e.screenY + 70;
                $('html , body').animate({scrollTop: 0},'slow');
                $('.rules-wrap').fadeIn();
            })

            // 关闭活动规则
            $('.rules-wrap').on('click',function(e){
                if(!that.scroll_click){ return };
                if(e.target.className === 'rules-wrap' || e.target.className === 'close-rules-wrap'){
                    that.scroll_click = false; 
                    $('.rules-wrap').fadeOut(function(){
                        that.scroll_click = true
                    });
                    if(!(sessionStorage.getItem('is_mobile') === 'yes')){
                        $('html , body').animate({scrollTop: Init.rules_btn_top},'slow');
                        Init.rules_btn_top = 0;
                    }
                }
               
            })

            // 打开右边固定导航
            $('.show-fixed-right').on('click',function(){
                if(Func.is_show_fixed){
                    $(this).addClass('active');
                    $(this).prev('.fixed-right').addClass('active')
                    Func.is_show_fixed = !Func.is_show_fixed;
                }else{
                    $(this).removeClass('active');
                    $(this).prev('.fixed-right').removeClass('active')
                    Func.is_show_fixed = !Func.is_show_fixed;
                }
                
            })

            // 关闭红包雨结束
            $('.hb-end').on('click',function(e){
                if(e.target.className === 'close-hb-end'){
                    $('.hb-end').fadeOut(function(){
                        $('.hb-end-inner').removeClass('active')
                    });
                }
            })
            // 轮盘数据
            // 青铜
            var qt_obj = [
                {
                    prize_id: 1,
                    gif: 'A01',
                    prize_name: '36积分'
                },
                {
                    prize_id: 2,
                    gif: 'A02',
                    prize_name: "166积分",
                },

                {
                    prize_id: 3,
                    gif: 'A03',
                    prize_name: "鸣谢惠顾"
                },
                {
                    prize_id: 4,
                    gif: 'A04',
                    prize_name: "126积分"

                },
                {
                    prize_id: 5,
                    gif: 'A05',
                    prize_name: "8元现金筹码"
                },
                {
                    prize_id: 6,
                    gif: 'A06',
                    prize_name: "26积分"
                },
                {
                    prize_id: 7,
                    gif: 'A07',
                    prize_name: "36积分"
                },
                {
                    prize_id: 8,
                    gif: 'A08',
                    prize_name: "6元现金筹码"
                },
                {
                    prize_id: 'A09',
                    gif: 'A09',
                    prize_name: "16积分"
                },
                {
                    prize_id: 10,
                    gif: 'A10',
                    prize_name: '66积分'
                },
                {
                    prize_id: 11,
                    gif: 'A11',
                    prize_name: '鸣谢惠顾'
                },
                {
                    prize_id: 12,
                    gif: 'A12',
                    prize_name: '白银抽奖 × 1'
                },
                {
                    prize_id: 13,
                    gif: 'A13',
                    prize_name: '16积分'
                },
                {
                    prize_id: 14,
                    gif: 'A14',
                    prize_name: '6元现金筹码'
                },
                {
                    prize_id: 15,
                    gif: 'A15',
                    prize_name: '26积分'
                },
                {
                    prize_id: 16,
                    gif: 'A16',
                    prize_name: '8元现金筹码'
                }
            ];
            var by_obj = [
                {
                    prize_id: 1,
                    gif: 'B01',
                    prize_name: '28积分'
                },
                {
                    prize_id: 2,
                    gif: 'B02',
                    prize_name: "488积分",
                },

                {
                    prize_id: 3,
                    gif: 'B03',
                    prize_name: "58元现金筹码"
                },
                {
                    prize_id: 4,
                    gif: 'B04',
                    prize_name: "再转一次"

                },
                {
                    prize_id: 5,
                    gif: 'B05',
                    prize_name: "388积分"
                },
                {
                    prize_id: 6,
                    gif: 'B06',
                    prize_name: "288积分"
                },
                {
                    prize_id: 7,
                    gif: 'B07',
                    prize_name: "28元现金筹码"
                },
                {
                    prize_id: 8,
                    gif: 'B08',
                    prize_name: "青铜抽奖 × 3"
                },
                {
                    prize_id: 9,
                    gif: 'B09',
                    prize_name: "388积分"
                },
                {
                    prize_id: 10,
                    gif: 'B10',
                    prize_name: '588积分'
                },
                {
                    prize_id: 11,
                    gif: 'B11',
                    prize_name: '38元现金筹码'
                },
                {
                    prize_id: 12,
                    gif: 'B12',
                    prize_name: '鸣谢惠顾'
                },
                {
                    prize_id: 13,
                    gif: 'B13',
                    prize_name: '再转一次'
                },
                {
                    prize_id: 14,
                    gif: 'B14',
                    prize_name: '288积分'
                },
                {
                    prize_id: 15,
                    gif: 'B15',
                    prize_name: '黄金抽奖 × 1'
                },
                {
                    prize_id: 16,
                    gif: 'B16',
                    prize_name: '鸣谢惠顾'
                }
            ];
            var hj_obj = [
                {
                    prize_id: 1,
                    gif: 'C01',
                    prize_name: "188元现金筹码",
                },

                {
                    prize_id: 2,
                    gif: 'C02',
                    prize_name: "1888积分"
                },
                {
                    prize_id: 3,
                    gif: 'C03',
                    prize_name: "88元现金筹码"

                },
                {
                    prize_id: 4,
                    gif: 'C04',
                    prize_name: "白银抽奖 × 3"
                },
                {
                    prize_id: 5,
                    gif: 'C05',
                    prize_name: "108元现金筹码"
                },
                {
                    prize_id: 6,
                    gif: 'C06',
                    prize_name: "3888积分"
                },
                {
                    prize_id: 7,
                    gif: 'C07',
                    prize_name: "再转一次"
                },
                {
                    prize_id: 8,
                    gif: 'C08',
                    prize_name: "2888积分"
                },
                {
                    prize_id: 9,
                    gif: 'C09',
                    prize_name: '钻石抽奖 × 1'
                },
                {
                    prize_id: 10,
                    gif: 'C10',
                    prize_name: '鸣谢惠顾'
                }
            ]
            var zs_obj = [
                {
                    prize_id: 1,
                    gif: 'D01',
                    prize_name: "黄金抽奖 × 3"
                },
                {
                    prize_id: 2,
                    gif: 'D02',
                    prize_name: "888元现金筹码",
                },

                {
                    prize_id: 3,
                    gif: 'D03',
                    prize_name: "8888积分"
                },
                {
                    prize_id: 4,
                    gif: 'D04',
                    prize_name: "1088元现金筹码"

                },
                {
                    prize_id: 5,
                    gif: 'D05',
                    prize_name: "12888积分"
                },
                {
                    prize_id: 6,
                    gif: 'D06',
                    prize_name: "888元现金筹码"
                },
                {
                    prize_id: 7,
                    gif: 'D07',
                    prize_name: "16888积分"
                },
                {
                    prize_id: 8,
                    gif: 'D08',
                    prize_name: "18888积分"
                }
            ]
            // 青铜抽奖
            $('.qingtong-btn').on('click', function () {
                that.lunpan_play( $('.qingtong-inner'),22.5 , qt_obj)
            })
            // 白银抽奖
            $('.baiyin-btn').on('click', function () {
                that.lunpan_play($('.baiyin-inner'), 22.5 , by_obj)
            })

            // 黄金抽奖
            $('.huangjin-btn').on('click', function () {
                that.lunpan_play( $('.huangjin-inner') , 36, hj_obj)
            })
            // 钻石抽奖
            $('.zuanshi-btn').on('click', function () {
                that.lunpan_play( $('.zuanshi-inner') , 45 , zs_obj)
                var flag = Func.toast_login();
            })
        },
        // 获取初始化 中奖名单
        lunpan_log: function(){
            // storage里有中奖名单就不请求了
            var data = sessionStorage.getItem('lunpan_log');
            function render(data){
                var str = '';
                data.forEach(function(ele,index){
                    str += '<li><h4>恭喜'+ele.account+'</h4><p>获得<span>'+ele.prize_name+'</span> </p></li>'
                })
                $('.marquee-list-ul-1').html(str);
                // 中奖名单轮播
                Func.marquee_.roll(".marquee-list-ul-1", ".list-his-box-son");
            }
            if(data){
                data = JSON.parse(data);
                render(data);
                return;
            }
            Api.lunpan_log({},function(res_str){
                var res = JSON.parse(res_str);
                if(res.code === Api.code){
                    var data = res.data.list;
                    sessionStorage.setItem('lunpan_log',JSON.stringify(data));
                    render(data);
                }else{
                    Func.toast({
                        message : res.msg,
                        time : 1500
                    })
                }
                },function(err){
                    console.log(err)
            })
        },
        // 获取许愿列表
        wishlist: function(flag){
            var data = sessionStorage.getItem('wish_list');
            if(data && flag){
                data = JSON.parse(data);
                var str = '';
                data.forEach(function(ele,index){
                    var date = Func.format_time(ele.updated_on)
                    if(ele.status == 'red'){
                        str += '<li><div class="xuyuan-title"><span>'+ele.account+'</span><strong>'+ date +'</strong></div><div class="xuyuan-cont"> <p>'+ele.desire+'</p><p><strong class="love-btn active" data-id="'+ele.id+'" ></strong> <i>'+ele.count+'</i></p></div></li>'
                    }else{
                        str += '<li><div class="xuyuan-title"><span>'+ele.account+'</span><strong>'+ date +'</strong></div><div class="xuyuan-cont"> <p>'+ele.desire+'</p><p><strong class="love-btn" data-id="'+ele.id+'" ></strong> <i>'+ele.count+'</i></p></div></li>'
                    }
                })
                $('.marquee-ul-1').html(str);
                // 许愿墙轮播
                Func.marquee_.roll(".marquee-ul-1", ".panel-3-box-inner");
                return;
            }
            Api.wishlist({}, function(res_str){
                var res = JSON.parse(res_str);
                if(res.code === Api.code){
                    var data = res.data.res;
                    sessionStorage.setItem('wish_list', JSON.stringify(data));
                    var str = '';
                    data.forEach(function(ele,index){
                        var date = Func.format_time(ele.updated_on)
                        if(ele.status == 'red'){
                            str += '<li><div class="xuyuan-title"><span>'+ele.account+'</span><strong>'+ date +'</strong></div><div class="xuyuan-cont"> <p>'+ele.desire+'</p><p><strong class="love-btn active" data-id="'+ele.id+'" ></strong> <i>'+ele.count+'</i></p></div></li>'
                        }else{
                            str += '<li><div class="xuyuan-title"><span>'+ele.account+'</span><strong>'+ date +'</strong></div><div class="xuyuan-cont"> <p>'+ele.desire+'</p><p><strong class="love-btn" data-id="'+ele.id+'" ></strong> <i>'+ele.count+'</i></p></div></li>'
                        }
                    })
                    $('.marquee-ul-1').html(str);
                    // 许愿墙轮播
                    Func.marquee_.roll(".marquee-ul-1", ".panel-3-box-inner");

                }
            },function(err){
                console.log(err)
            })
        },
        // 点赞
        wish_like: function(id, fn){
            Api.wish_like({
                _token: Func.get_token(),
                id : id
            }, function(res){
                var data = JSON.parse(res);
                fn && fn(data);
            },function(err){
                console.log(err);
            })
        },
        // 用户登录
        login: function(){
            var that = this;
            var username = $('#username').val();
            var pwd = $('#password').val();
            if(!username){
                $('#username').focus();
                Func.toast({
                    message:"请输入用户名！",
                    time:2000
                });
                return;
            }
            if(!pwd){
                Func.loading.close();
                $('#password').focus();
                Func.toast({
                    message:"请输入密码！",
                    time:2000
                });
                return;
            }

            Func.loading.open();

            Api.login({
                username: username,
                password : pwd
            },function(res_str){
                var res = JSON.parse(res_str);
                if(res.code === Api.code){
                    sessionStorage.setItem('userInfo' , JSON.stringify(res.data));
                    Func.check_user_login();
                    Func.loading.close();
                    $('.login-box') && $('.login-box').hide();
                   
                    that.lunpan_history();
                    that.signlist();
                    Func.refresh_lunpan_title(that.lunpan_type);
                    that.getwishlist(false);

                    // clearInterval(that.timer);
                    // that.timer  = setInterval(function(){
                    //     that.heartbeat();
                    // },1000)

                }else{
                    Func.toast({
                        message : res.msg,
                        time : 1500
                    })
                }
                Func.loading.close();
            },function(err){
                Func.loading.close();
                console.log(err);
            })
        },
        // 获取中奖历史
        lunpan_history : function(page){
            var page = page || 1;
            Api.lunpan_history({
                per_page : page,
                _token : Func.get_token()
            },function(res){
                var data = JSON.parse(res);
                if(data){
                     data = data.data;
                }
                sessionStorage.setItem('first_lunpan_history',JSON.stringify(data));
                var str = '<table><tbody>' ;
                data.history.forEach(function(ele,index){
                    str += '<tr><td>'+ ele.prize_name +'</td><td>'+ele.addtime+'</td></tr>';
                })
                str += '</tbody></table>'
                $('.self-his-box-son').html(str);
                $('.self-his-panigation').html(data.page);
            },function(err){
                console.log(err);
            })
        },
        // 未登录前签到列表
        datelist : function(){
            // 如果登录则不获取数据
             if(sessionStorage.getItem('userInfo')){
                return
            }
            // 先看缓存中有没有
            var data_str = sessionStorage.getItem('sign_list');
            if(data_str){
                var data =  JSON.parse(data_str);
                renderSign(data);
            }

            // 渲染dom
            function renderSign(data){
                var str = '';
                data.map(function(ele,index){
                    var num = ele.date.split('-')[2];
                    str += '<li  data-date="'+ ele.date+'"> <span>'+num+'日 </span> </li>'
                    return num;
                })
                $('.qiandao-ul-wrap').html(str);
            };
           
            Api.datelist({
            },function(res){
                var data = JSON.parse(res);
                if(data.code === Api.code){
                   data = data.data.res;
                   sessionStorage.setItem('sign_list',JSON.stringify(data));
                   renderSign(data);
                }
                
            },function(err){
                console.log(err)
            })
        },
        // 登录后签到列表
        signlist: function(flag){
            if(!sessionStorage.getItem('userInfo')){
                return;
            }
            var data_str = sessionStorage.getItem('sign_list')
            if(data_str && !flag){
                var data = JSON.parse(data_str);
                renderSign(data);
            }
            function renderSign(data){
                var str = '';
                var i = 0;
                data.map(function(ele,index){
                    var num = ele.date.split('-')[2];
                    if(ele.sign){
                        i+= 1;
                        str += '<li class="active" data-date="'+ ele.date+'" data-sign="'+ele.sign+'"> <span>'+num+'日 </span></li>'
                    }else{
                        str += '<li  data-date="'+ ele.date+'" data-sign="'+ele.sign+'"> <span>'+num+'日 </span></li>'
                    }
                    return num;
                })
                $('.qiandao-days').text(i);
                $('.qiandao-ul-wrap').html(str);
            }

            Api.signlist({
                _token: Func.get_token()
            },function(res){
                var data = JSON.parse(res);
                if(data.code === Api.code){
                    data = data.data.res;
                    sessionStorage.setItem('sign_list',JSON.stringify(data));
                    renderSign(data);
                }
            },function(err){
                console.log(err);
            })
        },
        // 许愿
        makeawish: function(){
            var val = $('#i-want-value').val();
            var that = this;
            if(val.length <= 0){
                Func.toast({
                    message : '请填写您要许下的愿望！',
                    time:1500
                });
                return;
            }
            if(val.length > 50){
                Func.toast({
                    message : '愿望内容应保持在50字以内！',
                    time:1500
                });
                return;
            }
            Func.loading.open()
            Api.makeawish({
                _token: Func.get_token(),
                desire : val
            },function(res){
                var data = JSON.parse(res);
                console.log(data);
                if(data.code === Api.code ){
                    $('.i-want').fadeOut();
                    $('.want-done').fadeIn();
                    that.getwishlist(false);
                }else{
                    Func.toast({
                        message : data.msg,
                        time : 15000
                    })
                }
                Func.loading.close()
            },function(err){
                console.log(err);
            })
        },
        // 签到
        sign : function(postdate){
            var that = this;
            Api.sign({
                _token : Func.get_token(),
                postdate : postdate
            },function(res){
                var data = JSON.parse(res);
                if(data.code === Api.code){
                    Func.loading.close();
                    $('.qiandao-succ').fadeIn();
                    that.signlist(true); //更新签到列表
                    // 更新抽奖次数
                    var obj = data.data.res;
                    var total = 0;
                    for(var k in obj){
                        if(Number(obj[k]) && k !== 'point'){
                            total += Number(obj[k]);
                        }
                    }
                    var str = '获得'+total+'次轮盘抽奖机会';
                    var str1 = '获得'+ data.data.res.point+'商城积分';
                    $('.qiandao_h5').text(str);
                    $('.qiandao_p').text(str1);
                    that.getuserinfoagain();

                }else if(data.code === 'AppErr002'){
                    $('.qiandao-faild').fadeIn();
                }else{
                    Func.toast({
                        message : data.msg,
                        time : 1500
                    })
                }
                Func.loading.close();
            },function(err){
                console.log(err);
            })
        },
        // 轮盘抽奖
        lunpan_play: function(tag, deg, lunpan_obj){
            var that = this;
            var flag = Func.toast_login();
            if(!flag){
                return;
            }
            if(!Func.lunpan.play_game_is_click){
                Func.toast({
                    message : '请等待当前抽奖完成！',
                    time: 1500
                })
                return;
            }
            Func.lunpan.play_game_is_click = false;
            Api.lunpan_play({
                _token : Func.get_token(),
                type : that.lunpan_type
            },function(res){
                var data = JSON.parse(res);
                if(data.code === Api.code){
                    data = data.data;
                    // var random = qt_obj[parseInt(Math.random() * qt_obj.length)].gif;
                    var random = data.prize_code;
                    random = Func.lp_str2num(random) - 1;
                    console.log(random);
                    // var random = (Number(data.data.bonus.code) % 1000) - 1;
                    // console.log(random);
                    Func.lunpan.startGame(lunpan_obj[random], function (obj) {
                        if (obj.gif == 'A03' || obj.gif == 'A11') {
                            // 没抽到
                            $('.lunpan-faild').fadeIn();
                        } else {
                            // 抽到了
                            $('.lunpan-succ-inner>p').text(data.detail);
                            $('.lunpan-succ').fadeIn();
                        }
                        Func.update_userInfo(data.member)
                        Func.refresh_lunpan_title(that.lunpan_type);
                        Func.lunpan.play_game_is_click = true;
                    }, tag , deg);
                }else{
                    Func.toast({
                        message : data.msg,
                        time : 1500
                    })
                    Func.lunpan.play_game_is_click = true;
                }
            },function(err){
                console.log(err);
            })
        },
        // 兑换高级轮盘
        lunpan_upgrade : function(){
            var that = this;
            if(that.lunpan_type !== 1 && that.lunpan_type !== 2){
                Func.toast({
                    message : '暂不支持此种轮盘兑换成高级轮盘！',
                    time : 1500
                })
                return;
            }
            Func.loading.open()
            Api.lunpan_upgrade({
                type : that.lunpan_type,
                _token : Func.get_token()
            },function(res){
                var data = JSON.parse(res);
                if(data.code === Api.code){
                    // console.log(data);
                    var obj = data.data.member;
                    Func.update_userInfo(obj);
                    Func.refresh_lunpan_title(that.lunpan_type);
                    Func.toast({
                        message: data.msg,
                        time : 1500
                    })
                }else{
                    Func.toast({
                        message: data.msg,
                        time : 1500
                    })
                }
                Func.loading.close();
            },function(err){
                console.log(err);
            })
        },
        // 倒计时
        countDown : function(){
            Api.hb_rain({
                action : 'countdown'
            },function(res){
                var data = JSON.parse(res);
                if(data.msg === 'SUCCESS'){
                    var sec = data.data.countdown;
                    var timer = setInterval(function(){
                        sec--;
                        if(sec <= 0){
                            sec = 0;
                            clearInterval(timer)
                        }
                        var time = Func.SecondToDate(sec);
                        $('.day_num').text(time);
                    },1000)
                  
                }
            },function(err){
                console.log(err);
            })
        },
        // 红包雨心跳进程
        heartbeat: function(){
            var that = this;
            Api.hb_rain({
                action : 'heartbeat',
                _token : Func.get_token()
            },function(res){
                var data = JSON.parse(res);
                if(data.msg === 'SUCCESS'){
                    // 红包雨开始掉
                    if(data.status === 2){
                        window.hb_refresh();
                    }
                    // 红包雨结束后
                    if(data.status === 3){
                        $('.hb-user-name').text(JSON.parse(sessionStorage.getItem('userInfo')).username);
                        $('.hb-count').text(data.data.times);
                        $('.hb-money').text(data.data.money);
                        $('#petalbox>div').animate({"opacity" : 0});

                        $('#petalbox').fadeOut(function(){
                            $('.hb-end').show(function(){
                                $('.hb-end-inner').addClass('active')
                            });
                        });
                        
                        $('body').css('overflow','auto');
                        clearInterval(that.timer);
                    }
                }else{
                    Func.toast({
                        message : data.msg,
                        time : 1500
                    })
                }
            },function(err){
                console.log(err);
            })
        },
        // 抢红包 点红包
        rob_hb : function(fn){
            Api.hb_rain({
                _token : Func.get_token()
            },function(res){
                var data = JSON.parse(res);
                if(data.msg === 'SUCCESS'){
                    // console.log(data);
                    fn && fn(data)
                }else{
                    Func.toast({
                        message : data.msg,
                        time : 1500
                    })
                }
            },function(err){
                console.log(err);
            })
        },
        // 存款获取积分抽奖
        getdepositreward : function(){
            var that = this;
            Api.getdepositreward({
                _token : Func.get_token()
            }, function(res){
                var data = JSON.parse(res);
                if(data.code === Api.code){
                    Func.toast({
                        message: data.msg,
                        time : 1500
                    })
                    var obj = data.data.res;
                    Func.update_userInfo(obj);
                    var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
                    Func.check_user_login();
                    Func.refresh_lunpan_title(that.lunpan_type)
                    if(userInfo.readychaoji <= 0 &&  userInfo.readychuji <= 0 && userInfo.readygaoji <= 0 && userInfo.readyzhongji <= 0){
                        $('.cunkuan-btn').hide();
                    }

                }else{
                    Func.toast({
                        message : data.msg,
                        time : 1500
                    })
                }
                Func.loading.close();
            },function(err){
                console.log(err);
            })
        },
        // 重新获取当前用户的全部抽奖次数
        getuserinfoagain : function(){
            var that = this;
            Api.getuserinfoagain({
                _token : Func.get_token()
            }, function(res){
                var data = JSON.parse(res);
                if(data.code === Api.code){
                    var obj = data.data.res;
                    Func.update_userInfo(obj);
                    var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
                    Func.check_user_login();
                    Func.refresh_lunpan_title(that.lunpan_type)
                    if(userInfo.readychaoji <= 0 &&  userInfo.readychuji <= 0 && userInfo.readygaoji <= 0 && userInfo.readyzhongji <= 0){
                        $('.cunkuan-btn').hide();
                    }
                }else{
                    Func.toast({
                        message : data.msg,
                        time : 1500
                    })
                }
                Func.loading.close();
            },function(err){
                console.log(err);
            })
        },
        getwishlist : function(flag){
            // Api.getwishlist({
            //     _token : Func.get_token()
            // }, function(res){
            //     var data = JSON.parse(res);
            //     if(data.code === Api.code){

            //     }
            // },function(err){
            //     console.log(err)
            // })
            var that = this;
            var data = sessionStorage.getItem('wish_list');
            if(data && flag){
                data = JSON.parse(data);
                var str = '';
                data.forEach(function(ele,index){
                    var date = Func.format_time(ele.updated_on)
                    if(ele.status == 'red'){
                        str += '<li><div class="xuyuan-title"><span>'+ele.account+'</span><strong>'+ date +'</strong></div><div class="xuyuan-cont"> <p>'+ele.desire+'</p><p><strong class="love-btn active" data-id="'+ele.id+'" ></strong> <i>'+ele.count+'</i></p></div></li>'
                    }else{
                        str += '<li><div class="xuyuan-title"><span>'+ele.account+'</span><strong>'+ date +'</strong></div><div class="xuyuan-cont"> <p>'+ele.desire+'</p><p><strong class="love-btn" data-id="'+ele.id+'" ></strong> <i>'+ele.count+'</i></p></div></li>'
                    }
                })
                $('.marquee-ul-1').html(str);
                // 许愿墙轮播
                if(that.rool_flag){
                    Func.marquee_.roll(".marquee-ul-1", ".panel-3-box-inner");
                    return;
                }
            }
            Api.getwishlist({
                _token : Func.get_token()
            }, function(res_str){
                var res = JSON.parse(res_str);
                if(res.code === Api.code){
                    var data = res.data.res;
                    sessionStorage.setItem('wish_list', JSON.stringify(data));
                    var str = '';
                    data.forEach(function(ele,index){
                        var date = Func.format_time(ele.updated_on)
                        if(ele.status == 'red'){
                            str += '<li><div class="xuyuan-title"><span>'+ele.account+'</span><strong>'+ date +'</strong></div><div class="xuyuan-cont"> <p>'+ele.desire+'</p><p><strong class="love-btn active" data-id="'+ele.id+'" ></strong> <i>'+ele.count+'</i></p></div></li>'
                        }else{
                            str += '<li><div class="xuyuan-title"><span>'+ele.account+'</span><strong>'+ date +'</strong></div><div class="xuyuan-cont"> <p>'+ele.desire+'</p><p><strong class="love-btn" data-id="'+ele.id+'" ></strong> <i>'+ele.count+'</i></p></div></li>'
                        }
                    })
                    $('.marquee-ul-1').html(str);
                    // 许愿墙轮播
                    if(that.rool_flag){
                        Func.marquee_.roll(".marquee-ul-1", ".panel-3-box-inner");
                        that.rool_flag = false;
                        return;
                    }

                }
            },function(err){
                console.log(err)
            })
        }

    }
    Init.init();
    window.Init= Init;
})
