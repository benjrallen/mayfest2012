<?

	echo $_REQUEST['locations'];

	die;
	
  //mysql_connect('localhost','root','temp321') or 
  //  die ("Could not connect: " . mysql_error());
  //mysql_select_db('wp_mayfest2012');
  
  //$result = mysql_query("SELECT * FROM a_honor_champions");
  

  //$fp = fopen('hof.csv', 'w');

//  while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
//      
//      $honoree_id = $row['honoree_id'];
//      $honor_id = $row['honor_id'];
//      $year_honored = $row['year_honored'];
//      
//      $putQuery =   "INSERT INTO a_honors (id, honoree_id, honor_type, year_honored) VALUES (NULL, $honoree_id, $honor_id, $year_honored)";
//      
//      //mysql_query($putQuery);
//      
//      //$thisID = mysql_insert_id();
//      
//      
//      $awardsQuery= "UPDATE championsdbtest.a_honor_champions SET  awards = '".$thisID."' WHERE  a_honor_champions.honoree_id =".$honoree_id;
//      //$awardsQuery= 'UPDATE a_honors_champions SET awards="22" WHERE honoree_id="1"';
//      
//      //mysql_query($awardsQuery);
//      
//      $row['bio'] = '';
//      
//      //if($row['winner_type'] != ''){
//      if($row['honor_id'] == '7'){
//          print_r( $row );
//          echo '<br /><br />';
//      }
//  }
  
  //fclose($fp);
  
?>