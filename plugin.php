<?php
/**
 * Plugin Name:       themer
 * Description:       
 * Version:           1.0.0-alpha.1
 * Requires at least: 5.5
 * Requires PHP:      7.4
 * Author:            Big Bite
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Update URI:        https://example.com/my-plugin/
 * Text Domain:       
 */

namespace Big_Bite\themer;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once rtrim( \dirname( __FILE__ ) ) . '/vendor/autoload_packages.php';

add_action( 'plugins_loaded', __NAMESPACE__ . '\\setup', 0 );
