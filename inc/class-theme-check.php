<?php
/**
 *
 * Handles activation permissions for themer .
 *
 * Network: true
 *
 * @package Themer
 */

namespace Big_Bite\themer;

/**
 * Handles activation permissions for themer.
 *
 * @package Themer
 */
class Theme_Check {

	/**
	 * Handles the plugin activation process.
	 *
	 * This will prevent activation || deactivate the plugin if the block theme is not active.
	 *
	 * @since 1.0.0
	 */
	public static function theme_valid_check() {
		add_action( 'admin_notices', array( __CLASS__, 'themer_activation_notice' ) );

		if ( ! function_exists( 'deactivate_plugins' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}

		\deactivate_plugins( plugin_basename( THEMER_DIR . '/plugin.php' ) );

		// phpcs:disable
		if ( isset( $_GET['activate'] ) ) {
			unset( $_GET['activate'] );
		}
		// phpcs:enable
	}

	/**
	 * Displays an error message when the block theme is not active.
	 *
	 * @since 1.0.0
	 */
	public static function themer_activation_notice() {
		$class   = 'notice notice-error is-dismissible';
		$message = __( 'Themer needs an active block theme to function.', 'themer' );

		printf( '<div class="%1$s"><p>%2$s</p></div>', esc_attr( $class ), esc_html( $message ) );
	}
}
