<?php

  $cat_id = get_post_meta($post->ID, 'mayfest_attraction_category_id', true);

  //echo $cat_id;

  if( isset($cat_id) ){

  	echo '<div class="clearfix"></div>';
  
    query_posts(array(
      'paged' => get_query_var('paged'),
      'post_type' => 'mayfest_attraction',
    	'tax_query' => array(
    		//'relation' => 'AND',
    		array(
    			'taxonomy' => 'attraction_category',
    			'field' => 'id',
    			'terms' => $cat_id
    			//'operator' => 'IN'
    		)
    	)      
    ));
    
    //if( have_posts() ) : while( have_posts() ) : the_post();

      //echo '<br /><br />';
      //print_r( $post);
      
      get_template_part('loop', 'attraction');
    
    //endwhile; endif;
  }
  
?>