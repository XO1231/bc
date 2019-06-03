(function (window, $) {
    var Api =  {
        code : 0,
        api_url :  ( false ? 'http://www.doubleEggApi.com' :  Base.interface ) ,
        get : function (url, params, success, error) {
            // return new Promise(function(resolve,reject){
                var href = this.api_url + url + '?';
                for(var k in params){
                    href += k + '=' +  params[k] + '&';
                }
                href = href.substr(0,href.length-1);
                $.ajax({
                    url: href,
                    type: 'get',
                    // beforeSend: function (XMLHttpRequest) {
                    //     XMLHttpRequest.setRequestHeader("Authorization", token || '');
                    // },
                    success: function (data) {
                        // resolve(data);
                        success(data)
                    },
                    error: function (err) {
                        // reject(error)
                        error(err)
                    }
                });
        },
        post : function (url, params,  success,error_fn) {
            $.ajax({
                url: this.api_url + url,
                type: 'post',
                datatype: 'jsonp',
                data: params || '',
                // beforeSend: function (XMLHttpRequest) {
                //     XMLHttpRequest.setRequestHeader("Authorization", token || '');
                // },
                success: function (data) {
                    success(data);
                },
                error: function (err) {
                    error_fn(err)
                }
            });
        }
    }
    console.log(Api.api_url);
    // 登录 /auth/login
    Api.login = function(params, success, error){
        this.post('/auth/login', params, success, error);
    }
    // 中奖历史  /game/lunpan_history
    Api.lunpan_history =  function(params , success , error){
        this.get('/game/lunpan_history' , params , success ,error)
    }
    /// 中奖名单  /game/lunpan_log
    Api.lunpan_log =  function(params , success , error){
        this.get('/init/lunpan_log' , params , success ,error)
    }

    //签到 /sign/sign
    Api.sign = function(params, success, error){
        this.post('/sign/sign', params, success, error);
    }
    //未登录前 签到列表 /init/datelist
    Api.datelist = function(params, success, error){
        this.post('/init/datelist', params, success, error);
    }
    //登录后 签到列表 /auth/signlist
    Api.signlist = function(params, success, error){
        this.post('/sign/signlist', params, success, error);
    }
    // 许愿列表 /wish/wishlist
    Api.wishlist = function(params, success, error){
        this.post('/init/wishlist', params, success, error);
    }
    //许愿 /wish/makeawish
    Api.makeawish = function(params, success, error){
        this.post('/wish/makeawish', params, success, error);
    }
    //许愿点赞 /wish/like
    Api.wish_like = function(params, success, error){
        this.post('/wish/like', params, success, error);
    }
    //轮盘抽奖 /game/lunpan_play
    Api.lunpan_play = function(params, success, error){
        this.post('/game/lunpan_play', params, success, error);
    }
    //兑换高级轮盘  /game/lunpan_upgrade
    Api.lunpan_upgrade = function(params, success, error){
        this.post('/game/lunpan_upgrade', params, success, error);
    }
    // 红包雨
    // /5c176263f187c.php
    Api.hb_rain =  function(params, success, error){
        this.post('/5c176263f187c.php', params, success, error);
    }

    // 存款获取积分抽奖
    // /sign/getdepositreward
    Api.getdepositreward =  function(params, success, error){
        this.post('/sign/getdepositreward', params, success, error);
    }
    // 重新获取当前用户的全部抽奖次数
    // /sign/getuserinfoagain
    Api.getuserinfoagain =  function(params, success, error){
        this.post('/sign/getuserinfoagain', params, success, error);
    }

    // 请求地址：/wish/getwishlist
    // 请求方式：post
    Api.getwishlist = function(params, success, error){
        this.get('/wish/getwishlist', params, success, error);
    }

    window.Api = Api;
})(window, $)
