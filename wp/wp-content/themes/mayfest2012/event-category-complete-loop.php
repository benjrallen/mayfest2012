<?php

	/* This template part is used to get all of the Events in any event category, and is used on the page-event-guide template */

  //$cat_id = get_post_meta($post->ID, 'mayfest_event_category_id', true);

  //echo $cat_id;

  //if( isset($cat_id) ){
    //$cat = get_term( $cat_id, 'attraction_category' );
      
    //print_r( $cat );
  
  
    query_posts(array(
      'paged' => get_query_var('page'),
      'post_type' => 'mayfest_event',
      'posts_per_page' => -1
//    	'tax_query' => array(
//    		//'relation' => 'AND',
//    		array(
//    			'taxonomy' => 'event_category',
//    			'field' => 'id',
//    			'terms' => $cat_id
//    			//'operator' => 'IN'
//    		)
//    	)  
    ));
    
    //if( have_posts() ) : while( have_posts() ) : the_post();

      //echo '<br /><br />';
      //print_r( $post);
      
      get_template_part('loop', 'event');
    
    //endwhile; endif;
  //}
  
?>