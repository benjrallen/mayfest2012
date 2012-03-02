<?php
/*
Controller name: Mayfest Migration
Controller description: Data manipulation methods for custom posts used to import data for the Mayfest 2012 App
*/


class JSON_API_Mayfest_migration_Controller {

  public function create_post() {
    global $json_api;
    if (!current_user_can('edit_posts')) {
      $json_api->error("You need to login with a user capable of creating posts.");
    }
    if (!$json_api->query->nonce) {
      $json_api->error("You must include a 'nonce' value to create posts. Use the `get_nonce` Core API method.");
    }
    $nonce_id = $json_api->get_nonce_id('mayfest_migration', 'create_post');
    if (!wp_verify_nonce($json_api->query->nonce, $nonce_id)) {
      $json_api->error("Your 'nonce' value was incorrect. Use the 'get_nonce' API method.");
    }
    nocache_headers();
    $post = new JSON_API_Post();
    $id = $post->create($_REQUEST);
    if (empty($id)) {
      $json_api->error("Could not create post.");
    }
    
    if( isset($_REQUEST['custom_meta']) ){
    	$fields = $_REQUEST['custom_meta'];
    	foreach( $fields as $key => $value ){
    		
			$old = get_post_meta($id, $key, true);
			$new = $value;			
			
			if (!empty($new) && $new != $old) {
				update_post_meta($id, $key, $new);
			} elseif (empty($new) && $old) {
				delete_post_meta($id, $key, $old);
			}
    	}
    }
    
    return array(
      'post' => $post
    );
  }

}

?>
