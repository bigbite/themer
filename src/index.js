import { registerPlugin } from '@wordpress/plugins';
import { render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';

import { NAMESPACE } from './editor/settings';
import ComponentWrapper from './editor/components/ComponentWrapper';
import composeUI from './editor/utils/schemaParser';

import './editor/styles/styles.scss';

// Register the plugin.
domReady(() => {
	registerPlugin(NAMESPACE, {
		icon: 'editor-paragraph',
		render: ComponentWrapper,
	});

	composeUI();

	render(
		<ComponentWrapper />,
		document.getElementById('themer-admin-screen')
	);
});
