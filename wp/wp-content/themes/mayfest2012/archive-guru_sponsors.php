<?php
/**
 * The template for displaying Archive pages.
 *
 * Used to display archive-type pages if nothing more specific matches a query.
 * For example, puts together date-based pages if no date.php file exists.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Boilerplate
 * @since Boilerplate 1.0
 */

get_header(); ?>

<?php //get_sidebar(); ?>

<article class="hentry">
		<header class="parent-title">
			<h1 class="entry-title">
				<span class="icon"></span>
				<span>Sponsors</span>
			</h1>
		</header>
</article>


<?php
	/* Queue the first post, that way we know
	 * what date we're dealing with (if that is the case).
	 *
	 * We reset this later so we can run the loop
	 * properly with a call to rewind_posts().
	 */
	 
	 
	//query infinite number of posts for sponsors archive
	if (is_post_type_archive('guru_sponsors')){
		query_posts(array(
			'posts_per_page' => -1,
			'post_type' => 'guru_sponsors',
			'order' => 'ASC',
			'orderby' => 'menu_order date'
		));
	}
		
	if ( have_posts() )
		the_post();
?>
<?php
	/* Since we called the_post() above, we need to
	 * rewind the loop back to the beginning that way
	 * we can run the loop properly, in full.
	 */
	rewind_posts();
	/* Run the loop for the archives page to output the posts.
	 * If you want to overload this in a child theme then include a file
	 * called loop-archives.php and that will be used instead.
	 */
	 get_template_part( 'loop', 'sponsor' );
	 
	 
	 $page = get_page_by_title( 'Sponsors' );
?>

<article id="post-<?php echo $page->ID ?>" class="hentry">
	<div class="entry-content clearfix">
		<div class="entry-full">
			<?php 
				echo apply_filters('the_content', $page->post_content);
			?>
		</div>		
	</div><!-- .entry-content -->
</article><!-- #post-## -->


<div class="clearfix"></div>
<?php get_footer(); ?>