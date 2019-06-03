var api_obj = {
    api_url : 'http://df5lp.zwoil.com:8088/api/index.php',

    auth_login: '/auth/login',

    game_play:'/game/play',

    init_log: '/init/log',

    game_log: '/game/log',

    init_interval :'/init/interval', 
    init_get_game_info : '/init/get_game_info',
    get_token: function(){
        var token = sessionStorage.getItem('token');
        return token;
    },
    set_token : function(token){
        sessionStorage.setItem('token',token);
    }
}