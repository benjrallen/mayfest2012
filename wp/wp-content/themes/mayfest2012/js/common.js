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
		
		
		//accessFix();

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
			sliders: [
//				{
//					container_selector: '.slider',
//					slider_selector: '.slides',
//					timeout_time: 3000,
//					transition_time: 1000
//				},
				{
					container_selector: '#mainLeft .verticalSlider',
					slider_selector: '.slides',
					timeout_time: 3000,
					transition_time: 1000,
					vertical: true
				}
			]
		});
		
		//console.log( mySlider );


		var twit =	new GuruTwitter({
						screen_name: 'mayfest',
						trim_user: true,
						interval: 45000
					});
					
		contactPage();

		newsletterSignup();
	});	
	


	function newsletterSignup(){
		if ( $('form.newsletter').length > 0 ) {

			var form 	= $('form.newsletter'),
				input	= form.find('input'),
				button	= form.find('button'),
				errorCls = 'mcError',
				sending = false,
				timeoutTime = 2500,
				fadeTime = 900;

			//console.log(container, input, button);
			var onFormSubmit = function(e){
				e.preventDefault();
				
				var email = input.val(),
					subUrl = Guru.TemplateUrl + '/mailchimp_subscribe.php';

				var mcError = function(msg, success){
					if( typeof msg === 'undefined' || !msg )
						var msg = 'Well, something went wrong.';
					
					var cls = ( !success ? errorCls+' error' : errorCls+' success' );
						
					$('<span />', { text: msg }).addClass(cls).insertAfter( button );
					
					var timeoutFunc = function(){
						var el = form.find('.'+errorCls);
						if( el.length ){
							el.fadeOut( fadeTime, function(e){
								$(this).remove();
							});
						}
					};
					
					return setTimeout( timeoutFunc, timeoutTime );
				};
			
				//remove any old errors
				form.find('.'+errorCls).remove();

				if ( email === '' ){
					mcError('We need an email address, please.');
					return false;
				}
				
				if( !sending ){
					sending = true;
					//send the address
					$.get(
						subUrl,
						'email='+email,
						function(data){
							
							sending = false;
							
							var json = JSON.parse(data);						
							
							if( json.error ){

								var msg = json.error;

								switch (true) {								
									case json.error.indexOf('already subscribed') !== -1 :
										msg = 'That email\'s already on our list!';
										break;

									case json.error.indexOf('Invalid Email Address') !== -1 :
										msg = 'We need a proper email address, please.';
										break;
								}

								return mcError( msg );
							
							}
						
							return mcError('You have been signed up!', true);
						}
					);
				}
			};
			
			button.click(onFormSubmit);
			form.submit(onFormSubmit);
		}//the wrap condition
	}



	function contactPage(){
		if( $('#gMap').length ){
			new GuruMap({
				streetViewControl: true,
				fitMarkers: false,
				zoom: 16,
				centerLat: 36.153077,
				centerLng: -95.989392,
				mapHeight: 406,
				contId: 'gMap',
				locationKey: 'mayfest_location_address',
				markerScale: 0.4,
				markerImageKey: 'featured_custom_marker',
				blocksAreClickable: true,
				scrollToMapOnClick: true,
				scrollSpeed: 450,
				directionsLink: true
			});
			
			//block the location links from doing anything.
			//console.log( $('.entry-content .locationList a') );
			//$('.entry-content .locCont a').live('click', function(e){
			//	e.preventDefault();
			//});
		}	
	}	
	
})(jQuery);
