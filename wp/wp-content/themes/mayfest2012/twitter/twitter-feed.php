<?php

	//check the request obj
	//$request = $_GET['request'];
	
	//filename is created per user stream
	$filename = 'user_stream_'.$_GET['screen_name'].'.json';	
	
	//check if file exists
	$exists = file_exists( $filename );
	
	if( $exists ){
		//check modified time		
		$modified = filemtime($filename);
		
		//time since last file modification
		$interval = 45; //time in seconds
		
		//update is true is time elapsed is more than the interval time
		$update = (ceil(time() - $modified) >= $interval ? true : false);	
	} else {
		//$file = fopen( $filename, 'x+' );
		$update = true;
	}
	
	if ( $update ){
		
		//make a request		
		//$payload = json_encode($request);
		$api_url = $_GET['api_url'];
		
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $api_url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HTTPGET, true);
		 
		$result = curl_exec($ch); //$result is a string of json encoded data
		curl_close ($ch);
				
		if( $exists ){
			$file = fopen( $filename, 'w+' );
		} else {
			$file = fopen( $filename, 'x+' );
		}
		
		if( fwrite( $file, $result ) === FALSE ){
			echo json_encode(array( 'error' => 'Could not write results to file' ));
		} else {
			echo $result;
		}
		
		fclose($file);
		return;
		
	} else {
		echo file_get_contents( $filename );
//		$file = fopen( $filename, 'r' );
//		$contents =  fread( $file, filesize($filename) );
//		fclose( $file );
//		echo $contents;
		return;
		
	}

	//echo json_encode( array( $request ));
	//echo json_encode( array( $modified ));
?>