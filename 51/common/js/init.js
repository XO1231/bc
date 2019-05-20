(function(Base,$){
    Base = window.Base;
    $ = window.$;
    // 设置logo链接
    $('.logo_url').attr('href', Base.logo_url);
    // 设置logo
    $('.logo_img').attr('src', Base.logo);
    $('.slogan-img').attr('src', Base.slogan_img);
    $('.slogan-text') && $('.slogan-text').text(Base.slogan_text);
    // 注册链接
    $('.register_url').attr('href', Base.reg_url);
    // 忘记密码
    $('.forget_pass').attr('href', Base.custer_url);
    
    // 底部copyRight
    $('.copyRight_text').text(Base.copy_right);
    // 在线客服
    $('.online_custer').attr('href', Base.custer_url);
    $('.this_site').attr('href', Base.logo_url);
    $('.this_site').text('WWW.' + Base.slogan_text);
})(Base, $)