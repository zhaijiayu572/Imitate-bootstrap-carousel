function Carousel(settings) {
    this.defaultSettings = {
        height:400,
        width:800,
        imgSrc:[],              //一个你需要放置的图片的数组，至少一个
        navListStyle:'square', //参数有 square,circle,$()
        btnStyle:'default',    //default,或者一个jQ对象数组[$left,$right];
        changeEffect:'fade',   //fade,slide,carousel,stack carousel效果图片个数应该小于8张
        container:$('body'), //默认为body，如需指定请传一个父元素jQ对象
        title:''             //轮播图的标题，默认没有，传入你想要添加的标题的字符串
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
            })
    }
    var that = this;
    //设置改变图片的样式为fade
    this.fade = function (idx) {
        that.content.find('img').eq(idx).fadeIn(600).siblings().hide();
        that.navList.find('li').eq(idx).addClass('selected').siblings().removeClass('selected');
    };
    this.slide = function (idx) {
        that.content.animate({
            left:-idx*that.container.width()
        },1000);
        that.navList.find('li').eq(idx).addClass('selected').siblings().removeClass('selected');
    }
}
// Carousel.prototype.fade = function (idx) {
//     // console.log(this.content);
//     this.content.find('img').eq(idx).fadeIn(600).siblings().hide();
//     this.navList.find('li').eq(idx).addClass('selected').siblings().removeClass('selected');
// };
//为按钮绑定事件
Carousel.prototype.set = function (changeFunction) {
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
//创建出轮播图
Carousel.prototype.create = function () {
    switch (this.defaultSettings.changeEffect){
        case 'fade':
            this.set(this.fade);
            break;
        case 'slide':
            this.set(this.slide);
            break;
    }
    this.content.appendTo(this.container);
    this.navList.appendTo(this.container);
    this.title.appendTo(this.container);
    this.leftBtn.appendTo(this.container);
    this.rightBtn.appendTo(this.container);
    this.container.appendTo(this.defaultSettings.container);
};
