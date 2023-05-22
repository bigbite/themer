import { render } from '@wordpress/element';
import { NAMESPACE } from '../editor/settings';
// import ThemeSettings from '../editor/components/ThemeSettings';
import ComponentWrapper from '../editor/components/ComponentWrapper';

import '../editor/styles/styles.scss';

const { registerPlugin } = wp.plugins;



// Register the plugin.
wp.domReady(() => {
  registerPlugin(NAMESPACE, {
    icon: 'editor-paragraph',
    render: ComponentWrapper,
  });

  console.log('test', document.getElementById('themer-admin-screen'));


    render(
      <ComponentWrapper />,
      document.getElementById('themer-admin-screen'),
    );

});
