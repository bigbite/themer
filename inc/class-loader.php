<?php
/**
 * Loader for handling assets.
 *
 * @package themer
 */

namespace Big_Bite\themer;

/**
 * Loader for handling assets.
 */
class Loader {

	const SCRIPT_NAME = 'themer-script';
	const STYLE_NAME  = 'themer-style';

	/**
	 * Initialise the hooks and filters.
	 */
	public function __construct() {
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_themer_assets' ), 1 );
	}

	/**
	 * Enqueue any required assets for the themer plugin.
	 *
	 * @return void
	 */
	public function enqueue_themer_assets() : void {
		$current_screen = get_current_screen();
		if ( 'appearance_page_styles_editor' !== $current_screen->id ) {
			return;
		}

		$plugin_name = basename( THEMER_DIR );
		$asset_file  = include THEMER_DIR . '/build/index.asset.php';

		wp_enqueue_style( 'wp-components' );

		wp_enqueue_script(
			self::SCRIPT_NAME,
			plugins_url( $plugin_name . '/build/index.js', $plugin_name ),
			array_merge( $asset_file['dependencies'], array( 'wp-edit-post' ) ),
			$asset_file['version'],
			false
		);

		wp_enqueue_style(
			self::STYLE_NAME,
			plugins_url( $plugin_name . '/build/index.css', $plugin_name ),
			array(),
			$asset_file['version']
		);
	}
}






