<?php

namespace Big_Bite\themer;

/**
 * Runs the plugin setup sequence.
 *
 * @return void
 */
function setup() : void {
	if(
		! defined( 'THEMER_EDITOR_JS' ) ||
		! defined( 'THEMER_EDITOR_CSS' )
	) {
		throw new \Error( "Asset constants are not defined. You may need to run an asset build." );
	}

	new Loader();
	new AdminSetup();
}
