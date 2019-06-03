(function(window) {
    /* Define the number of leaves to be used in the animation */
    var NUMBER_OF_LEAVES = sessionStorage.getItem('is_mobile') ? 45 :80;
    window.hb_flag = true;
    function init() {
        for (var i = 0; i < NUMBER_OF_LEAVES; i++) {
            var ele = createALeaf();
            ele.setAttribute('data-value', parseInt(Math.random() * 200));
            $('#petalbox').append(ele);
       }    
        //    点击抢红包
        $('#petalbox>div>img').on('click',function(){
            $('#petalbox>div>img').fadeIn(400);
            var that = $(this);
            Init.rob_hb(function(data){
                console.log(data);
                that.prev('span').removeClass('active');
                // var value = that.parent().attr('data-value');
                var value = data.data.money;
                setTimeout(() => {
                    that.prev('span').text( String('+' + value));
                    that.prev('span').addClass('active');
                }, 300);
                that.hide();
            })
          
        })
        
    }
    
    

    function hb_refresh(){
        if( window.hb_flag){
            $('body').css('overflow','hidden');
            $('#petalbox').show();
            init();
            window.hb_flag = false;
        }
    }

    function randomInteger(low, high) {
        return low + Math.floor(Math.random() * (high - low));
    }

    function randomFloat(low, high) {
        return low + Math.random() * (high - low);
    }


    function pixelValue(value) {
        return value + 'px';
    }

    function durationValue(value) {
        return value + 's';
    }

 
    function createALeaf() {
        var leafDiv = document.createElement('div');
        var image = document.createElement('img');
        var span = document.createElement('span')
        leafDiv.setAttribute('data-value', parseInt( Math.random() * 100));
        image.src ='../common/img/petal'+ randomInteger(1, 10) + '.png';
        leafDiv.style.top = pixelValue(randomInteger(-200, -100));
        leafDiv.style.left = pixelValue(randomInteger(0, window.innerWidth)-50);
        console.log(window.innerWidth);
        var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin':'counterclockwiseSpinAndFlip';       
        leafDiv.style.webkitAnimationName ='fade, drop';
        leafDiv.style.animationName ='fade, drop';
        image.style.webkitAnimationName = spinAnimationName;
        image.style.animationName = spinAnimationName;

        /* 随机下落时间 */
        var fadeAndDropDuration = durationValue(randomFloat(1.2, 8.2));
        /* 随机旋转时间 */
        var spinDuration = durationValue(randomFloat(3, 4));
        leafDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;
        leafDiv.style.animationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;
        // 随机delay时间
        var leafDelay = durationValue(randomFloat(0, 2));
        leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;
        leafDiv.style.animationDelay = leafDelay + ', ' + leafDelay;
        image.style.webkitAnimationDuration = spinDuration;
        image.style.animationDuration = spinDuration;
        leafDiv.appendChild(span);
        leafDiv.appendChild(image);
        span.innerText = 55.5
        return leafDiv;
    }
   
    window.hb_refresh = hb_refresh;
}
)(window);