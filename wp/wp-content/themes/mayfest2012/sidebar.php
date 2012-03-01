<?php
/**
 * The Sidebar containing the primary and secondary widget areas.
 *
 * @package WordPress
 * @subpackage Boilerplate
 * @since Boilerplate 1.0
 */
?>

<aside id="sidebar">

<?php if ( !is_front_page() ) : ?>

<?php get_template_part('header','banner'); ?>

<?php endif; ?>

</aside>