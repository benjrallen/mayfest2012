<!doctype html>
<!--[if lt IE 7 ]> <html class="no-js ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]>    <html class="no-js ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]>    <html class="no-js ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    
    <title>Mayfest Map</title>
    
    <meta name="description" content="2011 Tulsa International Mayfest Mobile Interactive Event Map & Schedule">
    <meta name="author" content="GuRuStu Group">
      
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <link rel="shortcut icon" href="/favicon.png">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    
    <link rel="stylesheet" href="info/css/style.css?v=2">
    <link rel="stylesheet" href="info/css/formalize.css">
        
  </head>

  <body onload="setTimeout(function() { window.scrollTo(0, 1) }, 100);">

    <header>
      <img src="info/images/desktop-web-banner.jpg" alt="Mayfest Mobile Map and Event Guide" title="Mayfest Mobile" />
    </header>
    
    <section id="content">
      <article>
        
      </article>
      <article class="left">
        <img src="info/images/screenshot.png" alt="iPhone Screenshot" />
      </article>
      <article class="right">
        <h2>Interactive Event Map & Schedule</h2>
        <h3>The Mayfest Mobile Map is designed for Smart Phone usage. You can also access it from your desktop with a WebKit browser such as Chrome or Safari.</h3>
        

        <?
          if ( isset($_REQUEST['emailsms'])) {
            
            function validPhone($phone) {
            	$numbersOnly = ereg_replace("[^0-9]", "", $phone);
            	$numberOfDigits = strlen($numbersOnly);
            	if ($numberOfDigits == 7 or $numberOfDigits == 10) {
            		$isValid = true;
            	} else {
            		$isValid = false;
            	}
            	return $isValid;
            }
            

            $emailsms = $_REQUEST['emailsms'];

          if (validPhone($emailsms)) {
              // Send SMS

            	// include the PHP TwilioRest library
            	require "info/twilio.php";

            	// twilio REST API version
            	$ApiVersion = "2010-04-01";

            	// set our AccountSid and AuthToken
            	$AccountSid = "AC496aff95314bdf6d784b053b6c085729";
            	$AuthToken = "c527580d5cce66c2c34e726b03ad13c6";

            	// instantiate a new Twilio Rest Client
            	$client = new TwilioRestClient($AccountSid, $AuthToken);

          		// Send a new outgoinging SMS by POSTing to the SMS resource 
          		$response = $client->request("/$ApiVersion/Accounts/$AccountSid/SMS/Messages", 
          			"POST", array(
          			"To" => $emailsms,
          			"From" => "918-550-5123",
          			"Body" => "Visit the Mayfest Mobile Map at http://mayfestmobile.com\n\nSponsored by GuRuStu\nhttp://gurustugroup.com"
          		));

          		if($response->IsError) {
          			//echo "Error: {$response->ErrorMessage}";
          			echo '<div id="notifyerror">Please enter a valid email address or mobile phone number.</div>
                  <form method="post" action="info.php">
                    <input id="emailsms" type="text" name="emailsms" placeholder="mobile phone number" />
                    <input type="submit" value="Text Me!" name="submit" />
                  </form>';
              } else {
          			//echo "Sent message to $number\n\n";
          			echo "<div id=\"notify\">Thank you! You should receive a text message with the link at the following number: $emailsms</div>";
          		}

          } else {
              echo '<div id="notifyerror">Please enter a valid email address or mobile phone number.</div>
              <form method="post" action="info.php">
                <input id="emailsms" type="text" name="emailsms" placeholder="mobile phone number" />
                <input type="submit" value="Text Me!" name="submit" />
              </form>'; 
            }


          } else {
            
            // Display Form
            
            echo '<div id="notify">Enter your mobile phone number below to receive a text message with a link to the map.</div>
            <form method="post" action="info.php">
              <input id="emailsms" type="text" name="emailsms" placeholder="mobile phone number" />
              <input type="submit" value="Text Me!" name="submit" />
            </form>';
          }
        ?>
        
        <aside>
          <div id="mayfestlogo"></div>
          <h4 id="sponsor">Sponsored by:</h4>
          <a href="http://gurustugroup.com" alt="GuRuStu Group" target="_blank"><div id="gurustugroup"></div></a>
        </aside>
      </article>
    </section>
  
    <script type="text/javascript" src="http://use.typekit.com/gdq1maz.js"></script>
    <script type="text/javascript">try{Typekit.load();}catch(e){}</script>
  
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js"></script>
    <script>window.jQuery || document.write("<script src='js/libs/jquery-1.6.0.min.js'>\x3C/script>")</script>

    <script> src="info/js/mylibs/jquery.formalize.min.js"></script>
    <script src="info/js/libs/modernizr-1.7.min.js"></script>

    
    <!-- scripts concatenated and minified via ant build script-->
    <script src="info/js/plugins.js"></script>
    <script src="info/js/script.js"></script>
    <!-- end scripts-->


    <!--[if lt IE 7 ]>
      <script src="info/js/libs/dd_belatedpng.js"></script>
      <script>DD_belatedPNG.fix("img, .png_bg");</script>
    <![endif]-->
    
    <script type="text/javascript">
    var clicky_site_id = 66423905;
    (function() {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = '//static.getclicky.com/js';
      ( document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0] ).appendChild( s );
    })();
    </script>

    <script>
      var _gaq=[["_setAccount","UA-23250887-1"],["_trackPageview"]]; // Change UA-XXXXX-X to be your site's ID 
      (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
      g.src=("https:"==location.protocol?"//ssl":"//www")+".google-analytics.com/ga.js";
      s.parentNode.insertBefore(g,s)}(document,"script"));
    </script>
  
  </body>
</html>

