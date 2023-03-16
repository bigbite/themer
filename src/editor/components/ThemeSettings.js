/* eslint-disable react/no-danger */
import ComponentWrapper from './ComponentWrapper';
import { getTheme, setThemeSettings } from '../api';

const { useState, useRef, useEffect, useReducer, useContext, createContext } = wp.element;
const { ColorPalette, ColorPicker, Panel, PanelHeader, PanelRow, PanelBody, Button } =
  wp.components;
const { __ } = wp.i18n;

const themeContext = createContext();
const showContext = createContext();
const dispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'showDialog':
      return [action.value];
    case 'hideDialog':
      return [action.value];
    case 'applySettings':
      return [action.value];
    default:
      throw new Error('invalid toggle');
  }
};

const states = {
  showModal: false,
};

/** The main app container */
const ThemeSettings = () => {
  const [colourSettings, setColourSettings] = useState([]);
  const [theme, setTheme] = useState([]);
  const [loading, setLoading] = useState(false);
  const colorItems = [];
  const mounted = useRef(false);
  const [state, dispatch] = useReducer(reducer, states);
  const settings = new wp.api.models.Settings();
  const [apiLoading, setApiLoading] = useState(() => false);
  const [apiSaving, setApiSaving] = useState(() => false);

  const fetchCurrentTheme = async () => {
    const response = await getTheme();
    console.log('theme', response);
    setTheme(response);
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;

      if (false === apiLoading) {
        settings.fetch().then((response) => {
          console.log('this is the current override theme', response.theme_override_settings);
          //setSelectedFont(response.eps_headline_font);
          //setApiLoading(true);
        });
      }

      fetchCurrentTheme();
    }
  }, [true]);

  useEffect(() => {
    console.log('something changed');
  }, [theme]);

  console.log('theme before render', theme);
  console.log('rerender');

  const saveSettings = () => {
    console.log('save settings', theme);
  };

  return (
    <dispatchContext.Provider value={dispatch}>
      <showContext.Provider value={state}>
        <themeContext.Provider value={{ theme, setTheme }}>
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
        </themeContext.Provider>
      </showContext.Provider>
    </dispatchContext.Provider>
  );
};

export default ThemeSettings;
export const dispatchContexts = () => useContext(dispatchContext);
export const showContexts = () => useContext(showContext);
export const themeContexts = () => useContext(themeContext);
