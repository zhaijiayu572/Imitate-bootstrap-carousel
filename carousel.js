function Carousel(settings) {
    this.defaultSettings = {
        height:400,
        width:800,
        imgSrc:[],              //一个你需要放置的图片的数组，至少一个
        navListStyle:'square', //参数有 square,circle,$()
        btnStyle:'default',    //default,或者一个jQ对象数组[$left,$right];
        changeEffect:'fade',   //fade,slide,carousel,stack
        container:$('body'), //默认为body，如需指定请传一个父元素jQ对象
        title:''             //轮播图的标题，默认没有，传入你想要添加的标题的字符串
    };
    $.extend(this.defaultSettings,settings);
    this.container = $('<div id="carousel-container"></div>');
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
        // this.navList.find('li').html('');
        // this.navList = $('<div class="navList-wrapper"></div>').append(this.navList);
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
    }
    var that = this;
    this.fade = function (idx) {
        that.content.find('img').eq(idx).fadeIn(600).siblings().hide();
        that.navList.find('li').eq(idx).addClass('selected').siblings().removeClass('selected');
    }
}
// Carousel.prototype.fade = function (idx) {
//     // console.log(this.content);
//     this.content.find('img').eq(idx).fadeIn(600).siblings().hide();
//     this.navList.find('li').eq(idx).addClass('selected').siblings().removeClass('selected');
// };
Carousel.prototype.set = function (changeFuction) {
    var idx = 0;
    var length = this.defaultSettings.imgSrc.length;
    this.navList.find('li').on('click',function () {
        idx = $(this).index();
        changeFuction(idx);
    });
    this.leftBtn.on('click',function () {
        idx--;
        if(idx<0){
            idx = length-1;
        }
        changeFuction(idx);
    });
    this.rightBtn.on('click',function () {
        idx++;
        if(idx>length-1){
            idx = 0;
        }
        changeFuction(idx);
    });

};
Carousel.prototype.create = function () {
    this.set(this.fade);
    this.content.appendTo(this.container);
    this.navList.appendTo(this.container);
    this.title.appendTo(this.container);
    this.leftBtn.appendTo(this.container);
    this.rightBtn.appendTo(this.container);
    this.container.appendTo(this.defaultSettings.container);
};
