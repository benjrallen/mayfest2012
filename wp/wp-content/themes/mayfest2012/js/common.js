(function($){
	
	//transitionTime
	var guruTransTime = 350,
		maxWidth = 960;
		
	$(document).ready(function(){
		
		$('html.ie').length ? Guru.ie = true : Guru.ie = false;
		$('html.lte8').length ? Guru.lte8 = true : Guru.lte8 = false;
		typeof WebKitPoint !== 'undefined' ? Guru.webkit = true : Guru.webkit = false;
				
		
        var fpRotate = new GuruRotator({
             transitionTime: 750,
             timeoutTime: 7000,
             showControls: true,
             autoRotate: true
         });
		
		
		accessFix();

		var mySlider = new GuruSliderController({
//			sliders: [
//				{ 	container_selector: '#slider',
//					slider_selector: '.slides',
//					transition_time: 500
//				},
//				{	container_selector: '#sliderNo2',
//					slider_selector: '.slidesClassButDifferent',
//					transition_time: 800
//				}
//			],
			container_selector: '.slider',
			timeout_time: 3000,
			transition_time: 1000
		});
		
		//console.log( mySlider );


		var twit =	new GuruTwitter({
						//screen_name: 'FakeGurustu',
						trim_user: true,
						interval: 5000
					});

	});	
	
	function accessFix(){
		if( $('nav#access').length ){
			var nav = $('nav#access'),
				lis = nav.find('li'),
				navW = nav.width(),
				w = 0;
				
			$.each( lis, function(i){
				w += $(this).outerWidth();
			});
			
			lis.last().css('padding-right', Math.floor( navW - w ) );
				
			//console.log( 'accessFix', navW, w );
		}
	}
	
	
//	function autoMenu(){
//		if ( $('nav#access').length ) {
//			
//			var nav = $('nav#access'),
//				btn = $('<div />', { id: 'guruMenuBtn', html: '<span>Menu</span>' }),
//				lis = nav.find('li');
//						
//			var sizeItUp = function(){
//				if ( $(window).width() >= maxWidth ){
//				
//					//to make total item width
//					var	lisW = 0;
//					
//					lis.each(function(){
//						lisW += $(this).width();
//					});
//					
//					//now calculate the right margin for the lis
//					var margin = Math.floor( ( nav.width() - lisW ) / (lis.length - 1) - 3 );
//					
//					lis.not(':last').css({ marginRight: margin });
//					
//					//console.log('fit those nav items', nav, nav.width(), lisW, margin);
//				}
//			};
//
//			//button click handler
//			var btnPress = function(e){
//				console.log('btnPress', e);
//				
//				$(this).toggleClass('pressed');
//				$(this).parent().find('.menu').toggle( 150 );
//								
//			};
//
//			//attach handler to button and insert it into the dom.
//			//btn.bind('mousedown mouseup', btnPress ).prependTo( nav );
//			btn.bind('click', btnPress ).prependTo( nav );
//
//			//size up the menu		
//			$(window).resize( sizeItUp );
//			$(window).resize();
//			
//			
//			//find the current_page item if it is a special post type archive
//			lis.each(function(){				
//				if ( $(this).find('a').attr('href') === window.location.href ) {
//					$(this).addClass('current-menu-item current_page_item');
//				}
//			});
//		}
//	}
	
	
})(jQuery);
