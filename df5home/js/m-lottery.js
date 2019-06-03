// 控制弹窗
var LostBox = {
    "open": function (prarent_class, son_class) {
        $(prarent_class).fadeIn(function () {
            $(son_class).css({
                'transform': 'scale(1,1)',
                "opacity": 1
            }, 100)
        })
    },
    "close": function (prarent_class, son_class) {
        $(prarent_class).fadeOut(function () {
            $(son_class).css({
                'transform': 'scale(0,0)',
                "opacity": 0
            }, 100)
        })
    }
}

// 控制loading

var loading = {

    "open": function () {
        $('.loading-wrap').show()
    },

    "close": function () {
        $('.loading-wrap').hide()
    }

}
// 验证登录
function checklogin() {
    var username = sessionStorage.getItem('username');
    var betCount = sessionStorage.getItem('betCount');
    var date = sessionStorage.getItem('date');
    var _token = sessionStorage.getItem('_token');
    if (!username) {
        layer.msg('请先登录！', {
            icon: 5,
            time: 1800
        });
        $('.username').focus();
        return;
    }
    if (betCount <= 0) {
        layer.msg('您今天的奖品已抽完，或者您尚未达到活动条件，如有疑问请与客服联系，谢谢', {
            icon: 5,
            time: 6000
        });
        return;
    }

    if (date > 0) {
        showTimeBox(sessionStorage.getItem('date'));
        return false;
    }

    // 开始抢红包
    $.ajax({
        url: 'index.php',
        type: 'post',
        data: { username: username, _token: _token, action: 'play' },
        dataType: 'json',
        success: function (data) {
            if (data.result == 'failed') {
                layer.msg(data.msg, {
                    icon: 5,
                    time: 2000
                });
            } else {
                layer.closeAll();
                $(".wintext").html("");
                rotateFunc(data.data);
                isClick = false;

                var count = sessionStorage.getItem('betCount') - 1;
                $(".show-username-count").text(count);
                sessionStorage.setItem('betCount', count);
            }
        }
    })
}


// 开始登录
function loginSite() {

    var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;


    var username = $('.username').val();
    var password = $('.password').val();

    if (!username) {
        layer.msg('用户名不能为空！', {
            icon: 5,
            time: 1800
        });
        return;
    }

    if (username.length < 4 || username.length > 16) {
        layer.msg('请输入4到16位的用户名！', {
            icon: 5,
            time: 1800
        });
        return;
    }

    if (!uPattern.test(username)) {
        layer.msg('请输入合法的用户名', {
            icon: 5,
            time: 1800
        });
        return;
    }

    if (!password) {
        layer.msg('密码不能为空！', {
            icon: 5,
            time: 1800
        });
        return;
    }
    if (password.length < 6) {
        layer.msg('密码长度至少为6位！', {
            icon: 5,
            time: 1800
        });
        return;
    }
    loading.open();
    setTimeout(function () {
        $.ajax({
            url: 'index.php',
            data: { 'username': username, 'password': password, 'action': 'login' },
            type: 'post',
            dataType: 'json',
            success: function (data) {
                if (data.result == 'failed') {
                    layer.msg(data.msg, {
                        icon: 5,
                        time: 1800
                    });
                    loading.close();
                } else {
                    layer.msg(data.msg, {
                        icon: 1,
                        time: 3000
                    });
                    sessionStorage.setItem('username', data.data.username);
                    sessionStorage.setItem('betCount', data.data.times);
                    sessionStorage.setItem('_token', data.data._token);
                    loginState();
                    loading.close();
                    LostBox.close('.login-wrap', '.login-inner');
                }
            }
        })
    }, 10)

}


function loginState(){

    var username = sessionStorage.getItem('username');
    var betCount = sessionStorage.getItem('betCount');
    if (username) {
        $('.show-username').text(username);
        $('.show-username-count').text(betCount);
        
        $('.login-before-box').hide();
        $('.login-fater-box').show();

    } else {
        $('.login-before-box').show();
        $('.login-fater-box').hide();
    }
}

// 更多
function showMore(str, obj){
    console.log(str)
    if(str == '更多>>'){
      
        $(obj).text('<<收缩')
    }

    if(str == '<<收缩'){
       
        $(obj).text('更多>>')
    }
    
    $('.need-toggle-li').fadeToggle(200);
}

// 登录后开始
function startGame(obj) {
    console.log(obj);
    // 两个状态，中或没中
    var arr = ['9', '10'];
    var num = parseInt(Math.random() * 2);

    obj.stat = arr[num];

    switch (obj.stat) {
        case '-1':
            layer.msg('您输入的信息不能为空', {
                icon: 5,
                time: 1800
            });

        case '-2':
            layer.msg('您的帐号无法参与!', {
                icon: 5,
                time: 1800
            });

        case '-3':
            layer.msg('您的帐号次数已经用完!', {
                icon: 5,
                time: 1800
            });

        case '-4':

            layer.msg('当前时段未开启大转盘', {
                icon: 5,
                time: 1800
            });

        case '0':
            layer.msg('当前状态码是0', {
                icon: 5,
                time: 1800
            });
        case '9':
            layer.closeAll();

            $(".wintext").html("");

            var prize_name = obj.prize_name;
            var prize_id = obj.prize_id;
            var angle = -(prize_id * 36);

            console.log(angle);
            rotateFunc(prize_id, angle, prize_name, obj.stat);
            isClick = false;

            // checkUser();
            break;
        case '10':
            layer.closeAll();
            $(".wintext").html("");

            var msg = obj.desc;
            var prize_name = obj.prize_name;
            var prize_id = obj.prize_id;
            var angle = -36

            rotateFunc(prize_id, angle, +msg, obj.stat);
            isClick = false;
            break;


        default:
            layer.msg(obj.msg, {
                icon: 5,
                time: 1800
            });
            break;
    }

}

// 倒计时
function showTimeBox(date) {
    if (!date) {
        layer.msg('时间不合法！', {
            icon: 0,
            time: 1800
        });
        return
    }

    setInterval(function () {
        date--;
        sessionStorage.setItem('date', date);
        formatSeconds(date, setTime);
    }, 1000)

    setTimeout(function () {
        if (date > 0) {
            LostBox.open('.time-wrap', '.time-inner')
            return true;
        } else {
            LostBox.close('.time-wrap', '.time-inner')
            return false;
        }

    }, 1000)

}

function formatSeconds(value, fn) {
    var secondTime = parseInt(value);
    var minuteTime = 0;
    var hourTime = 0;
    if (secondTime > 60) {
        minuteTime = parseInt(secondTime / 60);
        secondTime = parseInt(secondTime % 60);
        if (minuteTime > 60) {
            hourTime = parseInt(minuteTime / 60);
            minuteTime = parseInt(minuteTime % 60);
        }
    }

    secondTime = checkTime(secondTime);
    minuteTime = checkTime(minuteTime);
    hourTime = checkTime(hourTime);
    var obj = {
        secondTime: secondTime,
        minuteTime: minuteTime,
        hourTime: hourTime
    };
    fn && fn(obj);
}

function checkTime(i) { //将0-9的数字前面加上0，例1变为01 
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function setTime(obj) {
    $('.hours').text(obj.hourTime);
    $('.minutes').text(obj.minuteTime);
    $('.seconds').text(obj.secondTime);
}

