<?php
/**
 * Boilerplate functions and definitions
 *
 * Sets up the theme and provides some helper functions. Some helper functions
 * are used in the theme as custom template tags. Others are attached to action and
 * filter hooks in WordPress to change core functionality.
 *
 * The first function, boilerplate_setup(), sets up the theme by registering support
 * for various features in WordPress, such as post thumbnails, navigation menus, and the like.
 *
 * When using a child theme (see http://codex.wordpress.org/Theme_Development and
 * http://codex.wordpress.org/Child_Themes), you can override certain functions
 * (those wrapped in a function_exists() call) by defining them first in your child theme's
 * functions.php file. The child theme's functions.php file is included before the parent
 * theme's file, so the child theme functions would be used.
 *
 * Functions that are not pluggable (not wrapped in function_exists()) are instead attached
 * to a filter or action hook. The hook can be removed by using remove_action() or
 * remove_filter() and you can attach your own function to the hook.
 *
 * We can remove the parent theme's hook only after it is attached, which means we need to
 * wait until setting up the child theme:
 *
 * <code>
 * add_action( 'after_setup_theme', 'my_child_theme_setup' );
 * function my_child_theme_setup() {
 *     // We are providing our own filter for excerpt_length (or using the unfiltered value)
 *     remove_filter( 'excerpt_length', 'boilerplate_excerpt_length' );
 *     ...
 * }
 * </code>
 *
 * For more information on hooks, actions, and filters, see http://codex.wordpress.org/Plugin_API.
 *
 * @package WordPress
 * @subpackage Boilerplate
 * @since Boilerplate 1.0
 */

/**
 * Set the content width based on the theme's design and stylesheet.
 *
 * Used to set the width of images and content. Should be equal to the width the theme
 * is designed for, generally via the style.css stylesheet.
 */
if ( ! isset( $content_width ) )
	$content_width = 640;

/** Tell WordPress to run boilerplate_setup() when the 'after_setup_theme' hook is run. */
add_action( 'after_setup_theme', 'boilerplate_setup' );

if ( ! function_exists( 'boilerplate_setup' ) ):
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which runs
 * before the init hook. The init hook is too late for some features, such as indicating
 * support post thumbnails.
 *
 * To override boilerplate_setup() in a child theme, add your own boilerplate_setup to your child theme's
 * functions.php file.
 *
 * @uses add_theme_support() To add support for post thumbnails and automatic feed links.
 * @uses register_nav_menus() To add support for navigation menus.
 * @uses add_custom_background() To add support for a custom background.
 * @uses add_editor_style() To style the visual editor.
 * @uses load_theme_textdomain() For translation/localization support.
 * @uses add_custom_image_header() To add support for a custom header.
 * @uses register_default_headers() To register the default custom header images provided with the theme.
 * @uses set_post_thumbnail_size() To set a custom post thumbnail size.
 *
 * @since Twenty Ten 1.0
 */
function boilerplate_setup() {

	// This theme styles the visual editor with editor-style.css to match the theme style.
	add_editor_style();

	// Uncomment if you choose to use post thumbnails; add the_post_thumbnail() wherever thumbnail should appear
	//add_theme_support( 'post-thumbnails' );

	// Add default posts and comments RSS feed links to head
	add_theme_support( 'automatic-feed-links' );

	// Make theme available for translation
	// Translations can be filed in the /languages/ directory
	load_theme_textdomain( 'boilerplate', TEMPLATEPATH . '/languages' );

	$locale = get_locale();
	$locale_file = TEMPLATEPATH . "/languages/$locale.php";
	if ( is_readable( $locale_file ) )
		require_once( $locale_file );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => __( 'Primary Navigation', 'boilerplate' ),
		'sub-footer' => __( 'Sub Footer', 'boilerplate' ),
		'fp-banners' => __( 'Front Page Banners', 'boilerplate' ),
		'top' => __( 'Top of Header', 'boilerplate' ),
		'sponsors' => __( 'Sponsors Slider', 'boilerplate' ),
		'fp-col-left' => __( 'Front Page Left Column', 'boilerplate' ),
		'fp-col-mid' => __( 'Front Page Middle Column', 'boilerplate' )
	) );

	// This theme allows users to set a custom background
	add_custom_background();

	// Your changeable header business starts here
	define( 'HEADER_TEXTCOLOR', '' );
	// No CSS, just IMG call. The %s is a placeholder for the theme template directory URI.
	define( 'HEADER_IMAGE', '%s/images/headers/path.jpg' );

	// The height and width of your custom header. You can hook into the theme's own filters to change these values.
	// Add a filter to boilerplate_header_image_width and boilerplate_header_image_height to change these values.
	define( 'HEADER_IMAGE_WIDTH', apply_filters( 'boilerplate_header_image_width', 940 ) );
	define( 'HEADER_IMAGE_HEIGHT', apply_filters( 'boilerplate_header_image_height', 198 ) );

	// We'll be using post thumbnails for custom header images on posts and pages.
	// We want them to be 940 pixels wide by 198 pixels tall.
	// Larger images will be auto-cropped to fit, smaller ones will be ignored. See header.php.
	set_post_thumbnail_size( HEADER_IMAGE_WIDTH, HEADER_IMAGE_HEIGHT, true );

	// Don't support text inside the header image.
	define( 'NO_HEADER_TEXT', true );

	// Add a way for the custom header to be styled in the admin panel that controls
	// custom headers. See boilerplate_admin_header_style(), below.
	add_custom_image_header( '', 'boilerplate_admin_header_style' );

	// ... and thus ends the changeable header business.

	// Default custom headers packaged with the theme. %s is a placeholder for the theme template directory URI.
	register_default_headers( array(
		'berries' => array(
			'url' => '%s/images/headers/starkers.png',
			'thumbnail_url' => '%s/images/headers/starkers-thumbnail.png',
			/* translators: header image description */
			'description' => __( 'Boilerplate', 'boilerplate' )
		)
	) );
}
endif;

if ( ! function_exists( 'boilerplate_admin_header_style' ) ) :
/**
 * Styles the header image displayed on the Appearance > Header admin panel.
 *
 * Referenced via add_custom_image_header() in boilerplate_setup().
 *
 * @since Twenty Ten 1.0
 */
function boilerplate_admin_header_style() {
?>
<style type="text/css">
/* Shows the same border as on front end */
#headimg {
	border-bottom: 1px solid #000;
	border-top: 4px solid #000;
}
/* If NO_HEADER_TEXT is false, you would style the text with these selectors:
	#headimg #name { }
	#headimg #desc { }
*/
</style>
<?php
}
endif;

/**
 * Makes some changes to the <title> tag, by filtering the output of wp_title().
 *
 * If we have a site description and we're viewing the home page or a blog posts
 * page (when using a static front page), then we will add the site description.
 *
 * If we're viewing a search result, then we're going to recreate the title entirely.
 * We're going to add page numbers to all titles as well, to the middle of a search
 * result title and the end of all other titles.
 *
 * The site title also gets added to all titles.
 *
 * @since Twenty Ten 1.0
 *
 * @param string $title Title generated by wp_title()
 * @param string $separator The separator passed to wp_title(). Twenty Ten uses a
 * 	vertical bar, "|", as a separator in header.php.
 * @return string The new title, ready for the <title> tag.
 */
function boilerplate_filter_wp_title( $title, $separator ) {
	// Don't affect wp_title() calls in feeds.
	if ( is_feed() )
		return $title;

	// The $paged global variable contains the page number of a listing of posts.
	// The $page global variable contains the page number of a single post that is paged.
	// We'll display whichever one applies, if we're not looking at the first page.
	global $paged, $page;

	if ( is_search() ) {
		// If we're a search, let's start over:
		$title = sprintf( __( 'Search results for %s', 'boilerplate' ), '"' . get_search_query() . '"' );
		// Add a page number if we're on page 2 or more:
		if ( $paged >= 2 )
			$title .= " $separator " . sprintf( __( 'Page %s', 'boilerplate' ), $paged );
		// Add the site name to the end:
		$title .= " $separator " . get_bloginfo( 'name', 'display' );
		// We're done. Let's send the new title back to wp_title():
		return $title;
	}

	// Otherwise, let's start by adding the site name to the end:
	$title .= get_bloginfo( 'name', 'display' );

	// If we have a site description and we're on the home/front page, add the description:
	$site_description = get_bloginfo( 'description', 'display' );
	if ( $site_description && ( is_home() || is_front_page() ) )
		$title .= " $separator " . $site_description;

	// Add a page number if necessary:
	if ( $paged >= 2 || $page >= 2 )
		$title .= " $separator " . sprintf( __( 'Page %s', 'boilerplate' ), max( $paged, $page ) );

	// Return the new title to wp_title():
	return $title;
}
add_filter( 'wp_title', 'boilerplate_filter_wp_title', 10, 2 );

/**
 * Get our wp_nav_menu() fallback, wp_page_menu(), to show a home link.
 *
 * To override this in a child theme, remove the filter and optionally add
 * your own function tied to the wp_page_menu_args filter hook.
 *
 * @since Twenty Ten 1.0
 */
function boilerplate_page_menu_args( $args ) {
	$args['show_home'] = true;
	return $args;
}
add_filter( 'wp_page_menu_args', 'boilerplate_page_menu_args' );

/**
 * Sets the post excerpt length to 40 characters.
 *
 * To override this length in a child theme, remove the filter and add your own
 * function tied to the excerpt_length filter hook.
 *
 * @since Twenty Ten 1.0
 * @return int
 */
function boilerplate_excerpt_length( $length ) {
	return 40;
}
add_filter( 'excerpt_length', 'boilerplate_excerpt_length' );

/**
 * Returns a "Continue Reading" link for excerpts
 *
 * @since Twenty Ten 1.0
 * @return string "Continue Reading" link
 */
function boilerplate_continue_reading_link() {
	return ' <a href="'. get_permalink() . '" class="more-link">' . __( 'Read More <span class="meta-nav">&rarr;</span>', 'boilerplate' ) . '</a>';
}

/**
 * Replaces "[...]" (appended to automatically generated excerpts) with an ellipsis and boilerplate_continue_reading_link().
 *
 * To override this in a child theme, remove the filter and add your own
 * function tied to the excerpt_more filter hook.
 *
 * @since Twenty Ten 1.0
 * @return string An ellipsis
 */
function boilerplate_auto_excerpt_more( $more ) {
	return ' &hellip;' . boilerplate_continue_reading_link();
}
add_filter( 'excerpt_more', 'boilerplate_auto_excerpt_more' );

/**
 * Adds a pretty "Continue Reading" link to custom post excerpts.
 *
 * To override this link in a child theme, remove the filter and add your own
 * function tied to the get_the_excerpt filter hook.
 *
 * @since Twenty Ten 1.0
 * @return string Excerpt with a pretty "Continue Reading" link
 */
function boilerplate_custom_excerpt_more( $output ) {
	if ( has_excerpt() && ! is_attachment() ) {
		$output .= boilerplate_continue_reading_link();
	}
	return $output;
}
add_filter( 'get_the_excerpt', 'boilerplate_custom_excerpt_more' );

/**
 * Remove inline styles printed when the gallery shortcode is used.
 *
 * Galleries are styled by the theme in Twenty Ten's style.css.
 *
 * @since Twenty Ten 1.0
 * @return string The gallery style filter, with the styles themselves removed.
 */
function boilerplate_remove_gallery_css( $css ) {
	return preg_replace( "#<style type='text/css'>(.*?)</style>#s", '', $css );
}
add_filter( 'gallery_style', 'boilerplate_remove_gallery_css' );

if ( ! function_exists( 'boilerplate_comment' ) ) :
/**
 * Template for comments and pingbacks.
 *
 * To override this walker in a child theme without modifying the comments template
 * simply create your own boilerplate_comment(), and that function will be used instead.
 *
 * Used as a callback by wp_list_comments() for displaying the comments.
 *
 * @since Twenty Ten 1.0
 */
function boilerplate_comment( $comment, $args, $depth ) {
	$GLOBALS['comment'] = $comment;
	switch ( $comment->comment_type ) :
		case '' :
	?>
	<li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>">
		<article id="comment-<?php comment_ID(); ?>">
			<div class="comment-author vcard">
				<?php echo get_avatar( $comment, 40 ); ?>
				<?php printf( __( '%s <span class="says">says:</span>', 'boilerplate' ), sprintf( '<cite class="fn">%s</cite>', get_comment_author_link() ) ); ?>
			</div><!-- .comment-author .vcard -->
			<?php if ( $comment->comment_approved == '0' ) : ?>
				<em><?php _e( 'Your comment is awaiting moderation.', 'boilerplate' ); ?></em>
				<br />
			<?php endif; ?>
			<footer class="comment-meta commentmetadata"><a href="<?php echo esc_url( get_comment_link( $comment->comment_ID ) ); ?>">
				<?php
					/* translators: 1: date, 2: time */
					printf( __( '%1$s at %2$s', 'boilerplate' ), get_comment_date(),  get_comment_time() ); ?></a><?php edit_comment_link( __( '(Edit)', 'boilerplate' ), ' ' );
				?>
			</footer><!-- .comment-meta .commentmetadata -->
			<div class="comment-body"><?php comment_text(); ?></div>
			<div class="reply">
				<?php comment_reply_link( array_merge( $args, array( 'depth' => $depth, 'max_depth' => $args['max_depth'] ) ) ); ?>
			</div><!-- .reply -->
		</article><!-- #comment-##  -->
	<?php
			break;
		case 'pingback'  :
		case 'trackback' :
	?>
	<li class="post pingback">
		<p><?php _e( 'Pingback:', 'boilerplate' ); ?> <?php comment_author_link(); ?><?php edit_comment_link( __('(Edit)', 'boilerplate'), ' ' ); ?></p>
	<?php
			break;
	endswitch;
}
endif;

/**
 * Register widgetized areas, including two sidebars and four widget-ready columns in the footer.
 *
 * To override boilerplate_widgets_init() in a child theme, remove the action hook and add your own
 * function tied to the init hook.
 *
 * @since Twenty Ten 1.0
 * @uses register_sidebar
 */
function boilerplate_widgets_init() {
	// Area 1, located at the top of the sidebar.
	register_sidebar( array(
		'name' => __( 'Primary Widget Area', 'boilerplate' ),
		'id' => 'primary-widget-area',
		'description' => __( 'The primary widget area', 'boilerplate' ),
		'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
		'after_widget' => '</li>',
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	) );

	// Area 2, located below the Primary Widget Area in the sidebar. Empty by default.
	register_sidebar( array(
		'name' => __( 'Secondary Widget Area', 'boilerplate' ),
		'id' => 'secondary-widget-area',
		'description' => __( 'The secondary widget area', 'boilerplate' ),
		'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
		'after_widget' => '</li>',
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	) );

	// Area 3, located in the footer. Empty by default.
	register_sidebar( array(
		'name' => __( 'First Footer Widget Area', 'boilerplate' ),
		'id' => 'first-footer-widget-area',
		'description' => __( 'The first footer widget area', 'boilerplate' ),
		'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
		'after_widget' => '</li>',
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	) );

	// Area 4, located in the footer. Empty by default.
	register_sidebar( array(
		'name' => __( 'Second Footer Widget Area', 'boilerplate' ),
		'id' => 'second-footer-widget-area',
		'description' => __( 'The second footer widget area', 'boilerplate' ),
		'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
		'after_widget' => '</li>',
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	) );

	// Area 5, located in the footer. Empty by default.
	register_sidebar( array(
		'name' => __( 'Third Footer Widget Area', 'boilerplate' ),
		'id' => 'third-footer-widget-area',
		'description' => __( 'The third footer widget area', 'boilerplate' ),
		'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
		'after_widget' => '</li>',
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	) );

	// Area 6, located in the footer. Empty by default.
	register_sidebar( array(
		'name' => __( 'Fourth Footer Widget Area', 'boilerplate' ),
		'id' => 'fourth-footer-widget-area',
		'description' => __( 'The fourth footer widget area', 'boilerplate' ),
		'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
		'after_widget' => '</li>',
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	) );
}
/** Register sidebars by running boilerplate_widgets_init() on the widgets_init hook. */
add_action( 'widgets_init', 'boilerplate_widgets_init' );

/**
 * Removes the default styles that are packaged with the Recent Comments widget.
 *
 * To override this in a child theme, remove the filter and optionally add your own
 * function tied to the widgets_init action hook.
 *
 * @since Twenty Ten 1.0
 */
function boilerplate_remove_recent_comments_style() {
	global $wp_widget_factory;
	remove_action( 'wp_head', array( $wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style' ) );
}
add_action( 'widgets_init', 'boilerplate_remove_recent_comments_style' );

if ( ! function_exists( 'boilerplate_posted_on' ) ) :
/**
 * Prints HTML with meta information for the current post—date/time and author.
 *
 * @since Twenty Ten 1.0
 */
function boilerplate_posted_on() {
	printf( __( '<span class="%1$s">Posted on</span> %2$s', 'boilerplate' ),
		'meta-prep meta-prep-author',
		sprintf( '<a href="%1$s" title="%2$s" rel="bookmark"><span class="entry-date">%3$s</span></a>',
			get_permalink(),
			esc_attr( get_the_time() ),
			get_the_date()
		)
	);
}
endif;

if ( ! function_exists( 'boilerplate_posted_in' ) ) :
/**
 * Prints HTML with meta information for the current post (category, tags and permalink).
 *
 * @since Twenty Ten 1.0
 */
function boilerplate_posted_in() {
	// Retrieves tag list of current post, separated by commas.
	$tag_list = get_the_tag_list( '', ', ' );
	if ( $tag_list ) {
		$posted_in = __( 'This entry was posted in %1$s and tagged %2$s. Bookmark the <a href="%3$s" title="Permalink to %4$s" rel="bookmark">permalink</a>.', 'boilerplate' );
	} elseif ( is_object_in_taxonomy( get_post_type(), 'category' ) ) {
		$posted_in = __( 'This entry was posted in %1$s. Bookmark the <a href="%3$s" title="Permalink to %4$s" rel="bookmark">permalink</a>.', 'boilerplate' );
	} else {
		$posted_in = __( 'Bookmark the <a href="%3$s" title="Permalink to %4$s" rel="bookmark">permalink</a>.', 'boilerplate' );
	}
	// Prints the string, replacing the placeholders.
	printf(
		$posted_in,
		get_the_category_list( ', ' ),
		$tag_list,
		get_permalink(),
		the_title_attribute( 'echo=0' )
	);
}
endif;

/*	Begin Boilerplate */
	// Add Admin
		require_once(TEMPLATEPATH . '/boilerplate-admin/admin-menu.php');

	// remove version info from head and feeds (http://digwp.com/2009/07/remove-wordpress-version-number/)
		function boilerplate_complete_version_removal() {
			return '';
		}
		add_filter('the_generator', 'boilerplate_complete_version_removal');
/*	End Boilerplate */

// add category nicenames in body and post class
	function boilerplate_category_id_class($classes) {
	    global $post;
	    
	    if( isset($post) ){ 
	    
		    $cat = get_the_category($post->ID);
		    if( !empty( $cat ) ){
		    
			    foreach((get_the_category($post->ID)) as $category)
			        $classes[] = $category->category_nicename;
		    }
	    }
	    
	    return $classes;
	}
	add_filter('post_class', 'boilerplate_category_id_class');
	add_filter('body_class', 'boilerplate_category_id_class');

// change Search Form input type from "text" to "search" and add placeholder text
	function boilerplate_search_form ( $form ) {
		$form = '<form role="search" method="get" id="searchform" action="' . home_url( '/' ) . '" >
		<div><label class="screen-reader-text" for="s">' . __('Search for:') . '</label>
		<input type="search" placeholder="Search for..." value="' . get_search_query() . '" name="s" id="s" />
		<input type="submit" id="searchsubmit" value="'. esc_attr__('Search') .'" />
		</div>
		</form>';
		return $form;
	}
	add_filter( 'get_search_form', 'boilerplate_search_form' );

// added per WP upload process request
if ( function_exists( 'add_theme_support' ) ) {
	add_theme_support( 'post-thumbnails' );
}


/** BEGIN GuRu Theme Specific Functions **/


global $prefix;
$prefix = 'mayfest_';

/** WE LOAD IN OUR MODERNIZR AND JQUERY SCRIPTS OURSELVES
 *		Modernizr.load in header.php controls all the asynchronous loading
 */
function guru_deregister_scripts(){
	
	if ( !is_admin() ) {
		wp_deregister_script( 'ieshiv' ); // get rid of IEShiv if it somehow got called too (IEShiv is included in Modernizr)
		wp_deregister_script( 'modernizr' ); // get rid of any native Modernizr
		wp_deregister_script( 'jquery' ); // get rid of WP's jQuery
		
		/**
		 *  we RARELY use commenting on our wordpress sites.
		 *  add these lines to keep the associated javascript from loading
		 *  and to remove the comments feed link from the <head>
		 **/
		wp_dequeue_script('comment-reply');
		wp_deregister_script('comment-reply');
	}
}
add_action('init', 'guru_deregister_scripts');

remove_action( 'wp_head', 'feed_links', 2 );
add_action('wp_head', 'addBackPostFeed');
function addBackPostFeed() {
    echo '<link rel="alternate" type="application/rss+xml" title="RSS 2.0 Feed"    href="'.get_bloginfo('rss2_url').'" />';
}



//register secondary thumbnail image, using multiple-post-thumbnail plugin
if (class_exists('MultiPostThumbnails')) {

	//register banners for pages and partners.  add another post type to array to register for that type as well
	$types = array( 'page', 'mayfest_banner', 'post' );
	foreach( $types as $type ) {
	
		new MultiPostThumbnails(array(
			'label' => 'Front Page Banner',
			'id' => 'fp-banner',
			'post_type' => $type
			)
		);
	
		if( $type != 'mayfest_banner' ){	
			new MultiPostThumbnails(array(
				'label' => 'Page Background',
				'id' => 'page-background',
				'post_type' => $type
				)
			);
		}
	}
}

//add image sizes
add_image_size( 'page-thumb', 314, 314, false );
add_image_size( 'project-thumb', 180, 120, true );
add_image_size( 'banner', 710, 387, true );
add_image_size( 'sponsor-thumb', 197, 80, false );
add_image_size( 'ico', 20, 20, false );
add_image_size( 'app-thumb', 120, 120, false );

//add page excerpts if necessary
//add_post_type_support( 'page', 'excerpt' );

//to fix wp-nav-menu seperators
function nav_menu_first_last( $items ) {
	$position = strrpos($items, 'class="menu-item', -1);
	$items=substr_replace($items, 'menu-item-last ', $position+7, 0);
	$position = strpos($items, 'class="menu-item');
	$items=substr_replace($items, 'menu-item-first ', $position+7, 0);
	return $items;
}
add_filter( 'wp_nav_menu_items', 'nav_menu_first_last' );


class Color_Walker extends Walker_Nav_Menu
{
	var $counter = 0;
	var $colors = array(
		'purple',
		'teal',
		'orange',
		'yellow',
		'red'
	);

	/**
	 * @see Walker::start_el()
	 * @since 3.0.0
	 *
	 * @param string $output Passed by reference. Used to append additional content.
	 * @param object $item Menu item data object.
	 * @param int $depth Depth of menu item. Used for padding.
	 * @param int $current_page Menu item ID.
	 * @param object $args
	 */
	function start_el(&$output, $item, $depth, $args) {
		global $wp_query;
		
		//check counter vs list of colors
		if( $this->counter >= count( $this->colors ) )
			$this->counter = 0;
				
		$indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';

		$class_names = $value = '';

		$classes = empty( $item->classes ) ? array() : (array) $item->classes;
		$classes[] = 'menu-item-' . $item->ID;
		//BA - ADD THE COLOR
		$classes[] = $this->colors[$this->counter];

		$class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args ) );
		$class_names = ' class="' . esc_attr( $class_names ) . '"';

		$id = apply_filters( 'nav_menu_item_id', 'menu-item-'. $item->ID, $item, $args );
		$id = strlen( $id ) ? ' id="' . esc_attr( $id ) . '"' : '';

		$output .= $indent . '<li' . $id . $value . $class_names .'>';

		$attributes  = ! empty( $item->attr_title ) ? ' title="'  . esc_attr( $item->attr_title ) .'"' : '';
		$attributes .= ! empty( $item->target )     ? ' target="' . esc_attr( $item->target     ) .'"' : '';
		$attributes .= ! empty( $item->xfn )        ? ' rel="'    . esc_attr( $item->xfn        ) .'"' : '';
		$attributes .= ! empty( $item->url )        ? ' href="'   . esc_attr( $item->url        ) .'"' : '';

		$item_output = $args->before;
		$item_output .= '<a'. $attributes .'>';
		$item_output .= $args->link_before . apply_filters( 'the_title', $item->title, $item->ID ) . $args->link_after;
		$item_output .= '</a>';
		$item_output .= $args->after;

		$output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
		
		//BA - increment the counter
		$this->counter++;
	}

}


//add numbered classes to nav items
function nav_menu_item_numbers( $items ) {
	$position = strrpos($items, 'class="menu-item', -1);
	$items=substr_replace($items, 'menu-item-last ', $position+7, 0);
	$position = strpos($items, 'class="menu-item');
	$items=substr_replace($items, 'menu-item-first ', $position+7, 0);
	
	
	return $items;
}
add_filter( 'wp_nav_menu_items', 'nav_menu_item_numbers' );


//to add slug of item to classes for each nav menu item
function slug_nav_class( $classes, $item ){
	//$slug = get_page( $item->object_id )->post_name;
		
	$classes[] = get_page( $item->object_id )->post_name;
	
	//$slug = null;
	
	return $classes;
}
add_filter( 'nav_menu_css_class', 'slug_nav_class', 10, 2 ); // 10 is priority, 2 is the accepted number of args to pass to the function.  opens up $item in this case.

function content($limit = 55) {
  $content = explode(' ', strip_tags(get_the_content()), $limit);
  if (count($content)>=$limit) {
    array_pop($content);
    $content = implode(" ",$content).'...';
  } else {
    $content = implode(" ",$content);
  }	
  $content = preg_replace('/\[.+\]/','', $content);
  $content = apply_filters('the_content', $content); 
  $content = str_replace(']]>', ']]&gt;', $content);
  return $content;
}


function get_flat_terms( $term ){
	$terms = get_terms( $term );
	$return = array();
	
	foreach ( $terms as $t ){
		$return[] = $t;
	}
	
	return $return;
}

//for getting tree of terms structured by hierarchy
function get_term_hierchy($term){
	$terms = get_terms( $term );
	
	//print_r( $terms );

	//first, index terms by parent id					
	$terms_by_parent = array();
	foreach( $terms as $term ){
		$parent_id = $term->parent;
		
		if( !array_key_exists($parent_id, $terms_by_parent) ){
			$terms_by_parent[$parent_id] = array();
		}
		
		$terms_by_parent[$parent_id][] = $term;
	}

  if( !function_exists('add_terms_to_bag') ) {
  	function add_terms_to_bag(&$parent_bag, &$child_bag, &$children){
  		foreach( $children as $child_term ){
  			$child_id = $child_term->term_id;
			
  			if ( array_key_exists($child_id, $parent_bag) ){
  				$child_term->children = array();
  				add_terms_to_bag( $parent_bag, $child_term->children, $parent_bag[$child_id] );
  			}
  			$child_bag[$child_id] = $child_term;
  		}
  	}
  }
	
	//then build hierarchical tree
	$term_tree = array();
	if (count($terms_by_parent)) {
		add_terms_to_bag( $terms_by_parent, $term_tree, $terms_by_parent[0] );
	}
	
	//$clean_tree = array();
	
	//then take out all the ids.
	if( !function_exists('remove_array_keys') ){
  	function remove_array_keys( &$arrayToClean ){
  		$new = array();
  		foreach( $arrayToClean as $id => $data ){
  			$thisData = $data;
			
  			if ( isset( $data->children ) ){
  				$thisData->children = remove_array_keys( $data->children );
				
  			} else {
  				$thisData->leaf = true;
  				//error_log( 'no children: '.$thisData->leaf );
  			}
			
  			$new[] = $thisData;
  		}
		
  		return $new;
  	}
  }
	if( count( $term_tree ) ){
		$clean_tree = remove_array_keys( $term_tree );
	} else {
		$clean_tree = array();
	}
	
	unset($terms);
	unset($terms_by_parent);
	
	return $clean_tree;
}

/*
function get_term_hierchy($term){
	$terms = get_terms( $term );
	
	//print_r( $terms );

	//first, index terms by parent id					
	$terms_by_parent = array();
	foreach( $terms as $term ){
		$parent_id = $term->parent;
		
		if( !array_key_exists($parent_id, $terms_by_parent) ){
			$terms_by_parent[$parent_id] = array();
		}
		
		$terms_by_parent[$parent_id][] = $term;
	}

	function add_terms_to_bag(&$parent_bag, &$child_bag, &$children){
		foreach( $children as $child_term ){
			$child_id = $child_term->term_id;
			
			if ( array_key_exists($child_id, $parent_bag) ){
				$child_term->children = array();
				add_terms_to_bag( $parent_bag, $child_term->children, $parent_bag[$child_id] );
			}
			$child_bag[$child_id] = $child_term;
		}
	}

	
	//then build hierarchical tree
	$term_tree = array();
	add_terms_to_bag( $terms_by_parent, $term_tree, $terms_by_parent[0] );
	
	unset($terms);
	unset($terms_by_parent);
	
	return $term_tree;
}
*/


// only install post type if class present (Class included in new post type plugin)
if( class_exists( 'NewPostType' )){

	//$prefix = 'mayfest_';
	global $prefix;

	NewPostType::instance()->add(array(
		'post_type' => $prefix.'banner',
		'post_type_name' => 'Banners',
		'args' => array(
			'rewrite' => array( 'slug' => 'banners' ),
			'supports' => array( 'title', 'thumbnail' ),
			'public' => true,
			'has_archive' => true
		)
	));

	NewPostType::instance()->add(array(
		'post_type' => 'guru_sponsors',
		'post_type_name' => 'Sponsors',
		'args' => array(
			'rewrite' => array( 'slug' => 'sponsors' ),
			'supports' => array( 'title', 'editor', 'thumbnail', 'page-attributes' ),
			'public' => true,
			'has_archive' => true
		)
	))->add_meta_box(array(
		'id' => 'sponsor_link',
		'title' => 'Sponsor Info:',
		'context' => 'side',
		'priority' => 'default',
		'fields' => array(
			array(
				'name' => 'Url: ',
				'id' => 'guru_sponsor_link',
				'type' => 'text',
				'std' => ''
			)
		)	
	));


    NewPostType::instance()->add(array(
		'post_type' => $prefix.'locations',
		'post_type_name' => 'Locations',
		'args' => array(
		    'rewrite' => array( 'slug' => 'locations' ),
		    'public' => false,
		    'has_archive' => false,
		    'supports' => array( 'title', 'editor', 'thumbnail', 'page-attributes' )
		)
    ))->add_meta_box(array(
		'id' => 'location_details',
		'title' => 'Location Information:',
		'context' => 'side',
		'priority' => 'default',
		'fields' => array(
		    array(
		        'name' => 'Short Name: ',
		        'id' => $prefix . 'location_shortname',
		        'type' => 'text',
		        'std' => ''
		    ),
		    array(
		        'name' => 'Address: ',
		        'id' => $prefix . 'location_address',
		        'type' => 'textarea',
		        'std' => ''
		    ),
		    array(
		         'name' => 'Email: ',
		         'id' => $prefix . 'location_email',
		         'type' => 'text',
		         'std' => ''
		    ),
		    array(
		        'name' => 'Phone: ',
		        'id' => $prefix . 'location_phone',
		        'type' => 'text',
		        'std' => ''
		    ),
		    array(
		        'name' => 'Secondary Phone: ',
		        'id' => $prefix . 'location_secondary_phone',
		        'type' => 'text',
		        'std' => ''
		    ),
		    array(
		        'name' => 'Fax: ',
		        'id' => $prefix . 'location_fax',
		        'type' => 'text',
		        'std' => ''
		    )    ,
//		    array(
//		        'name' => 'Text*: ',
//		        'id' => $prefix . 'location_text',
//		        'type' => 'text',
//		        'std' => ''
//		    ),
		    array(
		        'name' => 'Show in sidebar: ',
		        'id' => $prefix . 'location_show',
		        'type' => 'checkbox',
		        'std' => ''
		    )
		)   
    ));


  NewPostType::instance()->add(array(
		'post_type' => $prefix.'attraction',
		'post_type_name' => 'Attraction',
		'args' => array(
		    'rewrite' => array( 'slug' => 'attractions' ),
		    'public' => false,
		    'has_archive' => false,
		    'supports' => array( 'title', 'editor', 'thumbnail' )
		)
	))->add_meta_box(array(
		'id' => 'map_location_select',
		'title' => 'Map Location (* for Map App):',
		'context' => 'side',
		'priority' => 'core',
		'fields' => array(
		    array(
		        'name' => 'Location Name:',
		        'id' => $prefix . 'ml_uid',
		        'type' => 'text',
		        'std' => ''
		    )
		)   
	))->add_taxonomy( 'attraction_category', array(
		'taxonomy_single' => 'Attraction Category',
		'taxonomy_plural' => 'Attraction Categories',
		'args' => array(
			'hierarchical' => true
		)
	))->add_meta_box(array(
		'id' => 'attraction_details',
		'title' => 'Attraction Information (FOR MAP APP):',
		'context' => 'normal',
		'priority' => 'core',
		'fields' => array(
		    array(
		        'name' => 'City:',
		        'id' => $prefix . 'att_city',
		        'type' => 'text',
		        'std' => ''
		    ),
		    array(
		        'name' => 'State:',
		        'id' => $prefix . 'att_state',
		        'type' => 'text',
		        'std' => ''
		    ),
		    array(
		        'name' => 'First Name:',
		        'id' => $prefix . 'att_first_name',
		        'type' => 'text',
		        'std' => ''
		    ),
		    array(
		        'name' => 'Last Name:',
		        'id' => $prefix . 'att_last_name',
		        'type' => 'text',
		        'std' => ''
		    ),
		    array(
		        'name' => 'First Name Partner:',
		        'id' => $prefix . 'att_first_name_partner',
		        'type' => 'text',
		        'std' => ''
		    ),
		    array(
		        'name' => 'Last Name Partner:',
		        'id' => $prefix . 'att_last_name_partner',
		        'type' => 'text',
		        'std' => ''
		    )
		)   
  ));
    

  NewPostType::instance()->add(array(
		'post_type' => $prefix.'event',
		'post_type_name' => 'Event',
		'args' => array(
		    'rewrite' => array( 'slug' => 'events' ),
		    'public' => false,
		    'has_archive' => false,
		    'supports' => array( 'title', 'editor', 'thumbnail' )
		)
	))->add_taxonomy( 'event_category', array(
		'taxonomy_single' => 'Event Category',
		'taxonomy_plural' => 'Event Categories',
		'args' => array(
			'hierarchical' => true
		)
	))->add_meta_box(array(
		'id' => 'map_attraction_select',
		'title' => 'Map Stage / Gallery (* for Map App):',
		'context' => 'side',
		'priority' => 'core',
		'fields' => array(
		    array(
		        'name' => 'Attraction Name:',
		        'id' => $prefix . 'attraction_uid',
		        'type' => 'text',
		        'std' => ''
		    )
		)   
	))->add_meta_box(array(
		'id' => 'map_event_info',
		'title' => 'Event Info:',
		'context' => 'normal',
		'priority' => 'core',
		'fields' => array(
		    array(
		        'name' => 'Event Day:',
		        'id' => $prefix . 'event_day',
		        'type' => 'text',
		        'std' => ''
		    ),
		    array(
		        'name' => 'Event Time:',
		        'id' => $prefix . 'event_time',
		        'type' => 'text',
		        'std' => ''
		    )
		)   
    ));

	//add genre tags to events and attractions
	new TaxonomyTemplate(array(
		'taxonomy' => 'genre',
		'post_type' => array('mayfest_event','mayfest_attraction'),
		'taxonomy_single' => 'Genre',
		'taxonomy_plural' => 'Genres',
		'args' => array(
			'hierarchical' => false
		)    
	));


	/**
	 *	MAYFEST ARTISTS, VENDORS, and EVERYTHING ELSE
	 *	ARE BROKEN DOWN BY CATEGORY INTO ATTRACTIONS
	 */
  NewPostType::instance()->add(array(
		'post_type' => $prefix.'map_location',
		'post_type_name' => 'Map Location',
		'args' => array(
		    'rewrite' => array( 'slug' => 'map-locations' ),
		    'public' => false,
		    'has_archive' => false,
		    'supports' => array( 'title' )
		)
	))->add_meta_box(array(
		'id' => 'map_location_details',
		'title' => 'Map Location Information (REQUIRED FOR MAP APP):',
		'context' => 'normal',
		'priority' => 'core',
		'fields' => array(
		    array(
		        'name' => ' Type: (JA, MA, STAGE, etc...)',
		        'id' => $prefix . 'ml_type',
		        'type' => 'text',
		        'std' => ''
		    ),
		    array(
		        'name' => 'ID: (Mayfest Data, not UID)',
		        'id' => $prefix . 'ml_id',
		        'type' => 'text',
		        'std' => ''
		    ),
		    array(
		         'name' => 'X: (Coordinate on Map)',
		         'id' => $prefix . 'ml_x',
		         'type' => 'text',
		         'std' => ''
		    ),
		    array(
		        'name' => 'Y: (Coordinate on Map)',
		        'id' => $prefix . 'ml_y',
		        'type' => 'text',
		        'std' => ''
		    ),
		    array(
		        'name' => 'Description: (Extra Info)',
		        'id' => $prefix . 'ml_desc',
		        'type' => 'text',
		        'std' => ''
		    )
		)   
    ));

	
	//hook into the save post to save out the json data of that post type for the entire query
	add_filter( 'save_post', 'build_guru_app_json' );
	function build_guru_app_json($post_id){
		global $prefix;
		
		//key of post type with array of custom fields to grab as well
		$types = array(
			$prefix.'attraction' => array(
				'genre',
				'attraction_category',
				'thumbnail',
				$prefix . 'att_city',
				$prefix . 'att_state',
				$prefix . 'att_first_name',
				$prefix . 'att_last_name',
				$prefix . 'att_first_name_partner',
				$prefix . 'att_last_name_partner',
				$prefix . 'ml_uid'
			),
			$prefix.'map_location' => array(
				$prefix . 'ml_type',
				$prefix . 'ml_id',
				$prefix . 'ml_x',
				$prefix . 'ml_y',
				$prefix . 'ml_desc'
			),
			$prefix.'event' => array(
				'genre',
				'event_category',
				'thumbnail',
				$prefix . 'event_day',
				$prefix . 'event_time',
				$prefix . 'attraction_uid'
			)
		);
		
		$post_type = get_post_type().'';
			
		//if( in_array( $post_type, $types ) ){
		if( array_key_exists( $post_type, $types ) ){
			//error_log( 'I EXIST!  '.get_post_type($post_id) );
	
			//TEMP QUERY JUST TO WRITE TO FILE
			$posts = get_posts(array(
				'numberposts' => -1,
				'post_type' => $post_type,
				'order' => 'ASC',
				'orderby' => 'title'
			));	
			
			$full = array();
			
			foreach( $posts as $post ){
				$p = array(
					'id' => $post->ID,
					'title' => $post->post_title,
					'content' => apply_filters( 'the_content', $post->post_content )
				);

				foreach( $types[$post_type] as $field ){
					//get the custom field
					
					if( $field == 'thumbnail' ) {
						//special case for thumbnail
						if( has_post_thumbnail($post->ID) ){
						
							$thumb_id = get_post_thumbnail_id( $post->ID );
							$cf = array(
								'ico' => wp_get_attachment_image_src( $thumb_id, 'ico' ),
								'app-thumb' => wp_get_attachment_image_src( $thumb_id, 'app-thumb' )
							);
							
						} else {
							$cf = false;
						}
						
					} elseif( $field == 'genre' ) {
						//specific case for genre tags
						$cf = wp_get_object_terms( $post->ID, $field );
					} elseif( $field == 'attraction_category' ) {
						//specific case for attraction category
						$cf = wp_get_object_terms( $post->ID, $field );
					} elseif( $field == 'event_category' ) {
						//specific case for attraction category
						$cf = wp_get_object_terms( $post->ID, $field );
					} else {
						//normal get custom field
						$cf = get_post_meta( $post->ID, $field, true );
					}
					
					if( !$cf )
						$cf = '';
						
					$p[$field] = $cf;
				}
//				
//				//special case to convert the day and time fields into a date string
//				if ( $post_type == $prefix.'event' ) {
//					$p['date'] = $p[$prefix . 'event_day'].' '.$p[$prefix . 'event_time'];
//				}
				
				$full[] = $p;
				unset( $p );
			}
						
			unset($posts);
			
			//check for the file
			$filename = TEMPLATEPATH . '/app_cache/'.$post_type.'.json';	
			
			//check if file exists
			//$file = ( file_exists( $filename ) ? fopen( $filename, 'w+' ) : fopen( $filename, 'x+' ) );			
			if ( file_exists( $filename ) ) {
				$file = fopen( $filename, 'w+' );
			} else {
				$file = fopen( $filename, 'x+' );
			}			
			
			if( fwrite( $file, json_encode($full) ) === FALSE ){
				error_log('ERROR WRITING POSTS TO CACHE FILE IN FUNCTIONS.PHP ~line 1086: '.$filename);
			}
				
			fclose($file);
			
			//also write the attraction & event categories
			//get_term_hierchy('attraction_category')
			//check for the file
			//array( $term1, $term2)
			$categories = array(
			  'attraction_category',
			  'event_category'
			);
			
      foreach( $categories as $term ){
  			$filename = TEMPLATEPATH . '/app_cache/'.$term.'.json';	
			
  			//check if file exists
  			//$file = ( file_exists( $filename ) ? fopen( $filename, 'w+' ) : fopen( $filename, 'x+' ) );			
  			if ( file_exists( $filename ) ) {
  				$file = fopen( $filename, 'w+' );
  			} else {
  				$file = fopen( $filename, 'x+' );
  			}			
						
  			//if( fwrite( $file, json_encode( array( 'children' => get_term_hierchy($term) ) ) ) === FALSE ){
  			if( fwrite( $file, json_encode( get_flat_terms($term) ) ) === FALSE ){
  				error_log('ERROR WRITING POSTS TO CACHE FILE IN FUNCTIONS.PHP ~line 1106: '.$filename);
  			}
				
  			fclose($file);
      }
			
			return;		
					
		}
	}


	//filter the dasboard columns to show the custom meta
	add_filter( 'manage_'.$prefix.'map_location_posts_columns', 'set_map_location_columns' );
	add_filter( 'manage_'.$prefix.'map_location_posts_custom_column', 'custom_map_location_columns', 10, 2 );
	
	//column names use the same id as the custom post met in the meta box
	function set_map_location_columns($columns){
		global $prefix;
		unset( $columns['date'] );
		return	array_merge( $columns, 
					array(
						$prefix . 'ml_type' => __('Type'),
						$prefix . 'ml_id' => __('ID'),
						$prefix . 'ml_x' => __('X'),
						$prefix . 'ml_y' => __('Y'),
						$prefix . 'ml_desc' => __('Desc')
					)
				);
	}
	function custom_map_location_columns( $column, $post_id ){
		//since it uses the same id as the custom post meta in the meta box, it makes for super easy getting
		echo get_post_meta( $post_id , $column , true );
	}
	
        
    /** LOAD AN ADMIN ONLOAD SCRIPT TO WORK WITH MAP LOCATION SELECT BOX **/
	if (is_admin() && $pagenow=='post-new.php' OR $pagenow=='post.php')
	    add_action('admin_head', 'load_mayfest_admin_script');
	
	function load_mayfest_admin_script(){
			
		echo	'<style>'.
				'.ui-button { margin-left: -1px; }'.
				'.ui-button-icon-only .ui-button-text { padding: 1px 3px; display: block; font-size: 16px; }'.
				'.ui-button-icon-only .ui-icon { display: none; }'.
				'.ui-autocomplete-input { margin: 0; padding: 0.48em 0 0.47em 0.45em; }'.
				'.ui-autocomplete.ui-menu { background: #fff; padding: 0.35em; border: 1px solid #ccc; border-top: none; max-width: 163px !important; }'.
				'.ui-button, .ui-autocomplete-input{ display: inline-block; *display: inline; vertical-align: middle; }'.
				'</style>';

		echo 	'<script type="text/javascript">'.
					'var GuruAdmin = GuruAdmin || {};'.
					'GuruAdmin.Url = "'.get_bloginfo('url').'";'.
					'GuruAdmin.TemplateDirectory = "'.get_bloginfo('template_directory').'";'.
				'</script>';
		
		$siteurl = get_bloginfo('template_directory');
		wp_deregister_script('admin-autocomplete');
		wp_register_script('admin-autocomplete', $siteurl . '/js/jquery-combobox.js', false, '0.0.1');
		wp_enqueue_script('admin-autocomplete');
		wp_deregister_script('admin-onload');
		wp_register_script('admin-onload', $siteurl . '/js/admin-onload.js', false, '0.0.1');
		wp_enqueue_script('admin-onload');
		wp_enqueue_style('jquery.ui.theme', $siteurl . '/js/smoothness/jquery-ui-1.8.18.custom.css');
	}
	

//	$prefix = 'guru_';
//
//	NewPostType::instance()->add(array(
//		'post_type' => $prefix.'quotes',
//		'post_type_name' => 'Quotes',
//		'args' => array(
//			'rewrite' => array( 'slug' => 'quotes' ),
//			'supports' => array( 'title', 'editor', 'thumbnail' )
//		)
//	))->add_meta_box(array(
//		'id' => 'quote_link',
//		'title' => 'Quote Links To:',
//		'context' => 'side',
//		'priority' => 'default',
//		'fields' => array(
//			array(
//				'name' => 'Link: ',
//				'id' => $prefix . 'quote_link',
//				'type' => 'text',
//				'std' => ''
//			)
//		)	
//	));
}

//
//	Meta Box (Class included in new post type plugin)
//
if( class_exists( 'MetaBoxTemplate' )){
	$bannerLink = new MetaBoxTemplate(array(
		'page' => 'mayfest_banner',
		'id' => 'custom-banner-link',
		'title' => 'Custom Banner Link: ',
		'context' => 'normal',
		'priority' => 'low',
		'fields' => array(
			array(
				'name' => 'Filling in this field overrides linking the banner directly to this page',
				'id' => 'mayfest_banner_link',
				'type' => 'text',
				'std' => ''
			)
		)
	));

	$categorySelect = new MetaBoxTemplate(array(
		'page' => 'page',
		'id' => 'attraction_category_select',
		'title' => 'Select Attraction Category:',
		'context' => 'side',
		'priority' => 'core',
		'fields' => array(
		    array(
		        'name' => 'Attraction Category:',
		        'id' => $prefix . 'attraction_category_id',
		        'type' => 'text',
		        'std' => ''
		    )
		)
	));

  $categorySelect = new MetaBoxTemplate(array(
  	'page' => 'page',
  	'id' => 'event_category_select',
  	'title' => 'Select Event Category:',
  	'context' => 'side',
  	'priority' => 'core',
  	'fields' => array(
  	    array(
  	        'name' => 'Event Category:',
  	        'id' => $prefix . 'event_category_id',
  	        'type' => 'text',
  	        'std' => ''
  	    )
  	)
  ));


//	$pageMeta = new MetaBoxTemplate(array(
//					'page' => 'page',
//					'id' => 'page-subtitle',
//					'title' => 'Page Subtitle',
//					'context' => 'normal',
//					'priority' => 'core',
//					'fields' => array(
//						array(
//							'name' => 'Subtitle: ',
//							'id' => 'mayfest_page_subtitle',
//							'type' => 'text',
//							'std' => ''
//						)
//					)
//				));

}


	
	//used throughout template to list the location post type with the additional meta info
	//also associates json data with the block in order to make it work with GuruMap jquery plugin - BA
	function get_location_list( $preHTML = false, $contactTitle = 'Contact Us' ){
	
		global $guru_locations;
		global $prefix;
	
		$html = '<ul class="locationList">';
		
		//$contactPage = get_page_by_title( $contactTitle );
		$contactPage = 11; //id for contact-us page
		$contactLink = ( $contactPage ? get_permalink( $contactPage ) : '' );
	
		if( !isset($guru_locations) ){
			$guru_locations = 	get_posts(array(
									'numberposts' => -1,
									'post_type' => $prefix.'locations',
									'order' => 'ASC',
									//'orderby' => 'title'
									'orderby' => 'menu_order'
								));
		}
	
		$keys = array(
			$prefix.'location_shortname',
			$prefix.'location_address',
			$prefix.'location_secondary_phone',
			$prefix.'location_phone',
			$prefix.'location_email',
			$prefix.'location_fax',
			$prefix.'location_text',
			$prefix.'location_show'
		);
		
		foreach ( $guru_locations as $location ) {
			$meta = get_post_custom( $location->ID );
			
			//set location->meta array
			$location->meta = array();
			
			//iterate through $keys
			foreach( $keys as $key ){
				if( isset($meta[$key]) ) {
					$location->meta[$key] = $meta[$key][0];
				}
			}
			unset( $key );
			unset( $meta );
			$class = "";
	
	
	        if ( isset($location->meta[$prefix.'location_show']) && $location->meta[$prefix.'location_show'] == "on")
	            $class = "show-in-sidebar";
	
			
			
			$html .= '<li class="locationItem ' . $class . '" location-data=\''.json_encode( $location->meta ).'\'>';
						//'<a class="locationLink" href="'.get_permalink($location->ID).'" title="'.$location->post_title.'">'.$location->post_title.'</a>';
			
			//was used to inject html into list.  not needed	
			//if( $preHTML )
			//	$html .= $preHTML;
			
			//$html .= '<span class="side"><span class="ico"></span></span><span class="innerLoc"><span class="line"></span><span class="locCont">';
			
			$html .= '<a class="locationLink longname">'.$location->post_title.'</a>';
	
			if ( isset($location->meta[$prefix.'location_address']) )
				$html .= '<a href="'.$contactLink.'"  class="locationAddress">'.apply_filters( 'the_content', $location->meta[$prefix.'location_address'] ).'</a>';	
	
			if ( isset($location->meta[$prefix.'location_phone']) )
				$html .= '<a href="tel:'.$location->meta[$prefix.'location_phone'].'" class="locationPhone">'.apply_filters( 'the_title', $location->meta[$prefix.'location_phone']).'</a>';
	
			if ( isset($location->meta[$prefix.'location_fax']) )
				$html .= '<span class="locationFax"><p>'.$location->meta[$prefix.'location_fax'].'&nbsp;&nbsp;(fax)</p></span>';
	
			if ( isset($location->meta[$prefix.'location_shortname']) )
				$html .= '<a class="locationLink shortname">'.$location->meta[$prefix.'location_shortname'].'</a>';
			
			if ( isset($location->meta[$prefix.'location_email']) )
				$html .= '<a href="mailto:'.$location->meta[$prefix.'location_email'].'" class="locationEmail">'.apply_filters( 'the_title', $location->meta[$prefix.'location_email']).'</a>';
	
			if ( isset($location->meta[$prefix.'location_secondary_phone']) )
				$html .= '<span class="locationSecondaryPhone">'.apply_filters( 'the_content', $location->meta[$prefix.'location_secondary_phone']).'</span>';
	
			if ( isset($location->meta[$prefix.'location_text']) )
				$html .= '<span class="locationText"><p>'.$location->meta[$prefix.'location_text'].'&nbsp;&nbsp;(text*)</p></span>';
			
			//$html .= '</span></span>';
			
			$html .= '</li>';	
			
		}
		
	
		$html .= 	'<div class="clearfix"></div>';	
		$html .= '</ul>';
	
		//$html .= '<div id="locationJSON">'.json_encode( $locations ).'</div>';
		
		return $html;
	}

	//THIS ENABLES PAGINATION ON THE CUSTOM TAXONOMY TEMPLATES
	//http://wordpress.org/support/topic/custom-types-category-pagination-404
	//changed his is_category() to is_tax()
	add_action( 'parse_query','changept' );
	function changept() {
		if( is_tax() && !is_admin() ){
			set_query_var( 'post_type', array( 'post', 'mayfest_attraction', 'mayfest_event' ) );
		}
		return;
	}

  //WP Pages
  function guruPagination($pages = '', $range = 3){ 
    $showitems = ($range * 2)+1;
    global $paged; 
    
    if(empty($paged)) 
      $paged = 1;
    
    if($pages == '') {
      global $wp_query;
      $pages = $wp_query->max_num_pages; 
      if(!$pages){ 
        $pages = 1; 
      } 
    }
    if(1 != $pages){ 
      echo "<div class=\"pagination\"><span class=\"text\">Page ".$paged." of ".$pages."</span>";
      
      if($paged > 2 && $paged > $range+1 && $showitems < $pages) 
        echo "<a href='".get_pagenum_link(1)."' class=\"first\">&laquo; First</a>";
   
      if($paged > 1 && $showitems < $pages) 
        echo "<a href='".get_pagenum_link($paged - 1)."' class=\"prev\">&lsaquo; Previous</a>";
   
      for ($i=1; $i <= $pages; $i++){ 
        if (1 != $pages &&( !($i >= $paged+$range+1 || $i <= $paged-$range-1) || $pages <= $showitems )){ 
          echo ($paged == $i) ? 
            "<span class=\"current\">".$i."</span>":
            //"<span class=\"current\">".$i."</span><span class=\"current\">".$i."</span><span class=\"current\">".$i."</span><span class=\"current\">".$i."</span><span class=\"current\">".$i."</span><span class=\"current\">".$i."</span><span class=\"current\">".$i."</span><span class=\"current\">".$i."</span><span class=\"current\">".$i."</span><span class=\"current\">".$i."</span><span class=\"current\">".$i."</span><span class=\"current\">".$i."</span><span class=\"current\">".$i."</span><span class=\"current\">".$i."</span><span class=\"current\">".$i."</span><span class=\"current\">".$i."</span><span class=\"current\">".$i."</span><span class=\"current\">".$i."</span><span class=\"current\">".$i."</span><span class=\"current\">".$i."</span><span class=\"current\">".$i."</span><span class=\"current\">".$i."</span><span class=\"current\">".$i."</span><span class=\"current\">".$i."</span><span class=\"current\">".$i."</span><span class=\"current\">".$i."</span><span class=\"current\">".$i."</span><span class=\"current\">".$i."</span>":
            "<a href='".get_pagenum_link($i)."' class=\"inactive\">".$i."</a>";
        } 
      } 
      if ($paged < $pages && $showitems < $pages) 
        echo "<a href=\"".get_pagenum_link($paged + 1)."\" class=\"next\">Next &rsaquo;</a>";
   
      if ($paged < $pages-1 &&  $paged+$range-1 < $pages && $showitems < $pages) 
        echo "<a href='".get_pagenum_link($pages)."' class=\"last\">Last &raquo;</a>";
      
      echo "</div>"; 
    }
    //always clearfix
    echo '<div class="clearfix"></div>';
  }


  if ( ! function_exists( 'mayfest_attraction_posted_in' ) ) :
  /**
   * Prints HTML with meta information for the current post (Attraction Category, Genre).
   *
   * @since Twenty Ten 1.0
   */
  function mayfest_attraction_posted_in() {
    global $post;
  	// Retrieves tag list of current post, separated by commas.
  	$tag_list = get_the_term_list( $post->ID, 'genre', '', ', ', '' );
  	
  	if ( $tag_list ) {
  		$posted_in = __( 'Category: %1$s <span class="sep">|</span> Genre: %2$s.', 'boilerplate' );
  	} elseif ( is_object_in_taxonomy( get_post_type(), 'attraction_category' ) ) {
  		$posted_in = __( 'Category: %1$s.', 'boilerplate' );
  	} else {
  		$posted_in = __( '', 'boilerplate' );
  	}
  	// Prints the string, replacing the placeholders.
  	printf(
  		$posted_in,
    	get_the_term_list( $post->ID, 'attraction_category', '', ', ', '' ),
  		$tag_list
  	);
  }
  endif;

  if ( ! function_exists( 'mayfest_event_posted_in' ) ) :
  /**
   * Prints HTML with meta information for the current post (Event Category, Genre).
   *
   * @since Twenty Ten 1.0
   */
  function mayfest_event_posted_in() {
    global $post;
  	// Retrieves tag list of current post, separated by commas.
  	$tag_list = get_the_term_list( $post->ID, 'genre', '', ', ', '' );
  	
  	if ( $tag_list ) {
  		$posted_in = __( 'Category: %1$s <span class="sep">|</span> Genre: %2$s.', 'boilerplate' );
  	} elseif ( is_object_in_taxonomy( get_post_type(), 'event_category' ) ) {
  		$posted_in = __( 'Category: %1$s.', 'boilerplate' );
  	} else {
  		$posted_in = __( '', 'boilerplate' );
  	}
  	// Prints the string, replacing the placeholders.
  	printf(
  		$posted_in,
    	get_the_term_list( $post->ID, 'event_category', '', ', ', '' ),
  		$tag_list
  	);
  }
  endif;

	
	//GET THE ASSOCIATED ATTRACTION WITH THE CURRENT EVENT
  	if ( ! function_exists( 'mayfest_event_where' ) ) :
	function mayfest_event_where(){
		
		global $post;
		global $prefix;
		
    	$att_id = get_post_meta($post->ID, $prefix . 'attraction_uid', true);
		
		if( !empty( $att_id ) ){
			
			//the attraction
			$att = get_post( $att_id );
			
			if( !empty($att) ){
				
				$att_title = apply_filters('the_title', $att->post_title );
				
				echo 	' <span class="sep at">@</span> '.
					 	'<a href="'.get_permalink($att_id).'" title="'.$att_title.'">'.$att_title.'</a>';
				
				//echo $att_id;
			}
		}
		
	}
	endif;

	//GET META TIME INFO ABOUT ANY EVENT
  if( !function_exists( 'mayfest_event_time') ) :
  function mayfest_event_time(){
    global $post;
    global $prefix;
    $day = get_post_meta($post->ID, $prefix . 'event_day', true);
    $time = get_post_meta($post->ID, $prefix . 'event_time', true);
    
    
    //$day = str_replace('-','/',$day);
    
    //get_post_meta($post->ID, $v, true)
    
    if( !empty( $day ) ){
      
      //echo( $day );
      
      if( !empty($time) ) {
        $day .= ' '.$time;
        $format = 'm-d-Y g:iA';
        $date = DateTime::createFromFormat( $format, $day );
        echo $date->format( 'g:iA' ).' - '.$date->format( 'l, F j' );

      } else {
        $format = 'm-d-Y';
        $date = DateTime::createFromFormat( $format, $day );
        
        echo $date->format( 'l, F j' );
      }
      
    } else {
    	if( !empty($time ) ){
	        $format = 'g:iA';
	        $date = DateTime::createFromFormat( $format, $time );
	        echo $date->format( 'g:iA' );
    	}
    }
  }
  endif;


  //used for single template next and previous navigation
  function mayfest_post_nav(){ 
    ?>
      <nav id="nav-below" class="navigation">
      	<div class="nav-previous"><?php previous_post_link( '%link', '<span class="meta-nav">' . _x( '&larr;', 'Previous post link', 'boilerplate' ) . '</span> %title' ); ?></div>
      	<div class="nav-next"><?php next_post_link( '%link', '%title <span class="meta-nav">' . _x( '&rarr;', 'Next post link', 'boilerplate' ) . '</span>' ); ?></div>
      	<div class="clearfix"></div>
      </nav>
    <?php 
  }


//use this to add a keyed value to the beginning of an array
function array_unshift_assoc(&$arr, $key, $val) { 
    $arr = array_reverse($arr, true); 
    $arr[$key] = $val; 
    array_reverse($arr, true); 
	return;
}

/** END GuRu Theme Specific Functions **/

?>
