<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query. 
 * E.g., it puts together the home page when no home.php file exists.
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Boilerplate
 * @since Boilerplate 1.0
 */

get_header(); ?>

			<?php
			/* Run the loop to output the posts.
			 * If you want to overload this in a child theme then include a file
			 * called loop-index.php and that will be used instead.
			 */
			 //get_template_part( 'loop', 'index' );
			?>

<?php /* Sidebar before rotator on owasso */ ?>

<?php get_template_part('front-page','sponsors-slider'); ?>

<article id="front-page-entry" <?php post_class(); ?>>

	<div class="col first">
		<div class="in">
			<nav id="fp-left">			
				<header>
					<h2>Mayfest</h2>
				</header>
				<?php 
					wp_nav_menu( array( 
						'theme_location' => 'fp-col-left',
						'link_before' => '<div class="line"></div><span class="icon"></span><strong>',
						'link_after' => '</strong>'
					)); 
				?>
			</nav><!-- #access -->
		</div>
	</div>
	<div class="col mid">
		<div class="in">
			<nav id="fp-mid">			
				<header>
					<h2>Get Involved!</h2>
				</header>
				<?php 
					wp_nav_menu( array( 
						'theme_location' => 'fp-col-mid'
					)); 
				?>
			</nav><!-- #access -->

			
			<?php
				//id for the page to draw content from
				$pageID = 190; //Applications page right now
				$pageTitle = 'Schedule'; //what to title the box
				$page = get_page($pageID);
				
				//print_r($page);
			?>
			<section class="entry">
				<header>
					<h2 class="entry-title"><?php echo apply_filters('the_title', $pageTitle ); ?></h2>
				</header>
				<div class="entry-content">
					<?php 
						echo apply_filters('the_content', $page->post_content); 
						echo '<a class="read-more" href="'.get_permalink($page->ID).'" title="'.apply_filters('the_title', $page->post_title).'">Apply</a>';
					?>
					<div class="clearfix"></div>
				</div>
			</section>			
		</div>
	</div>
	<div class="col last">
		<div class="in">
				<?php get_template_part('front-page', 'news'); ?>
				<?php get_template_part('front-page', 'twitter'); ?>
		</div>	
	</div>
<?php //if ( have_posts() ) : while( have_posts() ) : the_post(); ?>

<?php //the_content(); ?>

<?php //endwhile; endif; ?>

</article>

<?php //get_sidebar(); ?>

<div class="clearfix"></div>

<?php get_footer(); ?>