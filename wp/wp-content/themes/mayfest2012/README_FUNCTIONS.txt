Oh hai.  Ben here.

I'm doing some crazy stuff in functions.php with custom post types and managing the columns and all tht jazz to get the data in Wordpress's backend to be usable with the Mayfest Map.  I'm going to put in notes here about all that.


	add_filter( 'manage_'.$prefix.'map_location_posts_columns', 'remove_map_location_columns' );
	
	http://codex.wordpress.org/Plugin_API/Filter_Reference/manage_$post_type_posts_columns
	
	
	add_filter( 'manage_'.$prefix.'map_location_posts_custom_column', 'custom_map_location_columns', 10, 2 );
	
	http://codex.wordpress.org/Plugin_API/Action_Reference/manage_$post_type_posts_custom_column
	
	
Wrote a new JSON API controller called mayfest_migration.php in the plugin controllers folder.  Make sure to turn it on in the dashboard settings.

Wrote a migration script in the migration folder at the root of the site.  Totally sweet, and can reuse for the other post types.


A custom JSON file caching has been implemented in the theme folder