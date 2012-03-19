<header id="header" role="banner">

	<?php if (is_front_page()) { echo '<h1>'; } else { echo '<h2>'; } ?>
	<a id="logo" href="<?php echo home_url( '/' ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
	<?php if (is_front_page()) { echo '</h1>'; } else { echo '</h2>'; } ?>	


<!--	<h3 id="sublogo">
		<?php bloginfo('description'); ?>
	</h3> -->
	
	<h3 id="bannerWhen">May 17th - 20th</h3>
	
	<nav id="header-nav">
	<?php 
		wp_nav_menu( array( 
			'theme_location' => 'fp-col-left',
			'link_before' => '<div class="line"></div><span class="icon"></span><strong>',
			'link_after' => '</strong>',
			'walker' => new Color_Walker
		)); 
	?>
	</nav>
	
	<div class="times">
		<h3>Downtown Tulsa</h3>
		<p>Main Street between 3rd &amp; 6th Streets
	</div>
	
	<form class="newsletter">
		<div class="inner">
			<label>Newsletter Sign Up</label>
			<input name="email" placeholder="Email" />
			<button class="submit">Sign Up</button>
		</div>
		<div class="clearfix"></div>
	</form>
	
	<?php get_template_part('vertical','sponsors-slider'); ?>
	
	<?php /* ?>
	<div class="social">
		<h3>Stay Connected</h3>
		<a class="fb" href="http://www.facebook.com/tulsainternationalmayfest" title="Tulsa International Mayfest on Facebook" target="_blank">Tulsa International Mayfest on Facebook</a>
		<a class="flickr" href="http://www.flickr.com/groups/mayfest/" title="Tulsa International Mayfest on Flickr" target="_blank">Tulsa International Mayfest on Flickr</a>
		<a class="tw" href="http://twitter.com/mayfest" title="Tulsa International Mayfest on Twitter" target="_blank">Tulsa International Mayfest on Twitter</a>
		<a class="my" href="http://www.myspace.com/tulsamayfest" title="Tulsa International Mayfest on Myspace" target="_blank">Tulsa International Mayfest on Myspace</a>
	</div>
	<?php */ ?>
</header>