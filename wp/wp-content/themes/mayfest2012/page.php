<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the wordpress construct of pages
 * and that other 'pages' on your wordpress site will use a
 * different template.
 *
 * @package WordPress
 * @subpackage Boilerplate
 * @since Boilerplate 1.0
 */

get_header(); ?>

<?php //get_sidebar(); ?>

<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>
	
	<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
		<header class="parent-title">
			<h1 class="entry-title">
				<span class="icon"></span>
				<span><?php the_title(); ?></span>
			</h1>
		</header>
		<div class="entry-content">
			<?php
				if( has_post_thumbnail() ){														
					$thumbID = get_post_thumbnail_id($post->ID);
					$thumbTitle = get_the_title( $thumbID );
					$thumbSrc = wp_get_attachment_image_src( $thumbID, 'page-thumb' );
					$banner = array(
						'url' => $thumbSrc[0],
						'width' => $thumbSrc[1],
						'height' => $thumbSrc[2]
						
					);
										
					echo '<div class="pic">';
						echo '<img src="'.$banner['url'].'" width="'.$banner['width'].'" height="'.$banner['height'].'" />';
						// echo '<div><span>'.$thumbTitle.'</span></div>';
					echo '</div>';
				}
			?>

			<div class="entry-full">
				<?php 
					$readMore = '<a href="'.get_permalink().'" class="base bttn page-read-more" title="Read More">Read More</a>';
					the_content($readMore);
				?>
			</div>
			
			<div class="clearfix"></div>
		</div><!-- .entry-content -->
	</article><!-- #post-## -->
<?php endwhile; ?>

<?php get_template_part('attraction-category', 'loop'); ?>
<?php get_template_part('event-category', 'loop'); ?>

<?php //get_template_part('front-page','sponsors-slider'); ?>

<div class="clearfix"></div>
<?php get_footer(); ?>