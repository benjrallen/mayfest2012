<?php
/**
 * The Template for displaying all single posts.
 *
 * @package WordPress
 * @subpackage Boilerplate
 * @since Boilerplate 1.0
 */

get_header(); ?>

<?php get_sidebar(); ?>

<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>
	
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="parent-title">
		<h1 class="entry-title"><?php the_title(); ?></h1>
					<div class="entry-meta">
						<?php boilerplate_posted_on(); ?>
					</div><!-- .entry-meta -->
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
	</div><!-- .entry-content -->
</article><!-- #post-## -->

<nav id="nav-below" class="navigation">
	<div class="nav-previous"><?php previous_post_link( '%link', '<span class="meta-nav">' . _x( '&larr;', 'Previous post link', 'boilerplate' ) . '</span> %title' ); ?></div>
	<div class="nav-next"><?php next_post_link( '%link', '%title <span class="meta-nav">' . _x( '&rarr;', 'Next post link', 'boilerplate' ) . '</span>' ); ?></div>
</nav><!-- #nav-below -->

<?php endwhile; ?>

<?php //get_template_part('front-page','sponsors-slider'); ?>

<div class="clearfix"></div>
<?php get_footer(); ?>


//
//<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>
//				<nav id="nav-above" class="navigation">
//					<?php previous_post_link( '%link', '' . _x( '&larr;', 'Previous post link', 'boilerplate' ) . ' %title' ); ?>
//					<?php next_post_link( '%link', '%title ' . _x( '&rarr;', 'Next post link', 'boilerplate' ) . '' ); ?>
//				</nav><!-- #nav-above -->
//				<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
//					<h1><?php the_title(); ?></h1>
//					<div class="entry-meta">
//						<?php boilerplate_posted_on(); ?>
//					</div><!-- .entry-meta -->
//					<div class="entry-content">
//						<?php the_content(); ?>
//						<?php wp_link_pages( array( 'before' => '' . __( 'Pages:', 'boilerplate' ), 'after' => '' ) ); ?>
//					</div><!-- .entry-content -->
//<?php if ( get_the_author_meta( 'description' ) ) : // If a user has filled out their description, show a bio on their entries  ?>
//					<footer id="entry-author-info">
//						<?php echo get_avatar( get_the_author_meta( 'user_email' ), apply_filters( 'boilerplate_author_bio_avatar_size', 60 ) ); ?>
//						<h2><?php printf( esc_attr__( 'About %s', 'boilerplate' ), get_the_author() ); ?></h2>
//						<?php the_author_meta( 'description' ); ?>
//						<a href="<?php echo get_author_posts_url( get_the_author_meta( 'ID' ) ); ?>">
//							<?php printf( __( 'View all posts by %s &rarr;', 'boilerplate' ), get_the_author() ); ?>
//						</a>
//					</footer><!-- #entry-author-info -->
//<?php endif; ?>
//					<footer class="entry-utility">
//						<?php boilerplate_posted_in(); ?>
//						<?php edit_post_link( __( 'Edit', 'boilerplate' ), '<span class="edit-link">', '</span>' ); ?>
//					</footer><!-- .entry-utility -->
//				</article><!-- #post-## -->
//				<nav id="nav-below" class="navigation">
//					<div class="nav-previous"><?php previous_post_link( '%link', '<span class="meta-nav">' . _x( '&larr;', 'Previous post link', 'boilerplate' ) . '</span> %title' ); ?></div>
//					<div class="nav-next"><?php next_post_link( '%link', '%title <span class="meta-nav">' . _x( '&rarr;', 'Next post link', 'boilerplate' ) . '</span>' ); ?></div>
//				</nav><!-- #nav-below -->
//				<?php comments_template( '', true ); ?>
//<?php endwhile; // end of the loop. ?>
//<?php get_sidebar(); ?>
//<?php get_footer(); ?>
