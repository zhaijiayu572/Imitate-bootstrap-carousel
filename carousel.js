function Carousel(settings) {
    this.defaultSettings = {
        height:400,
        width:800,
        imgSrc:[],              //一个你需要放置的图片的数组，至少一个
        navListStyle:'square', //参数有 square,circle,$()
        btnStyle:'default',    //default,或者一个jQ对象数组[$left,$right];
        changeEffect:'fade',   //fade,slide,carousel,stack carousel效果图片个数应该小于8张
        container:$('body'), //默认为body，如需指定请传一个父元素jQ对象
        title:'',             //轮播图的标题，默认没有，传入你想要添加的标题的字符串
        slideStyle:'back',    //两个参数endless和back，endless会一直向一个方向滑动，back则会在滑动到最后一个时返回第一个
        carouselStyle:'back'  //两个参数endless和back，endless会一直向一个方向旋转，back则会在转动到最后一个时返回第一个
    };
    $.extend(this.defaultSettings,settings);
    this.container = $('<div id="carousel-container"></div>').css({
        height:this.defaultSettings.height,
        width:this.defaultSettings.width
    });
    this.content = $('<div class="carousel-content"></div>');
    this.navList = $('<ul class="carousel-navList"></ul>');

    for(var i=0;i<this.defaultSettings.imgSrc.length;i++){//创建出img和navList
        if(i==0){
            $('<img src="'+this.defaultSettings.imgSrc[i]+'" class="selected">').appendTo(this.content);
            $('<li class="selected">'+(i+1)+'</li>').appendTo(this.navList);
            continue;
        }
        $('<img src="'+this.defaultSettings.imgSrc[i]+'">').appendTo(this.content);
        $('<li>'+(i+1)+'</li>').appendTo(this.navList);
    }
    console.log(this.content);
    this.title = $("<h3 class='carousel-title'></h3>").html(this.defaultSettings.title);
    this.leftBtn = $('<span class="leftBtn controlBtn">&lt;</span>');
    this.rightBtn = $('<span class="rightBtn controlBtn">&gt;</span>');
    //选择navList的样式
    if(this.defaultSettings.navListStyle=='square'){
        this.navList.addClass(this.defaultSettings.navListStyle);
    }else if(this.defaultSettings.navListStyle=='circle'){
        this.navList.addClass(this.defaultSettings.navListStyle)
            .css('marginLeft',-this.defaultSettings.imgSrc.length*10)
            .find('li').html('');
    }else{
        this.navList = this.defaultSettings.navListStyle;
    }
    //选择controlBtn的样式
    if(this.defaultSettings.btnStyle!='default'){
        this.leftBtn = this.defaultSettings.btnStyle[0];
        this.rightBtn = this.defaultSettings.btnStyle[1];
    }
    //轮播的样式
    switch (this.defaultSettings.changeEffect){
        case 'fade':
            this.content.addClass('fade');
            break;
        case 'slide':
            this.content.addClass('slide');
            this.content.width(this.container.width()*this.defaultSettings.imgSrc.length);
            this.content.find('img').width(this.container.width());
            break;
        case 'carousel':  //为carousel效果设置样式
            this.container.css('background','#eee');
            this.content.addClass('carousel');
            var width = -this.container.width();
            var height = -this.container.height();
            var length = this.defaultSettings.imgSrc.length;
            this.content.find('img').each(function () {
                var index = $(this).index();
                var angle = 360/length;
                var distance = 0.4*(-width/2)/Math.tan((angle*Math.PI)/360); //计算出往前的距离
                $(this).css({
                    'marginLeft':width*0.4/2,
                    'marginTop':height*0.4/2,
                    'transform':'rotateY('+(angle*index)+'deg) translateZ('+(distance+10)+'px)'
                });
            });
            break;
        case 'stack':
            length = this.defaultSettings.imgSrc.length;
            this.container.css('background','#ccc');
            this.content.addClass('stack');
            this.content.find('img').css({
                    'marginLeft':-this.container.width()*0.5*0.5,
                    'marginTop':-this.container.height()*0.5*0.5
            }).eq(0).addClass('main').removeClass('selected').css('transform','translateZ('+this.container.width()*0.1+'px)')
                .end().eq(length-1).addClass('left').css('transform','translateX('+(-this.container.width()*0.5*0.5)+'px) rotateY(30deg)')
                .end(0).eq(1).addClass('right').css('transform','translateX('+(this.container.width()*0.5*0.5)+'px) rotateY(-30deg)');
            // css('transform','translateX('+(-this.container.width()*0.5*0.5)+'px) rotateY(30deg)')

    }
    var that = this;
    //设置改变图片的样式为fade
    this.fade = function (idx) {
        that.content.find('img').eq(idx).fadeIn(600).siblings().hide();
        that.navList.find('li').eq(idx).addClass('selected').siblings().removeClass('selected');
    };
    //设置改变图片的样式为slide
    this.slide = function (idx) {
        that.content.stop().animate({
            left:-idx*that.container.width()
        },1000);
        that.navList.find('li').eq(idx).addClass('selected').siblings().removeClass('selected');
    };
    //设置改变图片的样式为carousel
    this.carousel = function (idx) {
        that.content.css({
            transform:'rotateY('+(idx*(360/length))+'deg)'
        });
        var whichLi = idx%length;
        that.navList.find('li').eq(whichLi).addClass('selected').siblings().removeClass('selected');
    };
    //设置图片样式为stack
    this.stack = function (idx) {
        var left = idx - 1;
        if(left<0){
            left = length-1;
        }
        var right = idx +1;
        if(right>length-1){
            right = 0;
        }
        console.log(idx,left,right);
        that.content.find('img').removeClass().eq(idx).addClass('main').css('transform','translateZ('+that.container.width()*0.1+'px)')
            .end().eq(left).addClass('left').css('transform','translateX('+(-that.container.width()*0.5*0.5)+'px) rotateY(30deg)')
            .end().eq(right).addClass('right').css('transform','translateX('+(that.container.width()*0.5*0.5)+'px) rotateY(-30deg)');
        that.navList.find('li').eq(idx).addClass('selected').siblings().removeClass();
    }
}
// Carousel.prototype.fade = function (idx) {
//     // console.log(this.content);
//     this.content.find('img').eq(idx).fadeIn(600).siblings().hide();
//     this.navList.find('li').eq(idx).addClass('selected').siblings().removeClass('selected');
// };
//为按钮绑定事件
Carousel.prototype.set = function (changeFunction) {  //默认样式
    var idx = 0;
    var length = this.defaultSettings.imgSrc.length;
    this.navList.find('li').on('click',function () {
        idx = $(this).index();
        changeFunction(idx);
    });
    this.leftBtn.on('click',function () {
        idx--;
        if(idx<0){
            idx = length-1;
        }
        changeFunction(idx);
    });
    this.rightBtn.on('click',function () {
        idx++;
        if(idx>length-1){
            idx = 0;
        }
        changeFunction(idx);
    });
};
//为按钮绑定另一种滑动事件
Carousel.prototype.setSlide = function (slideFunction) {    //slide的endless样式
    var $lastImg = this.content.find('img').eq(0).clone();
    $lastImg.appendTo(this.content);
    var idx = 0;
    var length = this.content.find('img').length;
    this.content.width(length*this.container.width());
    console.log(length);
    this.navList.find('li').on('click',function () {
        idx = $(this).index();
        slideFunction(idx);
    });
    var content = this.content;
    var width = this.container.width();
    var navList = this.navList;
    this.leftBtn.on('click',function () {
        idx--;
        if(idx<0){
            content.css('left',-width*(length-1));
            idx = length-2;
        }
        slideFunction(idx);
    });
    this.rightBtn.on('click',function () {
        idx++;
        if(idx>length-1){
            content.css('left',0);
            idx = 1;
        }
        slideFunction(idx);
        if(idx == length-1){
            navList.find('li').eq(0).addClass('selected').siblings().removeClass('selected');
        }
    })
};
//为按钮绑定carousel事件
Carousel.prototype.setCarousel = function (carouselFunction) {   //carousel的endless样式
    var idx = 0;
    var length = this.defaultSettings.imgSrc.length;
    this.navList.find('li').on('click',function () {
        var now = Math.floor(idx/length);     //防止旋转过多圈数找出当前圈数最近的一个
        idx = $(this).index()+(now*length);
        console.log(idx);
        carouselFunction(idx);
    });
    this.leftBtn.on('click',function () {
        idx--;
        carouselFunction(idx);
    });
    this.rightBtn.on('click',function () {
        idx++;
        carouselFunction(idx);
    });
};
//创建出轮播图
Carousel.prototype.create = function () {
    //给轮播图绑定事件
    switch (this.defaultSettings.changeEffect){
        case 'fade':
            this.set(this.fade);
            break;
        case 'slide':
            if(this.defaultSettings.slideStyle == 'endless'){
                this.setSlide(this.slide);
            }else if(this.defaultSettings.slideStyle == 'back'){
                this.set(this.slide);
            }
            break;
        case 'carousel':
            if(this.defaultSettings.carouselStyle == 'endless'){
                this.setCarousel(this.carousel);
            }else if(this.defaultSettings.carouselStyle == 'back'){
                this.set(this.carousel);
            }
            break;
        case 'stack':
            this.set(this.stack);
    }
    this.content.appendTo(this.container);
    this.navList.appendTo(this.container);
    this.title.appendTo(this.container);
    this.leftBtn.appendTo(this.container);
    this.rightBtn.appendTo(this.container);
    this.container.appendTo(this.defaultSettings.container);
};
