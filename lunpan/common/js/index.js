$(function () {
    var func = new Func();

    var all_obj = [{
            prize_id: 1,
            gif: 1,
            prize_name: "Iphone XSMAX",
        },

        {
            prize_id: 2,
            gif: 2,
            prize_name: "6元现金筹码"
        },
        {
            prize_id: 3,
            gif: 3,
            prize_name: "66元现金筹码"

        },
        {
            prize_id: 4,
            gif: 4,
            prize_name: "56元现金筹码"
        },
        {
            prize_id: 5,
            gif: 5,
            prize_name: "谢谢参与"
        },
        {
            prize_id: 6,
            gif: 6,
            prize_name: "366元现金筹码"
        },
        {
            prize_id: 7,
            gif: 7,
            prize_name: "1元现金筹码"
        },
        {
            prize_id: 8,
            gif: 8,
            prize_name: "26元现金筹码"
        },
        {
            prize_id: 9,
            gif: 9,
            prize_name: '存100送20'
        },
        {
            prize_id: 10,
            gif: 10,
            prize_name: '166元现金筹码'
        },
    ]

    // 抽奖
    $('.lottle-cont-btn').on('click', function () {
        $('.lottle-cont-light').fadeOut(80);
        var random = parseInt(Math.random() * all_obj.length);
        func.startGame(all_obj[random], function (obj) {
            $('.popup-have-inner>p').remove();
            var src_img = func.arr_img[obj.gif - 1];
            $('.lottle-cont-light').fadeIn(80);
            $('.popup-have-img-box>img').attr('src', '/pc/images' + src_img);
            if (obj.gif == 5) {
                $('.popup-have-inner>h4').text('谢谢参与！')
            } else {
                $('.popup-have-inner>h4').text('恭喜您!')
                $('.popup-have-inner').append('<p>获得<span>' + obj.prize_name + '</span></p>')
            }
            $('.popup-have').fadeIn();

        });
    })

    $('.close-popup-have').on('click', function () {
        $('.popup-have').fadeOut();
    })

    $(".lottle-his-wrap").slide({
        mainCell: ".bd ul",
        autoPlay: true,
        effect: "topMarquee",
        vis: 9,
        interTime: 50,
        trigger: "mouseover"
    });

    $('.login-btn').on('click', function (e) {
        e.preventDefault();
        $('.login-wrap').fadeIn();
    })

    $('.close-login-wrap').on('click', function () {
        $('.login-wrap').fadeOut();
    })

    $('.close-search-wrap').on('click', function () {
        $('.search-wrap').fadeOut();
    })
    $('.top-search-btn').on('click', function (e) {
        e.preventDefault();
        $('.search-wrap').fadeIn();
    })



    $('.sure-login-btn').on('click',function(){
        var flag = func.check_input();
        if(!flag){ return }
        $('.login-wrap').hide();
        $('.login-box').hide();
        $('.login-btn').hide();
        $('.login-after').show();
    })
    $('.login-after').on('click',function(){
        $('.personnal-center').fadeIn();
    })
    // 关闭个人中心
    $('.close-personnal-inner').on('click',function(){
        $('.personnal-center').fadeOut();
    })
    // 退出登录
    $('.login-out').on('click',function(){
        sessionStorage.clear();
        $('.personnal-center').fadeOut();
        $('.login-box').show();
        $('.login-btn').show();
        $('.login-after').hide();
        window.location.reload();
    })

})