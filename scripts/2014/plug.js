// JavaScript Document
(function($){

	//slide
	$.fn.slide = function(options){
		var defaults = {    
  			aLi: this.find('.slide-panel'),
			aTr: this.find('.slide-trigger ul'),
//			aA: this.find('.slide-trigger a'),
			autoPlayTime: 3000,
			showTime: 1000,
			setInit: true
		};
		var play = null,
			page = 0;
		var opts = $.extend(defaults, options);
		var aSlideTrigger = [];
		if(opts.setInit) init();
	
		opts.aA = this.find('.slide-trigger a');

		function init(){
			opts.aLi.each(function(k,v){
				$(this).find('.slide-pic').css({
					'backgroundImage':'url('+ $(this).attr('data-pic') +')',
//					'backgroundRepeat':'no-repeat',
					'backgroundPosition':'center'
				});
				aSlideTrigger.push('<li><a class="'+(0==k ? 'actived' : '')+'"><img src="'+$(this).attr('data-bg')+'" /><span>'+$(this).attr('data-title')+'</span></a></li>');
			});

			opts.aTr.html(aSlideTrigger.join(''));

			opts.aLi.eq(0).css({
				"opacity": 1,
				'z-index': 1
			}); 
		};
		
		function showSlide(){
			opts.aA.removeClass( "actived" );
			opts.aA.eq( page ).addClass( "actived" );
			opts.aLi.eq( page ).css({ "opacity" : 1 });
			opts.aLi.eq( page ).siblings().animate( { "opacity" : 0 }, opts.showTime, function(){
				opts.aLi.eq( page ).css({"z-index":1}).siblings().css({"z-index":0});
			});
		};
		
		function playSlide(){
			if( !opts.aLi.is( ":animated" )){
				if( page == opts.aLi.length - 1 ){
					page = 0;
					showSlide();
				}else{
					page++;
					showSlide();
				}
			}
		};
		
		opts.aA.click(function(){
			if( !opts.aLi.is( ":animated" ) ){
				var index = opts.aA.index( this ); 
				page = index;
				showSlide();
			}
		});
		
		this.hover( function(){
			window.clearInterval(play);
		}, function(){
			play = window.setInterval(function(){
				playSlide();
			}, opts.autoPlayTime);
		}).trigger( "mouseleave" );
	};
	
	$.fn.sidebarTool = function(options){
		var defaults = {
			top: 500,
			state: 0
		};
		var self = this;
		var opts = $.extend(defaults, options);

		$(this).find(".top").click(function(){
			$(document).scrollTop(0);
		});

		$(document).scroll(function() {
			var st = $(document).scrollTop();
			if(opts.top < st) {
				if(1 != opts.state) {
					opts.state = 1;
					self.show();
				}
			} else {
				if(0 != opts.state) {
					opts.state = 0;
					self.hide();
				}
			}
		});
	};

	$.fn.searchBar = function(options){
		var defaults = {
		};
		var self = this;
		var opts = $.extend(defaults, options);
		this.find('.search-btn').click(function() {
			self.find('form').submit();
		});
	};

	
})(jQuery);

function loginUrl(){
	window.location.href="/login.jsp?referer="+location.href;
}
function registerUrl(){
	window.location.href="/register.jsp?referer="+location.href;
}
