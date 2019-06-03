$(function(){
    var api = new Api();
    var func = new Func();
    func.can_click_bigSmall = true;
    func.qiao_2_btn_yes = true;
    func.open_libao_btn = true;
    func.init();
    // 更新当前月饼数量
    function update_package_cake(fn){
        api.package_cake({},
            function(data){
                data = JSON.parse(data);
                if(data.code === api.code){
                    var cakes = data.data.cakes;
                    var user = JSON.parse(sessionStorage.getItem('user'));
                    user.package_cake = cakes;
                    sessionStorage.setItem('user',JSON.stringify(user));
                    func.check_user_session();
                    fn && fn(data);
                }else{
                    func.score_toast(data.msg);
                }
            },function(err){
                if(err.msg){
                    func.score_toast(err.msg);
                }
            },func.get_token()
        );
    }

    function drop_libao_his(page){
        $('.libao-his-inner-table-box table tbody').empty();
        api.package_redeem_log(
            page,
            function(data){
                data = JSON.parse(data);
                $('.libao-his-inner').children('a').remove('a');
                $('.libao-his-inner').children('strong').remove('strong');

                var datas = data.data.package_log;
                var str = '';
                datas.forEach(function(ele,i){
                    // console.log(ele,i)
                    if(ele.type == 1){
                        str += '<tr><td>'+ele.addtime+'</td><td>获得数字月饼'+ ele.num+': '+ '<font style="color:#fff">'+ele.count+'</font>'+'个</td></tr>'
                    }else{
                        str += '<tr><td>'+ele.addtime+'</td><td>获得积分：'+ '<font style="color:#fff"> ' + ele.num +'</font>'+'</td></tr>';
                    }
                })

                $('.libao-his-inner-table-box table tbody').html(str);
                $('.libao-his-inner').append(data.data.page);
            },
            function(err){
                if(err.msg){
                    func.score_toast(err.msg);
                }
            },
            func.get_token())
    }

    function drop_shiwu_his(page){
        $('.shuzi-yb-his table tbody').empty();
        api.cake_redeem_log(
        page,
        function(data){
            if(!data){ return };
            data = JSON.parse(data);
            console.log(data);
            $('.shuzi-yb-his').children('a').remove('a');
            $('.shuzi-yb-his').children('strong').remove('strong');

            var datas = data.data.package_log;
            var str = '';
            datas.forEach(function(ele,i){
                // console.log(ele,i)
                str += '<tr><td>'+ele.name+'</td><td>' + ele.addtime +'</td><td>' + ele.count+'</td><td>'+ (ele.status == 0 ? '未派发' : '已派发') + '</td></tr>';
            })

            $('.shuzi-yb-his')
            $('.shuzi-yb-his-table-box table tbody').html(str);
            $('.shuzi-yb-his').append(data.data.page);

            // console.log(data);
            // if(api.code === data.code){

            // }
        },
        function(err){
            if(err.msg){
                func.score_toast(err.msg);
            }
        },
        func.get_token())
    }

    function get_gift_list(){
        // $('.picList').empty();
       
        api.gift_list({},
        function(data){
            data = JSON.parse(data);
            if(data.code === api.code){
                var goods = JSON.parse(data.data);
                sessionStorage.setItem('goods',JSON.stringify(goods));
                var str = '';
                goods.forEach(function(ele,i){
                    if(!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
                        str += '<li data-l-id="'+ (i +1)+'"> <div> <img src="..'+ele.pic+'" alt=""> <h4>'+ele.name+'</h4> <p><span>'+ele.memo+'</span></p> </div> <button class="shuzi-dui-now-btn" data-id="'+ele.id+'"></button> </li>'
                    }
                    else{
                        // str += '<li data-l-id="'+ (i +1)+'"> <div> <img src="../..'+ele.pic+'" alt=""> <h4>'+ele.name+'</h4> <p><span>'+ele.memo+'</span></p> </div> <button class="shuzi-dui-now-btn" data-id="'+ele.id+'"></button> </li>'
                        var li_html = '<div> <img src="../..'+ele.pic+'" alt=""> <h4>'+ele.name+'</h4> <p><span>'+ele.memo+'</span></p> </div> <button class="shuzi-dui-now-btn" data-id="'+ele.id+'"></button>' 
                        $('.picList li').eq(i).attr('data-l-id',(i+1));
                        $('.picList li').eq(i).html(li_html)
                    }
                })
                if(!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
                    $('.picList').html(str);
                }
                // 走马灯
                if($(".shuzi-slide-cont").slide){
                    $(".shuzi-slide-cont").slide({
                        titCell: ".hd ul",
                        mainCell: ".bd ul",
                        autoPage: true,
                        effect: "leftLoop",
                        autoPlay: true,
                        vis: 6
                    });
                }
                // if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
                //         swiper = new Swiper('.swiper-container', {
                //         slidesPerView: 2.2,
                //         spaceBetween: 6,
                //         autoplay: {
                //             delay: 2500,
                //             disableOnInteraction: false,
                //         },
                //     });
                // }
                
            }else{
                func.score_toast(data.msg)
            }
        } ,function(err){
            if(err.msg){
                func.score_toast(err.msg)
            }
        },func.get_token())
    }
    function update_gifts_list(){
        api.get_gifts_by_cakes({},
        function(data){
            if(!data){ return };
            data = JSON.parse(data)
            var gifts = data.data.gifts;
            var user= sessionStorage.getItem('user');
            if(!user){ return };
            user = JSON.parse(user);
            user.gifts = gifts;
            sessionStorage.setItem('user',JSON.stringify(user));
            func.define_can_dui();
            // console.log(data);
        },
        function(err){
            if(err.msg){
                func.score_toast(err.msg);
            }
        },
        func.get_token())
    }
    get_gift_list();
    if(func.get_token()){
        update_gifts_list();
    }

    $('.user-login').on('click',function(){
        func.click_login('#username','#password',function(form){
            func.loading('.fixed-wrap', '.loading-inner');
            api.login(
                {
                username: form.username,
                password : form.password
                },
                function(data){
                    var user_obj = JSON.parse(data);
                    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
                        $("html,body").css({
                            "width": "auto",
                            "height": "auto",
                            "overflow": "auto", 
                            "position": "static"
                        })
                        $("body").scrollTop(func.H);
                    }
                    if(api.code === user_obj.code){
                        func.loading('.fixed-wrap', '.loading-inner', 'close');
                        func.score_toast(user_obj.msg)
                        user_obj.data.username = form.username;
                        func.save_user_session(user_obj.data);
                        func.check_user_session();
                        if($('.personal-center').text){
                            $('.personal-center').text(form.username);
                            $('.personal-center').show();
                            $('.ready-login').hide();
                        }
                        // 登录后可兑换 背景变亮
                        update_gifts_list();
                        
                        // var gifts = user_obj.data.gifts;
                        // var $_lis = $('.picList li');
                        // // console.log(gifts);
                        // gifts.forEach(function(ele,i){
                        //     // if(ele.id == ){}
                        //     for(var i = 0 ; i< $_lis.length; i++){
                        //         var l_id = $($_lis[i]).attr('data-l-id');
                        //         if(l_id == ele.id){
                        //             $($_lis[i]).addClass('can-dui');
                        //         }
                        //     }
                        // })
                       
                        // var l_id_arr = [];
                        // for(var i = 0 ; i< $_lis.length; i++){
                        //     var l_id = $($_lis[i]).attr('data-l-id');
                        //     l_id_arr.push(l_id);
                        // }
                       
                    api.get_package_cake(
                    {},
                    function(data){
                        data = JSON.parse(data);
                        if( api.code === data.code){
                           var user = JSON.parse(sessionStorage.getItem('user'));
                           user.package_cake = data.data.cakes;
                        //    console.log(user);
                           var num = 0;
                           for(var k in user.package_cake){
                                num += Number(user.package_cake[k]['total']);
                           }
                        //    console.log(num);
                           $('.login-after-yuebing').text(num);
                           sessionStorage.setItem('user',JSON.stringify(user));
                        }else{
                            func.score_toast(user_obj.msg)
                        }
                    },function(err){
                        if(err.msg){
                            func.score_toast(user_obj.msg)
                        }
                    }, func.data.token);
                    
                    }else{
                        func.loading('.fixed-wrap', '.loading-inner', 'close');
                        func.score_toast(user_obj.msg)
                    }
                },
                function(err){
                    // console.log(err)
                    if(err.msg){
                        func.score_toast(err.msg)
                    }
                    func.loading('.fixed-wrap', '.loading-inner', 'close');
                }
            )
        });
    })

    // 开礼包历史记录
    $('.libao-his-btn').on('click',function(){
        var flag = func.is_login();
        if(!flag){ return };
        drop_libao_his(1);
        func.show_tanc('.fixed-wrap', '.libao-his-inner');
    })

    $('.libao-his-inner').on('click','a',function(e){
        e.preventDefault();
        var str = $(e.target).attr('href');
      
        if(str.indexOf('?') > 0){
            var arr = str.split('?');
            var arr_1 = arr[1].split('=')
            var page = arr_1[1];
        }else{
            page = 1;
        }
        drop_libao_his(page);
    })

    // 关闭历史记录
    $('.close-libao-his').on('click',function(){
        func.hide_tanc('.fixed-wrap');
    })


    // 开礼包
    $('.libao-kai-btn, .open-libao-2-btn').on('click',function(){
        // var flag = func.check_user_session();
        // if(!flag){
        //     func.toast('请先登录！');
        //     return;
        // }
        var flag = func.is_login();
        if(!flag){ return };
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
        // var arr = [0,1];
        // var flag = arr[parseInt(Math.random() * 2)]
        if(!func.open_libao_btn){
            return;
        }
        func.open_libao_btn = false;

        var value = $('.change-libao-number').val();
        value = Number(value);
        if(value <= 0){
            func.score_toast('请输入正确的礼包数');
            return;
        }
        

        func.loading('.fixed-wrap', '.loading-inner');
        api.package_redeem({count: func.data.change_libao_number},
            function(data){
                data = JSON.parse(data);
                if(api.code === data.code){
                    // console.log(data);
                    $('.sure-open-libao-inner-yb').empty();
                    $('.sure-open-libao-inner-yb-score').text(data.data.integration);
                    var cakes = data.data.cake;
                    var str = '';
                    cakes.forEach(function(ele,i){
                        str += '<span>'+ ele.cid+'<i>'+ ele.count +'</i></span>'
                    });
                    var number = func.data.total_libao_number  -=  func.data.change_libao_number;
                    $('.sure-open-libao-inner-yb').html(str);
                    func.update_data('package', number);
                    
                    var score = Number(func.data.total_score) + Number(data.data.integration);
                    func.update_data('integration', score);
                    update_package_cake();

                    func.loading('.fixed-wrap', '.loading-inner','close');
                    func.show_tanc('.fixed-wrap', '.sure-open-libao');
                    $('.libao-right').removeClass('active');
                    func.open_libao_btn = true;
                    // func.show_tanc('.fixed-wrap', '.open-libao-faild');
                }else{
                    func.score_toast(data.msg)
                    func.loading('.fixed-wrap', '.loading-inner','close');
                    $('.libao-right').removeClass('active');
                }
            },
            function(err){
                if(err.msg){
                    func.score_toast(err.msg)
                }
                func.loading('.fixed-wrap', '.loading-inner','close');
                $('.libao-right').removeClass('active');
            },
            func.get_token()
        )

        // func.hide_tanc('.fixed-wrap');
        // if(flag){
        //    
        //     return;
        // }
       
        
    })
    // 确定关礼包
    $('.close-sure-open-libao').on('click',function(){
        func.hide_tanc('.fixed-wrap');
        $('.libao-right').removeClass('active');
    })
    
    // 加或减礼包个数
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
        // console.log(func.data.change_libao_number);
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

        // setTimeout(function(){
            func.loading('.fixed-wrap','.loading-inner', 'close');
            func.score_toast('恭喜您，领取成功！');
            // setTimeout(function(){
                // $('.toast-inner').removeClass('active');
                // $('.fixed-wrap').fadeOut(100);
                $('.libao-right').removeClass('active');
            // },1000)
        // },1000)
        
    })


    // 免费得礼包 分享好友
    $('.mianfei_delibao,.open-libao-fiald-btn-2,.dui-libao-1-free-get,.get-free-dui-libao-4,.share-shuzi-yb,.maodian-img-wrap').on('click',function(){
        var flag = func.is_login();
        if(!flag){ return };
        func.show_tanc('.fixed-wrap', '.free-get-libao');
    })
    $('.close-free-get-libao').on('click',function(){
        func.hide_tanc('.fixed-wrap');
    })

    // 兑换礼包
    $('.duihuan_libao').on('click',function(){
        var flag = func.is_login();
        if(!flag){ return };
        func.show_tanc('.fixed-wrap', '.dui-libao-1');
    })
    $('.close-dui-libao-1').on('click',function(){
        func.hide_tanc('.fixed-wrap');
    })

    // 可以兑换礼包 存款得礼包
    $('.open-dui-libao-2').on('click',function(){
        func.loading('.fixed-wrap', '.loading-inner');
        api.deposit_package({},
            function(data){
                data = JSON.parse(data)
                console.log(data);
                func.loading('.fixed-wrap', '.loading-inner','close');
                if(api.code === data.code){
                    $('.sure-dui-li-bao-2-inner-num').text(data.data.new_package);
                    $('.sure-dui-li-bao-2-inner-count').text(data.data.times);
                    var user = JSON.parse(sessionStorage.getItem('user'));
                    if(user){
                        var number = Number(data.data.new_package) + Number(user.userinfo.package);
                    }
                    func.update_data('package', number);
                    func.check_user_session();
                    func.show_tanc('.fixed-wrap', '.dui-libao-2');
                }else if( data.code === 'AppErr302'){
                    func.show_tanc('.fixed-wrap', '.dui-libao-4');
                    func.score_toast(data.msg);
                }
                else if(data.code === 'AppErr102' || data.code === 'AppErr100'){
                    func.show_tanc('.fixed-wrap', '.dui-libao-3');
                    func.score_toast(data.msg);
                }
            },
            function(err){
                if(err.msg){
                    func.score_toast(err.msg);
                }
                func.loading('.fixed-wrap', '.loading-inner','close');
            },
            func.get_token()
        )
    })
    $('.close-dui-libao-2').on('click',function(){
        func.hide_tanc('.fixed-wrap');
    })

    // 数字月饼记录和翻页
    $('.his-shuzi-btn').on('click',function(){
        var flag = func.is_login();
        if(!flag){ return };

        drop_shiwu_his(0)
        func.show_tanc('.fixed-wrap', '.shuzi-yb-his');
    })
    $('.shuzi-yb-his').on('click','a',function(e){
        e.preventDefault();
        var str = $(e.target).attr('href');
        if(str.indexOf('?') > 0){
            var arr = str.split('?');
            var arr_1 = arr[1].split('=')
            var page = arr_1[1];
        }else{
            page = 1;
        }
        drop_shiwu_his(page);
    })


    // 查看当前数字月饼
    $('.look-shuzi-btn').on('click',function(){
        var flag = func.is_login();
        if(!flag){ return };
        update_package_cake(function(data){
            // data = JSON.parse(data);
            var cakes = data.data.cakes;
            var str = '';
           if(cakes.length > 0){
                cakes.forEach(function(ele,i){
                    str += '<span>'+ele.cid+ '<i>'+ ele.total+'</i>'+'</span>'
                })
                $('.shuzi-yb-look-cont').html(str)
           }else{
                $('.shuzi-yb-look-cont').html('暂未获得月饼')
           }
            
            

            // $('.shuzi-yb-look-cont').html(str);
        })
        func.show_tanc('.fixed-wrap', '.shuzi-yb-look');
    })
    
    // 取消兑换数字月饼
    $('.dui-shuzi-1-btn-cancel,.dui-shuzi-2-btn-can,.dui-shuzi-2-btn-cancel').on('click',function(){
        func.hide_tanc('.fixed-wrap');
    })  

     // 实物兑换
     $('.picList').on('click','.shuzi-dui-now-btn',function(e){
        
        var flag = func.is_login();
        if(!flag){ return};

        var id = $(e.target).attr('data-id');
        func.yb_id = id;
        var str = '';
        
        
        var goods = sessionStorage.getItem('goods');
        goods = JSON.parse(goods);

        var user = sessionStorage.getItem('user');
        user = JSON.parse(user);
        var gifts = user.gifts;
        var rules = [];

        gifts.forEach(function(ele,i){
            if(ele.id  == id){
                rules = ele.rule
            }
        })

        if(rules.length > 0){
            rules.forEach(function(ele,i){
                str +='<span>'+ele+'<i>1</i></span>'
            })
            $('.dui-shuzi-1-cont-right').html(str);
            func.show_tanc('.fixed-wrap','.dui-shuzi-1')
        }else{
            // 您现在拥有的月饼数不足以兑换此奖品
            api.cake_redeem({id: id},
                function(data){
                    data = JSON.parse(data);
                    if(data.code === api.code){
                        // func.score_toast('礼品每项只限兑换一次');
                    }else if( data.code = 'AppErr304'){
                        // func.score_toast(data.msg);
                    }
                    $('.dui-shuzi-2>p').text(data.msg);
                    func.show_tanc('.fixed-wrap','.dui-shuzi-2') 
                },
                function(err){
                    if(err.msg){
                        func.score_toast(err.msg);
                    }
                },func.get_token());
        }
        // 保存当前点击的父元素Li
        // $(this)func.parent_li = 
        // console.log($(this).parent());
        func.parent_li = $(this).parent();
        update_gifts_list();
    })

    // 确认兑换数字月饼
    $('.dui-shuzi-1-btn-can').on('click',function(){
        var id = func.yb_id;
        $('.dui-shuzi-1').hide();
        func.loading('.fixed-wrap','.loading-inner')
        api.cake_redeem({id: id},
            function(data){
                data = JSON.parse(data);
                // console.log(data);
                if(data.code === api.code){
                    func.loading('.fixed-wrap','.loading-inner','close');
                    func.score_toast('恭喜您，兑换成功！');
                    update_package_cake();
                    update_gifts_list();
                    // 兑换完后 背景变黑
                    $(func.parent_li).removeClass('can-dui');
                    // console.log(data.data.member_info);
                    if(!data.data.member_info){
                        func.show_tanc('.fixed-wrap','.addr-form');
                    }

                }else if( data.code = 'AppErr304'){
                    func.show_tanc('.fixed-wrap','.dui-shuzi-2')
                }
            },
            function(err){
                if(err.msg){
                    func.score_toast(err.msg);
                }
            },func.get_token());

    })
    $('.sure-commit-addr').on('click',function(){
            var addr = $('#addr-addr').val();
            var post_code = $('#addr-code').val();
            var name = $('#addr-name').val();
            var phone = $('#addr-phone').val();
            var weixin = $('#addr-wechat').val();
            name = func.trim(name);
            post_code = func.trim(post_code);
            addr = func.trim(addr);
            phone = func.trim(phone);
            weixin = func.trim(weixin);
            // console.log(addr)
            if(!addr){
               func.score_toast('请输入收货地址');
               return;
           }

            if(!post_code){
                 func.score_toast('请输入收货邮编');
                return;
            }
            if(!Number(post_code)){  
                func.score_toast('请输入正确的收货邮编');
                return;
            } 

            if(!name){
                func.score_toast('请输入收货姓名');
                return;
            }
            if(!phone){
                func.score_toast('请输入个人电话');
               return;
           }
           
            var myreg=/^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;          
            if (!myreg.test(phone)) {  
                func.score_toast('请输入正确的手机号码');
                return
            } 

            if(!weixin){
                 func.score_toast('请输入联系微信');
                return;
            }
           
            api.set_account_info({
                'name':name,
                'post_code' : post_code,
                 'addr' : addr,
                 'phone' : phone,
                 'weixin' : weixin
            }, function(data){
                if(!data){ return };
                data = JSON.parse(data);
                if(api.code === data.code){
                    func.hide_tanc('.fixed-wrap');
                    func.score_toast(data.msg) 
                }else if(data.code == 'AppErr200'){
                    func.score_toast(data.msg) 
                }
            },
            function(err){
                if(err){ 
                    func.score_toast(err.data.msg) 
                }
            },
            func.get_token());
    })

    $('.close-addr-form').on('click',function(){
        func.hide_tanc('.fixed-wrap');
    })

    // 怎么样获得投注积分
    $('.get_touzhu-jifen').on('click',function(){
        func.show_tanc('.fixed-wrap', '.jifen-rules');
    })
    // 我的积分
    $('.look-my-jifen').on('click',function(){
        var flag = func.is_login();
        if(!flag){ return };

        func.show_tanc('.fixed-wrap', '.my-jifen');
    })
    $('.sure-my-jifen').on('click',function(){
        func.hide_tanc('.fixed-wrap');
    })

    // $('.caidan-right ul li').on('click',function(){
        // $(this).addClass('active');
        // var arr = [0,1]
        // var num = parseInt(Math.random()* 2);
        // var flag = arr[num];
        // console.log(flag);
        // if(flag){
        //     func.show_tanc('.fixed-wrap', '.can-qiao');
        // }else{
        //     func.show_tanc('.fixed-wrap', '.canNot-qiao');
        // }
    // })

    // 敲金蛋
    // $('.ling-can-qiao').on('click',function(){

    //     $('.can-qiao').hide();
    //     func.loading('.fixed-wrap','.loading-inner')
    //     setTimeout(function(){
    //         func.loading('.fixed-wrap','.loading-inner','close');
    //         func.toast('恭喜您，领取成功！');
    //         $('.caidan-right ul li').removeClass('active');
    //     },1000)
    // })

    $('.canNot-qiao-comeOn,.close-qiao-dan').on('click',function(){
        func.hide_tanc('.fixed-wrap');
        $('.caidan-right ul li').removeClass('active');
    })

    // 猜大小

    $('.guess-big-samll').on('click',function(){
        var flag = func.is_login();
        if(!flag){ return };
        $('.guess-big').removeClass('active')
        $('.guess-small').removeClass('active')
        $('.lottely-number').hide();
        $('.lottely-result').hide();
        $('.float-score').removeClass('active');

        func.show_tanc('.fixed-wrap','.guess-table');
    })

    $('.close-guess-table,.close-guess-jifen,.guess-jifen-cancel,.close-guess-quesstion').on('click',function(){
        func.hide_tanc('.fixed-wrap');
    })


    $('.close-guess-quesstion,.guess-question-btn-cancel').on('click',function(){
        func.hide_tanc('.fixed-wrap');
    })

    $('.guess-question-btn-sure').on('click',function(){
        if(!(func.big_small == 1 || func.big_small == 0)){
            return;
        }
        if(!func.can_click_bigSmall){
            func.score_toast('当前游戏正在进行');
            return;
        }

        console.log(func.can_click_bigSmall);
        func.can_click_bigSmall = false;
        
        $('.float-score').removeClass('active');
        func.update_data('integration', Number(func.data.total_score) - Number(func.data.current_score));
        func.check_user_session();
        api.rabbit(
            {'integration' : func.data.current_score , 'bs':func.big_small},
            function(data){
                // console.log(data);
                data = JSON.parse(data);
                if(api.code === data.code ){
                    console.log(data);
                    $('.guess-mid-before').hide();
                    $('.guess-mid-after').show();
                    $('.after-show-shaizi-item').hide();
                    $('.after-hide-shaizi-item').show();
                    func.show_tanc('.fixed-wrap','.guess-table');
                    var flag;
                    if(data.data.result === true){
                        flag = '大'
                    }else{
                        flag = '小'
                    }
                    // var str_arr = ['大', '小'];
                    // var flag = str_arr[parseInt(Math.random() * str_arr.length)];
                    var val_arr = [];
                    if(flag == '大'){
                        val_arr = [{x:0, y:'-265px',val:4, type:'大'}, {x: 0 , y: '-345px',val:5, type:'大'} , {x: '-77px' , y:'-25px',val:6, type:'大'}]
                    }else{
                        val_arr = [{x:0, y:'-25px',val:1, type:'小'}, {x: 0 , y: '-105px',val:2, type:'小'} , {x: 0 , y:'-185px',val:3, type:'小'} ]
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
                    var sec = 150;
                    var timer = setInterval(function(){
                        var len = pos_arr.length;
                        var x_pos = pos_arr[parseInt(Math.random() * len)].x;
                        var y_pos = pos_arr[parseInt(Math.random() * len)].y;
                        $('.after-hide-shaizi-item').css('background', 'url("/pc/img/shaizi/sprite-shaizi.png") no-repeat '+ x_pos  + ' ' + y_pos );
                        sec += 10;
                        if(sec >= 400){
                            clearInterval(timer);
                            $('.after-show-shaizi-item').css( 'background', 'url("/pc/img/shaizi/sprite-shaizi.png") no-repeat '+ one.x  + ' ' + one.y )
                            $('.after-show-shaizi-item').show();
                            $('.after-hide-shaizi-item').hide();
                            $('.lottely-number span').text(one.val);
                            $('.lottely-number i').text(one.type);
                            $('.lottely-number').show();
                            $('.lottely-result span').text(one.type);
                            $('.lottely-result').show();
                            var score = Number(data.data.integration);
                            func.update_data('integration', Number(func.data.total_score)+score)
                            if(score > 0){
                                $('.float-score').text('+'+ score);
                            }else{
                                $('.float-score').text(score);
                            }
                            $('.float-score').addClass('active');
                            $('.guess-after-btn-wrap').show();
                            func.check_user_session();
                            func.can_click_bigSmall = true
                            // $('.show-shaizi-item').removeClass('active');
                        }
                    // console.log(sec);
                    }, sec)

                }else{
                    func.score_toast(data.msg);
                    func.can_click_bigSmall = true
                }
                
            },
            function(err){
                if(err.msg){
                    func.score_toast(err.msg);
                }
                func.can_click_bigSmall = true
            },func.get_token())
        
    })

    // 大小投注
    $('.guess-big,.guess-small').on('click',function(e){

        if(!func.can_click_bigSmall){
            func.score_toast('当前游戏正在进行');
            return;
        }

        var text = $(e.target).text();
        if(text == '大'){
            func.big_small = 1;
        }else{
            func.big_small = 0;   
        }
        $('#guess-score').val(' ')
        $('.guess-big').removeClass('active')
        $('.guess-small').removeClass('active')
        $(this).addClass('active');
        $('.lottely-number').hide();
        $('.lottely-result').hide();
        func.show_tanc('.fixed-wrap', '.guess-jifen');
    })

    $('.one-more-time').on('click',function(){

        if(!func.can_click_bigSmall){
            func.score_toast('当前游戏正在进行');
            return;
        }

        $('.guess-big').removeClass('active')
        $('.guess-small').removeClass('active')
        $('.lottely-number').hide();
        $('.lottely-result').hide();
        $('.guess-after-btn-wrap').hide();
        $('.guess-mid-before').show();
        $('.guess-mid-after').hide();
    })

    $('.share-friends').on('click',function(){
        if(!func.can_click_bigSmall){
            func.score_toast('当前游戏正在进行');
            return;
        }
        func.show_tanc('.fixed-wrap', '.free-get-libao');
    })

    // 确定下注
    $('#guess-score').on('input',function(e){
        var value = parseInt(Number(e.target.value));
        func.data.current_score = value;
    })
    
    $('.guess-jifen-sure').on('click',function(){
        var value = func.data.current_score;
        if(value > func.data.total_score){ 
             func.score_toast('最大积分未达到' + func.data.current_score); 
             return
        }
        if(value <= 0 || !value){
            func.score_toast('请输入正确的积分');
            return;
        }
        var flag = func.is_login();
        if(!flag){ return }
        $('.bet-cur-score').text(value);
        func.show_tanc('.fixed-wrap' ,'.guess-question');
    })

    // 关闭登录
    $('.ready-login').on('click',function(){
        func.ios_open_input()
        // func.show_tanc('.fixed-wrap','.login-before');
        $('.fixed-wrap').show();
        $('.login-before').fadeIn();

    })

    $('.close-login-before').on('click',function(){
        func.ios_close_input()
        // func.hide_tanc('.fixed-wrap');
        $('.fixed-wrap').hide();
        $('.login-before').fadeOut();
    })

    // 关闭个人中心
    $('.personal-center').on('click',function(){
        func.show_tanc('.fixed-wrap','.login-after');
    })
    $('.close-login-after').on('click',function(){
        func.hide_tanc('.fixed-wrap');
    })

    // 敲金蛋单数控制
    $('.qiao-step-1-add').on('click',function(){
        var value = $('.qiao-step-1-value').val();
        value = Number(value);
        value += 1;
        if(value >= func.data.total_score){
            func.score_toast('已达到可兑换最大积分');
            return;
        }
        $('.qiao-step-1-value').val(value);
    })
    $('.qiao-step-1-jian').on('click',function(){
        var value = $('.qiao-step-1-value').val();
        value = Number(value);
        value -= 1;
        if(value <= 0){ value = 0}
        $('.qiao-step-1-value').val(value);
    })

    // 敲金蛋
    $('.caidan-right ul li').on('click',function(e){
        
        // var url_str = $(e.target).css('background');
        // var begin_index = url_str.indexOf('http');
        // var end_index = url_str.indexOf('png') + 3;
        // var new_url = url_str.substring(begin_index, end_index);
        // func.url_img = new_url;
        // console.log(new_url);
        // return;
        var flag = func.is_login();
        if(!flag){ return };

        var did = $(e.target).attr('data-did');
        func.qiao_did = did;
        if(did == 3){
            $('.close-qiao-step-1-span').text(500)
            $('.qiao-step-1>h3').text('钻石彩蛋');
            $('.qiao-step-2>h3').text('钻石彩蛋');
            $('.qiao-4-dan').css('background', 'url(/pc/img/caidan-1.png) center center / cover no-repeat')
            $('.qiao-4-after-1 img').attr('src', '/pc/img/caidan-1-lie.png');
        }else if(did  == 2){
            $('.close-qiao-step-1-span').text(250)
            $('.qiao-step-1>h3').text('黄金彩蛋');
            $('.qiao-step-2>h3').text('黄金彩蛋');
            $('.qiao-4-dan').css('background', 'url(/pc/img/caidan-2.png) center center / cover no-repeat')
            $('.qiao-4-after-1 img').attr('src', '/pc/img/caidan-2-lie.png');
        }else if(did == 1){
            $('.close-qiao-step-1-span').text(100)
            $('.qiao-step-1>h3').text('白银彩蛋');
            $('.qiao-step-2>h3').text('白银彩蛋');
            $('.qiao-4-dan').css('background', 'url(/pc/img/caidan-3.png) center center / cover no-repeat')
            $('.qiao-4-after-1 img').attr('src', '/pc/img/caidan-3-lie.png');
        }
        if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
            func.ios_open_input()
        }
        func.show_tanc('.fixed-wrap','.qiao-step-1');
    })
    $('.close-qiao-step-1').on('click',function(){
        func.hide_tanc('.fixed-wrap');
        if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
            func.ios_close_input()
        }
    })

    $('.qiao-1-btn-yes').on('click',function(){

        var value = $('.qiao-step-1-value').val();
        value = Number(value);
        if( value <= 0) { 
            func.score_toast('请输入正确的颗数');
            return;
        };
        var flag = func.is_login();
        if(!flag){ return };
        if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
            func.ios_close_input()
        }
        func.show_tanc('.fixed-wrap','.qiao-step-2');
    })

    $('.qiao-2-btn-no,.qiao-3-btn-yes').on('click',function(){
        func.hide_tanc('.fixed-wrap');
    })

    $('.qiao-2-btn-yes').on('click',function(){
        if(!func.qiao_2_btn_yes){
            return;
        }
        func.qiao_2_btn_yes = false;
        var value = $('.qiao-step-1-value').val();
        var did = func.qiao_did;
        value = Number(value);
        did = Number(did);
        var dan_score = 0
        if(did == 3){
            dan_score = 500
        }else if(did == 2){
            dan_score = 250
        }else if(did == 1){
            dan_score = 100;
        }
        var integration = dan_score * value;
        // console.log(dan_score , value,integration);
        api.integration_egg({id : did , count:value },
        function(data){
            data = JSON.parse(data);
            if(api.code === data.code){
                // $('.qiao-4-after-1 img').attr('src',func.url_img);
                var score = Number(func.data.total_score) - integration;
                func.update_data('integration' , score);
                func.check_user_session();
                $('.qiao-4-after-2-inner').empty()
                var str = "";
                var moneys = data.data.money;
                moneys.forEach(function(ele,i){
                    str += '<span>'+ ele +'<i>元</i></span>'
                })
                $('.qiao-4-after-2-inner').html(str);
                func.show_tanc('.fixed-wrap','.qiao-step-4',function(){
                    setTimeout(function(){
                        $('.qiao-4-before').fadeOut(function(){
                            $('.qiao-4-after-1').fadeIn(function(){
                                $('.qiao-4-after-1').fadeOut(500,function(){
                                    $('.qiao-4-after-2').fadeIn()
                                    func.qiao_2_btn_yes = true;
                                });
                                
                            })
                        })
                       
                    },2000)
                });
                
            }else{
                func.score_toast(data.msg)
            }
           
        },
        function(err){
            if(err.msg){
                func.score_toast(err.msg)
            }
        },
        func.get_token())
        // var flag = true;
        // if(flag){
            
        // }else{
        //     func.hide_tanc('.fixed-wrap');
        // }
    })

    $('.close-qiao-step-4').on('click',function(){
        func.hide_tanc('.fixed-wrap');
        $('.qiao-4-before').show();
        $('.qiao-4-after-1').hide();
        $('.qiao-4-after-2').hide();
    })

    $('.qiao-3-btn-no').on('click',function(){
        func.show_tanc('.fixed-wrap', '.jifen-rules');
    })
    $('.qiao-3-btn-yes').on('click',function(){

    })


    var clipboard = new ClipboardJS('#copy_btn');

    clipboard.on('success', function(e) {
        // console.info('Action:', e.action);
        // console.info('Text:', e.text);
        // console.info('Trigger:', e.trigger);

        e.clearSelection();
        func.score_toast("复制成功, 请分享好友！");
    });

    clipboard.on('error', function(e) {
        // console.error('Action:', e.action);
        // console.error('Trigger:', e.trigger);
        // alert("当前浏览器不支持此功能，请手动复制。")
        func.score_toast("当前浏览器不支持此功能，请手动复制。");
    });

    $('.login-out').on('mouseover',function(){
        $(this).css('color','#fff');
    })
    $('.login-out').on('mouseout',function(){
        $(this).css('color','#fcff00');
    })
    $('.login-out').on('click',function(){
        console.log(11);
        // return;
        sessionStorage.clear();
        func.check_user_session();
        window.location.reload();
    })
    // var clipboard = new Clipboard('#copy_btn');   
    // clipboard.on('success', function(e) {    
    //     alert("复制成功",1500);    
    //     e.clearSelection();    
    //     console.log(e.clearSelection);    
    // });   
    // clipboard.on('error', function(e) {
    //     alert("当前浏览器不支持此功能，请手动复制。")
    // });
})

