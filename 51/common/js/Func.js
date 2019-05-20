(function(window){
    var Func = {
        scroll_timer: null,
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
        // 倒计时
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
        },
        // 右边导航滚动
        fixed_move: function(id){
            $('.banner').addClass('active');
            var jb51 = document.getElementById(id);
            if(!jb51){ return }
            window.onscroll = window.onresize = function () {
                var scrtop = document.documentElement.scrollTop || document.body.scrollTop;
                // console.log(scrtop)
                if(scrtop > 150){
                    $('.fixed').fadeIn();
                }else{
                    $('.fixed').fadeOut();
                }
                // console.log(scrtop);
                if(!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
                    if(scrtop > 300 && scrtop < 1500){
                        $('.cont-list').addClass('active');
                    }
                    if(scrtop <= 300 || scrtop >= 1500){
                        $('.cont-list').removeClass('active');
                    }

                    if(scrtop >= 0 &&  scrtop <= 600){
                        $('.banner').addClass('active');
                    }
                    if(scrtop >  600){
                        $('.banner').removeClass('active');
                    }
                }
                if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
                    if(scrtop > 20 || scrtop < 900){
                        $('.cont-list').addClass('active');
                    }
                    if(scrtop <= 20 || scrtop >= 900){
                        $('.cont-list').removeClass('active');
                    }
                    if(scrtop >= 0 && scrtop < 290){
                        $('.banner').addClass('active');
                    }
                    if( scrtop > 290){
                        $('.banner').removeClass('active');
                    }
                }

               
                var height = document.documentElement.clientHeight || document.body.clientHeight;
                var top = scrtop + (height - jb51.offsetHeight) / 2;
                top = parseInt(top);
                startrun(jb51, top, "top")
            }
            // console.log(new Date());
            var timer = null
            function startrun(obj, target, direction) {
                clearInterval(timer);
                timer = setInterval(function () {
                    var speed = 0;
                    if (direction == "left") {
                        speed = (target - obj.offsetLeft) / 8;
                        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                        if (obj.offsetLeft == target) {
                            clearInterval(timer);
                        } else {
                            obj.style.left = obj.offsetLeft + speed + "px";
                        }
                    }
                    if (direction == "top") {
                        speed = (target - obj.offsetTop) / 8;
                        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                        if (obj.offsetTop == target) {
                            clearInterval(timer);
                        } else {
                            obj.style.top = obj.offsetTop + speed + "px";
                        }
                    }
                }, 30)
            }
        },

        // 回到顶部 
        go_top() {
            var self = this;
            this.scroll_timer = setInterval(function () {
                    var osTop = document.documentElement.scrollTop || document.body.scrollTop
                    var ispeed = Math.floor(-osTop / 5)
                    document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
                    if (osTop <= 0) {
                    clearInterval(self.scroll_timer)
                    self.scroll_timer = null;
                }
            }, 30);
        },
        // cookie
        cookie: {
            set: function (name, value, days) {
                var d = new Date;
                d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
                window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
            },
        
            get: function (name) {
            var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
                return v ? v[2] : null;
            },
        
            delete: function (name) {
                this.set(name, '', -1);
            },
            clear: function () {
                // var date = new Date();
                // date.setTime(date.getTime() - 10000);
                // var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
                // if (keys) {
                //   for (var i = keys.length; i--;)
                //     document.cookie = keys[i] + "=0; expire=" + date.toGMTString() + "; path=/";
                // }
                var cookies = document.cookie.split(";");
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i];
                    var eqPos = cookie.indexOf("=");
                    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                }
                if (cookies.length > 0) {
                    for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i];
                    var eqPos = cookie.indexOf("=");
                    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                    var domain = location.host.substr(location.host.indexOf('.'));
                    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" + domain;
                    }
                }
            },
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
                    document.body.removeChild(el);
                });
            }, params.time);
        },
        loading: {
            open : function(){
                var el = document.createElement("div");
                el.setAttribute("class", "loading");
                var img = document.createElement("img");
                img.setAttribute("src", "../common/img/loading-1.gif");
                el.appendChild(img)
                document.body.appendChild(el);
            },
            close: function(){
                var loading = document.querySelector('.loading');
                document.body.removeChild(loading);
            }
        },
        format_to_time : function (date){
            var dateee = new Date(date).toJSON();
            var time = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')  
            return time
        },
       format_to_timeSamp : function(date){
            const parts = date.match(/\d+/g);
            return new Date(parts[0]+'/'+parts[1]+'/'+parts[2]+' '+parts[3]+':'+parts[4]+':'+parts[5]).getTime();
        }
    }

    window.Func = Func;
})(window)