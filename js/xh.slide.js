(function($){
	$.fn.Slide = function(){
		var opts = $.fn.Slide.deflunt;
		var conBox = $(this);
		var targetOn = $(opts.claNav).children();//选项按钮
		var ConLi = $(opts.claCon).children();//轮播元素
		var index = 1;
		var autoPlay;
		var slideWH = 0;
		$(this).find('li:first').css({"z-index":opts.zIndex,'opacity':1}).siblings().css({"z-index":opts.defIndex,'opacity':0});
		return this.each(function() {
			var $this = $(this);
			var doPlay = function() {
				$.fn.Slide.effect[opts.effect](conBox, targetOn, index, slideWH, opts);
				index++;
				if(index * opts.singleStep >= opts.steps) {
					index = 0;
				}
			};
			autoPlay = setInterval(doPlay, opts.timer);
			ConLi.hover(function() {
				if(autoPlay) {
					clearInterval(autoPlay);
				}
				index = ConLi.index(this);
			}, function() {
				if(autoPlay) {
					clearInterval(autoPlay);
				}
				autoPlay = setInterval(doPlay, opts.timer);
			});
			targetOn.hover(function() {
				if(autoPlay) {
					clearInterval(autoPlay);
				}
				index = targetOn.index(this);
			}, function() {
				if(autoPlay) {
					clearInterval(autoPlay);
				}
				autoPlay = setInterval(doPlay, opts.timer);
			});
			targetOn.click(function() {
				index = targetOn.index(this);
				window.setTimeout(function() {
					$.fn.Slide.effect[opts.effect](conBox, targetOn, index, slideWH, opts);
				}, 200);
			});
		});
	};
	$.fn.Slide.deflunt = {
		effect : "fade",//默认效果
		autoPlay : true,
		speed : 1500,
		timer : 3000,
		defIndex : 0,
		zIndex: 1,
		claNav : "#nums_list",
		claCon : "#BannerList",
		steps:4,//轮播的数量
		singleStep : 1//
	};
	$.fn.Slide.effect={
		fade : function(conObj, navObj, i, slideW, opts) {
			conObj.children().eq(i).stop().animate({
				opacity : 1
			}, opts.speed).css({
				"z-index" : "1"
			}).siblings().animate({
				opacity : 0
			}, opts.speed).css({
				"z-index" : "0"
			});
			navObj.eq(i).addClass("on").siblings().removeClass("on");
		}
	};
})(jQuery);
