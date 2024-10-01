import { createRoot } from '@wordpress/element';
import { registerCoreBlocks } from '@wordpress/block-library';
import { set } from 'lodash';

import Themer from './editor/components/Themer';

import './editor/styles/index.scss';

/**
 * Initialise the editor and render the themer react component.
 * This function is called within the PHP template for the themer page.
 *
 * @param {string} id       The ID of the root element to render the editor into
 * @param {Object} settings The editor settings
 */
function initializeEditor( id, settings ) {
	const root = document.getElementById( id );
	if ( root ) {
		registerCoreBlocks();
		createRoot( root ).render( <Themer editorSettings={ settings } /> );
	}
}

set( window, 'themer.initializeEditor', initializeEditor );
