<?php
/**
 * Generate an admin screen we can use for the plugin.
 *
 * @package themer
 */

namespace Big_Bite\themer;

/**
 * Generate an admin screen we can use for the plugin.
 */
class Admin {
	/**
	 * Initialise the hooks and filters.
	 */
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'create_admin_screen' ), 1 );
	}

	/**
	 * Enqueue any required assets for the plugin.
	 *
	 * @return void
	 */
	public function enqueue_assets() : void {

		$plugin_name = basename( THEMER_DIR );
		$asset_file  = include THEMER_DIR . '/build/index.asset.php';

		wp_enqueue_style( 'wp-components' );

		wp_enqueue_script(
			'themer',
			plugins_url( $plugin_name . '/build/index.js', $plugin_name ),
			$asset_file['dependencies'],
			$asset_file['version'],
			false
		);

		wp_enqueue_style(
			'themer',
			plugins_url( $plugin_name . '/build/index.css', $plugin_name ),
			array(),
			$asset_file['version']
		);
	}

	/**
	 * Create an admin screen for theme settings.
	 *
	 * @return void
	 */
	public function create_admin_screen() : void {
		add_theme_page(
			__( 'Styles Editor' ),
			'Styles Editor',
			'edit_theme_options',
			'styles_editor',
			array( $this, 'render_settings_page' ),
		);
	}

	/**
	 * Render the content for the theme settings page.
	 */
	public function render_settings_page() {
		$this->enqueue_assets();
		require __DIR__ . '/edit-form-themer.php';
	}
}
