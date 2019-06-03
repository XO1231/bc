
    //初始化画布及context
    function star_init() {
        //获取canvas
        var stars = document.getElementById("stars");
        // DIVWidth = window.innerWidth; //当前的窗口的高度
        stars.width = document.querySelector('.banner').clientWidth;
        stars.height = document.querySelector('.banner').clientHeight;
        //获取context
        context = stars.getContext("2d");
    }


    /*流星雨开始*/
    var MeteorRain = function () {
        this.x = -1;
        this.y = -1;
        this.length = -1; //长度
        this.angle = 30; //倾斜角度
        this.width = -1; //宽度
        this.height = -1; //高度
        this.speed = 1; //速度
        this.offset_x = -1; //横轴移动偏移量
        this.offset_y = -1; //纵轴移动偏移量
        this.alpha = 0.1; //透明度
        this.color1 = "rgba(255,255,255,0.3)"; //流星的色彩
        this.color2 = "rgba(255,255,255,0.1)"; //流星的色彩
        /****************初始化函数********************/
        this.init = function () //初始化
        {
            this.getPos();
            this.alpha = 0.6; //透明度
            this.getRandomColor();
            //最小长度，最大长度
            var x = Math.random() * 80 + 60;
            this.length = Math.ceil(x);
            //         x = Math.random()*10+30;
            this.angle = 30; //流星倾斜角
            x = Math.random() + 0.5;
            this.speed = Math.ceil(x); //流星的速度
            var cos = Math.cos(this.angle * 3.14 / 180);
            var sin = Math.sin(this.angle * 3.14 / 180);
            this.width = this.length * cos; //流星所占宽度
            this.height = this.length * sin; //流星所占高度
            this.offset_x = this.speed * cos;
            this.offset_y = this.speed * sin;
        }
        /**************获取随机颜色函数*****************/
        this.getRandomColor = function () {
            //中段颜色
            this.color1 = "rgba(" + 255 + "," + 255 + "," + 255 + ",0.5)";
            //结束颜色
            this.color2 = "rgba(255,255,255,0.3)";
        }
        /***************重新计算流星坐标的函数******************/
        this.countPos = function () //
        {
            //往左下移动,x减少，y增加
            this.x = this.x - this.offset_x;
            this.y = this.y + this.offset_y;
        }
        /*****************获取随机坐标的函数*****************/
        this.getPos = function () //
        {
            //横坐标200--1200
            this.x = Math.random() * window.innerWidth; //窗口高度
            //纵坐标小于600
            this.y = Math.random() * window.innerHeight; //窗口宽度
        }
        /****绘制流星***************************/
        this.draw = function () //绘制一个流星的函数
        {
            context.save();
            context.beginPath();
            context.lineWidth = 1; //宽度
            context.globalAlpha = this.alpha; //设置透明度
            //创建横向渐变颜色,起点坐标至终点坐标
            var line = context.createLinearGradient(this.x, this.y,
                this.x + this.width,
                this.y - this.height);
            //分段设置颜色
            line.addColorStop(0, "white");
            line.addColorStop(0.5, 'rgba(200,200,200,.3)');
            line.addColorStop(0.6, 'rgba(150,150,150,.6)');
            context.strokeStyle = line;
            //起点
            context.moveTo(this.x, this.y);
            //终点
            context.lineTo(this.x + this.width, this.y - this.height);
            context.closePath();
            context.stroke();
            context.restore();
        }
        this.move = function () {
            //清空流星像素
            var x = this.x + this.width - this.offset_x;
            var y = this.y - this.height;
            context.clearRect(x - 3, y - 3, this.offset_x + 5, this.offset_y + 5);
            //         context.strokeStyle="red";
            //         context.strokeRect(x,y-1,this.offset_x+1,this.offset_y+1);
            //重新计算位置，往左下移动
            this.countPos();
            //透明度增加
            this.alpha -= 0.003;
            //重绘
            this.draw();
        }
    }
    //绘制流星
    function playRains() {

        for (var n = 0; n < rainCount; n++) {
            var rain = rains[n];
            rain.move(); //移动
            if (rain.y > window.innerHeight) { //超出界限后重来
                context.clearRect(rain.x, rain.y - rain.height, rain.width, rain.height);
                rains[n] = new MeteorRain();
                rains[n].init();
            }
        }
        setTimeout("playRains()", 2);
    }
    /*流星雨结束*/
    var context;
    var arr = new Array();
    var starCount = 800;
    var rains = new Array();
    var rainCount = 8;
