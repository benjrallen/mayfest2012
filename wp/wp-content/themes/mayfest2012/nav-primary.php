		<nav id="access" class="wrap" role="navigation">			
			<?php /* Our navigation menu.  If one isn't filled out, wp_nav_menu falls back to wp_page_menu.  The menu assiged to the primary position is the one used.  If none is assigned, the menu with the lowest ID is used.  */ ?>
			<?php 
				wp_nav_menu( array( 
					'theme_location' => 'primary',
					'link_before' => '<div class="line"></div><span class="icon"></span><strong>',
					'link_after' => '</strong>'
				)); 
			?>
			<div class="clearfix"></div>
		</nav><!-- #access -->
