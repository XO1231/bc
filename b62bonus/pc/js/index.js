$(function(){
    var api = new Api();
    var func = new Func();
    func.init();

    $('.user-login').on('click',function(){

        func.click_login('#username','#password',function(form){

            func.loading('.fixed-wrap', '.loading-inner');
            // console.log(form);
            api.login(
                {
                username: form.username,
                password : form.password
                },
                function(data){
                    var user_obj = JSON.parse(data);
                    if(api.code === user_obj.code){
                        func.loading('.fixed-wrap', '.loading-inner', 'close');
                        func.toast(user_obj.msg)
                        user_obj.data.username = form.username;
                        func.save_user_session(user_obj);
                        func.check_user_session();
                    }else{
                        func.loading('.fixed-wrap', '.loading-inner', 'close');
                        func.toast(user_obj.msg)
                    }
                },
                function(err){
                    console.log(err)
                    func.loading('.fixed-wrap', '.loading-inner', 'close');
                }
            )
            // var that = this;
            // var user_obj = {
            //     username: username,
            //     libao: 2222,
            //     jifen: 1111,
            //     yuebing: 3333
            // }
            // setTimeout(function () {
            //     that.save_user_session(user_obj);
            //     that.loading('.fixed-wrap', '.loading-inner', 'close');
            //     that.check_user_session();
            // }, 2000);
        });
    })

    // 开礼包历史记录
    $('.libao-his-btn').on('click',function(){
        func.show_tanc('.fixed-wrap', '.libao-his-inner');
    })

    // 关闭历史记录
    $('.close-libao-his').on('click',function(){
        func.hide_tanc('.fixed-wrap');
    })


    // 开礼包
    $('.libao-kai-btn, .open-libao-2-btn').on('click',function(){
        var flag = func.check_user_session();
        if(!flag){
            func.toast('请先登录！');
            return;
        }
        
        $('.libao-right').addClass('active');
        func.show_tanc('.fixed-wrap', '.open-libao');
    })
   
    // 关闭开礼包
    $('.close-open-libao, .open-libao-btn-cancel').on('click',function(){
        func.hide_tanc('.fixed-wrap');
        $('.libao-right').removeClass('active');
    })

    // 确定开礼包
    $('.open-libao-btn').on('click',function(){
        var arr = [0,1];
        var flag = arr[parseInt(Math.random() * 2)]
        func.hide_tanc('.fixed-wrap');
        if(flag){
            func.show_tanc('.fixed-wrap', '.sure-open-libao');
            return;
        }
        func.show_tanc('.fixed-wrap', '.open-libao-faild');
        
    })
    // 确定关礼包
    $('.close-sure-open-libao').on('click',function(){
        func.hide_tanc('.fixed-wrap');
        $('.libao-right').removeClass('active');
    })
    
    // 加或减礼包个数
    func.show_libao_number();

    $('.add-libao-number').on('click',function(){
        func.data.change_libao_number += 1;
        if(func.data.change_libao_number >= func.data.total_libao_number){
            func.data.change_libao_number = func.data.total_libao_number;
        }
        func.show_libao_number();
    })

    $('.minus-libao-number').on('click',function(){
        func.data.change_libao_number -= 1;
        if(func.data.change_libao_number <= 0){
            func.data.change_libao_number = 0;
        }
        func.show_libao_number();
    })

    $('.change-libao-number').on('input',function(e){
        func.data.change_libao_number = e.target.value;
        console.log(func.data.change_libao_number);
    })

    // 全部礼包
    $('.change-all-libao-number').on('click',function(){
        func.data.change_libao_number = func.data.total_libao_number;
        func.show_libao_number();
    })
    
    // 确定领取开启礼包
    $('.sure-open-libao-ling').on('click',function(){
        $('.sure-open-libao').hide();
        func.loading('.fixed-wrap','.loading-inner')

        setTimeout(function(){
            func.toast('恭喜您，领取成功！');
            setTimeout(function(){
                $('.toast-inner').removeClass('active');
                $('.fixed-wrap').fadeOut(100);
                $('.libao-right').removeClass('active');
            },1500)
        },1000)
        
    })


    // 免费得礼包 分享好友
    $('.mianfei_delibao,.open-libao-fiald-btn-2,.dui-libao-1-free-get,.get-free-dui-libao-4,.share-shuzi-yb').on('click',function(){
        var flag = func.is_login();
        if(!flag){ return };
        func.show_tanc('.fixed-wrap', '.free-get-libao');
    })
    $('.close-free-get-libao').on('click',function(){
        func.hide_tanc('.fixed-wrap');
    })

    // 兑换礼包
    $('.duihuan_libao').on('click',function(){
        func.show_tanc('.fixed-wrap', '.dui-libao-1');
    })
    $('.close-dui-libao-1').on('click',function(){
        func.hide_tanc('.fixed-wrap');
    })

    // 可以兑换礼包
    $('.open-dui-libao-2').on('click',function(){
        var arr = [0, 1, 2];
        var flag = arr[parseInt(Math.random() * 3)]
        if(flag === 0){
            func.show_tanc('.fixed-wrap', '.dui-libao-2');
        }else if(flag === 1){
            func.show_tanc('.fixed-wrap', '.dui-libao-3');
        }else if(flag === 2){
            func.show_tanc('.fixed-wrap', '.dui-libao-4');
        }
    })
    $('.close-dui-libao-2').on('click',function(){
        func.hide_tanc('.fixed-wrap');
    })

    // 数字月饼记录
    $('.his-shuzi-btn').on('click',function(){
        func.show_tanc('.fixed-wrap', '.shuzi-yb-his');
    })
    // 查看当前数字月饼
    $('.look-shuzi-btn').on('click',function(){
        func.show_tanc('.fixed-wrap', '.shuzi-yb-look');
    })
    // 确认兑换数字月饼
    $('.dui-shuzi-1-btn-can').on('click',function(){
        $('.dui-shuzi-1').hide();
        func.loading('.fixed-wrap','.loading-inner')

        setTimeout(function(){
            func.loading('.fixed-wrap','.loading-inner','close');
            func.toast('恭喜您，领取成功！');
        },1000)
    })
    // 取消兑换数字月饼
    $('.dui-shuzi-1-btn-cancel,.dui-shuzi-2-btn-can,.dui-shuzi-2-btn-cancel').on('click',function(){
        func.hide_tanc('.fixed-wrap');
    })

    $('.shuzi-dui-now-btn').on('click',function(){
        console.log($(this).attr('data-id'));
        var arr = [0,1];
        var flag = arr[parseInt(Math.random() * 2)]
        if(flag){
            func.show_tanc('.fixed-wrap','.dui-shuzi-1')
        }else{
            func.show_tanc('.fixed-wrap','.dui-shuzi-2')
        }
    })


    // 怎么样获得投注积分
    $('.get_touzhu-jifen').on('click',function(){
         func.show_tanc('.fixed-wrap', '.jifen-rules');
    })
    // 我的积分
    $('.look-my-jifen').on('click',function(){
        func.show_tanc('.fixed-wrap', '.my-jifen');
    })
    $('.sure-my-jifen').on('click',function(){
        func.hide_tanc('.fixed-wrap');
    })

    $('.caidan-right ul li').on('click',function(){

        $(this).addClass('active');
        var arr = [0,1]
        var num = parseInt(Math.random()* 2);
        var flag = arr[num];
        console.log(flag);
        if(flag){
            func.show_tanc('.fixed-wrap', '.can-qiao');
        }else{
            func.show_tanc('.fixed-wrap', '.canNot-qiao');
        }

    })

    // 敲金蛋
    $('.ling-can-qiao').on('click',function(){

        $('.can-qiao').hide();
        func.loading('.fixed-wrap','.loading-inner')
        setTimeout(function(){
            func.loading('.fixed-wrap','.loading-inner','close');
            func.toast('恭喜您，领取成功！');
            $('.caidan-right ul li').removeClass('active');
        },1000)
    })

    $('.canNot-qiao-comeOn,.close-qiao-dan').on('click',function(){
        func.hide_tanc('.fixed-wrap');
        $('.caidan-right ul li').removeClass('active');
    })

    // 猜大小

    $('.guess-big-samll').on('click',function(){
        $('.guess-big').removeClass('active')
        $('.guess-small').removeClass('active')
        func.show_tanc('.fixed-wrap','.guess-table');
    })

    $('.close-guess-table,.close-guess-jifen,.guess-jifen-cancel,.close-guess-quesstion').on('click',function(){
        func.hide_tanc('.fixed-wrap');
    })


    $('.close-guess-quesstion,.guess-question-btn-cancel').on('click',function(){
        func.hide_tanc('.fixed-wrap');
    })

    $('.guess-question-btn-sure').on('click',function(){
        $('.guess-mid-before').hide();
        $('.guess-mid-after').show();
        $('.after-show-shaizi-item').hide();
        $('.after-hide-shaizi-item').show();
        func.show_tanc('.fixed-wrap','.guess-table');
        var str_arr = ['大', '小'];
        var flag = str_arr[parseInt(Math.random() * str_arr.length)];
        var val_arr = [];
        if(flag == '大'){
            val_arr = [{x:0, y:'-265px',val:4}, {x: 0 , y: '-345px',val:5} , {x: '-77px' , y:'-25px',val:6}]
        }else{
            val_arr = [{x:0, y:'-25px',val:1}, {x: 0 , y: '-105px',val:2} , {x: 0 , y:'-185px',val:3} ]
        }

        var one = val_arr[parseInt((Math.random() * val_arr.length))];
        var pos_arr = [
            {x: '-187px', y:'-7px'},
            {x: '-193px', y:'-111px'},
            {x: '-193px', y:'-201px'},
            {x: '-194px', y:'-291px'},
            // {x:0, y:'-264px'},
            // {x: 0 , y: '-345px'} , 
            // {x: '-77px' , y:'-24px'},
            // {x:0, y:'-24px'}, 
            // {x: 0 , y: '-103px'}, 
            // {x: 0 , y:'-183px'} 
        ]
        var sec = 200;
        var timer = setInterval(function(){
            var len = pos_arr.length;
            var x_pos = pos_arr[parseInt(Math.random() * len)].x;
            var y_pos = pos_arr[parseInt(Math.random() * len)].y;
            $('.after-hide-shaizi-item').css('background', 'url("../../pc/img/shaizi/sprite-shaizi.png") no-repeat '+ x_pos  + ' ' + y_pos );
            sec += 2;
            if(sec >= 250){
                clearInterval(timer);
                $('.after-show-shaizi-item').css( 'background', 'url("../../pc/img/shaizi/sprite-shaizi.png") no-repeat '+ one.x  + ' ' + one.y )
                $('.after-show-shaizi-item').show();
                $('.after-hide-shaizi-item').hide();
                $('.lottely-number span').text(one.val);
                $('.lottely-number').show();
                // $('.show-shaizi-item').removeClass('active');
            }
        // console.log(sec);
        }, sec)
        
    })

    // 大小投注
    $('.guess-big,.guess-small').on('click',function(){
        $('#guess-score').val(' ')
        $('.guess-big').removeClass('active')
        $('.guess-small').removeClass('active')
        $(this).addClass('active');
        $('.lottely-number').hide();
        func.show_tanc('.fixed-wrap', '.guess-jifen');
    })

    $('.one-more-time').on('click',function(){
        $('.guess-big').removeClass('active')
        $('.guess-small').removeClass('active')
        $('.lottely-number').hide();
        $('.guess-after-btn-wrap').hide();
        $('.guess-mid-before').show();
        $('.guess-mid-after').hide();
    })

    // 确定下注
    $('#guess-score').on('input',function(e){
        var value = parseInt(Number(e.target.value));
        func.data.current_score = value;
    })
    
    $('.guess-jifen-sure').on('click',function(){

        var value = func.data.current_score;
        console.log(value);
        if(value >= func.data.total_score){  func.score_toast('最大积分未达到' + func.data.current_score); return}
        if(value <= 0 || !value){
            func.score_toast('请输入正确的积分');
            return;
        }
        $('.bet-cur-score').text(value);
        func.show_tanc('.fixed-wrap' ,'.guess-question');
    })
})