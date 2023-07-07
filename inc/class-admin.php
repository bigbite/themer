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
	 * Create an admin screen for theme settings.
	 *
	 * @return void
	 */
	public function create_admin_screen() : void {
		add_options_page(
			__( 'Theme Settings' ),
			'Theme Customiser',
			$this->plugin_access_capability(),
			'theme_settings',
			array( $this, 'theme_render_settings' ),
		);
	}

	/**
	 * Render the content for the theme settings page.
	 */
	public function theme_render_settings() {
		?>
	<div id="themer-admin-screen" class="theme-settings-page-wrapper wrap"></div>
		<?php
	}

	/**
	 * Controls plugin access via a user capability
	 *
	 * @return string
	 */
	public function plugin_access_capability() : string {
		/**
		 * Filters the required user capability for plugin access
		 *
		 * @param string Required user capability for plugin access
		 */
		$allowed_capability = apply_filters( 'themer_plugin_access_capability', 'manage_options' );

		return $allowed_capability;
	}
}
