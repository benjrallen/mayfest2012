<?php
/**
 * The template for displaying Category Archive pages.
 *
 * @package WordPress
 * @subpackage Boilerplate
 * @since Boilerplate 1.0
 */

get_header(); ?>

<article class="hentry">
		<header class="parent-title">
			<h1 class="entry-title">
				<span class="icon"></span>
				<span><?php
					printf( __( 'Event Type: %s', 'boilerplate' ), '' . single_cat_title( '', false ) . '' );
				?></span>
			</h1>
		</header>
</article>
				<?php
					//$category_description = category_description();
					//if ( ! empty( $category_description ) )
					//	echo '' . $category_description . '';

				/* Run the loop for the category page to output the posts.
				 * If you want to overload this in a child theme then include a file
				 * called loop-category.php and that will be used instead.
				 */
				 
				 
//			    query_posts(array(
//			    	//'paged' => get_query_var('page'),
//					'post_type' => 'mayfest_event'
//			    ));


				get_template_part( 'loop', 'event' );
				?>
<?php get_footer(); ?>