(function (window, $) {

    function Api() {
        this.code = 0;
    }
    Api.prototype.get = function (url,page, success, error,token) {
        // return new Promise(function(resolve,reject){
            var new_url =  'http://b62zq.zwoil.com:8088'
            var params = '&_token='+token+'';
            $.ajax({
                url: new_url+url+params,
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
    }
    Api.prototype.post = function (url, params,  success,error_fn, token) {
            var new_url =  'http://b62zq.zwoil.com:8088'
            params._token = token;
            $.ajax({
                url: new_url + url,
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

    Api.prototype.login = function(params, success, error){
        this.post('/auth/login', params, success, error);
    }

    Api.prototype.get_package_cake = function(params, success, error,token){
        this.post('/package/cake', params, success, error, token);
    }

    // 存款得礼包
    // /package/deposit_package
    Api.prototype.deposit_package = function(params, success, error,token){
        this.post('/package/deposit_package', params, success, error, token);
    }

    // 礼包兑换礼品
    // /package/package_redeem
    Api.prototype.package_redeem = function(params, success, error,token){
        this.post('/package/package_redeem', params, success, error, token);
    }

    //当前月饼数量
    // /package/cake
    Api.prototype.package_cake = function(params, success, error,token){
        this.post('/package/cake', params, success, error, token);
    }

    // 礼包开奖记录
    // /package/package_redeem_log
    Api.prototype.package_redeem_log = function(page, success, error,token){
        var url = '/package/package_redeem_log?per_page='+page;
        this.get(url, page, success, error, token);
    }
   
    // 实物礼品列表
    Api.prototype.gift_list = function(params, success, error,token){
        this.post('/init/gift_list', params, success, error, token);
    }

    // 月饼兑换实物奖品
    // /package/cake_redeem 
    Api.prototype.cake_redeem = function(params, success, error,token){
        this.post('/package/cake_redeem', params, success, error, token);
    }

    // 月饼兑换实物奖品记录
    // /package/cake_redeem_log
    Api.prototype.cake_redeem_log = function(page, success, error,token){
        var url = '/package/cake_redeem_log?per_page='+page;
        this.get(url, page, success, error, token);
    }

    // 猜大小
    // /package/rabbit
    Api.prototype.rabbit = function(params, success, error,token){
        this.post('/package/rabbit', params, success, error, token);
    }

    // 积分换彩蛋
    // /package/integration_egg
    Api.prototype.integration_egg = function(params, success, error,token){
        this.post('/package/integration_egg', params, success, error, token);
    }

    // '查询当前月饼数可兑换的实物礼品
    // /package/get_gifts_by_cakes
    Api.prototype.get_gifts_by_cakes = function(params, success, error,token){
        this.post('/package/get_gifts_by_cakes', params, success, error, token);
    }

      // 提交表单信息
    // /package/set_account_info
    Api.prototype.set_account_info = function(params, success, error,token){
        this.post('/package/set_account_info', params, success, error, token);
    }


    window.Api = Api;
})(window, $)
