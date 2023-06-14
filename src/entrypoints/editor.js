import { registerPlugin } from '@wordpress/plugins';
import { render } from '@wordpress/element';
import { NAMESPACE } from '../editor/settings';
import ComponentWrapper from '../editor/components/ComponentWrapper';

import '../editor/styles/styles.scss';

// Register the plugin.
wp.domReady(() => {
  registerPlugin(NAMESPACE, {
    icon: 'editor-paragraph',
    render: ComponentWrapper,
  });

  console.log('test', document.getElementById('themer-admin-screen'));

  render(<ComponentWrapper />, document.getElementById('themer-admin-screen'));
});
