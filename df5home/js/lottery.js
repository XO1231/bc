var isClick = true;
var bCode = "";

// var arr_img = [{
//         prize_id: 1,
//         gif: 1,
//         prize_name: "66元现金筹码",
//     },

//     {
//         prize_id: 2,
//         gif: 2,
//         prize_name: "谢谢参与"
//     },
//     {
//         prize_id: 3,
//         gif: 3,
//         prize_name: "6元现金筹码"

//     },
//     {
//         prize_id: 4,
//         gif: 4,
//         prize_name: "26元现金筹码"
//     },
//     {
//         prize_id: 5,
//         gif: 5,
//         prize_name: "56元现金筹码"
//     },
//     {
//         prize_id: 6,
//         gif: 6,
//         prize_name: "IPhone X 256国行"
//     },
//     {
//         prize_id: 7,
//         gif: 7,
//         prize_name: "1元现金筹码"
//     },
//     {
//         prize_id: 8,
//         gif: 8,
//         prize_name: "366元现金筹码"
//     },
//     {
//         prize_id: 9,
//         gif: 9,
//         prize_name: '166元现金筹码'
//     },
//     {
//         prize_id: 10,
//         gif: 10,
//         prize_name: '存100送20'
//     },
// ]

// ios12以上输入框错位问题
ios_open_input = function () {
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

ios_close_input = function () {
    $("html,body").css({
        "width": "auto",
        "height": "auto",
        "overflow": "auto",
        "position": "static"
    })
    $("body").scrollTop(this.H);
}

// 控制弹窗
var LostBox = {
    "open": function (prarent_class, son_class) {
        $(prarent_class).fadeIn(function () {
            $(son_class).css({
                'transform': 'scale(1,1)',
                "opacity": 1
            }, 100);

            if (prarent_class === '.login-wrap') {
                ios_open_input();
            }


        })
    },
    "close": function (prarent_class, son_class) {
        $(prarent_class).fadeOut(function () {
            $(son_class).css({
                'transform': 'scale(0,0)',
                "opacity": 0
            }, 100)
            if (prarent_class === '.login-wrap') {
                ios_close_input();
            }
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
            url: api_obj.api_url + api_obj.auth_login,
            data: {
                'username': username,
                'password': password,
                'action': 'login'
            },
            type: 'post',
            dataType: 'json',
            success: function (data) {
                var flag = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
                if (!flag) {
                    if (data.code == 0) {
                        layer.msg(data.msg, {
                            icon: 1,
                            time: 3000
                        });
                        sessionStorage.setItem('username', data.data.username);
                        sessionStorage.setItem('betCount', data.data.times);
                        // sessionStorage.setItem('token', data.data._token);
                        api_obj.set_token(data.data.token);
                        loginState();
                        loading.close();
                        if ($('.login-wrap')) {
                            $('.login-wrap').fadeOut();
                            ios_close_input();
                        } 
                    } else {
                        layer.msg(data.msg, {
                            icon: 5,
                            time: 1800
                        });
                        loading.close();
                    }

                }else {
                    if(data.code == 0) {
                        layer.msg(data.msg, {
                            icon: 1,
                            time: 3000
                        });
                        sessionStorage.setItem('username', data.data.username);
                        sessionStorage.setItem('betCount', data.data.times);
                        sessionStorage.setItem('_token', data.data.token);
                        m_loginState();
                        loading.close();
                        api_obj.set_token(data.data.token);
                        LostBox.close('.login-wrap', '.login-inner');
                    }else{
                        layer.msg(data.msg, {
                            icon: 5,
                            time: 1800
                        });
                        loading.close();
                    }
                    
                }
            }
        })
    }, 10)
}

function queryBonus(per_page) {
    per_page = per_page || 0
    var token = api_obj.get_token();
    if(!token){
        layer.msg('请先登录！', {
            icon: 5,
            time: 1800
        });
        $('.username').focus();
        return;
    }
   
    $('.search-table-2').empty();
    
    $.ajax({
        url: api_obj.api_url + api_obj.game_log,
        type: 'get',
        data: {
            per_page: per_page,
            _token: api_obj.get_token
        },
        dataType: 'json',
        success: function (data) {

            var list = data.data.log;
            var str = '<tbody>';

            list.forEach(function (ele) {
                str += '<tr><td>' + ele.addtime + '</td> <td>' + ele.name + '</td> <td>' + (ele.status == "0" ? '未派发' : '已派发') + '</td></tr>'
            })
            str += '</tbody>'
            $('.search-table-2').html(str);
            $('.fenye-box').html(data.data.page);
        },
        error: function (err) {
            if (err.msg) {
                alert(err.msg)
            }
        }
    })
    LostBox.open('.search-wrap', '.search-inner');
    var username = sessionStorage.getItem('username');
    // document.getElementById('history').src = 'history.php?account=' + username;
}

$(function () {
    $('.fenye-box').on('click', 'a', function (e) {
        e.preventDefault();
        var str = $(e.target).attr('href');
        if (str.indexOf('?') > 0) {
            var arr = str.split('?');
            var arr_1 = arr[1].split('=')
            var page = arr_1[1];
        } else {
            page = 1;
        }
        console.log(page);
        queryBonus(page)
    })
})


// 登录状态栏;
function loginState() {
    var username = sessionStorage.getItem('username');
    var betCount = sessionStorage.getItem('betCount');
    if (username) {
        $('.show-username').text(username);
        $('.show-username-count').text(betCount);

        $('.main-login-inner').hide();
        $('.after-login-box').show();
        $('.after-login-box').css("display", "flex");

    } else {
        $('.main-login-inner').show();
        $('.main-login-inner').find('input').val('');
        $('.after-login-box').hide();
        $('.main-login-inner').css("display", "flex");
    }
}


function m_loginState(){

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

// 退出登录
function loginOut() {
    loading.open();
    sessionStorage.clear();
    loginState();
    loading.close();
}

function startGame(obj, fn) {

    obj.angle = -((obj.gif - 1) * 36);

    rotateFunc(obj, function (obj) {
        fn && fn(obj);
        isClick = true;
    });
}

// 验证登录
function checklogin() {
    var username = sessionStorage.getItem('username');
    var betCount = sessionStorage.getItem('betCount');
    var date = sessionStorage.getItem('date');
    var _token = sessionStorage.getItem('_token');

    if (!isClick) {
        return;
    }

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
   
    isClick = false;

    $.ajax({
        url: api_obj.api_url + api_obj.game_play,
        type: 'post',
        data: {
            _token: api_obj.get_token()
        },
        dataType: 'json',
        success: function (data) {

            var arr_img = JSON.parse(sessionStorage.getItem('arr_img'));

            for(var  i = 0 ; i < arr_img.length; i++){
                arr_img[i].gif = Number(arr_img[i].code ) % 1000; 
            }
            if (data.code == 0) {
                var random = (Number(data.data.bonus.code) % 1000) - 1;
                    startGame(arr_img[random], function (obj) {
                        // console.log(obj)
                        $('.tcwin-inner>h4').remove();
                        // var arr_img = JSON.parse(sessionStorage.getItem('arr_img'));
                        var src_img = arr_img[random].scroll_img;
    
                        $('.tcwin-inner-img-box>img').attr('src', src_img);
    
                        if (obj.name == '谢谢参与') {
                            LostBox.open('.tclost-wrap', '.tclost');
                        } else {
                            $('.tcwin-inner>p').text('恭喜中奖!')
                            $('.tcwin-inner').append('<h4>获得 <span style="color:yellow;">' + data.data.bonus.detail + '</span></h4>')
                            $('.tcwin-wrap').fadeIn();
                        }
    
                        var count = sessionStorage.getItem('betCount') - 1;
                        $(".show-username-count").text(count);
                        sessionStorage.setItem('betCount', count);
                    });
                (data);
            } else {
                alert(data.msg);
            }
        },
        error: function (err) {
            if (err) {
                layer.msg(err.msg, {
                    icon: 5,
                    time: 1800
                });
            }
        }
    })
}

// 倒计时
function showTimeBox(date) {
    if (!date) {
        // layer.msg('时间不合法！', {
        //     icon: 0,
        //     time: 1800
        // });
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
