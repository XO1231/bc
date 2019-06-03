function Global() {

    this.init = function () {
        this.person_info = '';
    }

    this.run = function () {

        this.init();

        var close_open_box = document.querySelector('.close-open-box');
        var _this = this;
        this.look_inpuit_change();
        this.commit_info();
        // 关闭弹出窗
        if(close_open_box.addEventListener){
            close_open_box.addEventListener('click', function () {
                _this.open_box('close', '');
            }, false);
        }else{
            close_open_box.attachEvent('click', function () {
                _this.open_box('close', '');
            });
        }
       
        // 执行页面滚动事件
        this.tag_bind_event();
        // this.switch_bg();
    }
}

// 控制loading
Global.prototype.loading = function (str) {
    var loading_box = document.querySelector('.loading-box');

    if (str == 'open') {
        loading_box.style.display = 'block';
    } else {
        loading_box.style.display = 'none';
    }
}

// 弹窗
Global.prototype.open_box = function (flag, str, fn) {
    var loading_box = document.querySelector('.open-box');
    str = str || '';
    if (flag == 'open') {
        loading_box.style.display = 'block';
        document.querySelector('.open-box-text').innerHTML = str;
    } else {
        loading_box.style.display = 'none';
        document.querySelector('.open-box-text').innerHTML = '';
    }
    fn && fn();
}

// 顶部导航切换背景色
Global.prototype.switch_bg = function () {
    var top_right = document.querySelector('.top-right');
    var top_right_ul = top_right.querySelector('ul');
    var lis = top_right_ul.children;
    for(var i =0; i < lis.length; i++){
    console.log(lis[i]);
    lis[i].onclick = function(){
        for(var j = 0; j < lis.length; j++){
            lis[j].classList.remove('active');
        }
        this.classList.add('active');
    } 

   }
}


// 产品要求的弹窗
Global.prototype.blue_open_box = function (str, fn) {
    var blue_open_box = document.querySelector('.blue-open-box');
    var open_box_text = blue_open_box.querySelector('.open-box-text');
    blue_open_box.classList.add('active');
    open_box_text.innerHTML = str;

    setTimeout(function () {
        blue_open_box.classList.remove('active');
        open_box_text.innerHTML = '';
    }, 2000)

    fn && fn();
}



// 上传简历
Global.prototype.look_inpuit_change = function () {

    var input = document.querySelector('.upload-file');
    var text_show = document.querySelector('.upload-button');
    var _this = this;
    input.onchange = function (e) {
        if (e.target.files[0]) {
            text_show.innerHTML = e.target.files[0].name;
            _this.person_info = e.target.files[0].name;
        }
    }

}

// 提交信息
Global.prototype.commit_info = function () {
    var input_submit = document.querySelector('.submit');
    var _this = this;
    input_submit.onclick = function () {

        var name = document.querySelector('.name').value;
        var concat = document.querySelector('.concat').value;
        // var text_info= document.querySelector('.text-info').value;

        var text_show = document.querySelector('.upload-button');

        if (!name) {
            // _this.open_box('open', '请输入您的称呼！', _this.div_shake('.open-box-inner'));
            _this.blue_open_box('请输入您的称呼！');
            return;
        }
        if (!concat) {
            // _this.open_box('open', '请输入您的联系方式！', _this.div_shake('.open-box-inner'));
            _this.blue_open_box('请输入您的联系方式！');
            return;
        }
        if (!_this.person_info) {
            _this.blue_open_box('请上传您的简历！');
            // _this.open_box('open', '请上传您的简历！', _this.div_shake('.open-box-inner'));
            return;
        }

        _this.loading('open');

        setTimeout(function () {
            _this.loading('close');
            // _this.open_box('open', '您的信息提交成功');
            _this.blue_open_box('您的信息提交成功');
        }, 1000);

        setTimeout(function () {
            _this.open_box('close', '');
            text_show.innerHTML = '上传简历';

            document.querySelector('.name').value = '';
            concat = document.querySelector('.concat').value = '';
            document.querySelector('.text-info').value = '';
        }, 2000);

    }

}

// 元素抖动函数
Global.prototype.getStyle = function (obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}

Global.prototype.div_shake = function (className) {
    var tag = document.querySelector(className);
    var pos = this.getStyle(tag, "left");
    console.log(pos);
    var arr = ['51%', , '49%', '50.5%', '49.5%', '50.2%', '49.8%', '50%'];
    var num = 0;
    var timer = null;

    clearInterval(timer);
    timer = setInterval(function () {
        tag.style.left = arr[num];
        num++;
        if (num === arr.length) {
            clearInterval(timer);
        }
    }, 30)
    tag.style.left = pos;
};


// 快速回到顶部
Global.prototype.go_position = function (pos) {
    var timer = null;
    clearInterval(timer);
    timer = setInterval(function () {
        var osTop = document.documentElement.scrollTop || document.body.scrollTop;

        var spd = Math.floor((-osTop) / 5);
        document.documentElement.scrollTop = osTop + spd;
        document.body.scrollTop = osTop + spd;

        if (osTop == pos) {
            clearInterval(timer);
        }
        window.onmousewheel = function () {
            clearInterval(timer);
        }
        console.log(osTop);
    }, 30);
};

// 快速滚动锚点
Global.prototype.go_maodian = function (pos) {
    var timer = null;
    var speed = pos / 5;
    clearInterval(timer);
    timer = setInterval(function () {
        var i = 1;
        if (speed >= pos) {
            speed = pos;
            clearInterval(timer);
        }
        window.scrollTo(0, speed);
        window.onmousewheel = function () {
            clearInterval(timer);
        }
        speed += 100;
        i--;
    }, 30);
};


// 给元素绑定页面滚动事件
Global.prototype.tag_bind_event = function () {
    var _this = this;

    // 回到顶部
    var top = document.querySelector(".right-server");
    if(top.addEventListener){
        top.addEventListener('click', function () {
            _this.go_position(0);
        }, false);
    }else{
        top.attachEvent('click', function () {
            _this.go_position(0);
        });
    }
    

    // 网站首页

    var go_site_home = document.querySelector('.go_site_home');
    if(go_site_home.addEventListener){
        go_site_home.addEventListener('click', function () {
            _this.go_position(0);
        }, false);
    }else{
        go_site_home.attachEvent('click', function () {
            _this.go_position(0);
        });
    }
    


    // 高薪职位
    var go_gaoxin_pos = document.querySelector('.go_gaoxin_pos');
    var gaoxin_pos = document.querySelector('.gaoxin_pos');
    if(go_gaoxin_pos.addEventListener){
        go_gaoxin_pos.addEventListener('click', function () {
            _this.go_maodian(gaoxin_pos.offsetTop);
        }, false)
    }else{
        go_gaoxin_pos.attachEvent('click', function () {
            _this.go_maodian(gaoxin_pos.offsetTop);
        })
    }
    

    // 招聘渠道
    var go_zhaopin = document.querySelector('.go_zhaopin');
    var footer_top = document.querySelector('.footer-top');
    if(go_zhaopin.addEventListener){
        go_zhaopin.addEventListener('click', function () {
            _this.go_maodian(footer_top.offsetTop);
        }, false)
    }else{
        go_zhaopin.attachEvent('click', function () {
            _this.go_maodian(footer_top.offsetTop);
        })
    }
    

    // 加入我们
    var go_join_us = document.querySelector('.go_join_us');
    var join_us = document.querySelector('.join_us');

    if(go_join_us.addEventListener){
        go_join_us.addEventListener('click', function () {
            _this.go_maodian(join_us.offsetTop - 60);
        }, false)
    }else{
        go_join_us.attachEvent('click', function () {
            _this.go_maodian(join_us.offsetTop - 60);
        })
    }
    

    // 联系我们
    var go_concat_us = document.querySelector('.go_concat_us');
    var concat_us = document.querySelector('.footer-bot');
    if(go_concat_us.addEventListener){
        go_concat_us.addEventListener('click', function () {
            _this.go_maodian(concat_us.offsetTop - 60);
        }, false)
    }else{
        go_concat_us.attachEvent('click', function () {
            _this.go_maodian(concat_us.offsetTop - 60);
        })
    }
   
}

// 懒加载
Global.prototype.img_lazyload = function (imgs) {
    var H = window.innerHeight; //浏览器视窗高度
    var _this = this;

    function lazyload() {
        var S = document.documentElement.scrollTop || document.body.scrollTop; //滚动条滚过高度
        [].forEach.call(imgs, function (img) {
            if (!img.getAttribute('data-src')) {
                return
            } //已经替换过的跳过
            if (H + S - 200> _this.getTop(img)) {
                img.src = img.getAttribute("data-src");
                img.removeAttribute("data-src");
            }
        });
        [].every.call(imgs, function (img) {
            return !img.getAttribute('data-src')
        }) && (window.removeEventListener("scroll", lazyload, false));

    }
    if(window.addEventListener){
        window.addEventListener("scroll", lazyload, false);
        window.addEventListener("load", lazyload, false);
    }else{
        window.attachEvent("scroll", lazyload);
        window.attachEvent("load", lazyload);
    }
    
    console.log(H);
}


// 获取位置
Global.prototype.getTop = function (e) {
    var T = e.offsetTop;
    while (e = e.offsetParent) {
        T += e.offsetTop
    }
    return T
}


// 分页
var pageNav = {};
pageNav.fn = null;
//p为当前页码,pn为总页数
pageNav.nav = function (p, pn) {
    //只有一页,直接显示1
    if (pn <= 1) {
        this.p = 1;
        this.pn = 1;
        return this.pHtml2(1);
    }
    if (pn < p) {
        p = pn;
    };
    var re = "";
    //第一页
    if (p <= 1) {
        p = 1;
    } else {
        //非第一页
        re += this.pHtml(p - 1, pn, "上一页");
        //总是显示第一页页码
        re += this.pHtml(1, pn, "1");
    }
    //校正页码
    this.p = p;
    this.pn = pn;

    //开始页码
    var start = 2;
    var end = (pn < 9) ? pn : 9;
    //是否显示前置省略号,即大于10的开始页码
    if (p >= 7) {
        re += "...";
        start = p - 4;
        var e = p + 4;
        end = (pn < e) ? pn : e;
    }
    for (var i = start; i < p; i++) {
        re += this.pHtml(i, pn);
    };
    re += this.pHtml2(p);
    for (var i = p + 1; i <= end; i++) {
        re += this.pHtml(i, pn);
    };
    if (end < pn) {
        re += "...";
        //显示最后一页页码,如不需要则去掉下面这一句
        re += this.pHtml(pn, pn);
    };
    if (p < pn) {
        re += this.pHtml(p + 1, pn, "下一页");
    };
    return re;
};
//显示非当前页
pageNav.pHtml = function (pageNo, pn, showPageNo) {
    showPageNo = showPageNo || pageNo;
    var H = " <a href='javascript:pageNav.go(" + pageNo + "," + pn + ");' class='pageNum'>" +
        showPageNo + "</a> ";
    return H;

};
//显示当前页
pageNav.pHtml2 = function (pageNo) {
    var H = " <span class='cPageNum'>" + pageNo + "</span> ";
    return H;
};
//输出页码,可根据需要重写此方法
pageNav.go = function (p, pn) {
    document.getElementById("pageNav").innerHTML = this.nav(p, pn);
    
    // elevn，此回调函数留给你发ajax请求展示数据
    if (this.fn != null) {
        this.fn(this.p, this.pn);
    };
};