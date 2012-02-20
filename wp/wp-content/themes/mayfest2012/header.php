<?php
/**
 * The Header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package WordPress
 * @subpackage Boilerplate
 * @since Boilerplate 1.0
 */
?><!DOCTYPE html>
<!--[if lt IE 7 ]><html <?php language_attributes(); ?> class="no-js ie ie6 lte7 lte8 lte9"><![endif]-->
<!--[if IE 7 ]><html <?php language_attributes(); ?> class="no-js ie ie7 lte7 lte8 lte9"><![endif]-->
<!--[if IE 8 ]><html <?php language_attributes(); ?> class="no-js ie ie8 lte8 lte9"><![endif]-->
<!--[if IE 9 ]><html <?php language_attributes(); ?> class="no-js ie ie9 lte9"><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html <?php language_attributes(); ?> class="no-js"><!--<![endif]-->
	<head>
		<link href='http://fonts.googleapis.com/css?family=Open+Sans:400italic,400,600,300,700' rel='stylesheet' type='text/css'>
		<meta charset="<?php bloginfo( 'charset' ); ?>" />
		<title><?php
			/*
			 * Print the <title> tag based on what is being viewed.
			 * We filter the output of wp_title() a bit -- see
			 * boilerplate_filter_wp_title() in functions.php.
			 */
			wp_title( '|', true, 'right' );
		?></title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE" /> 
		<link rel="profile" href="http://gmpg.org/xfn/11" />
		<link rel="stylesheet" href="<?php bloginfo( 'template_directory' ); ?>/css/application.css" />
		<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />

		<script type="text/javascript">
			Guru = new Object();
			Guru.Url = '<?php bloginfo( 'url' ); ?>';
			Guru.TemplateUrl = '<?php bloginfo('template_directory'); ?>';
			Guru.isFrontPage = <?php if(is_front_page()) { echo 'true'; }else{ echo 'false'; } ?>;
			Guru.wpVersion = '<?php echo trim(get_bloginfo("version")); ?>';
			Guru.postID = '<?php echo get_the_ID(); ?>';
		</script>
		<script src="<?php bloginfo('template_directory'); ?>/js/modernizr.js"></script>
		<script type="text/javascript">
			<?php /* On Mobile Platforms, choose not to load the typekit fonts */ ?>
//			Modernizr.fontface && Modernizr.touch ? 
//				document.documentElement.className += " tk-loaded wf-inactive" : 
//				window.setTimeout(function(){ document.documentElement.className += " tk-loaded wf-active"; }, 3000);
			
			Modernizr.load([
//				{ test: Modernizr.fontface && !Modernizr.touch,
//				  yep: 'http://use.typekit.com/zba1fth.js',
//				  callback: function(){ try{Typekit.load();}catch(e){} }
//				},
				{ load: ['//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js'],
				  complete: function(){ if(!window.jQuery){ Modernizr.load(Guru.TemplateUrl+'/js/jquery.js'); } }
				},
				{ test: window.JSON, nope: Guru.TemplateUrl+'/js/json2.js' },
				{ test: Modernizr.input.placeholder,
				  nope: Guru.TemplateUrl+'/js/placeholder.jquery.js'
				},
				<?php /* plugins.js & common.js fordevelopment */ ?>
				{ load: Guru.TemplateUrl+'/js/plugins.js' },
				{ load: Guru.TemplateUrl+'/js/common.js' }
				<?php /* concatenate and optimize seperate script files for deployment using google closure compiler (compiler.jar) in js folder */ ?>
				//{ load : Guru.TemplateUrl+'/js/theme.js' }
			]);
		</script>
		
<?php
		/* We add some JavaScript to pages with the comment form
		 * to support sites with threaded comments (when in use).
		 */
		//if ( is_singular() && get_option( 'thread_comments' ) )
		//	wp_enqueue_script( 'comment-reply' );

		/* Always have wp_head() just before the closing </head>
		 * tag of your theme, or you will break many plugins, which
		 * generally use this hook to add elements to <head> such
		 * as styles, scripts, and meta tags.
		 */
		wp_head();		
?>
	</head>
	<body <?php body_class(); ?>>
		
	  <div id="outer">
		
		<?php get_template_part('featured','background'); ?>
		
		<?php get_template_part('nav','top'); ?>
		
		<div id="mainWrap" class="wrap">
			<?php get_template_part('header','banner'); ?>
			<?php get_template_part('front-page','rotator'); ?>
		</div>
		
		
		<section id="content" class="box wrap" role="main">
			<div class="inner">
			<?php get_template_part('nav','primary'); ?>