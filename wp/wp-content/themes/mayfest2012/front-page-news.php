<section id="fp-news">
	<header>
		<h2>News</h2>
	</header>
<?php
	$news = new WP_Query(array(
				'posts_per_page' => 4
			));

	if( $news->have_posts() ) : 
		
		echo '<ul class="news">';
		
		while( $news->have_posts() ) : $news->the_post();
	
		echo '<li>'.
				'<a href="'.get_permalink().'" title="'.get_the_title().'">'.
					'<span class="date">'.get_the_date('n-j-y').'</span>'.
					'<strong>'.get_the_title().'</strong>'.
				'</a>'.
			 '</li>';
		
		endwhile;
	
	echo '</ul>';
	
	endif;
	wp_reset_query(); 
?>
</section>