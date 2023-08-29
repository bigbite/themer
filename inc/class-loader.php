<?php
/**
 * Loader for handling assets.
 *
 * @package themer
 */

namespace Big_Bite\themer;

use WP_Block_Editor_Context;

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
	 * Get the editor settings
	 */
	public function get_themer_editor_settings() {
		$block_editor_context = new WP_Block_Editor_Context( array() );

		return get_block_editor_settings( array(), $block_editor_context );
	}

	/**
	 * Enqueue any required assets for the themer plugin.
	 *
	 * @return void
	 */
	public function enqueue_themer_assets() : void {
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

		wp_localize_script(
			self::SCRIPT_NAME,
			'themerPlugin',
			array(
				'editor_settings' => $this->get_themer_editor_settings(),
			)
		);
	}
}






