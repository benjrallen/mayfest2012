(function($){
	
	//console.log( 'HI!', $, locationObject );
	
	
	$(document).ready(function(){
		
		//set api path
		var apiUrl = 'http://gurustudev.com/~ben/mayfest2012/api/',
			//find the button
			button = $('button.mayfestMigrate'),
			nonce = null,
			controller = 'mayfest_migration';
			//controller = 'posts';
		
		//get the nonce
		$.get( 
			apiUrl+'core/get_nonce', 
			{
				controller: controller,
				//controller: 'posts',
				method: 'create_post'
			},
			function(data){				
				if( data.nonce ){
					nonce = data.nonce;
					console.log('nonce gotten', data, nonce);
				} else {
					console.log('nonce NOT gotten', data, nonce);
				}
			}
		);
		
		
		button.click(function(e){
			if( !nonce ){
				alert('nonce not yet ready');
				return false;
			}
			
			//console.log( nonce, locationObject );
			
			create_location();
		});
		
		//uses custom_meta in the request to set custom meta fields
		function create_location(){
			if ( locationObject.length ){
				var obj = locationObject[locationObject.length - 1];
				
				console.log( 'creating', obj, locationObject.length );
				
				$.get(
					apiUrl + controller + '/create_post',
					//apiUrl + 'core/get_recent_posts',
					{
						nonce: nonce,
						type: 'mayfest_map_location',
						status: 'publish',
						title: obj.mayfest_ml_type+'-'+obj.mayfest_ml_id,
						custom_meta: obj
							
					},
					function( data ){
						//it worked, pop it and move on
						if ( data.status && data.status === 'ok' ) {
							console.log('gotten', data);
							locationObject.pop();
							return create_location();
						}
					}
				);
				
			} else {
				console.log('all finished!');
			}
		}
		
		//make simple request
//		$.get( apiUrl+'core/get_recent_posts', function(data){
//			console.log( data, button );
//		});
		
		
	});
	
	
})(jQuery);