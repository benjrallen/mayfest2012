<?php
/**
 * The Template for displaying all single posts.
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

		<div class="entry-meta">
			<?php mayfest_attraction_posted_in(); ?>
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
			
			//do the post meta lookup here
			global $prefix;
			$metas = array(
			  'First Name'        => $prefix . 'att_first_name',
			  'Last Name'         => $prefix . 'att_last_name',
			  'Partner First Name'=> $prefix . 'att_first_name_partner',
			  'Partner Last Name' => $prefix . 'att_last_name_partner',
			  'City'              => $prefix . 'att_city',
			  'State'             => $prefix . 'att_state',
			  
			);
			
			foreach( $metas as $k => $v ){
			  	$metas[ $k ] = get_post_meta($post->ID, $v, true);
		        if( empty( $metas[$k] ) )
		          unset( $metas[$k] );
			}
		
			if( !empty($metas) ){

	        	//and the partner names
	  			if( isset($metas['Partner First Name']) && isset($metas['Partner Last Name']) ){
	  			 	//$metas['Partner Name'] = $metas['Partner First Name'].' '.$metas['Partner Last Name'];
	  			 	$metas = array( 'Partner' => $metas['Partner First Name'].' '.$metas['Partner Last Name'] ) + $metas;
	          		unset($metas['Partner First Name']);
	          		unset($metas['Partner Last Name']);
	  			}
	  			//combine the names
	  			if( isset($metas['First Name']) && isset($metas['Last Name']) ){
	  			  	//$metas['Name'] = $metas['First Name'].' '.$metas['Last Name'];
	  			 	$metas = array( 'Name' => $metas['First Name'].' '.$metas['Last Name'] ) + $metas;
	     			unset($metas['First Name']);
	          		unset($metas['Last Name']);
	  			}
				
				//make a container
				echo '<div class="attraction-meta">';
	  			foreach( $metas as $k => $v ){
				    echo  '<div class="piece">'.
				            '<span class="label">'.$k.': </span>'.
				            '<span class="value">'.$v.'</span>'.
				          '</div>';
	  			}
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

	<footer class="entry-utility">
		<?php mayfest_post_nav(); ?>
	</footer>	
	
</article><!-- #post-## -->

<?php endwhile; ?>

<?php get_template_part('events-at-attraction', 'loop'); ?>

<div class="clearfix"></div>
<?php get_footer(); ?>