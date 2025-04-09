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

global $editor_styles;

/** WordPress Administration Bootstrap */
require_once ABSPATH . 'wp-admin/admin.php';

if ( ! current_user_can( 'edit_theme_options' ) ) {
	wp_die(
		esc_html( '<h1>' . __( 'You need a higher level of permission.', 'default' ) . '</h1>' ) .
		esc_html( '<p>' . __( 'Sorry, you are not allowed to edit styles on this site.', 'themer' ) . '</p>' ),
		403
	);
}

if ( ! wp_is_block_theme() ) {
	wp_die( esc_html__( 'The theme you are currently using is not compatible with the Site Editor.', 'default' ) );
}

$title = _x( 'Styles Editor', 'themer' ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited -- Required to set the page title for this view.

$current_screen = get_current_screen(); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited -- Required flag we're loading the block editor.
$current_screen->is_block_editor( true );

$block_editor_context = new WP_Block_Editor_Context( array( 'name' => 'core/edit-site' ) );

/*
 * Emoji replacement is disabled for now, until it plays nicely with React.
 */
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );

/*
 * Block editor implements its own Options menu for toggling Document Panels.
 */
add_filter( 'screen_options_show_screen', '__return_false' );

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
	'styles'             => get_block_editor_theme_styles(),
);

$active_global_styles_id = WP_Theme_JSON_Resolver::get_user_global_styles_post_id();
$active_theme            = get_stylesheet();

$preload_paths = array(
	array( rest_get_route_for_post_type_items( 'attachment' ), 'OPTIONS' ),
	array( rest_get_route_for_post_type_items( 'page' ), 'OPTIONS' ),
	'/wp/v2/types?context=view',
	'/wp/v2/types/wp_template?context=edit',
	'/wp/v2/types/wp_template_part?context=edit',
	'/wp/v2/templates?context=edit&per_page=-1',
	'/wp/v2/template-parts?context=edit&per_page=-1',
	'/wp/v2/themes?context=edit&status=active',
	'/wp/v2/global-styles/' . $active_global_styles_id . '?context=edit',
	'/wp/v2/global-styles/' . $active_global_styles_id,
	'/wp/v2/global-styles/themes/' . $active_theme,
	'themer/v1/styles',
);

block_editor_rest_api_preload( $preload_paths, $block_editor_context );

$editor_settings = get_block_editor_settings( $editor_settings, $block_editor_context );

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

wp_enqueue_style( 'wp-edit-post' );

do_action( 'enqueue_block_editor_assets' );

require_once ABSPATH . 'wp-admin/admin-header.php';
?>

<div class="block-editor">
	<h1 class="screen-reader-text hide-if-no-js"><?php echo esc_html( $title ); ?></h1>
	<div id="themer-root"></div>
</div>

<?php
require_once ABSPATH . 'wp-admin/admin-footer.php';
