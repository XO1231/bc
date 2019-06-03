$(function () {
    Func.check_user_login();
    var Index = {
        xiu_qiu_timer: null,
        boom_timer: null,
        banner_bool_timer: null,
        old_nian_gif: './img/nian.gif',
        old_audio: '../common/media/banner.mp3',
        old_nians_type_img: './img/icon-6.png',
        nians_type_img: '',
        boom_gif: '',
        boom_audio: '',
        boom_id: 0,
        is_click: true,
        longs_height: 0,
        nians_height: 0,
        jinz_height: 0,
        sa_bi_timer: null,
        is_need_pay_audio: true,
        heartbeat_timer: null,
        count_down_timer: null,
        caijin_timer: null,

        init: function () {
            // 主要tab内容部分
            var that = this;
            var tabs = ['舞狮绣球', '驱赶年兽', '排名彩池'];
            var longs_title_imgs = ['0', '-196px', '-393px'];
            var jinz_title_imgs = ['0', '-184px', '-367px'];
            var longs_title_index = 0;
            var jinz_title_index = 0;


            setTimeout(function () {
                that.longs_height = $('.longs').height();
                that.nians_height = $('.nians').height();
                that.jinz_height = $('.jinz').height();
                $('.swiper-container').height(that.longs_height);
            }, 50)

            var swiper = new Swiper('.swiper-container', {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '">' + (tabs[index]) + '</span>';
                    },
                },
                on: {
                    slideChangeTransitionEnd: function () {
                        // console.log(this.activeIndex)
                        switch (this.activeIndex) {
                            case 0:
                                $('.swiper-container').height(that.longs_height);
                                break;
                            case 1:
                                $('.swiper-container').height(that.nians_height);
                                break;
                            case 2:
                                $('.swiper-container').height(that.jinz_height);
                                break;
                            default:
                                break;
                        }

                    },
                },
            });

            // 倒计时
            that.hydrangea_time();

            // 返回顶部
            $('.go-top').click(function () {
                $('html , body').animate({
                    scrollTop: 0
                }, 'slow');
            });

            // 更多优惠
            $('.swiper-pagination').append('<a href="' + Base.more_promo + '" target="_blank">更多优惠</a>');

            // 狮子title闪烁
            setInterval(function () {
                $('.longs-title').css('background', 'url(./img/longs-title.png) no-repeat 0 ' + longs_title_imgs[longs_title_index] + ' /100%');
                longs_title_index++;
                if (longs_title_index >= 3) {
                    longs_title_index = 0;
                }
                $('.jinz-title').css('background', 'url(./img/jinz-title.png) no-repeat 0 ' + jinz_title_imgs[jinz_title_index] + ' /100%');
                jinz_title_index++;
                if (jinz_title_index >= 3) {
                    jinz_title_index = 0;
                }
            }, 500);

            this.title_tip();
            this.select_audio_img();
            this.boom_shaka_laka();
            this.money_count();
            this.is_sa_coin();
            Func.marquee_.roll('.jinz-right-ul', '.jinz-right-cont');
            Func.fixed_move();
            // 点击攻略
            $('.gonglue-btn').on('click', function () {
                $('.gonglue').fadeIn();
            })
            // 关闭攻略
            $('.gonglue').on('click', function (e) {
                if (e.target.className === 'gonglue' || e.target.className === 'close-gonglue') {
                    $(this).fadeOut();
                }
            })
            // 分别获取登录前后的签到列表
            if (sessionStorage.getItem('userInfo') && JSON.parse(sessionStorage.getItem('userInfo')).username) {
                that.signlist();
                // 获取总烟花
                that.getuserfireworks();
                // 获取总彩金
                that.getusertotalmoney();
                clearInterval(that.heartbeat_timer);
                that.heartbeat_timer = setInterval(function () {
                    that.heartbeat();
                }, 1000)

                that.caijin_timer = setInterval(function (){
                    that.deposit();
                }, 30000)

            } else {
                that.init_signlist();
            }
            $(document).on('keydown', function (e) {

                if (sessionStorage.getItem('userInfo')) {
                    return;
                }
                if (e.keyCode === 13) {
                    $('.login-btn').trigger('click');
                }
            })
            // 点击登录
            $('.login-btn').on('click', function () {
                var username = $('#username').val();
                var password = $('#password').val();
                if (!username) {
                    $('#username').focus();
                    Func.toast({
                        message: '请输入账号！',
                        time: 1500
                    })
                    return;
                }
                if (!password) {
                    $('#password').focus();
                    Func.toast({
                        message: '请输入密码！',
                        time: 1500
                    })
                    return;
                }
                Func.loading.open();
                var params = {
                    username: username,
                    password: password
                }

                that.login(params, function (data) {
                    if (sessionStorage.getItem('is_mobile') === 'yes') {
                        $('.login-box').fadeOut();
                    }
                    sessionStorage.setItem('userInfo', JSON.stringify(data.data));
                    Func.loading.close();
                    Func.check_user_login();
                    // 获取签到列表
                    that.signlist();
                    // 获取烟花数
                    that.getuserfireworks();
                    // 获取总彩金
                    that.getusertotalmoney();
                    // 心跳进程
                    clearInterval(that.heartbeat_timer);
                    that.heartbeat_timer = setInterval(function () {
                        that.heartbeat();
                    }, 1000)

                    that.caijin_timer = setInterval(function (){
                        that.deposit();
                    }, 30000)

                    // 登录后重新获取倒计时
                    clearInterval(that.count_down_timer);
                    that.hydrangea_time();
                })
            })
            // 退出登录
            $('.login-out').on('click', function () {
                sessionStorage.clear();
                window.location.reload();
                // Func.check_user_login();
            });

            // 打开彩金信息
            $('.money-info-btn').on('click', function () {
                $('.prize-info').fadeIn();
            })
            // 关闭彩金信息
            $('.prize-info').on('click', function (e) {
                if (e.target.className === 'close-prize-info' || e.target.className === 'prize-info') {
                    $('.prize-info').fadeOut();
                }
            });

            // 打开存款奖励
            $('.show-ck-jl').on('click', function () {
                $('.ck-jl').fadeIn();
            })

            // 关闭存款奖励
            $('.ck-jl').on('click', function (e) {
                if (e.target.className === 'close-ck-jl' || e.target.className === 'ck-jl') {
                    $('.ck-jl').fadeOut();
                }
            })
            // 关闭领取弹窗
            $('.close-ling-info').on('click', function () {
                $('.ling-info').fadeOut();
            })

            // 领取存款奖励
            $('.ling-btn').on('click', function () {
                that.getdepositreward();
            })
            if (sessionStorage.getItem('is_mobile') === 'yes') {
                // 移动端打开登录框
                $('.login-before').on('click', function () {
                    $('html , body').animate({
                        scrollTop: 0
                    }, 'slow');
                    $('.login-box').fadeIn();
                    $('body').removeClass('active');
                })
                // 移动端关闭登录框
                $('.login-box').on('click', function (e) {
                    if (e.target.className === 'close-login-box' || e.target.className === 'login-box') {
                        $('.login-box').fadeOut();
                    }

                })
            };
            // 关闭音效
            $('.pause-audio').on('click', function () {
                if ($(this).text() === '关闭音效') {
                    Func.music.close();
                    document.querySelector('#nians_audio').pause();
                    $(this).text('打开音效')
                } else {
                    Func.music.open();
                    document.querySelector('#nians_audio').play();
                    $(this).text('关闭音效')
                }
                that.is_need_pay_audio = !that.is_need_pay_audio;
            });

            // 排行榜
            that.leaderboard();
            // 总彩金
            that.pool_money();

            var money_pool_timer = setInterval(function () {
                // var someValue = 500080 + Number((Math.random() * 1000000).toFixed(2));
                // numAnim.update(someValue);
                that.pool_money();
            }, 10000);
            // 签到
            $('.qiandao-cont').on('click', 'div', function () {
                var date = $(this).attr('data-date');
                if (!date) {
                    Func.toast({
                        message: '请先登录！',
                        time: 1500
                    })
                    return;
                }
                Func.loading.open();
                var params = {
                    _token: Func.get_token(),
                    postdate: date
                }
                that.sign(params);
            })

            // 关闭get-info
            $('.close-get-info').on('click', function () {
                $('.get-info').fadeOut(function () {
                    $('.get-info-inner').removeClass('active');
                    that.getuserfireworks();
                    Api.generate_hydrangea_log({}, function (res) {
                        // console.log(res);
                    }, function (err) {
                        console.log(err)
                    })
                });
            })
        },
        xiuqiu_move: function () {
            var that = this;
            if (!$('.fixed-qiu').hasClass('active')) {
                return;
            }
            that.xiu_qiu_timer = setTimeout(function () {
                var tp_arr = [
                    '手慢了',
                    'miss',
                    '手滑了',
                    '快一点',
                    '恭喜发财',
                    '再接再厉',
                    '不要停',
                    '新年快乐'
                ];
                Func.sport('qiu-left-1', 'qiu-right-1', function () {
                    var tag = document.createElement('div');
                    tag.className = 'qiu-left-1';
                    $('.qiu-left').append(tag);
                    $('.qiu-left-1').one('click', function () {
                        var random_num = parseInt(Math.random() * tp_arr.length);
                        var text = tp_arr[random_num];

                        $(this).hide();
                        // $('.qiu-cont').append('<span>+'+(Math.random() * 100).toFixed(2)+'元</span>')
                        that.rob_hb(function (res) {
                            if (res.data.type == '1') {
                                if (res.data.prize) {
                                    $('.qiu-cont').append('<span>' + (res.data.prize) + '彩金</span>');
                                } else {
                                    $('.qiu-cont').append('<span>' + text + '</span>');
                                }
                            }
                            if (res.data.type == '2') {
                                $('.qiu-cont').append('<span>' + res.data.prize + ' X 1</span>')
                            }
                        })
                    })

                });

                Func.sport('qiu-right-1', 'qiu-left-1', function () {
                    var tag = document.createElement('div');
                    tag.className = 'qiu-right-1';
                    $('.qiu-right').append(tag);
                    $('.qiu-right-1').one('click', function () {

                        var random_num = parseInt(Math.random() * tp_arr.length);
                        var text = tp_arr[random_num];

                        $(this).hide();
                        // $('.qiu-cont').append('<span>+'+(Math.random() * 100).toFixed(2)+'元</span>')
                        that.rob_hb(function (res) {
                            if (res.data.type == '1') {
                                if (res.data.prize) {
                                    $('.qiu-cont').append('<span>' + (res.data.prize) + '彩金</span>');
                                } else {
                                    $('.qiu-cont').append('<span>' + text + '</span>');
                                }
                            }
                            if (res.data.type == '2') {
                                $('.qiu-cont').append('<span>' + res.data.prize + ' X 1</span>')
                            }
                        })
                    })
                });

                setTimeout(function () {
                    Func.sport('qiu-left-2', 'qiu-right-2', function () {
                        var tag = document.createElement('div');
                        tag.className = 'qiu-left-2';
                        $('.qiu-left').append(tag);
                        $('.qiu-left-2').one('click', function () {
                            var random_num = parseInt(Math.random() * tp_arr.length);
                            var text = tp_arr[random_num];

                            $(this).hide();
                            // $('.qiu-cont').append('<span>+'+(Math.random() * 100).toFixed(2)+'元</span>')
                            that.rob_hb(function (res) {
                                if (res.data.type == '1') {
                                    if (res.data.prize) {
                                        $('.qiu-cont').append('<span>' + (res.data.prize) + '彩金</span>');
                                    } else {
                                        $('.qiu-cont').append('<span>' + text + '</span>');
                                    }
                                }
                                if (res.data.type == '2') {
                                    $('.qiu-cont').append('<span>' + res.data.prize + ' X 1</span>')
                                }
                            })
                        })
                    });
                    Func.sport('qiu-right-2', 'qiu-left-2', function () {
                        var tag = document.createElement('div');
                        tag.className = 'qiu-right-2';
                        $('.qiu-right').append(tag);
                        $('.qiu-right-2').one('click', function () {

                            var random_num = parseInt(Math.random() * tp_arr.length);
                            var text = tp_arr[random_num];

                            $(this).hide();
                            // $('.qiu-cont').append('<span>+'+(Math.random() * 100).toFixed(2)+'元</span>')
                            that.rob_hb(function (res) {
                                if (res.data.type == '1') {
                                    if (res.data.prize) {
                                        $('.qiu-cont').append('<span>' + (res.data.prize) + '彩金</span>');
                                    } else {
                                        $('.qiu-cont').append('<span>' + text + '</span>');
                                    }
                                }

                                if (res.data.type == '2') {
                                    $('.qiu-cont').append('<span>' + res.data.prize + ' X 1</span>')
                                }
                            })
                        })
                    });
                }, 450);

                setTimeout(function () {
                    Func.sport('qiu-left-3', 'qiu-right-3', function () {
                        var tag = document.createElement('div');
                        tag.className = 'qiu-left-3';
                        $('.qiu-left').append(tag);
                        $('.qiu-left-3').one('click', function () {
                            var random_num = parseInt(Math.random() * tp_arr.length);
                            var text = tp_arr[random_num];

                            $(this).hide();
                            // $('.qiu-cont').append('<span>+'+(Math.random() * 100).toFixed(2)+'元</span>')
                            that.rob_hb(function (res) {
                                if (res.data.type == '1') {
                                    if (res.data.prize) {
                                        $('.qiu-cont').append('<span>' + (res.data.prize) + '彩金</span>');
                                    } else {
                                        $('.qiu-cont').append('<span>' + text + '</span>');
                                    }
                                }
                                if (res.data.type == '2') {
                                    $('.qiu-cont').append('<span>' + res.data.prize + ' X 1</span>')
                                }
                            })
                        })
                    });
                    Func.sport('qiu-right-3', 'qiu-left-3', function () {
                        var tag = document.createElement('div');
                        tag.className = 'qiu-right-3';
                        $('.qiu-right').append(tag);
                        $('.qiu-right-3').one('click', function () {
                            var random_num = parseInt(Math.random() * tp_arr.length);
                            var text = tp_arr[random_num];

                            $(this).hide();
                            // $('.qiu-cont').append('<span>+'+(Math.random() * 100).toFixed(2)+'元</span>')
                            that.rob_hb(function (res) {
                                if (res.data.type == '1') {
                                    if (res.data.prize) {
                                        $('.qiu-cont').append('<span>' + (res.data.prize) + '彩金</span>');
                                    } else {
                                        $('.qiu-cont').append('<span>' + text + '</span>');
                                    }
                                }
                                if (res.data.type == '2') {
                                    $('.qiu-cont').append('<span>' + res.data.prize + ' X 1</span>')
                                }
                            })
                        })
                    });
                }, 1250);
            }, 50)
        },
        check_scroll_end: function () {
            // var that = this;
            // that.xiuqiu_move();
            // var topValue = 0,// 上次滚动条到顶部的距离  
            //     interval = null;// 定时器  


            // document.onscroll = function(e) {  
            //     if(interval == null)// 未发起时，启动定时器，1秒1执行  
            //         interval = setInterval(test, 50);  
            //     topValue = document.documentElement.scrollTop;  
            // }  

            // function test() {  

            //     // 判断此刻到顶部的距离是否和1秒前的距离相等  
            //     if(document.documentElement.scrollTop == topValue) {  
            //         // alert("scroll bar is stopping!");  
            //         that.xiuqiu_move();
            //         clearInterval(interval);  
            //         interval = null;
            //     }  
            // } 
        },
        title_tip: function () {
            $('.swiper-pagination>span').eq(0).on('mouseover', function () {
                $('.tabIndex-1-tip').fadeIn();
            })
            $('.swiper-pagination>span').eq(0).on('mouseout', function () {
                $('.tabIndex-1-tip').fadeOut();
            })
            $('.swiper-pagination>span').eq(1).on('mouseover', function () {
                $('.tabIndex-2-tip').fadeIn();
            })
            $('.swiper-pagination>span').eq(1).on('mouseout', function () {
                $('.tabIndex-2-tip').fadeOut();
            })
            $('.swiper-pagination>span').eq(2).on('mouseover', function () {
                $('.tabIndex-3-tip').fadeIn();
            })
            $('.swiper-pagination>span').eq(2).on('mouseout', function () {
                $('.tabIndex-3-tip').fadeOut();
            })
        },
        // 切换鞭炮
        select_audio_img: function () {
            var that = this;
            $('.nians-right-ul').on('click', 'li', function () {
                if ($(this).hasClass('active')) {
                    $('.nians-right-ul>li').removeClass('active');
                    that.boom_id = 0;
                    that.boom_gif = '';
                    that.boom_audio = '';
                    $('.nians-type-img').attr('src', that.old_nians_type_img)
                    return;
                } else {
                    $('.nians-right-ul>li').removeClass('active');
                    $(this).addClass('active');
                }
                that.boom_id = $(this).attr('data-id');
                // 还原为未炸之前的gif

                $('.nians-img').attr('src', that.old_nian_gif);
                $('.bian-gif-wrap>img').attr('src', '');
                $('.bian-gif-wrap>img').css('display', 'none');

                if (that.boom_id === '1') {
                    that.boom_gif = 'type-1.gif';
                    that.boom_audio = 'type-1.mp3';
                    that.nians_type_img = 'icon-1.png';
                } else if (that.boom_id === '2' || that.boom_id === '3') {
                    that.boom_gif = 'type-2.gif';
                    that.boom_audio = 'type-2.mp3';
                    that.nians_type_img = 'icon-2.png';
                } else if (that.boom_id === '4' || that.boom_id === '5' || that.boom_id === '6') {
                    that.boom_gif = 'type-3.gif';
                    that.boom_audio = 'type-3.mp3';
                    that.nians_type_img = 'icon-3.png';
                } else if (that.boom_id === '7' || that.boom_id === '8') {
                    that.boom_gif = 'type-4.gif';
                    that.boom_audio = 'type-4.mp3';
                    that.nians_type_img = 'icon-4.png';
                } else if (that.boom_id === '9') {
                    that.boom_gif = 'type-5.gif'
                    that.boom_audio = 'type-5.mp3';
                    that.nians_type_img = 'icon-5.png';
                }
                $('.nians-type-img').attr('src', './img/' + that.nians_type_img);
            })
        },
        // 立即轰炸
        boom_shaka_laka: function () {
            var that = this;
            $('.now-boom').on('click', function () {
                if (!sessionStorage.getItem('userInfo')) {
                    Func.toast({
                        message: '请先登录',
                        time: 1500
                    })
                    return;
                }
                if (!that.is_click || that.boom_timer) {
                    return;
                }
                if (!that.boom_id) {
                    Func.toast({
                        message: '请选择鞭炮类型',
                        time: 1500
                    })
                    return;
                }

                clearTimeout(that.banner_bool_timer);
                that.is_click = false;

                that.play_fireworks(that.boom_id, function (res) {
                    var data = res.data;

                    // var shanghaizhi_num = 3 + parseInt(Math.random() * 11);
                    var shanghaizhi_num = data.injure.length;
                    $('.bian-gif-wrap>img').css('display', 'block');
                    $('.bian-gif-wrap>img').attr('src', './img/' + that.boom_gif)
                    $('.nians-img').attr('src', './img/nian-active.gif');

                    Func.music.close();
                    if (that.is_need_pay_audio) {
                        // 鞭炮声
                        $('#banner_audio').attr('src', '../common/media/' + that.boom_audio);
                        Func.music.open();
                        // 年兽声
                        $('#nians_audio').attr('src', '../common/media/hurt.mp3');
                        document.querySelector('#nians_audio').play();
                    }



                    setTimeout(function () {
                        for (var i = 0; i < shanghaizhi_num; i++) {
                            (function (i) {
                                setTimeout(function () {
                                    $('.bian-gif-wrap').append('<span style="left:' + (20 + parseInt(Math.random() * 50)) + '%;top: ' + (30 + Number(parseInt(Math.random() * 30))) + '%;animation: shanghaizhi ' + 1 + 's ease-in forwards;">-' + data.injure[i] + '</span>')
                                }, i * 200)
                            })(i)
                        }

                        // 还原为未炸之前的gif
                        that.boom_timer = setTimeout(function () {
                            $('.nians-img').attr('src', that.old_nian_gif);
                            $('.bian-gif-wrap>img').attr('src', '');
                            $('.bian-gif-wrap>img').css('display', 'none');
                            Func.music.close();
                            document.querySelector('#nians_audio').pause();
                            // 年兽受伤声音
                            // $('#nians_audio').attr('src', '../common/media/hurt.mp3');

                            // Func.music.open();
                            // setTimeout(function(){
                            //     Func.music.close();
                            // },1900)

                            // 还原烟花声
                            if (that.is_need_pay_audio && sessionStorage.getItem('is_mobile') !== 'yes') {
                                that.banner_bool_timer = setTimeout(function () {
                                    $('#banner_audio').attr('src', that.old_audio);
                                    Func.music.open();
                                }, shanghaizhi_num * 200 + 500 + 2500)
                            }


                            that.is_click = true;
                            if ($('.bian-gif-wrap>span').eq(0)) {
                                $('.bian-gif-wrap>span').remove();
                            }

                            clearTimeout(that.boom_timer);
                            that.boom_timer = null;
                        }, shanghaizhi_num * 200 + 500)

                    }, 300)

                    $('.self-sort').text(data.sort);
                    $('.self-shanghai').text(data.injure_total);
                    that.getuserfireworks();
                })

            })
        },
        // 奖池
        money_count: function (money_number) {
            var options = {
                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.',
            };

            var numAnim = new CountUp('jiangchi', parseInt(money_number - 200), money_number, 0, 2.5, options);
            if (!numAnim.error) {
                numAnim.start();
            } else {
                //   console.log(numAnim.error);
            }
        },
        // 是否需要撒金币
        is_sa_coin: function () {
            var that = this;
            that.sa_coin();
            var hiddenProperty = 'hidden' in document ? 'hidden' : 'webkitHidden' in document ? 'webkitHidden' : 'mozHidden' in document ? 'mozHidden' : null;
            var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');

            var onVisibilityChange = function () {
                if (!document[hiddenProperty]) {
                    clearInterval(that.sa_bi_timer);
                    that.sa_coin();
                } else {
                    clearInterval(that.sa_bi_timer);
                }
            }
            document.addEventListener(visibilityChangeEvent, onVisibilityChange);
        },
        // 撒金币
        sa_coin: function () {
            var that = this;
            init();
            new Coin();
            that.sa_bi_timer = setInterval(function () {
                new Coin();
            }, 5000);
            var SHAKE_THRESHOLD = 400;
            var last_update = 0;
            var index = 0;
            var x = y = z = last_x = last_y = last_z = 0;
            var w_curTime = 0;

            function init() {
                if (window.DeviceMotionEvent) {
                    window.addEventListener('devicemotion', deviceMotionHandler, false);
                } else {
                    alert('not support mobile event');
                }
            }

            function deviceMotionHandler(eventData) {
                var acceleration = eventData.accelerationIncludingGravity;
                var curTime = new Date().getTime();
                if ((curTime - last_update) > 100) {
                    var diffTime = curTime - last_update;
                    last_update = curTime;
                    x = acceleration.x;
                    y = acceleration.y;
                    z = acceleration.z;
                    var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
                    var delta = Math.abs(x + y + z - last_x - last_y - last_z);
                    if (speed > SHAKE_THRESHOLD) {
                        if ((curTime - w_curTime) > 2000) {
                            w_curTime != 0 && new Coin({
                                density: Math.round(delta)
                            });
                            w_curTime = curTime;
                        }
                    }
                    last_x = x;
                    last_y = y;
                    last_z = z;
                }
            }
        },
        // 放烟花
        play_fireworks: function (id, fn) {
            var that = this;
            Api.play_fireworks({
                _token: Func.get_token(),
                fid: id
            }, function (res) {
                if (!res) {
                    Func.toast({
                        message: '未获得数据',
                        time: 1500
                    })
                }
                var data = JSON.parse(res);
                if (data.code === Api.code) {
                    console.log(data);
                    fn && fn(data);
                } else {
                    Func.toast({
                        message: data.msg,
                        time: 1500
                    })
                    that.is_click = true;
                }

            }, function (err) {
                console.log(err)
            })
        },
        // 排行榜
        leaderboard: function () {
            // var str_list = sessionStorage.getItem('pai_list');
            if (false) {
                var data = JSON.parse(str_list);
                var res_str = '';
                data.forEach(function (ele, i) {
                    res_str += '<li><span>' + ele.sort + '</span><span>' + ele.account + '</span><span>' + ele.injure + '</span></li>'
                })
                $('.jinz-right-ul').html(res_str);
                return;
            }
            Api.leaderboard({}, function (res) {
                var data = JSON.parse(res);
                if (data.code === Api.code) {
                    // sessionStorage.setItem('pai_list', JSON.stringify(data.data));
                    var str = '';
                    data.data.forEach(function (ele, i) {
                        str += '<li><span>' + ele.sort + '</span><span>' + ele.account + '</span><span>' + ele.injure + '</span></li>'
                    })
                    $('.jinz-right-ul').html(str);
                } else {
                    Func.toast({
                        message: data.msg,
                        time: 1500
                    })
                }
            }, function (err) {
                console.log(err);
            })
        },
        // 彩池总彩金
        pool_money: function () {
            var that = this;
            Api.pool_money({}, function (res) {
                var data = JSON.parse(res);
                if (data.code === Api.code) {
                    var money_num = data.data.amount;
                    that.money_count(money_num);
                } else {
                    Func.toast({
                        message: data.msg
                    })
                }
            }, function (err) {
                console.log(err)
            })
        },
        // 登录前签到列表
        init_signlist: function () {
            Api.init_signlist({},
                function (res) {
                    var data = JSON.parse(res);
                    if (data.code === Api.code) {
                        data = data.data.res;
                        var str = '';
                        data.forEach(function (ele, i) {
                            str += '<li><div></div><p>' + ele.date + '</p></li>'
                        })
                        $('.qiandao-cont').html(str);
                    } else {
                        Func.toast({
                            message: data.msg,
                            time: 1500
                        })
                    }
                },
                function (err) {
                    console.log(err)
                })
        },
        // 登录后获取签到列表
        signlist: function () {
            Api.signlist({
                _token: Func.get_token()
            }, function (res) {
                var data = JSON.parse(res);
                if (data.code === Api.code) {
                    var str = ''
                    data.data.res.forEach(function (ele, i) {
                        if (ele.sign) {
                            str += '<li><div data-date="' + ele.date + '" class="active"></div><p>' + ele.realdate + '</p></li>'
                        } else {
                            str += '<li><div data-date="' + ele.date + '"></div><p>' + ele.realdate + '</p></li>'
                        }
                    })
                    $('.qiandao-cont').html(str);
                } else {
                    Func.toast({
                        message: data.msg,
                        time: 1500
                    })
                }
            }, function (err) {
                console.log(err)
            })
        },
        // 登录
        login: function (params, fn) {
            Api.login(params, function (res) {
                var data = JSON.parse(res);
                if (data.code === Api.code) {
                    Func.toast({
                        message: '登录成功！',
                        time: 1500
                    })
                    fn && fn(data);
                } else {
                    Func.toast({
                        message: data.msg,
                        time: 1500
                    })
                }
                Func.loading.close()
            }, function (err) {
                console.log(err)
            })
        },
        // 签到
        sign: function (params) {
            var that = this;
            Api.sign(params, function (res) {
                var data = JSON.parse(res);
                if (data.code === Api.code) {
                    Func.toast({
                        message: '恭喜您获得一枚大龙炮',
                        time: 1500
                    })
                    that.signlist();
                    that.getuserfireworks();
                    var obj = {
                        token: data.data.token,
                        is_sign : data.data.is_sign
                    }
                    Func.update_userInfo(obj);
                } else {
                    Func.toast({
                        message: data.msg,
                        time: 1500
                    })
                }
                Func.loading.close();
            }, function (err) {
                console.log(res);
                if (res.data.type == '1') {

                }
            })
        },
        // 领取存款奖励
        getdepositreward: function () {
            Func.loading.open();
            var that = this;
            Api.getdepositreward({
                _token: Func.get_token()
            }, function (res) {
                var data = JSON.parse(res);
                if (data.code === Api.code) {
                    var obj = {
                        depositData: {
                            fireworks_name: '',
                            hongbaoshu: 0
                        }
                    }
                    Func.update_userInfo(obj);
                    $('.fix-right-ul').html('<li>--<span> --</span></li><li>--<span> --</span></li>');
                    $('.ling-btn').hide();
                    if (sessionStorage.getItem('is_mobile') === 'yes') {
                        $('.fix-right-ul').hide();
                    }
                    $('.ling-info-inner-box-p1').html('红包彩金：<span class="ling-hb-cj">' + data.data.res.money + '</span>元');
                    $('.ling-info-inner-box-p2').html(data.data.res.name + '：<span class="ling-hb-cj">1</span>个');
                    $('.ling-info').fadeIn();
                    // <p class="ling-info-inner-box-p1"></p>
                    { /* <p class="ling-info-inner-box-p2"><img src="./img/xiuqiu.png" alt="">绣球彩金：<span class="ling-xq-cj">0</span>元</p> */ }
                } else {
                    Func.toast({
                        message: data.msg,
                        time: 1500
                    })
                }

                Func.loading.close();

                that.getuserfireworks();
            }, function (err) {
                console.log(err)
            })
        },
        // 获取所有烟花数
        getuserfireworks: function () {
            var that = this;
            Api.getuserfireworks({
                _token: Func.get_token()
            }, function (res) {
                var data = JSON.parse(res);
                var str = '';
                data.data.res.forEach(function (ele, i) {
                    if (ele.fid == that.boom_id) {
                        str += '<li data-id="' + ele.fid + '" class="active"><span>' + ele.name + '</span><i>' + ele.num + '<strong>枚</strong></i></li>';
                    } else {
                        str += '<li data-id="' + ele.fid + '"><span>' + ele.name + '</span><i>' + ele.num + '<strong>枚</strong></i></li>';
                    }

                    $('.nians-right-ul').html(str);
                })
            }, function (err) {
                console.log(err);
            })
        },
        // 绣球倒计时 请求地址：/hydrangea
        hydrangea_time: function () {
            var that = this;
            clearInterval(that.count_down_timer);
            Api.hydrangea({
                action: 'countdown'
            }, function (res) {
                var data = JSON.parse(res);
                if (data.msg === 'SUCCESS') {
                    
                    var sec = data.data.countdown;
                    that.count_down_timer = setInterval(function () {
                        sec--;

                        if (sec <= 0) {
                            sec = 0;
                            if (sessionStorage.getItem('userInfo') && JSON.parse(sessionStorage.getItem('userInfo')).is_sign == "0") {
                                Func.toast({
                                    message: '请签到后进行抢绣球活动！',
                                    time: 1500
                                })
                            }
                            $('.longs-time').text('活动正在进行中..');
                            clearInterval(that.count_down_timer);
                        } else {
                            var time = Func.SecondToDate(sec);
                            $('.longs-time').text(time);
                        }
                    }, 1000)
                } else if (data.code === 'AppErr403') {
                    $('.longs-time').text('活动已结束！');
                } else {
                    Func.toast({
                        message: data.msg,
                        time: 1500
                    })
                }
            }, function (err) {
                console.log(err);
            });
        },
        // 绣球心跳进程
        heartbeat: function () {
            var that = this;
            Api.hydrangea({
                action: 'heartbeat',
                _token: Func.get_token()
            }, function (res) {
                var data = JSON.parse(res);
                if (data.msg === 'SUCCESS') {
                    // 红包雨开始掉
                    if (data.status === 1) {
                        if (sessionStorage.getItem('userInfo') && JSON.parse(sessionStorage.getItem('userInfo')).is_sign == "0") {
                            return;
                        }
                        $('.get-info-inner').removeClass('active');
                        $('.fixed-qiu').fadeIn(function () {
                            $('.fixed-qiu').addClass('active');
                            $('body').addClass('active');
                            that.xiuqiu_move();
                        });
                    }
                    // 红包雨结束后
                    if (data.status === 3) {
                        $('.fixed-qiu').fadeOut(function () {
                            if (sessionStorage.getItem('userInfo') && JSON.parse(sessionStorage.getItem('userInfo')).is_sign == "0") {
                                return;
                            }
                            $('.fixed-qiu').removeClass('active');
                            clearTimeout(that.xiu_qiu_timer)
                            $('body>.qiu-left-1') && $('body>.qiu-left-1').remove();
                            $('body>.qiu-left-2') && $('body>.qiu-left-2').remove();
                            $('body>.qiu-left-3') && $('body>.qiu-left-3').remove();
                            $('body>.qiu-right-1') && $('body>.qiu-right-1').remove();
                            $('body>.qiu-right-2') && $('body>.qiu-right-2').remove();
                            $('body>.qiu-right-3') && $('body>.qiu-right-3').remove();

                            $('.get-info').fadeIn(function () {
                                $('.get-info-inner').addClass('active');
                            });
                            $('.da-long-count').text(data.data.count);
                            $('.da-long-money').text(data.data.money);
                            that.getuserfireworks();
                            that.hydrangea_time();
                            $('body').removeClass('active');
                        })
                        // clearInterval(that.heartbeat_timer);
                    }
                    if (data.status === 5) {
                        if (sessionStorage.getItem('userInfo') && JSON.parse(sessionStorage.getItem('userInfo')).is_sign == "0") {
                            that.hydrangea_time();
                            return;
                        }
                    }
                    if (data.status === 4) {
                        clearTimeout(that.xiu_qiu_timer);
                        $('body').removeClass('active');
                        $('body>.qiu-left-1') && $('body>.qiu-left-1').remove();
                        $('body>.qiu-left-2') && $('body>.qiu-left-2').remove();
                        $('body>.qiu-left-3') && $('body>.qiu-left-3').remove();
                        $('body>.qiu-right-1') && $('body>.qiu-right-1').remove();
                        $('body>.qiu-right-2') && $('body>.qiu-right-2').remove();
                        $('body>.qiu-right-3') && $('body>.qiu-right-3').remove();
                        $('.fixed-qiu').fadeOut(function () {
                            $('.fixed-qiu').removeClass('active');
                        })
                    }
                } else {
                    var need_toast_msg = sessionStorage.getItem('need_toast_msg');
                    if (!need_toast_msg) {
                        Func.toast({
                            message: data.msg,
                            time: 2500
                        })
                    }
                    sessionStorage.setItem('need_toast_msg', 'true');
                }
            }, function (err) {
                console.log(err);
            })
        },
        // 抢绣球 点绣球
        rob_hb: function (fn) {
            Api.hydrangea({
                _token: Func.get_token()
            }, function (res) {
                var data = JSON.parse(res);
                if (data.msg === 'SUCCESS') {
                    // console.log(data);
                    fn && fn(data)
                } else {
                    Func.toast({
                        message: data.msg,
                        time: 1500
                    })
                }
            }, function (err) {
                console.log(err);
            })
        },
        // 获取当前用户总彩金
        getusertotalmoney: function () {
            Api.getusertotalmoney({
                    _token: Func.get_token()
                },
                function (res) {
                    var data = JSON.parse(res);
                    if (Api.code === data.code) {
                        $('.self-hb-cj').text(data.data.hongbaomoney);
                        $('.self-xq-cj').text(data.data.hydrangeamoney);
                    }

                },
                function (err) {
                    console.log(err)
                })
        },
        deposit: function () {
            Api.deposit({
                    _token: Func.get_token()
                },
                function (res) {
                    var data = JSON.parse(res);
                    if (Api.code === data.code) {
                        if (Number(data.data.hongbaoshu) || data.data.fireworks_name) {
                            $('.fix-right-ul').html('<li>红包<span> X' + data.data.hongbaoshu + '</span></li><li>' + data.data.fireworks_name + '<span> X1</span></li>');
                            $('.ling-btn').show();
                            if (sessionStorage.getItem('is_mobile') === 'yes') {
                                $('.ling-btn').show();
                                $('.fix-right-ul').show();
                            }
                            if (!Number(data.data.hongbaoshu) && !data.data.fireworks_name) {
                                $('.fix-right-ul').html('<li>--<span> -- </span></li><li>--<span> -- </span></li>');
                                $('.ling-btn').hide();
                                if (sessionStorage.getItem('is_mobile') === 'yes') {
                                    $('.ling-btn').hide();
                                    $('.fix-right-ul').hide();
                                }
                            }
                        }
                    }
                },
                function (err) {
                console.log(err)
            })
        }

    }

    window.Index = Index;
    Index.init();

})