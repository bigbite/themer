<?php

namespace Big_Bite\themer;

/**
 * Runs the plugin setup sequence.
 *
 * @return void
 */
function setup() : void {
	new Loader();
	new AdminSetup();
}
