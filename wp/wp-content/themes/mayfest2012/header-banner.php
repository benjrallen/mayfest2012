<header id="header" role="banner">

	<?php if (is_front_page()) { echo '<h1>'; } else { echo '<h2>'; } ?>
	<a id="logo" href="<?php echo home_url( '/' ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
	<?php if (is_front_page()) { echo '</h1>'; } else { echo '</h2>'; } ?>	

	<h3 id="sublogo">
		<?php bloginfo('description'); ?>
	</h3>
	
	<div class="times">
		<div class="marker"></div>
		<div class="content">
			<p>When:</p>
			<p>May 19th - May 21st<br />11 am - 11 pm</p>
			<p>Where:</p>
			<p>Between Main and Boston</p>	
		</div>
	</div>
	
	<div class="social">
		<h3>Stay Connected</h3>
		<a class="fb" href="http://www.facebook.com/tulsainternationalmayfest" title="Tulsa International Mayfest on Facebook" target="_blank">Tulsa International Mayfest on Facebook</a>
		<a class="flickr" href="http://www.flickr.com/groups/mayfest/" title="Tulsa International Mayfest on Flickr" target="_blank">Tulsa International Mayfest on Flickr</a>
		<a class="tw" href="http://twitter.com/mayfest" title="Tulsa International Mayfest on Twitter" target="_blank">Tulsa International Mayfest on Twitter</a>
		<a class="my" href="http://www.myspace.com/tulsamayfest" title="Tulsa International Mayfest on Myspace" target="_blank">Tulsa International Mayfest on Myspace</a>
	</div>
	
	<div class="banner-bottom"></div>
</header>