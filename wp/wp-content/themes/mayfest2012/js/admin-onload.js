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
		
		datePickers();
	});
	

	function datePickers(){
		if( $('.mayfest_event_day').length ){
			$('.mayfest_event_day').datepicker({
				dateFormat : 'mm-dd-yy'
			});
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
					//console.log( 'data gotten', data );
					
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