// place any jQuery/helper plugins in here, instead of separate, slower script files.


/*
 * Try/Catch the console
 */
try{
    console.log('Hello Console.');
} catch(e) {
    window.console = {};
    var cMethods = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(",");
    for (var i=0; i<cMethods.length; i++) {
        console[ cMethods[i] ] = function(){};
    }
}


(function($){

	//google maps custom integration
	function GuruMap(config){
		//default configurable variables
		var me = this,
			defaults = {
				zoom: 4,
				//center on Salina kansas for good full us view
				centerLat: 38.7902935,
				centerLng: -97.64023729999997,
				mapHeight: 500,
				fitMarkers: false, //fit all the markers on the map?  overrides centerLatLng and zoom
				contId: 'gmapCont',
				dataCont: '.locationList',
				dataBlock: '.locationItem',
				dataAttr: 'location-data',
				locationKey: 'location_address',
				fallbackLocationKey: 'mailing_address',
				fallbackOverrideKey: false, //set as post meta to prefer the secondary address as the marker address
				markerImageKey: false,
				zoomControlStyle: 'DEFAULT',
				streetViewControl: false,
				scrollwheel: false,
				mapTypeId: 'ROADMAP',
				markerScale: 0.5,
				blocksAreClickable: false,
				scrollToMapOnClick: false,
				scrollSpeed: 500,
				directionsLink: false,
				globalInitID: 'GuruMapInit' //used to expose the setupConstants (used in init) function globally for googles async callback... change this to something unique for each instance running
			};
		for (var key in config) {
			defaults[key] = config[key] || defaults[key];
		}
		for (var key in defaults) {
			me[key] = defaults[key];
		}

		me.loadingGoogle = false;

		//here i am going to load the
		me.setupConstants = function(){
			if ( typeof google !== 'undefined' ) {

				//remove global access to this setup function
				if ( window[me.globalInitID] )
					window[me.globalInitID] = undefined;

				//constants
				me.loadingGoogle = false;

				me.infowindow = new google.maps.InfoWindow();

				me.directionsService = new google.maps.DirectionsService();
				//me.directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });
				me.directionsDisplay = new google.maps.DirectionsRenderer();
				//keep that map out of it for now.
				me.directionsDisplay.setMap( null );
				//geocoder used to take address and convert it to latLng and make marker
				me.geocoder = new google.maps.Geocoder();
				me.center = null;
				me.cont = null;
				me.map = null;
				me.form = null;
				me.startAddy = '';
				me.endAddy = '';
				me.currentRoute = null;
				me.confirmBttn = null;
				//me.waypoints = [];
				me.dblclickListener = null;

				me.data = [];
				me.markers = [];

				return me.init();

			} else {
				//console.log('no google');

				if (!me.loadingGoogle) {
					me.loadingGoogle = true;

					//make this setup function available globally
					window[me.globalInitID] = me.setupConstants;

					var script = document.createElement("script");
					script.type = "text/javascript";
					script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback="+me.globalInitID;
					document.body.appendChild(script);
				}


			}
		};

		me.init = function(){
			//console.log('herro init', me, 'google', google);


			//gather data from page elements
			me.setupMarkerData();

			//console.log( 'data', me.data );

			//setup the map and initialize it.
			me.setupMap();

			//setup markers
			me.setupMarkers();

		};

		me.setupMap = function(){
			//find the container
			me.cont = document.getElementById( me.contId );

			//check dimensions
			if ( !$(me.cont).height() )
				$(me.cont).height( me.mapHeight );

			//console.log( 'me.cont', $(me.cont).width(), $(me.cont).height() );

			//set the google center
			me.center = new google.maps.LatLng( me.centerLat, me.centerLng );

			//get the map
			me.map = new google.maps.Map( me.cont, {
				center: me.center,
				zoom: me.zoom,
				zoomControlOptions: {
					style: google.maps.ZoomControlStyle[ me.zoomControlStyle ]
				},
				streetViewControl: me.streetViewControl,
				scrollwheel: me.scrollwheel,
				mapTypeId: google.maps.MapTypeId[ me.mapTypeId ]
			});

		};

		me.setupMarkers = function(){
			if ( me.data.length ) {
				//start bounds here for fitmarkers option later down
				var latLngBounds = new google.maps.LatLngBounds();

				//iterate through markers
				$.each(me.data, function(i){
					//console.log( i, this );

					var dataObj = this,
						address = ( me.fallbackOverrideKey && dataObj[ me.fallbackOverrideKey ] && dataObj[ me.fallbackLocationKey ] ?
										//if so, use the fallback key
										dataObj[ me.fallbackLocationKey ] :
										//otherwise, if there is no preference, try to use the primary key, and then fallback if it is not there
										dataObj[ me.locationKey ] || dataObj[ me.fallbackLocationKey ]
									);

					//console.log('dataObj', dataObj);

					if ( address ) {

						//console.log( 'address', address, me.stripTags( address ) );
						me.geocoder.geocode({

							address: me.stripTags( address )

						}, function(results, status){

							if (status === google.maps.GeocoderStatus.OK) {

								me.markers[i] = new google.maps.Marker({
									map: me.map,
									position: results[0].geometry.location,
									item: dataObj
								});

								//add a custom marker image?
								if ( me.markerImageKey && dataObj[ me.markerImageKey ] ){
									var img = dataObj[ me.markerImageKey ],
										src = img['src'],
										w = Math.floor( img.width * me.markerScale ),
										h = Math.floor( img.height * me.markerScale );

									me.markers[i].setIcon( new google.maps.MarkerImage(
																	//url
																	dataObj[ me.markerImageKey ].src,
																	//original image size ( width, height )
																	new google.maps.Size( w, h ),
																	//origin in image ( left, top ), (0,0) is google default
																	new google.maps.Point( 0, 0 ),
																	//anchor point
																	new google.maps.Point( w/2, h/2 ),
																	new google.maps.Size( w, h )
																)
									);

									w = null;
									h = null;
									src = null;
									img = null;
								}

								//bind the click listener
								//google.maps.event.addListener( me.markers[i], 'mousedown', me.handleMarkerClick );
								google.maps.event.addListener( me.markers[i], 'click', me.handleMarkerClick );

								//attach click handler to block if set
								if ( me.blocksAreClickable ) {

									$(dataObj.DOM).attr({ markerIndex: i }).mousedown( me.handleBlockClick ).find('a').click(me.preventBlockLinks);

								}

								if (me.fitMarkers) {
									//extend the auto bounds
									latLngBounds.extend( me.markers[i].position );
									me.map.fitBounds( latLngBounds );
								}

								//console.log( dataObj.DOM );
							} else {
								//something went wrong.
								alert("Geocode was not successful for the following reason: " + status);
							}
						});
					}

				});
			}
		};

		me.preventBlockLinks = function(e){
			e.preventDefault();
		};

		me.handleBlockClick = function(e){
			//find associated marker, and setup the coords like google does
			var marker = me.markers[ $(this).attr('markerIndex') ],
				coords = { latLng: marker.position };

			//console.log('me.handleBlockClick', e, this, marker, coords);
			me.handleMarkerClick.apply( marker, [coords] );

			//move page up to see map?
			if ( me.scrollToMapOnClick ){
				//finding the target element is not 'smart' (enough) right now, make it smarter later.
				var target = $(me.cont).closest('section'),
					off = target.offset(),
					//different browsers use different elements to calculate the scrolltop ( webkit=body, mozilla=html, par example )
					sTop = $('body').scrollTop() || $('html').scrollTop();

				if( sTop > off.top )
					$('html, body').stop(false, false).animate({ scrollTop: off.top }, me.scrollSpeed );

				target = null;
				off = null;
			}

			return;
		};

		me.handleMarkerClick = function(coords){
			//console.log('me.handleMarkerClick', coords, this);

			var content = '<div class="mapInfoDom">'+$(this.item.DOM).html();


			//here is where we print out a directions link
			if (me.directionsLink) {
				var addy = this.item[me.locationKey].replace(/ /g,'+').replace(/\n/g,',+'),
					//dUrl = 'http://maps.google.com/maps?saddr=&daddr='+addy+'&z=14'
					dUrl = 'http://maps.google.com/maps?saddr=&daddr='+addy

				//console.log( addy );

				content += '<a class="directionsLink" href="'+dUrl+'" title="Get directions to this site" target="_blank">Get Driving Directions</a>';
			}

			content += '</div>';

			//console.log( this.item.DOM );

			me.infowindow.setContent( content );

			me.infowindow.open(me.map, this);
		};


		me.setupMarkerData = function(){
			//dataBlock supplied in config
			return $(me.dataCont).find(me.dataBlock).each(function(){
				//console.log( $(this).attr( me.dataAttr ) );
				var item = JSON.parse( $(this).attr( me.dataAttr ) );
				item.DOM = this;
				me.data.push( item );
			});
		};

		//used to clean the address html for google.
		me.stripTags = function(s){
			//s = String
			if (typeof s !== 'string')
				return false;
			return s.replace(/<([^>]+)>/g,'').replace(/\n|\r/g,' ');
			//return s.replace(/\\n/g,'');
		};



		/*
		me.getRoute = function(){
			//console.log( 'me.getRoute', me.startAddy, me.endAddy, me.waypoints );
			me.directionsService.route({
				//origin: ttp.geo.userLocation,
				origin: me.startAddy,
				destination: me.endAddy,
				travelMode: google.maps.TravelMode.DRIVING,
				optimizeWaypoints: true,
				waypoints: me.waypoints
			}, me.directionsServiceCallback);
		};
		me.directionsServiceCallback = function(response, status){
			if (status == google.maps.DirectionsStatus.OK) {
				me.currentRoute = response.routes;
				//disable double click zoom when route is showing
				me.map.setOptions({ disableDoubleClickZoom: true });
				//console.log('directions gotten', response, me.currentRoute);
				//make a confirm button
				me.printConfirmBttn();
				//display the directions on the map
				me.directionsDisplay.setMap( me.map );
				me.directionsDisplay.setDirections(response);
			} else {
				//the directions couldn't be found for some reason, most likely cause there is no route, but could be server error
				//too many waypoints?
				if ( status == 'MAX_WAYPOINTS_EXCEEDED' ) {
					me.waypoints.pop();
					alert('Sorry, but you have provided as many waypoints as we can handle');
				} else {
					alert('Something went wrong fetching the directions: ' + status);
				}
				//me.currentRoute = null;
				//me.map.setOptions({ disableDoubleClickZoom: false });
			}
		};
		me.printConfirmBttn = function(){
			if ( !me.confirmBttn ) {
				me.confirmBttn = $('<button />', { id: 'add_commute_confirm', text: 'Route is correct' })
					.click(me.confirmClick)
					.insertBefore( me.cont );
			} else {
				me.confirmBttn.show();
			}
		};
		me.confirmClick = function(){
			//everything is alright, so submit the form
			//console.log('confirmation clicked', me.form.serialize(), me.waypoints );
			if ( me.waypoints.length )
				me.form.find('[name="waypoints"]').val( JSON.stringify( me.waypoints ) );
	              $.post(window.location.href, $('#add_commute_form').serialize())
		};
		*/

		me.setupConstants();
		return me;
	}

	window['GuruMap'] = GuruMap;

})(jQuery);


(function($){
	
	var GuruTwitter = function(config){
		var me = this,
			defaults = {
				screen_name: 'hicarlosangon',
				container_selector: '.twitter-feed',
				include_rts: true, //return retweets
				include_entities: true,  //include extra metadata
				trim_user: false, //only include user id in tweet object if set to true
				tweet_limit: 3,
				trans_time: 250,
				interval: 45000,
				local_url: Guru.TemplateUrl+'/twitter/twitter-feed.php', 
				api_url: 'http://api.twitter.com/1/statuses/user_timeline.json'
			};
			
		for (var key in config) {
			defaults[key] = config[key] || defaults[key];
		}
	
		for (var key in defaults) {
			me[key] = defaults[key];
		}
	
		me.container = [];
		me.REQUESTS = [];
		me.TWEETS = {};
		me.TWEETS_ON_PAGE = [];
		me.SINCE_ID = null;
		me.FIRST_CALL = true;
		me.TIMEOUT = null;
		me.init();
	};
	
	GuruTwitter.prototype.init = function(){		
		this.container = $(this.container_selector);
		
		if (!this.container.length)
			return false;
				
		return this.makeApiCall();
	};
	
	//return a simple link string
	GuruTwitter.prototype.makeLink = function( href, text, blank ){
		if( !blank ){
			var blank = '';
		} else {
			var blank = ' target="_blank"';
		}
		
		return '<a href="'+href+'"'+blank+'>'+text+'</a>';
		
	};
	
	GuruTwitter.prototype.makeApiCall = function(){
		var me = this;
		

		var apiError = function(data, textStatus, errorThrown){
			console.log('something went wrong with the twitter widget', data, textStatus, errorThrown, me.REQUESTS);
		};
		
		var removeLoading = function(){
			me.container.removeClass('loading');
			me.REQUESTS.pop();
			//console.log( me.REQUESTS );
			return me.TIMEOUT = setTimeout( function(){ me.makeApiCall.call(me) }, me.interval );
		}
		
		var tweetBlock = null;
		
		var apiSuccess = function(json, textStatus, jqXHR){
			//console.log( 'API SUCCESS', json);
			if (me.FIRST_CALL){
				me.FIRST_CALL = false;
			}
			
			if( json.length ) {
				tweetBlock = $('<div />').addClass('tweetBlock').prependTo( me.container );		
				$.each( json, makeTweet );
				me.SINCE_ID = json[0].id;
			}
			
						
			//return me.TIMEOUT = setTimeout( function(){ me.makeApiCall.call(me) }, me.interval );
		};

		var parseTweet = function( tweet ){
			//check for urls in the tweet
			if( tweet.entities ){
				if( tweet.entities.urls.length ){
					$.each(tweet.entities.urls, function(i){
						tweet.text = tweet.text.replace( this.url, me.makeLink( this.expanded_url, this.url, true ) );
					});
				}
			}
			
			return tweet.text;
		};

		var makeTweet = function(i){
			if( i === me.tweet_limit )
				return false;
							
			if ( !me.TWEETS[ this.id ] ) {
				me.TWEETS[ this.id ] = this;
								
				if( me.TWEETS_ON_PAGE.length >= me.tweet_limit ){
					me.TWEETS_ON_PAGE.shift().slideUp( me.trans_time, function(){
						console.log( $(this), $(this).siblings().length );
						if ( !$(this).siblings().length ){
							$(this).parent().remove();
						} else {
							$(this).remove();
						}
					});
				}
				if( tweetBlock ) {
					//var tweet = $('<div />', { html: this.text })
					var tweet = $('<div />', { html: parseTweet( this ) })
						.addClass('tweet')
						.hide()
						.appendTo( tweetBlock );
					tweet.slideDown( me.trans_time );
					me.TWEETS_ON_PAGE.push( tweet );
				}
			}
		};

		return me.REQUESTS.push( $.ajax({
				url: me.local_url+'?',
				data: { 
					"screen_name": me.screen_name, 
					"api_url": me.api_url+'?'+me.makeRequestStr()
				},
				async: true,
				dataType: 'json',
				error: apiError,
				success: apiSuccess,
				complete: removeLoading
			}) 
		);
		
	};
			
	GuruTwitter.prototype.makeRequestObj = function(){
		var me = this,
			obj = {
			screen_name: me.screen_name,
			include_rts: me.include_rts,
			include_entities: me.include_entities,
			trim_user: me.trim_user
		};
		
		return obj;
	};

	GuruTwitter.prototype.makeRequestStr = function(){
		var me = this,
			obj = me.makeRequestObj();
		
		var str = '';
		
		for ( var key in obj ){
			str += '&'+key+'='+obj[key];
		}
		
		return str;
	};

	
	window['GuruTwitter'] = GuruTwitter;
	
	
})(jQuery);




(function($){

	var GuruSlider = function(config){
		var me = this,
			defaults = {
				container: [],
				slider: [],
				transition_time: 500,
				timeout_time: 2000,
				vertical: false
			};
			
		for (var key in config) {
			defaults[key] = config[key] || defaults[key];
		}
	
		for (var key in defaults) {
			me[key] = defaults[key];
		}
		
		//me.slides = [];
		
		me.current_slide = [];
		me.current_left = 0;
		me.current_top = 0;
		
		me.running = false;
		
		me.timeout_id = null;
		
		me.init();
		
	};
	
	GuruSlider.prototype.init = function(){
		
		if( !this.container.length || !this.slider.length || !this.slider.children().length )
			return false;
		
		
		//console.log('slider init', this.vertical);
		
		//tell the controller it is running
		this.running = true;
		
		//set the current slide
		this.current_slide = this.slider.children().first();
		
		//initialize the current left to start in the center of it all
		this.current_left = this.getCenter() - this.getSlideCenter();
		
		//initialize the current top to start at top of slider
		//this.current_top = 0;
		
		this.moveSlides();
				
		//console.log( this.getSlideCenter(), 'center' );
		
	};
	
	GuruSlider.prototype.getCenter = function(){
		return Math.floor( this.container.width() / 2 );
		
//		return ( this.vertical ?
//			Math.floor( this.container.height() / 2 ) :
//			Math.floor( this.container.width() / 2 )
//		);
	};
	
	GuruSlider.prototype.getSlideCenter = function(){
		return Math.floor( this.current_slide.outerWidth() / 2 );
	};
	
	GuruSlider.prototype.moveSlides = function(){
		var me = this,
			animateConfig = ( this.vertical ? 
				{ top: this.current_top } :
				{ left: this.current_left }
			);
					
		//console.log( me );
		//return me.slider.stop( true, true ).animate({ left: this.current_left }, this.transition_time, function(){ me.timeoutFunction.call( me ) });
		return me.slider.stop( true, true ).animate( animateConfig , this.transition_time, function(){ me.timeoutFunction.call( me ) });
	};
	
	GuruSlider.prototype.shiftSlide = function(){
		//width of the first slide
		var first = this.slider.children().first(),
			w = first.outerWidth(),
			h = first.outerHeight();
		
		//console.log( 'shift Slide', h, this.current_top, this.current_top + h );
		
		//condition to determine if slide is hidden
		if( !this.vertical && this.current_left + w <= 0 ) {
			//insert it after the last one
			first.appendTo( this.slider );
			this.current_left = this.current_left + w;
			this.slider.css({ left: this.current_left });
		} else if ( this.current_top + h <= 0 ) {
			first.appendTo( this.slider );
			this.current_top = this.current_top + h;
			this.slider.css({ top: this.current_top });
		}
	};
	
	GuruSlider.prototype.setNewLeft = function(){
		
		//return this.current_left - this.getCenter() + this.current_slide.position().left - this.getSlideCenter();
		return this.getCenter() - ( this.current_slide.position().left + this.getSlideCenter() );
	};
	GuruSlider.prototype.setNewTop = function(){
		return this.current_slide.position().top * -1;
	};
	
	GuruSlider.prototype.timeoutFunction = function(){
		var me = this;

		//console.log( me, 'timeout function' );

		//if first slide is not visible, shift it to the end
		me.shiftSlide();


		//set current_slide
		if( me.current_slide.next().length ) {
			me.current_slide = me.current_slide.next();
		} else {
			//DO SOMETHING IF THERE IS NOT A NEXT SLIDE
			me.current_slide = me.slider.children().first();
		}		
		

		//set the new target left
		//me.current_left = me.current_left - me.current_slide.outerWidth();
		//me.current_left = me.current_left + me.current_slide.position().left * -1/2;
		//console.log( 'offset left', me.current_slide.position().left, me.current_left )
		
		if( !me.vertical ){
			me.current_left = me.setNewLeft();
		} else {
			me.current_top = me.setNewTop();
		}
		
		
		//animate it
		me.timeout_id = setTimeout( function(){ me.moveSlides.call(me) }, me.timeout_time );
	};
	
	window['GuruSlider'] = GuruSlider;
	
	
	var GuruSliderController = function(config){
		var me = this,
			defaults = {
				sliders: [],
				/**
				sliders: [
					{ 	container_selector: '#slider',
						slider_selector: '.slides',
						transition_time: 500,
						timeout_time: 2000
					},
					{	container_selector: '#sliderNo2',
						slider_selector: '.slidesClassButDifferent',
						transition_time: 800,
						timeout_time: 4000
					}
				]
				*/
				container_selector: '#slider',
				slider_selector: '.slides',
				transition_time: 500,
				timeout_time: 2000
			};
			
		for (var key in config) {
			defaults[key] = config[key] || defaults[key];
		}
	
		for (var key in defaults) {
			me[key] = defaults[key];
		}
		
		me.init();
		
		return;
	};

	GuruSliderController.prototype.init = function(){
		//sliders is array of init variables
		if ( this.sliders.length ) {
			for ( var i=0, j=this.sliders.length; i < j; i++ ){
				//find the jquery container
				this.sliders[i].container =	$( this.sliders[i].container_selector );
				//find the slider container
				this.sliders[i].slider = 	this.sliders[i].container.find( this.sliders[i].slider_selector );
				//make a new instance and track it in the sliders array
				this.sliders[i] = 			new GuruSlider( this.sliders[i] );
			}
		} else {
			//use the defaults and make a new instance for every slider on the page that matches that selector
			//cache scope
			var me = this;
			//iterate through jquery objects
			$( me.container_selector ).each(function(i){
				//track each instantiated slider
				me.sliders.push( 
					new GuruSlider({
						container:			$(this),
						slider:				$(this).find( me.slider_selector ),
						transition_time: 	me.transition_time,
						timeout_time:		me.timeout_time
					})
				);
			});
		}
		
	};

	window['GuruSliderController'] = GuruSliderController;

	
})(jQuery);


(function($){
	
	var GuruRotator = function(config){
		var me = this,
			defaults = {
				contID: 'rotator',
				sliderClass: 'slides',
				controlsClass: 'controls',
				nextText: '>>',
				prevText: '<<',
				z: 1, //z-index set to 1 in css for the slides
				transitionTime: 1000,
				gidAtt: 'gid', //attribute to look for on the controls
				timeoutTime: 7500,
				showControls: false, //false, true, or 'binary'.  'binary' will print out the controls as prev/next only
				linkTo: false,
				linkClickCallback: function(){},
				autoRotate: false, //set to true to start the rotation automatically.  key if you just instantiate the rotator and not the controller
				appendControlsTo: false //css selector.  if set, the controls get appended to a specific element
			};
			
		for (var key in config) {
			defaults[key] = config[key] || defaults[key];
		}
	
		for (var key in defaults) {
			me[key] = defaults[key];
		}
		
		//unconfigurable variables		
		me.container = null;
		me.slider = null;
		me.slides = null;
		me.controls = null;
		me.sliderTimeout = null;
		
		me.currentSlide = [];
		me.nextSlide = null;
		
		me.binaryControls = null;
		
		me.RUNNING = false;
		
		me.other = false;
		
		me.init = function(){
			if( $('#'+me.contID).length ){
				//initialize variables
				me.container = $('#'+me.contID);
				me.slider = me.container.find('.'+me.sliderClass);
				me.slides = me.slider.children(); 
																
				//print controls
				me.controls = me.makeControls();
				
				//the last slide is the one that shows onload
				me.controls.children().last().addClass('active');
				me.slides.last().addClass('active');
				
				me.currentSlide = me.slides.last().fadeTo( me.transitionTime, 1);;
				
				//so set all the others to 0 opacity
				me.slides.not('.active').fadeOut(0);

				//only rotate if the slider is visible
				$(window).resize(me.onResize);
				
				//'trigger it'
				me.onResize();
				
				me.RUNNING = true;
			}
			
			return me;
		};
		
		me.isRunning = function(){
			return me.RUNNING;
		};
		
		me.onResize = function(e){
			
			if ( me.container.is(':visible') ) {
				//start the change timer
				if( !me.sliderTimeout && me.autoRotate )
					me.sliderTimeout = setTimeout( me.sliderTimeoutFunc, me.timeoutTime );
			} else {
				if ( me.sliderTimeout && me.autoRotate ) {
					clearTimeout( me.sliderTimeout );
					me.sliderTimeout = null;
					//console.log( 'timeout cleared', me.sliderTimeout );
				}
			}
		}
		
		me.makeControls = function(){
			var ctrls = $('<div />').addClass( me.controlsClass );
			
			//make a selector for each slide
			me.slides.each(function(i){
				var gid = $(this).attr(me.gidAtt);
				var ctrl = $('<div />', { text: i+1 }).attr( me.gidAtt, gid ).click(me.ctrlClickHandle).appendTo( ctrls );
			});
			
			//do we want to show binary controls?
			if ( !me.showControls || me.showControls === 'binary' )
				ctrls.hide();
			
			if ( me.showControls === 'binary' )
				me.binaryControls = me.makeBinaryControls();
			
			//ctrls.appendTo(me.container);
			//this functionality was added for UPAL to have controls in a flag.
			if ( me.appendControlsTo && $(me.appendControlsTo).length ) {
				ctrls.appendTo( me.appendControlsTo );
			} else {
				ctrls.appendTo(me.container);
			}
			
			return ctrls;

		};
		
		me.makeBinaryControls = function(){
			var ctrls = $('<div />').addClass( me.controlsClass );
			
			//make prev/next selctors to switch through the slides
			$('<span />', { text: me.prevText }).addClass('prev').click(me.binaryCtrlClickHandle).appendTo( ctrls );		
			$('<span />', { text: me.nextText }).addClass('next').click(me.binaryCtrlClickHandle).appendTo( ctrls );		
			
			ctrls.appendTo( me.container );
			
			return ctrls;
		};
		
		me.ctrlClickHandle = function(e){
			var gid = $(this).attr(me.gidAtt)
			
			me.slideChange( gid );
			
			return me.linkClickCallback( gid, me.linkTo );
		}
		
		//the numbered controls are still there, so click on a back or forward looks at those controls to decide which one is next
		me.binaryCtrlClickHandle = function(e){
			//find the next slide gid in the list (of the actual numbered controls)
			var gid = ( $(this).hasClass('prev') ?
						//go back
						me.getPreviousSlide().attr(me.gidAtt) :
						//go forward
						me.getNextSlide().attr(me.gidAtt)
					);
			
			me.slideChange( gid );
			
			return me.linkClickCallback( gid, me.linkTo );
		};

		me.getNextSlide = function(){
			return ( me.currentSlide.next().length ? 
							me.currentSlide.next() : 
							me.currentSlide.parent().children().first() );
		};
		me.getPreviousSlide = function(){
			return ( me.currentSlide.prev().length ? 
							me.currentSlide.prev() : 
							me.currentSlide.parent().children().last() );
		};
				
		me.slideChange = function( gid ){
			//var gid = ctrl.attr( me.gidAtt );
			
			var ctrl = me.getControlByID( gid );
			
			if ( !ctrl.hasClass('active') ) {
				//clear the timeout transition.  this will allow us to essentially reset the change timer
				if( me.sliderTimeout )
					clearTimeout( me.sliderTimeout);
				
				//increment the target z-index up by one
				me.z++;
				
				//get the target slide
				me.nextSlide = me.getSlideByID( gid );

				//switch to the new slide
				me.fadeChange();
				
												
				//turn off the old one
				me.controls.find('.active').removeClass('active');
				//turn on the corresponding control circle
				ctrl.addClass('active');

//				//known bug in Sizzle engine with .siblings() when using a selector.  returns empty array.
//				//turn on the corresponding control circle
//				ctrl.addClass('active')
//					//and turn off the old one
//					.siblings('.active').removeClass('active');
					
				//start the change timer
				return ( me.autoRotate ? me.sliderTimeout = setTimeout( me.sliderTimeoutFunc, me.timeoutTime ) : true );
			}
		};
				
		me.fadeChange = function(){
			if ( !me.nextSlide ) return false;
						
			//stop the animation if one is fading in
			me.slider.find( me.currentSlide ).stop(false, false);
			
			//finish the animation for those that are fading out (all not active slides are told to fade out everytime)
			me.slides.not( me.nextSlide ).stop(true,false);
			
			//set this one as active to signify that it is fading in.
			me.nextSlide.addClass('active')
				//move it to the top
				.css({ zIndex: me.z })
				//clear its animation queue cause we are using setTimeout and might have a stacked queue
				.stop(true,true)
				//fade it in
				.fadeTo( me.transitionTime, 1)
			
			//get all the other slides
			me.slides.not( me.nextSlide )
				//clear its animation queue cause we are using setTimeout and might have a stacked queue
				.stop(true,true)					
				//tell them to get to zero opacity
				.fadeOut(me.transitionTime)
				//and tell them that none of them are fading in
				.removeClass('active');
					
			//set the new active		
			me.currentSlide = me.nextSlide;
			me.nextSlide = null;	
		};
		
		//used in the controller
		me.getControlByID = function( gid ){
			if ( !gid ) return false;
			return me.controls.find('['+me.gidAtt+'="'+gid+'"]');	
		};

		me.getSlideByID = function( gid ){
			if ( !gid ) return false;
			return me.slider.find('['+me.gidAtt+'="'+gid+'"]');	
		};

		
		//set up the timeout change function
		me.sliderTimeoutFunc = function(){
			return me.slideChange( me.getNextSlide().attr(me.gidAtt) );
		};
				
		return me.init();		
	}
	
	//expose to window
	window['GuruRotator'] = GuruRotator;
	
	
	//class to control the timeouts on multiple GuruRotators to keep them in sync
	function GuruRotatorController(config){
		
		var me = this,
			defaults = {
				rotatorsConfig: [],
				timeoutTime: 7500
			};
			
		for (var key in config) {
			defaults[key] = config[key] || defaults[key];
		}
	
		for (var key in defaults) {
			me[key] = defaults[key];
		}
		
		me.rotators = {};
		me.sliderTimeout = null;
		
		me.init = function(){
			//rotators should be init objects.  lets start them.
			if( typeof me.rotatorsConfig === 'object' && me.rotatorsConfig.length ){
								
				$.each( me.rotatorsConfig, me.startRotator );
							
				me.sliderTimeout = setTimeout( me.sliderTimeoutFunc, me.timeoutTime );
			}
				
			return me;	
		};
		
		me.startRotator = function(i){			
			//we want to connect the linked clicks
			if( this.linkTo )
				this.linkClickCallback = me.linkClickCallback;
						
			me.rotators[this.contID] = new GuruRotator( this );
		};
		
		me.sliderTimeoutFunc = function(){
			//clear the timeout
			clearTimeout( me.sliderTimeout );
			//rotate each instance
			$.each( me.rotators, me.rotateInstance );
			//reset the timeout
			return me.sliderTimeout = setTimeout( me.sliderTimeoutFunc, me.timeoutTime );
		};
		
		me.rotateInstance = function(i){
			//this is the instance.  fading and changing takes processing power, 
			//	and on mobile layouts, I often hide these rotators.  so do a check
			if( !this.autoRotate && this.RUNNING && this.container.is(':visible') )
				this.slideChange( this.getNextSlide().attr(this.gidAtt) );
			
			return true;
		};
		
		//this is what links the rotators together.  ctrl is element that was clicked, id is the contID that instance is linked to (rotator.linkTo)
		me.linkClickCallback = function( gid, linkTo ){
									
			//only do this if the instance is linked to another
			if ( !gid || !linkTo )
				return false;
			
			//clear the timeout
			clearTimeout( me.sliderTimeout );
			
			//the instance where the call is coming from
			var rotator = this;

			//find the linked instance in the rotators array
			var other = me.rotators[ linkTo ];
			
			//make sure it is running
			if( typeof other === 'object' && other.isRunning() ){
				//get the linked ctrl
				other.slideChange( gid );
			}
			
			return me.sliderTimeout = setTimeout( me.sliderTimeoutFunc, me.timeoutTime );
		};
		
		return me.init();
	}
	
	window['GuruRotatorController'] = GuruRotatorController;
	
})(jQuery);
