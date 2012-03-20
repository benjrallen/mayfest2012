/*	Preface:  I know that this is some pretty ugly javascript, but this admin interface needs to get done pronto, so I copy, and thus I paste */

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
	
	$(document).ready(function(){
		
		
		locationSelect();
		attractionSelect();
		categorySelect();
		eventTypeSelect();
		
		datePickers();
	});
	

	function datePickers(){
		if( $('.mayfest_event_day').length ){
			$('.mayfest_event_day').datepicker({
				dateFormat : 'mm-dd-yy'
			});
		}
	}


	//uses json api plugin to get event types and fill in an autocomplete select box
	function eventTypeSelect(){
		if( $('#event_category_select').length ){

			//set api path.
			var apiUrl = GuruAdmin.TemplateDirectory + '/app_cache/',
				fieldName = 'mayfest_event_category_id',
				file = 'event_category.json',
				loadingMsg = $('<div />', {
								id: 'loadingMsg',
								html: 'Loading Attraction Categories...'
							 }),
				locSelect = $('<select />', {
								id: 'mayfestEventCategorySelect',
								html: '<option value="">Choose One:</option>'
							 }),
//				toggle = $('<button />', { id:"comboToggle", text: 'Show underlying select' }),
				//find the input of interest
				locInput = $('#event_category_select').find('input[name="'+fieldName+'"]'),
				currentVal = parseInt(locInput.val(), 10);


			//hide input
			locInput.hide();

			//show a loading message
			loadingMsg.insertAfter(locInput);
			//

			//make a simple call
			$.get( 
				apiUrl + file,
				function(data){

					//hide the loading message
					loadingMsg.hide();

					data = flattenNestedData( data, 'children' );

					$.each(data, makeOption);

					//console.log( 'data gotten', data);

					locSelect.insertAfter( locInput ).change(function(e){
						locInput.val( $(this).val() );
					}).combobox();


					//console.log( 'data gotten', data, locSelect );

//					toggle.insertAfter(locSelect).click(function(){
//						locSelect.toggle();
//					});		
				}
			);

			//this is used to flatten the nested category data used for the sencha app
			var flattenNestedData = function( data, childKey ){

				var flatData = [];

				var extractChildren = function(i){
					flatData.push( this );
					if( this[childKey] && this[childKey].length )
						$.each( this[childKey], extractChildren );
				};

				if( data[childKey] && data[childKey].length )
					$.each( data[childKey], extractChildren);

				return flatData;
			}


			var makeOption = function(){
				var opt = $('<option />', {
								value: this.term_id,
								text: this.name
						  });

				if ( this.term_id == currentVal )
					opt.attr('selected', 'selected');

				opt.appendTo(locSelect);
			};

		}	
	}


	//uses json api plugin to get attractions and fill in an autocomplete select box
	function categorySelect(){
		if( $('#attraction_category_select').length ){

			//set api path.
			var apiUrl = GuruAdmin.TemplateDirectory + '/app_cache/',
				fieldName = 'mayfest_attraction_category_id',
				file = 'attraction_category.json',
				loadingMsg = $('<div />', {
								id: 'loadingMsg',
								html: 'Loading Attraction Categories...'
							 }),
				locSelect = $('<select />', {
								id: 'mayfestAttractioCategorySelect',
								html: '<option value="">Choose One:</option>'
							 }),
//				toggle = $('<button />', { id:"comboToggle", text: 'Show underlying select' }),
				//find the input of interest
				locInput = $('#attraction_category_select').find('input[name="'+fieldName+'"]'),
				currentVal = parseInt(locInput.val(), 10);


			//hide input
			locInput.hide();

			//show a loading message
			loadingMsg.insertAfter(locInput);
			//

			//make a simple call
			$.get( 
				apiUrl + file,
				function(data){

					//hide the loading message
					loadingMsg.hide();

					data = flattenNestedData( data, 'children' );

					$.each(data, makeOption);



					locSelect.insertAfter( locInput ).change(function(e){
						locInput.val( $(this).val() );
					}).combobox();


					//console.log( 'data gotten', data, locSelect );

//					toggle.insertAfter(locSelect).click(function(){
//						locSelect.toggle();
//					});		
				}
			);

			//this is used to flatten the nested category data used for the sencha app
			var flattenNestedData = function( data, childKey ){
				
				var flatData = [];
				
				var extractChildren = function(i){
					flatData.push( this );
					if( this[childKey] && this[childKey].length )
						$.each( this[childKey], extractChildren );
				};

				if( data[childKey] && data[childKey].length )
					$.each( data[childKey], extractChildren);

				return flatData;
			}


			var makeOption = function(){
				var opt = $('<option />', {
								value: this.term_id,
								text: this.name
						  });

				if ( this.term_id == currentVal )
					opt.attr('selected', 'selected');

				opt.appendTo(locSelect);
			};

		}	
	}


	//uses json api plugin to get attractions and fill in an autocomplete select box
	function attractionSelect(){
		if( $('#map_attraction_select').length ){
						
			//set api path.
			var apiUrl = GuruAdmin.TemplateDirectory + '/app_cache/',
				fieldName = 'mayfest_attraction_uid',
				file = 'mayfest_attraction.json',
				loadingMsg = $('<div />', {
								id: 'loadingMsg',
								html: 'Loading Map Locations...'
							 }),
				locSelect = $('<select />', {
								id: 'mayfestAttractionSelect',
								html: '<option value="">Choose One:</option>'
							 }),
//				toggle = $('<button />', { id:"comboToggle", text: 'Show underlying select' }),
				//find the input of interest
				locInput = $('#map_attraction_select').find('input[name="'+fieldName+'"]'),
				currentVal = parseInt(locInput.val(), 10);
			
			
			//hide input
			locInput.hide();
			
			//show a loading message
			loadingMsg.insertAfter(locInput);
			//
			
			//make a simple call
			$.get( 
				apiUrl + file,
				function(data){
					//console.log( 'data gotten', data, flatData );
					
					//hide the loading message
					loadingMsg.hide();
										
					$.each(data, makeOption);
					
					locSelect.insertAfter( locInput ).change(function(e){
						locInput.val( $(this).val() );
					}).combobox();
					
//					toggle.insertAfter(locSelect).click(function(){
//						locSelect.toggle();
//					});		
				}
			);
						
			var makeOption = function(){
				var opt = $('<option />', {
								value: this.id,
								text: this.title
						  });
						  
				if ( this.id === currentVal )
					opt.attr('selected', 'selected');
					
				opt.appendTo(locSelect);
			};
			
		}	
	}

	//uses json api plugin to get locations and fill in an autocomplete select box
	function locationSelect(){
		if( $('#map_location_select').length ){
						
			//set api path.
			var apiUrl = GuruAdmin.TemplateDirectory + '/app_cache/',
				fieldName = 'mayfest_ml_uid',
				file = 'mayfest_map_location.json',
				loadingMsg = $('<div />', {
								id: 'loadingMsg',
								html: 'Loading Map Locations...'
							 }),
				locSelect = $('<select />', {
								id: 'mayfestLocationSelect',
								html: '<option value="">Choose One:</option>'
							 }),
				//find the input of interest
				locInput = $('#map_location_select').find('input[name="'+fieldName+'"]'),
				currentVal = parseInt(locInput.val(), 10);
			
			
			//hide input
			locInput.hide();
			
			//show a loading message
			loadingMsg.insertAfter(locInput);
			
			//make a simple call
			$.get( 
				apiUrl + file,
				function(data){
					//hide the loading message
					loadingMsg.hide();
					
					$.each(data, makeOption);
					
					locSelect.insertAfter( locInput ).change(function(e){
						locInput.val( $(this).val() );
					}).combobox();
					
				}
			);
			
			var makeOption = function(){
				var opt = $('<option />', {
								value: this.id,
								text: this.title
						  });
				
				if ( this.id === currentVal )
					opt.attr('selected', 'selected');
					
				opt.appendTo(locSelect);
			};
			
		}	
	}
	
})(jQuery);