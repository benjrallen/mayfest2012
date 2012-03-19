<?php
/**
 * The loop that displays posts.
 *
 * The loop displays the posts and the post content.  See
 * http://codex.wordpress.org/The_Loop to understand it and
 * http://codex.wordpress.org/Template_Tags to understand
 * the tags used in it.
 *
 * This can be overridden in child themes with loop.php or
 * loop-template.php, where 'template' is the loop context
 * requested by a template. For example, loop-index.php would
 * be used if it exists and we ask for the loop with:
 * <code>get_template_part( 'loop', 'index' );</code>
 *
 * @package WordPress
 * @subpackage Boilerplate
 * @since Boilerplate 1.0
 */
?>

<?php if ( have_posts() ) : ?>

  <section id="pageLoop" class="sponsors">

    <?php /* Display navigation to next/previous pages when applicable */ ?>
    <?php 
      //if ( $wp_query->max_num_pages > 1 )
      if( function_exists('guruPagination') )
        guruPagination( $wp_query->max_num_pages );

    ?>

<?php while ( have_posts() ) : the_post(); ?>

<?php /* How to display posts in the Gallery category. */ ?>

		<div id="post-<?php the_ID(); ?>" class="sponsor">


			<?php

				$custom_url = get_post_meta($post->ID, 'guru_sponsor_link', true);				
				$pageUrl = ( !empty($custom_url) ? $custom_url : get_permalink( $post->ID ) );
									
				$blank = (!empty($custom_url) ? ' target="_blank"' : '');
				
				echo '<div class="line"></div>';
				echo '<a href="'.$pageUrl.'" class="link" title="'.get_the_title().'"'.$blank.'>';
	

				if( has_post_thumbnail() ){														
					$thumbID = get_post_thumbnail_id($post->ID);
					$thumbTitle = get_the_title( $thumbID );
					$thumbSrc = wp_get_attachment_image_src( $thumbID, 'sponsor-thumb' );
					$banner = array(
						'url' => $thumbSrc[0],
						'width' => $thumbSrc[1],
						'height' => $thumbSrc[2]
						
					);
										
					echo '<div class="pic">';
						echo '<img src="'.$banner['url'].'" width="'.$banner['width'].'" height="'.$banner['height'].'" />';
						// echo '<div><span>'.$thumbTitle.'</span></div>';
					echo '</div>';
				} else {
					
					echo '<h2 class="entry-title">';
					echo get_the_title();
					echo '</h2>';
				}
				
				echo '</a>';
			?>
			
			<div class="clearfix"></div>
		</div><!-- #post-## -->



<?php endwhile; // End the loop. Whew. ?>

	<?php /* Display navigation to next/previous pages when applicable */ ?>
	<?php
    if( function_exists('guruPagination') )
      guruPagination( $wp_query->max_num_pages );
	?>

</section>

<?php endif; ?>