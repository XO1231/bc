(function (window, $) {
    var Api =  {
        CODE : 0,
        ERROR : '链接错误，请重试！',
        api_url :  ( (window.location.href.indexOf('wy') == -1 ) ?  'http://www.b67wy.com/index.php/' :  Base.interface ) ,
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
                    // beforeSend: function (XMLHttpRequest) {d
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
        post : function (url, params,  success, error_fn) {
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
        this.post('auth/login', params, success, error);
        // this.get('auth/login', params, success, error);
    }
    // 劳模列表
    // 请求地址：/init/get_all_models 
    Api.init_get_all_models = function(params, success, error){
        this.post('init/get_all_models', params, success, error);
    }
    // 未登录前劳模数据
    // 请求地址：//init/get_model_by_id 
    // Api.get_model_by_id = function(params, success, error){
    //     this.post('init/get_model_by_id', params, success, error);
    // }

    // 日常劳模奖励列表
    // init/get_all_rewards
     Api.init_get_all_rewards = function(params, success, error){
        this.post('init/get_all_rewards', params, success, error);
    }
    // 获取超级劳模奖励列表
    Api.get_all_super_rewards = function(params, success, error){
        this.post('init/get_all_super_rewards', params, success, error);
    }
   
    // 获取荣誉排行榜
    Api.get_all_reward_list = function(params, success, error){
        this.post('init/get_all_reward_list', params, success, error);
    }

    // 获取登陆后的劳模列表和超级劳模的星级
    // /models/get_all_models
    Api.models_get_all_models = function(params, success, error){
        this.post('models/get_all_models', params, success, error);
    }

    // 获取登陆后该用户的劳模领取状态
    // /models/get_reward_page
    Api.models_get_reward_page = function(params, success, error){
        this.post('models/get_reward_page', params, success, error);
    }

    // 用户登录后超级劳模领取状态及数据
    //  /models/supder_model_page
    Api.models_supder_model_page = function(params, success, error){
        this.post('models/supder_model_page', params, success, error);
    }
    // 领取日常劳模奖励
    Api.models_get_common_reward = function(params, success, error){
        this.post('models/get_reward', params, success, error);
    }
    // 领取超级劳模奖励
    // /models/get_super_reward
    Api.models_get_super_reward = function(params, success, error){
        this.post('models/get_super_reward', params, success, error);
    }


    window.Api = Api;
})(window, $)
