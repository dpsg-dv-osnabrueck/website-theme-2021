<?php

// Register main navigation
function registerMainNav() {
  register_nav_menus(
    array(
      'main_navigation' => __( 'Main Navigation' ),
    )
  );
}
add_action( 'init', 'registerMainNav' );

/* Image Sizes */
add_image_size( 'front_news', 960, 640, true );
add_image_size( 'detail_news', 960, 200, true );
add_image_size( 'gallery_overview', 350, 350, true );
add_image_size( 'portrait', 640, 850, true );
add_image_size( 'full-size', 1600, 1600 );

// Options Page

if( function_exists('acf_add_options_page') ) {

  $page = acf_add_options_page(array(
      'page_title' 	=> 'Impressum',
      'menu_title' 	=> 'Impressum',
      'menu_slug' 	=> 'imprint',
      'capability' 	=> 'edit_posts',
      'redirect' 	=> false
  ));

}

if( function_exists('acf_add_options_page') ) {

  $page = acf_add_options_page(array(
      'page_title' 	=> 'Startseite',
      'menu_title' 	=> 'Startseite',
      'menu_slug' 	=> 'startpage',
      'capability' 	=> 'edit_posts',
      'redirect' 	=> false
  ));

}