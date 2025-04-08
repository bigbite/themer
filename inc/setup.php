<?php
/**
 * Set up the plugin.
 *
 * @package themer
 */

namespace Big_Bite\Themer;

/**
 * Runs the plugin setup sequence.
 *
 * @return void
 */
function setup(): void {
	new Admin();
	new REST_API();
}
