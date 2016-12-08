$(function () {
    var $container = $("#carousel-container");
    var $carouselContent = $("#carousel-content");
    $carouselContent.width($container.width())
        .children().width($container.width());
    $carouselContent.height($container.height())
        .children().height($container.height());
    setTextPosition($container);
    setButton($container);
});
function setTextPosition($container) {
    var $textCaption = $("#carousel-text-caption");
    var $textContent = $("#carousel-text-content");
    var iTextCaptionLeft = ($container.width()-$textCaption.width())/2;
    var iTextCaptionTop = $container.height()/(4/3);
    var iTextContentLeft =  ($container.width()-$textContent.width())/2;
    var iTextContentTop = $container.height()/(6/5);
    var oTextCaptionPosition = $textCaption.position();
    var oTextContentPosition = $textContent.position();
    console.log(oTextContentPosition.top);
    if(oTextCaptionPosition.left == 0 ){
        $textCaption.css("left",iTextCaptionLeft);
    }
    if(oTextCaptionPosition.top == 0 ){
        $textCaption.css("top",iTextCaptionTop);
    }
    if(oTextContentPosition.left == 0){
        $textContent.css("left",iTextContentLeft);
    }
    if(oTextContentPosition.top == 0 ){
        $textContent.css('top',iTextContentTop);
    }
}
function setButton($container) {
    var $leftBtn = $("#left-btn");
    var $rightBtn = $("#right-btn");
    $leftBtn.css({"height":$container.height(),"width":$container.width()/8,"lineHeight":$container.height()+'px'});
    $rightBtn.css({"height":$container.height(),"width":$container.width()/8,"lineHeight":$container.height()+'px'});
}