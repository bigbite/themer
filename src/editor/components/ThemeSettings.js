/* eslint-disable react/no-danger */
import ComponentWrapper from './ComponentWrapper';
import { getTheme, setThemeSettings } from '../api';

const { useState, useRef, useEffect, useReducer, useContext, createContext } = wp.element;
const { ColorPalette, ColorPicker, Panel, PanelHeader, PanelRow, PanelBody, Button } =
  wp.components;
const { __ } = wp.i18n;

const showContext = createContext();
const dispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'showDialog':
      return [action.value];
    default:
      throw new Error('invalid toggle');
  }
};

const states = {
  value: false,
};

/** The main app container */
const ThemeSettings = () => {
  const [colourSettings, setColourSettings] = useState([]);
  const [theme, setTheme] = useState([]);
  const [loading, setLoading] = useState(false);
  const colorItems = [];
  const mounted = useRef(false);
  const [state, dispatch] = useReducer(reducer, states);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;

      fetchCurrentTheme();
    }
  }, [true]);

  useEffect(() => {
    console.log('something changes');
  }, [theme]);

  console.log('theme before render', theme);
  console.log('rerender');

  return (
    <dispatchContext.Provider value={dispatch}>
      <showContext.Provider value={state}>
        <Panel>
          <PanelBody
            title={__('Global Colours')}
            icon={''}
            initialOpen={true}
            onToggle={(e) => console.log('toggled', e)}
          >
            <PanelRow>
              <ComponentWrapper></ComponentWrapper>
            </PanelRow>
          </PanelBody>
          <PanelBody title={__('Block Settings')}>
            <PanelRow></PanelRow>
          </PanelBody>
        </Panel>
        <Button isPrimary onClick={() => saveSettings()}>
          {__('Save')}
        </Button>
      </showContext.Provider>
    </dispatchContext.Provider>
  );
};

export default ThemeSettings;
export const dispatchContexts = () => useContext(dispatchContext);
export const showContexts = () => useContext(showContext);
