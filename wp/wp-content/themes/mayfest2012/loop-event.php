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

  <section id="pageLoop" class="events <?php echo ( is_single() ? 'single' : 'notSingle' ); ?>">

    <?php /* Display navigation to next/previous pages when applicable */ ?>
    <?php 
      //if ( $wp_query->max_num_pages > 1 )
      if( function_exists('guruPagination') )
        guruPagination( $wp_query->max_num_pages );

    ?>

<?php while ( have_posts() ) : the_post(); ?>

<?php /* How to display posts in the Gallery category. */ ?>

		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
			<h2 class="entry-title">
				<span class="icon"></span>
				<span><a href="<?php the_permalink(); ?>" title="<?php printf( esc_attr__( 'Permalink to %s', 'boilerplate' ), the_title_attribute( 'echo=0' ) ); ?>" rel="bookmark"><?php the_title(); ?></a></span>
			</h2>

			<div class="entry-time">
				<?php mayfest_event_time(); ?><?php mayfest_event_where(); ?>
			</div><!-- .entry-meta -->

	<?php if ( !is_single() || is_archive() || is_search() ) : // Only display excerpts for archives and search. ?>
			<div class="entry-summary">
				<?php //the_excerpt(); ?>
				<?php /* ?>
				<div class="clearfix"></div>
				<?php */ ?>
			</div><!-- .entry-summary -->
	<?php else : ?>
			<div class="entry-content">
				<?php the_content( __( 'Read More <span class="meta-nav">&rarr;</span>', 'boilerplate' ) ); ?>
				<?php wp_link_pages( array( 'before' => '<div class="page-link">' . __( 'Pages:', 'boilerplate' ), 'after' => '</div>' ) ); ?>
				<div class="clearfix"></div>
			</div><!-- .entry-content -->
	<?php endif; ?>

<?php /* ?>
			<footer class="entry-utility">
				<?php if ( count( get_the_category() ) ) : ?>
					<?php printf( __( 'Posted in %2$s', 'boilerplate' ), 'entry-utility-prep entry-utility-prep-cat-links', get_the_category_list( ', ' ) ); ?>
				<?php endif; ?>
				<?php
					$tags_list = get_the_tag_list( '', ', ' );
					if ( $tags_list ):
				?>
					|
					<?php printf( __( 'Tagged %2$s', 'boilerplate' ), 'entry-utility-prep entry-utility-prep-tag-links', $tags_list ); ?>
				<?php endif; ?>
				<?php edit_post_link( __( 'Edit', 'boilerplate' ), '| ', '' ); ?>
			</footer><!-- .entry-utility -->
<?php */ ?>
			<div class="clearfix"></div>
			<footer class="entry-utility">
	
				<div class="entry-meta">
					<?php mayfest_event_posted_in(); ?>
				</div><!-- .entry-meta -->
	
			</footer>
		</article><!-- #post-## -->



<?php endwhile; // End the loop. Whew. ?>

	<?php /* Display navigation to next/previous pages when applicable */ ?>
	<?php
    if( function_exists('guruPagination') )
      guruPagination( $wp_query->max_num_pages );
	?>
	
</section>

<?php endif; ?>