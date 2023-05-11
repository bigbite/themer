import { MyComponent } from './fields/MyComponent';
const {Panel, PanelRow, PanelBody} = wp.components;

/** The main app container */
const ThemeSettings = () => {

  return (
    <Panel>
    <PanelBody
      title={'Content Settings'}
      icon={''}
      initialOpen={true}
      onToggle={(e) => console.log('toggled', e)}
    >
    <PanelRow>
   <MyComponent />
   </PanelRow>
  </PanelBody>
  </Panel>
  );
};

export default ThemeSettings;

