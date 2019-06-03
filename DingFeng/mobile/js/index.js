function Mobile(){

    this._init = function(){

    }
    this._run = function(){
        this.setNavHeight();
        this.look_inpuit_change();
        this.commit_info();
        this.tag_bind_event();
    }
}


// 控制loading
Mobile.prototype.loading = function (str) {
    var loading_box = document.querySelector('.loading-box');

    if (str == 'open') {
        loading_box.style.display = 'block';
    } else {
        loading_box.style.display = 'none';
    }
}


// 产品要求的弹窗
Mobile.prototype.blue_open_box = function (str, fn) {
    var blue_open_box = document.querySelector('.blue-open-box');
    var open_box_text = blue_open_box.querySelector('.open-box-text');
    blue_open_box.classList.add('active');
    open_box_text.innerHTML = str;

    setTimeout(function () {
        blue_open_box.classList.remove('active');
        open_box_text.innerHTML = '';
    }, 1500)

    fn && fn();
}

// 弹窗
Mobile.prototype.open_box = function (flag, str, fn) {
    // var loading_box = document.querySelector('.open-box');
    // str = str || '';
    // if (flag == 'open') {
    //     loading_box.style.display = 'block';
    //     document.querySelector('.open-box-text').innerHTML = str;
    // } else {
    //     loading_box.style.display = 'none';
    //     document.querySelector('.open-box-text').innerHTML = '';
    // }
    // fn && fn();
}
// 顶部导航
Mobile.prototype.setNavHeight = function(){

    var head_right = document.querySelector('.head-right');
    var flag = true;
    var mobile_nav = document.querySelector('.mobile-nav');
    var mobile_nav_ul = mobile_nav.querySelector('ul')
    head_right.addEventListener('click', function(){
        if(flag){
            this.classList.add('active');
            mobile_nav.classList.add('active');
            flag = false;
            
        }else{
            this.classList.remove('active');
            flag = true;
            mobile_nav.classList.remove('active');
        }
        // head_right.style.display = 'none';
    },false)

    var lis = mobile_nav_ul.children;
    for(var i = 0; i <  lis.length; i++){
        lis[i].onclick = function(){
            head_right.classList.remove('active');
            flag = true;
            mobile_nav.classList.remove('active');
        }
    }

}

// 懒加载
Mobile.prototype.img_lazyload = function (imgs) {
    var H = window.innerHeight; //浏览器视窗高度
    var _this = this;

    function lazyload() {
        var S = document.documentElement.scrollTop || document.body.scrollTop; //滚动条滚过高度
        [].forEach.call(imgs, function (img) {
            if (!img.getAttribute('data-src')) {
                return
            } //已经替换过的跳过
            if (H + S > _this.getTop(img)) {
                img.src = img.getAttribute("data-src");
                img.removeAttribute("data-src");
            }
        });
        [].every.call(imgs, function (img) {
            return !img.getAttribute('data-src')
        }) && (window.removeEventListener("scroll", lazyload, false));
    }
    window.addEventListener("scroll", lazyload, false);
    window.addEventListener("load", lazyload, false);
    // console.log(H);
}

// 获取位置
Mobile.prototype.getTop = function (e) {
    var T = e.offsetTop;
    while (e = e.offsetParent) {
        T += e.offsetTop
    }
    return T
}

// 上传简历
Mobile.prototype.look_inpuit_change = function () {
    return;
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
Mobile.prototype.commit_info = function () {
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
        }, 2500);

    }

}


// 快速回到顶部
Mobile.prototype.go_position = function (pos) {
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
Mobile.prototype.go_maodian = function (pos) {
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
        console.log(speed);
        i--;
    }, 30);
};


// 给元素绑定页面滚动事件
Mobile.prototype.tag_bind_event = function () {
    var _this = this;

    // 网站首页
    var go_site_home = document.querySelector('.go_site_home');
    if(go_site_home){
        go_site_home.addEventListener('click', function () {
            _this.go_position(0);
        }, false);
    }
   
    // 高薪职位
    var go_gaoxin_pos = document.querySelector('.go_gaoxin_pos');
    var gaoxin_pos = document.querySelector('.gaoxin_pos');
    if(gaoxin_pos){
        go_gaoxin_pos.addEventListener('click', function () {
            _this.go_maodian(gaoxin_pos.offsetTop-100);
        }, false)
    }
    
    //招聘渠道
    var go_zhaopin = document.querySelector('.go_zhaopin');
    var footer_top = document.querySelector('.concat_us');
    if(go_zhaopin){
        go_zhaopin.addEventListener('click', function () {
            _this.go_maodian(footer_top.offsetTop-100);
        }, false)
    }
    

    // 加入我们
    var go_join_us = document.querySelector('.go_join_us');
    var join_us = document.querySelector('.join_us');
    if(go_join_us){
        go_join_us.addEventListener('click', function () {
            _this.go_maodian(join_us.offsetTop -100);
        }, false)
    }
   

    // 联系我们
    var go_concat_us = document.querySelector('.go_concat_us');
    var concat_us = document.querySelector('.concat-bot-right');
    if(go_concat_us){
        go_concat_us.addEventListener('click', function () {
            _this.go_maodian(concat_us.offsetTop);
        }, false)
    }
    
}
