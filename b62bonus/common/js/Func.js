(function (window, $) {

    function Func() {
        var that = this;
        this.clear_interval_time = 1.95 * 60 * 60 * 1000;
        var that = this;
        that.go_maodian_flag = false;
        this.init = function () {
            that.scrolltotop.init();
            that.check_user_session();
            that.go_maodian();
            setInterval(function(){
                sessionStorage.clear();
            },that.clear_interval_time)
        }
    }

    Func.prototype.data = {
        _token : '',
        total_libao_number: 0,
        change_libao_number: 0,
        current_score : 0,
        total_score : 500,
        total_yuebing : 0
    }

    Func.prototype.loading = function (parent, child, flag) {
        flag = flag || 'open'
        if (flag === 'close') {
            $(parent).hide();
            $(child).hide();
        }
        if (flag === 'open') {
            $(parent).show();
            $(child).show();
        }
    }

    Func.prototype.check_login = function (idUser, idPass) {
        var username = $(idUser).val();
        var password = $(idPass).val();
        if (!username) {
            alert('请输入用户名');
            return false;
        }
        if (!password) {
            alert('请输入密码');
            return false;
        }
        return {username: username, password: password};
    }

    Func.prototype.click_login = function (idUser, idPass, fn) {
        var obj = this.check_login(idUser, idPass);
        if (!obj) {
            return
        };
        fn && fn(obj);
    }
    Func.prototype.login_after = function (username) {
        if (!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
            $('.login-before').hide();
            $('.login-after').show();
        }else{
            $('.ready-login').hide();
            $('.personal-center').text(username);
            $('.personal-center').show();
        }
       

    }

    Func.prototype.show_tanc = function (parent, child, fn) {
        $(parent).fadeIn();
        $(parent + '>div').fadeOut();
        $(child).fadeIn();
        fn && fn();
    }

    Func.prototype.hide_tanc = function (parent, fn) {
        $(parent).fadeOut();
        $(parent + '>div').fadeOut();
        fn && fn()
    }

    Func.prototype.show_libao_number = function () {
        // $('.curr-libao-number').text(this.data.curr_libao_number);
        $('.total-libao-number').text(this.data.total_libao_number);
        $('.change-libao-number').val(this.data.change_libao_number);
    }

    Func.prototype.remove_toast = function () {
        var timer = setTimeout(function () {
            clearTimeout(timer);
            $('.toast-inner').removeClass('active');
            $('.fixed-wrap, .toast-inner').fadeOut();
        }, 2000)

        // $('.fixed-wrap').on('click',function(){
        //     $('.toast-inner').removeClass('active');
        //     $('.fixed-wrap').hide();
        //     clearTimeout(timer);
        // })
    }

    Func.prototype.toast = function (str) {
        if (str) {
            $('.toast-inner>p').text(str);
        }
        $('.fixed-wrap, .toast-inner').fadeIn();
        $('.toast-inner').addClass('active');
        this.remove_toast();
    }

    Func.prototype.score_toast = function (str) {
        if (str) {
            $('.score-toast-inner>p').text(str);
        }
        $('.score-toast, .score-toast-inner').fadeIn();
        $('.score-toast-inner').addClass('active');
        this.remove_score_toast();
    }
    Func.prototype.remove_score_toast= function () {
        var timer = setTimeout(function () {
            clearTimeout(timer);
            $('.score-toast-inner').removeClass('active');
            $('.score-toast,.score-toast-inner').fadeOut();
        }, 2000)

        // $('.fixed-wrap').on('click',function(){
        //     $('.toast-inner').removeClass('active');
        //     $('.fixed-wrap').hide();
        //     clearTimeout(timer);
        // })
    }

    Func.prototype.get_token = function(){
        var user = sessionStorage.getItem('user');
        if(!user){
            this.score_toast('请重新登录！');
        }
        var token = JSON.parse(user).token;
        return token;
    }

    Func.prototype.save_user_session = function (user_obj) {
        if (!user_obj) {
            return
        }
        this.data.token = user_obj.token;
        sessionStorage.setItem('user', JSON.stringify(user_obj));
        return user_obj;
    }

    Func.prototype.check_user_session = function () {
        var user = JSON.parse(sessionStorage.getItem('user'))
        if (!user) {
            return false;
        }
        var username = user.username;
        $('.login-after-jifen').text(user.userinfo.integration)
        $('.login-after-libao').text(user.userinfo.package)
        $('.my-jifen-total').text(user.userinfo.integration);
        // $('.login-after-yuebing').text(user.userinfo.yuebing)
        this.login_after(username);
        // $('.maodian-img-wrap').empty();
        // $('.maodian-img-wrap').qrcode(user.userinfo.code);
        $('.free-get-left-inner').empty();
        if(user.userinfo.code){
            $('.free-get-left-inner').qrcode(user.userinfo.code);
        }
        
        $('#target_text').text(user.userinfo.code);

        this.data.total_libao_number = user.userinfo.package;
        this.data.total_score = user.userinfo.integration;
        this.show_libao_number();
        if(user.package_cake){
            var num = 0;
            for(var k in user.package_cake){
                num += Number(user.package_cake[k]['total']);
            }
            $('.login-after-yuebing').text(num);
            sessionStorage.setItem('user',JSON.stringify(user));
            this.data.total_yuebing = num;
        }
        this.define_can_dui();
        return true;
    }
    Func.prototype.is_login = function () {
        var flag = this.check_user_session();
        if (!flag) {
            this.score_toast('请先登录！');
            return false;
        }
        return true;
    }

    Func.prototype.get_token = function(){
        var user = JSON.parse(sessionStorage.getItem('user'));
        if(user){return user.token}
    }
    Func.prototype.scrolltotop = {
        setting: {
            startline: 100, //起始行
            scrollto: 0, //滚动到指定位置
            scrollduration: 400, //滚动过渡时间
            fadeduration: [500, 100] //淡出淡现消失
        },
        // controlHTML: '<img src="../../pc/img/go-top.png" style="width:54px; height:54px; border:0;" />', //返回顶部按钮
        controlHTML: ' <div class="main-go-top"><i></i></div>', //返回顶部按钮
        controlattrs: {
            offsetx: 30,
            offsety: 80
        }, //返回按钮固定位置
        anchorkeyword: "#top",
        state: {
            isvisible: false,
            shouldvisible: false
        },
        scrollup: function () {
            if (!this.cssfixedsupport) {
                this.$control.css({
                    opacity: 0
                });
            }
            var dest = isNaN(this.setting.scrollto) ? this.setting.scrollto : parseInt(this.setting.scrollto);
            if (typeof dest == "string" && jQuery("#" + dest).length == 1) {
                dest = jQuery("#" + dest).offset().top;
            } else {
                dest = 0;
            }
            this.$body.animate({
                scrollTop: dest
            }, this.setting.scrollduration);
        },
        keepfixed: function () {
            var $window = jQuery(window);
            var controlx = $window.scrollLeft() + $window.width() - this.$control.width() - this.controlattrs.offsetx;
            var controly = $window.scrollTop() + $window.height() - this.$control.height() - this.controlattrs.offsety;
            this.$control.css({
                left: controlx + "px",
                top: controly + "px"
            });
        },
        togglecontrol: function () {
            var scrolltop = jQuery(window).scrollTop();
            if (!this.cssfixedsupport) {
                this.keepfixed();
            }
            this.state.shouldvisible = (scrolltop >= this.setting.startline) ? true : false;
            if (this.state.shouldvisible && !this.state.isvisible) {
                this.$control.stop().animate({
                    opacity: 1
                }, this.setting.fadeduration[0]);
                this.state.isvisible = true;
            } else {
                if (this.state.shouldvisible == false && this.state.isvisible) {
                    this.$control.stop().animate({
                        opacity: 0
                    }, this.setting.fadeduration[1]);
                    this.state.isvisible = false;
                }
            }
        },
        init: function () {
            var that = this;
            jQuery(document).ready(function ($) {
                var mainobj = that;
                var iebrws = document.all;
                mainobj.cssfixedsupport = !iebrws || iebrws && document.compatMode == "CSS1Compat" && window.XMLHttpRequest;
                mainobj.$body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $("html") : $("body")) : $("html,body");
                mainobj.$control = $('<div id="topcontrol">' + mainobj.controlHTML + "</div>").css({
                    position: mainobj.cssfixedsupport ? "fixed" : "absolute",
                    bottom: mainobj.controlattrs.offsety,
                    right: mainobj.controlattrs.offsetx,
                    opacity: 0,
                    cursor: "pointer",
                    zIndex: 99
                }).attr({
                    title: "返回顶部"
                }).click(function () {
                    mainobj.scrollup();
                    return false;
                }).appendTo("body");
                if (document.all && !window.XMLHttpRequest && mainobj.$control.text() != "") {
                    mainobj.$control.css({
                        width: mainobj.$control.width()
                    });
                }
                mainobj.togglecontrol();
                $('a[href="' + mainobj.anchorkeyword + '"]').click(function () {
                    mainobj.scrollup();
                    return false;
                });

                $(window).bind("scroll resize", function (e) {
                    mainobj.togglecontrol();
                });
            });
        }
    };

    // 滚动锚点
    Func.prototype.go_maodian_frame = function (pos) {
        // this.go_maodian_flag = true;
        
        // var timer = null;
        // var speed = pos / 5;
        // clearInterval(timer);
        // timer = setInterval(function () {
        //     var i = 1;
        //     if (speed >= pos) {
        //         speed = pos;
        //         clearInterval(timer);
        //     }
        //     window.scrollTo(0, speed);
        //     window.onmousewheel = function () {
        //         clearInterval(timer);
        //     }
        //     speed += 100;
        //     i--;
        // }, 30);
    };
    Func.prototype.sure_scroll_active = function () {
        // if(!$('.md_cunkuan').offset()){
        //     return false;
        // }
        // var md_cunkun_top = $('.md_cunkuan').offset().top;
        // var md_shiwu_top = $('.md_shiwu').offset().top;
        // var md_jifen_top = $('.md_jifen').offset().top;
        // var top = $(window).scrollTop();
        // var that = this;
        // $('.go_md_cunkuan').on('click', function () {
        //     that.go_maodian_frame(md_cunkun_top);
        // })
        // $('.go_md_shiwu').on('click', function () {
        //     that.go_maodian_frame(md_shiwu_top);
        // })
        // $('.go_md_jifen').on('click', function () {
        //     that.go_maodian_frame(md_jifen_top);
        // })
        // if (top <= md_cunkun_top) {
        //     $('.main-maodian ul li').removeClass('active');
        //     $('.main-maodian ul li').eq(0).addClass('active');
        // } else if (top > md_cunkun_top && top <= md_shiwu_top) {
        //     $('.main-maodian ul li').removeClass('active');
        //     $('.main-maodian ul li').eq(1).addClass('active');
        // } else {
        //     $('.main-maodian ul li').removeClass('active');
        //     $('.main-maodian ul li').eq(2).addClass('active');
        // }
        // return true;
    }
    Func.prototype.go_maodian = function () {
        // var flag = this.sure_scroll_active();
        // if(!flag){ return }
        // var that = this;
        // $(window).on('scroll', function (e) {
        //     that.sure_scroll_active();
        // })
        var that = this;
        $(function(){
            if($('.main-maodian').length <= 0){ return }
            $('.main-maodian>ul').addClass('main-maodian-ul');
            that.LiftEffect({
                "control1": ".main-maodian", 						  //侧栏电梯的容器
                "control2": ".main-maodian-ul",                           //需要遍历的电梯的父元素
                "target": [".md_cunkuan",".md_shiwu",".md_jifen"], //监听的内容，注意一定要从小到大输入
                "current": "active" 						  //选中的样式
            });
        })
    
    }

    Func.prototype.shake = function(id, attr, endFn) {
        var obj = document.getElementById(id)
        var pos = parseInt(this.getStyle(obj, attr));
        var arr = []; // 20, -20, 18, -18 ..... 0
        var num = 0;

        for (var i = 20; i > 0; i -= 2) {
            arr.push(i, -i);
        }
        arr.push(0);

        clearInterval(obj.shake);
        obj.shake = setInterval(function () {
            obj.style[attr] = pos + arr[num] + 'px';
            num++;
            if (num === arr.length) {
                clearInterval(obj.shake);
                endFn && endFn();
            }
        }, 50);
    }

    Func.prototype.getStyle = function (obj, attr) {
        return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
    }

    Func.prototype.update_data  = function(name, value){
        var user= sessionStorage.getItem('user');
        if(!user){ return };
        user = JSON.parse(user);
        if(value <= 0){ value = 0}
        user.userinfo[name] = value;
        sessionStorage.setItem('user',JSON.stringify(user));
    }
    Func.prototype.define_can_dui = function(){

        var user_obj = sessionStorage.getItem('user');
        if(user_obj){ 
            user_obj = JSON.parse(user_obj);
            var gifts = user_obj.gifts;
            var $_lis = $('.picList li');
            for(var i = 0 ; i< $_lis.length; i++){
                $($_lis[i]).removeClass('can-dui');
            }
            // console.log(gifts);
            gifts.forEach(function(ele,i){
                // if(ele.id == ){}
                for(var i = 0 ; i< $_lis.length; i++){
                    var l_id = $($_lis[i]).attr('data-l-id');
                    if(l_id == ele.id){
                        $($_lis[i]).addClass('can-dui');
                    }
                }
            })
        }
        
    }
    Func.prototype.ios_open_input = function(){
        $("html,body").css({
            "width": "100%",
            "height": "100%",
            "overflow": "hidden", 
            "position": "fixed"
        })
       var H = $(window).scrollTop();
       this.H = H;
       $("body").scrollTop(H);
    }

    Func.prototype.ios_close_input = function(){
        $("html,body").css({
            "width": "auto",
            "height": "auto",
            "overflow": "auto", 
            "position": "static"
        })
        $("body").scrollTop(this.H);
    }
    Func.prototype.LiftEffect = function(json){
        var array=[];
        for(var i =0; i<json.target.length;i++){
            var t = $(json.target[i]).offset().top;
            array.push(t);
        
        }
        
        function Selected(index){
            $(json.control2).children().eq(index).addClass(json.current).siblings().removeClass(json.current);
        }
        
        $(window).on("scroll",Check);
        
        function Check(){
        
            var wst = $(window).scrollTop();
        
            
            if(wst >= $(json.target[0]).offset().top-100){
                $(json.control1).fadeIn(500);
            }else{
                $(json.control1).fadeOut(500);
            }
        
            var key =0;
            var flag = true;
            for(var i =0; i<array.length; i++){
                key++;
                if(flag){
        
                    if(wst >= array[array.length-key]-300){
                        var index = array.length-key;
                        flag = false;
                    }else{
                        flag=true;
                    }
                    
                }
            }
            Selected(index);
        }
        
        $(json.control2).children().on("click",function(){
                $(window).off("scroll");
                var index = $(this).index();
                Selected(index);
                var flag = true;
                for(var i =0; i<array.length; i++){
                    if(flag){
                        if(index == i){
                            $("html,body").stop().animate({
                                "scrollTop": array[i]-50
                            },500,function(){
                                $(window).on("scroll",Check);
                            });
                            flag = false;
                        }else{
                            flag=true;
                        }
                        
                    }
                }
                
        });
        
    }
    
    Func.prototype.trim  = function(str){ //删除左右两端的空格
　　     return str.replace(/(^\s*)|(\s*$)/g, "");
　　 }

    window.Func = Func;
})(window, $)