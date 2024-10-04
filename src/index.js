import { registerPlugin } from '@wordpress/plugins';
import { render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';
import { registerCoreBlocks } from '@wordpress/block-library';

import { NAMESPACE } from './editor/settings';
import ComponentWrapper from './editor/components/ComponentWrapper';

import './editor/styles/index.scss';

// Register the plugin.
domReady( () => {
	registerPlugin( NAMESPACE, {
		icon: 'editor-paragraph',
		render: ComponentWrapper,
	} );

	registerCoreBlocks();

	render(
		<ComponentWrapper />,
		document.getElementById( 'themer-admin-screen' )
	);
} );
