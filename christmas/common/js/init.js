(function(Base, Func){
    $(function(){
        // 设置页面链接
        function setElementAttr(){
             //设置logo及链接
            $('.header-inner-left>a').attr('href', Base.logo_url);
            $('.header-inner-left>a>img').attr('src', Base.logo);
            
            // 设置忘记密码链接，注册链接
            $('.register-btn').attr('href', Base.reg_url);
            // 联系客服
            $('.forget-pass-btn,.concat-custer').attr('href',Base.custer_url);

            // 底部版权设置
            $('.footer-copyright').text(Base.copy_right);
            $('.go-jifen-mall').attr('href',Base.jifen_mall)
        }
        setElementAttr();
    })
})(Base,Func)