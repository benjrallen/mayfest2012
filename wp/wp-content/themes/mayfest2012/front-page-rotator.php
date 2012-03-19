<section id="rotator">

<?php
	
	//define the menu location name set in functions.php
	$menu_name = 'fp-banners';
	
	//conditions for safety
	if ( ( $locations = get_nav_menu_locations() ) && isset( $locations[ $menu_name ] ) ) {
		$menu = wp_get_nav_menu_object( $locations[ $menu_name ] );
		$menu_items = wp_get_nav_menu_items( $menu->term_id );
		
		$menu_items = array_reverse( $menu_items );
		//$descriptions = array();
		
		echo '<div class="slides">';
		
		foreach( $menu_items as $item ){
			$pageID = $item->object_id;
			//page stuff was used when the page mattered...
			$pageTitle = $item->title;

			$custom_url = get_post_meta($pageID, 'mayfest_banner_link', true);				
			$pageUrl = ( !empty($custom_url) ? $custom_url : $item->url );
			$post_type = $item->object;
			
			if (class_exists('MultiPostThumbnails') && MultiPostThumbnails::has_post_thumbnail($post_type, 'fp-banner', $pageID)) {						
				//page stuff was used for eis.			
				//$page = get_page( $pageID, OBJECT, 'display' );
				//$pageExcerpt = $page->post_excerpt;
				
				$thumbID = MultiPostThumbnails::get_post_thumbnail_id( $post_type, 'fp-banner', $pageID );
				//get the post of the attachment to get caption(excerpt), title, description(content)
				$thumbPost = get_post( $thumbID );
				//print_r( $thumbPost );
				$thumbTitle = $thumbPost->post_title;
				//$thumbCaption = $thumbPost->post_caption;
				
				$thumbSrc = wp_get_attachment_image_src( $thumbID, 'banner' );
				$banner = array(
					'url' => $thumbSrc[0],
					'width' => $thumbSrc[1],
					'height' => $thumbSrc[2]
				);
				
				$blank = (!empty($custom_url) ? ' target="_blank"' : '');
				
				echo '<div class="slide" gid="'.$pageID.'">';
					echo '<a href="'.$pageUrl.'" title="'.$pageTitle.'"'.$blank.'>';
						echo '<div class="line"></div>';
						echo '<img src="'.$banner['url'].'" width="'.$banner['width'].'" height="'.$banner['height'].'" />';
						echo '<div class="description">';
							echo '<span class="title">'.$thumbPost->post_title.'</span>';
							echo '<span class="caption">'.$thumbPost->post_excerpt.'</span>';
							echo '<div class="clearfix"></div>';
						echo '</div>';
					echo '</a>';
				echo '</div>';
																		
			}
			
		}//end foreach menu_items
		
		echo '</div>';//end #slides
		
	}
	//print_r( get_nav_menu_locations() );

?>

	<div class="clearfix"></div>
</section>