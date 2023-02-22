import { render } from '@wordpress/element';
import { NAMESPACE } from '../editor/settings';
import ThemeSettings from '../editor/components/ThemeSettings';

import '../editor/styles/styles.scss';

const { registerPlugin } = wp.plugins;



// Register the plugin.
wp.domReady(() => {
  registerPlugin(NAMESPACE, {
    icon: 'editor-paragraph',
    render: ThemeSettings,
  });

  console.log('test', document.getElementById('themer-admin-screen'));


    render(
      <ThemeSettings />,
      document.getElementById('themer-admin-screen'),
    );

});
