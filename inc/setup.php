<?php
/**
 * Set up the plugin.
 *
 * @package themer
 */

namespace Big_Bite\themer;

/**
 * Runs the plugin setup sequence.
 *
 * @return void
 */
function setup() : void {
	new Admin();
	new Rest_API();
}
