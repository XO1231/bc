(function (window, $) {
    var Api =  {
        code : 0,
        api_url :  ( false ? 'http://www.springfestivalapi.com' :  Base.interface ) ,
        get : function (url, params, success, error_fn) {
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
                        Func.toast({
                            message : '网络连接超时,请重试',
                            time : 1500
                        })
                        Func.loading.close();
                        error_fn(err);
                    }
                });
        },
        post : function (url, params,  success,error_fn) {
            $.ajax({
                url: this.api_url + url,
                type: 'post',
                datatype: 'jsonp',
                data: params || '',
                timeout : 6000,
                // beforeSend: function (XMLHttpRequest) {
                //     XMLHttpRequest.setRequestHeader("Authorization", token || '');
                // },
                success: function (data) {
                    success(data);
                },
                error: function (err) {
                    Func.toast({
                        message : '网络连接超时,请重试',
                        time : 1500
                    })
                    Func.loading.close();
                    error_fn(err);
                }
            });
        }
    }
    // console.log(Api.api_url);

    // 登录 /auth/login
    Api.login = function(params, success, error){
        this.post('/auth/login', params, success, error);
    }
    // 中奖历史  /game/lunpan_history
    // Api.lunpan_history =  function(params , success , error){
    //     this.get('/game/lunpan_history' , params , success ,error)
    // }
    // 排行榜  /init/leaderboard
    Api.leaderboard =  function(params , success , error){
        this.get('/init/leaderboard' , params , success ,error)
    }

    // 彩池总彩金  /init/pool_money
    Api.pool_money =  function(params , success , error){
        this.get('/init/pool_money' , params , success ,error)
    }

    
    // 登陆前签到列表：/init/signlist
    Api.init_signlist = function(params, success, error){
        this.post('/init/signlist', params, success, error);
    }
    
    // 登陆后签到列表 /sign/signlist
    Api.signlist = function(params, success, error){
        this.post('/sign/signlist', params, success, error);
    }
    // 放烟花 /game/play_fireworks
    Api.play_fireworks = function(params, success, error){
        this.post('/game/play_fireworks', params, success, error);
    }
    // 请求地址：/sign/sign
    Api.sign = function(params, success, error){
        this.post('/sign/sign', params, success, error);
    }

    // 领取存款奖励
    // /sign/getdepositreward
    Api.getdepositreward = function(params, success, error){
        this.post('/sign/getdepositreward' ,params, success, error);
    }
    
    // 获取所有烟花鞭炮数量  /sign/getuserfireworks
    Api.getuserfireworks = function(params, success, error){
        this.post('/sign/getuserfireworks',params, success, error);
    }

    // 绣球倒计时 请求地址：/hydrangea
    Api.hydrangea = function(params, success, error){
        this.post('/5c176263f187c.php',params, success, error);
    }
    // 获取当前用户总彩金 ：/sign/getusertotalmoney
    
    Api.getusertotalmoney = function(params, success, error){
        this.post('/sign/getusertotalmoney',params, success, error);
    }
    // 后台生成日志 /init/generate_hydrangea_log
    Api.generate_hydrangea_log = function(params, success, error){
        this.post(':8080/init/generate_hydrangea_log',params, success, error);
    }
    // 后台生成日志 /sign/deposit
    Api.deposit = function(params, success, error){
        this.post('/sign/deposit',params, success, error);
    }

    window.Api = Api;
})(window, $)
