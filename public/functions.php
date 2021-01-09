<?php

// Register main navigation
function registerMainNav() {
  register_nav_menus(
    array(
      'main_navigation' => __( 'Main Navigation' ),
      'footer_nav' => __( 'Footer Navigation' )
    )
  );
}
add_action( 'init', 'registerMainNav' );

// Image sizes used in https://bulma.io/documentation/elements/image/
add_image_size( 'is-16x16', 32, 32, ['center', 'center'] );
add_image_size( 'is-24x24', 48, 48, ['center', 'center'] );
add_image_size( 'is-32x32', 64, 64, ['center', 'center'] );
add_image_size( 'is-48x48', 96, 96, ['center', 'center'] );
add_image_size( 'is-64x64', 128, 128, ['center', 'center'] );
add_image_size( 'is-96x96', 192, 192, ['center', 'center'] );
add_image_size( 'is-128x128', 256, 256, ['center', 'center'] );
add_image_size( 'is-square', 1000, 1000, ['center', 'center'] );
add_image_size( 'is-5by4', 1000, 800, ['center', 'center'] );
add_image_size( 'is-4by3', 1000, 750, ['center', 'center'] );
add_image_size( 'is-3by2', 1000, 667, ['center', 'center'] );
add_image_size( 'is-16by9', 1000, 563, ['center', 'center'] );
add_image_size( 'is-2by1', 1000, 500, ['center', 'center'] );
add_image_size( 'is-3by1', 1000, 333, ['center', 'center'] );
add_image_size( 'is-4by5', 800, 1000, ['center', 'center'] );
add_image_size( 'is-3by4', 750, 1000, ['center', 'center'] );
add_image_size( 'is-2by3', 667, 1000, ['center', 'center'] );
add_image_size( 'is-3by5', 600, 1000, ['center', 'center'] );
add_image_size( 'is-9by16', 563, 1000, ['center', 'center'] );
add_image_size( 'is-1by2', 500, 1000, ['center', 'center'] );
add_image_size( 'is-1by3', 333, 1000, ['center', 'center'] );

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

if( function_exists('acf_add_options_page') ) {

  $page = acf_add_options_page(array(
      'page_title' 	=> 'Instagram',
      'menu_title' 	=> 'Instagram',
      'menu_slug' 	=> 'instagram',
      'capability' 	=> 'edit_posts',
      'redirect' 	=> false
  ));

}

if( function_exists('acf_add_options_page') ) {

  $page = acf_add_options_page(array(
      'page_title' 	=> 'Termine',
      'menu_title' 	=> 'Termine',
      'menu_slug' 	=> 'termine',
      'capability' 	=> 'edit_posts',
      'redirect' 	=> false
  ));

}

/* Disable XMLRPC */
add_filter( 'xmlrpc_enabled', '__return_false' );

/* Remove XMLRPC, WLW, Generator and ShortLink tags from header */
remove_action('wp_head', 'rsd_link');
