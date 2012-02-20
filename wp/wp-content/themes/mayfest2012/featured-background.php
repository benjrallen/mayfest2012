<?php

	/* Grab the featured image and print out data on page in hidden div */
	/* This runs within the loop */
	
	//this is only set to draw the image off the home page if it is not otherwise set
	//$postID = ( is_page() ? $post->ID : ( is_single() ? 212 : 27 ) );
	$homeID = 2;
	
	$postID = ( is_page() ? $post->ID : $homeID );
	$post_type = get_post_type( $postID );
	
	if (class_exists('MultiPostThumbnails')) {
		//check to see if page-background is defined if not, fall back to home page's definition
		if ( !MultiPostThumbnails::has_post_thumbnail($post_type, 'page-background', $postID) ) {
			$postID = $homeID;
			$post_type = get_post_type( $postID );
		}
		
		//grab the image
		if ( MultiPostThumbnails::has_post_thumbnail($post_type, 'page-background', $postID) ) {
			$thumbID = MultiPostThumbnails::get_post_thumbnail_id( $post_type, 'page-background', $postID );
			//get the post of the attachment to get caption(excerpt), title, description(content)
			//$thumbPost = get_post( $thumbID );
			//print_r( $thumbPost );
			//$thumbTitle = $thumbPost->post_title;
			//$thumbCaption = $thumbPost->post_caption;
			
			$thumbSrc = wp_get_attachment_image_src( $thumbID, 'full' );
			$background = array(
				'url' => $thumbSrc[0],
				'width' => $thumbSrc[1],
				'height' => $thumbSrc[2]
			);

			$wrap = 960;  //$base-width defined in sass/partials/_base.scss
			$style = //'width:'.$background['width'].'px;'.
					'height:'.$background['height'].'px;'.
					'background:url('.$background['url'].') no-repeat top center;';

			echo '<div id="bgPhoto" style="'.$style.'"></div>';

		}
	}
	
		
?>