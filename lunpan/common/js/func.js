(function($,window){

   function Func(){
       this.isture = true;
       this.$tag = $('.lottle-cont-inner')
       this.is_click = true
       this.arr_img = [
           '/item-1.png',
           '/item-2.png',
           '/item-3.png',
           '/item-4.png',
           '/item-5.png',
           '/item-6.png',
           '/item-7.png',
           '/item-8.png',
           '/item-9.png',
           '/item-10.png'
       ]
   }

    Func.prototype.rotateFunc =  function(tag, obj, fn) {
        if(!this.isture){
            return;
        }
        this.isture = false;
        var that = this;
        tag.stopRotate();
        tag.rotate({
            angle: 0,
            duration: 4000,
            animateTo: obj.angle + 1440,
            callback: function () {
                fn && fn(obj);
                that.isture = true;
            }
        });
    };

    Func.prototype.startGame = function (obj, fn) {
        if(!this.is_click){
            return;
        }
        this.is_click = false;

        obj.angle = -((obj.gif - 1) * 36);

        this.rotateFunc(this.$tag, obj,function(obj){
            fn && fn(obj);
        });
        this.is_click = true;

        // var arr = ['9', '10'];
        // var num = parseInt(Math.random() * 2);
        // obj.stat = arr[num];
        // obj.stat  = '10';
        // switch (obj.stat) {
        //     case '-1':
        //         break;
        //     case '-2':
        //         break;
        //     case '-3':
        //         break;
        //     case '-4':
        //         break;
        //     case '0':
        //         break;
        //     case '9':
        //         obj.angle = -(obj.prize_id * 36);
        //         this.rotateFunc(this.$tag, obj);
        //         this.is_click = true;
        //         break;
        //     case '10':
        //         obj.angle = -144;
        //         this.rotateFunc(this.$tag, obj);
        //         this.is_click = true;
        //         break;
    
        //     default:
        //         break;
        // }
    }

    
    Func.prototype.score_toast = function (str) {
        // if (!str) {
        //     return;
        // }
        str = str || ' '
        $('.toast-inner>p').text(str);
        $('.toast-wrap, .toast-inner').fadeIn();
        $('.toast-inner').addClass('active');
        this.remove_score_toast();
    }
    
    Func.prototype.remove_score_toast= function () {
        var timer = setTimeout(function () {
            clearTimeout(timer);
            $('.toast-inner').removeClass('active');
            $('.toast-wrap, .toast-inner').fadeOut();
        }, 2000)
    }

    Func.prototype.check_input = function(){
        var username = $('#input-user').val();
        var password = $('#input-pass').val();
        if(!username){
            this.score_toast('请输入用户名')
            return false;
        }
        if(!password){
            this.score_toast('请输入密码')
            return false;
        }
        return true;
    }
    window.Func = Func;
})($,window)