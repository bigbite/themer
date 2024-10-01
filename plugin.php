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

require_once rtrim( \dirname( __FILE__ ) ) . '/vendor/autoload_packages.php';

add_action( 'plugins_loaded', __NAMESPACE__ . '\\setup', 0 );
