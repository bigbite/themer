<?php

/**
 * A page template for displaying the themer admin page.
 *
 * Handles the enqueing of block editor assets and initialization of the editor within themer view.
 *
 * Adapted from wp-admin/edit-form-blocks.php
 *
 * @package themer
 */

declare( strict_types = 1 );

if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

/**
 * Load WordPress globals
 *
 * @global string       $post_type
 * @global WP_Post_Type $post_type_object
 * @global WP_Post      $post
 * @global string       $title
 * @global array        $wp_meta_boxes
 */
global $post_type, $post_type_object, $post, $title, $wp_meta_boxes;

$title = __( 'Styles Editor', 'themer' ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited -- Required to set the page title for this view.

$block_editor_context = new WP_Block_Editor_Context( array( 'name' => 'core/edit-site' ) );

// Default to is-fullscreen-mode to avoid jumps in the UI.
add_filter(
	'admin_body_class',
	static function ( $classes ) {
		return "$classes is-fullscreen-mode";
	}
);

/*
 * Emoji replacement is disabled for now, until it plays nicely with React.
 */
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );

/*
 * Block editor implements its own Options menu for toggling Document Panels.
 */
add_filter( 'screen_options_show_screen', '__return_false' );

// Preload common data.
$preload_paths = array(
	'/wp/v2/types?context=view',
	'/wp/v2/users/me',
	'/wp/v2/settings',
	array( '/wp/v2/settings', 'OPTIONS' ),
);

block_editor_rest_api_preload( $preload_paths, $block_editor_context );

// Preload server-registered block schemas.
wp_add_inline_script(
	'wp-blocks',
	'wp.blocks.unstable__bootstrapServerSideBlockDefinitions(' . wp_json_encode( get_block_editor_server_block_settings() ) . ');'
);

$editor_settings = array(
	'hasFixedToolbar'    => true,  // effectively hides the toolbar since we don't render the fixed toolbar in the themer view.
	'templateLock'       => 'all', // prevents moving/removing blocks.
	'richEditingEnabled' => false,
	'codeEditingEnabled' => false,
	'focusMode'          => false,
	'enableCustomFields' => false,
);

wp_enqueue_style( 'wp-edit-post' );
do_action( 'enqueue_block_editor_assets' );

$editor_settings = get_block_editor_settings( $editor_settings, $block_editor_context );

// Add some custom styles
$editor_settings['styles'][] = array(
	'css' => '
		body { padding: 20px; }
	',
);

$init_script = <<<JS
( function() {
	window._wpLoadBlockEditor = new Promise( function( resolve ) {
		wp.domReady( function() {
			resolve( themer.initializeEditor( 'themer-root', %s ) );
		} );
	} );
} )();
JS;

$script = sprintf(
	$init_script,
	wp_json_encode( $editor_settings ),
);

wp_add_inline_script( 'themer', $script );

require_once ABSPATH . 'wp-admin/admin-header.php';
?>

<div class="block-editor">
	<h1 class="screen-reader-text hide-if-no-js"><?php echo esc_html( $title ); ?></h1>
	<div id="themer-root"></div>
</div>
