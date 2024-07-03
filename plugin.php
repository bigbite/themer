<?php
/**
 * Plugin Name:       Themer
 * Description:       A plugin to help you style themes faster.
 * Version:           1.0.0-alpha
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
 * Check if the block theme is active.
 */
if ( ! wp_is_block_theme() ) {
	require_once rtrim( \dirname( __FILE__ ) ) . '/inc/class-themer-activator.php';
	Themer_Activator::activate();
}

require_once rtrim( \dirname( __FILE__ ) ) . '/vendor/autoload_packages.php';


add_action( 'plugins_loaded', __NAMESPACE__ . '\\setup', 0 );
