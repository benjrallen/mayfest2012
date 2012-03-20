<?php


	//echo $post->ID;
	
	global $prefix;
	
  //echo $cat_id;

  //if( isset($cat_id) ){
  	//echo '<div class="clearfix"></div>';
  
    query_posts(array(
    	'paged' => get_query_var('page'),
		'post_type' => 'mayfest_event',
		'meta_key' => $prefix . 'event_day',
      	'orderby' => 'meta_value',
      	'order' => 'ASC',
	   	'meta_query' => array(
	   		//'relation' => 'AND',
	   		array(
	   			'key' => $prefix . 'attraction_uid',
	   			'value' => $post->ID
	   		)
	   	)      
    ));
    
      
    get_template_part('loop', 'event');
    
  //}
  
?>