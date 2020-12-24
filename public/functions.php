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