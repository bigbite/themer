<?php
/**
 * Plugin Name:       Themer
 * Description:       A plugin to help you style themes faster.
 * Version:           1.0.0-rc.1
 * Requires at least: 6.2
 * Requires PHP:      8.0
 * Author:            Big Bite
 * Author URI:        https://bigbite.net
 * Plugin URI:        https://github.com/bigbite/themer/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Update URI:        https://github.com/bigbite/themer/releases/
 *
 * @package themer
 */

namespace Big_Bite\themer;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Define the plugin path.
if ( ! defined( 'THEMER_DIR' ) ) {
	define( 'THEMER_DIR', plugin_dir_path( __FILE__ ) );
}

/**
 * Activation hook for both single site and multisite.
 * For multisite, this will run when the plugin is network activated.
 *
 * @param bool $network_wide Whether to activate the plugin network-wide.
 */
function activate_themer( $network_wide ) {
	if ( is_multisite() && $network_wide ) {
		$blog_ids = get_sites( array( 'fields' => 'ids' ) );
		foreach ( $blog_ids as $blog_id ) {
			switch_to_blog( $blog_id );
			setup_themer_options();
			restore_current_blog();
		}
	} else {
		setup_themer_options();
	}
}

/**
 * Setup function for Themer options.
 * This should contain tasks that need to be run on activation.
 */
function setup_themer_options() {
	/**
	* Check if the block theme is active.
	*/
	if ( ! wp_is_block_theme() ) {
		require_once rtrim( \dirname( __FILE__ ) ) . '/inc/class-theme-check.php';
		Theme_Check::theme_valid_check();
	}
}

require_once rtrim( \dirname( __FILE__ ) ) . '/vendor/autoload_packages.php';

add_action( 'plugins_loaded', __NAMESPACE__ . '\\setup', 0 );

register_activation_hook( __FILE__, 'activate_themer' );
