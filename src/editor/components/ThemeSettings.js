/* eslint-disable react/no-danger */
import ColourField from './fields/ColorField';
import { getTheme, setThemeSettings } from '../api';

const { useState, useRef, useEffect } = wp.element;
const { ColorPalette, ColorPicker, Panel, PanelHeader, PanelRow, PanelBody, Button } =
  wp.components;
const { __ } = wp.i18n;

/** The main app container */
const ThemeSettings = () => {
  const [colourSettings, setColourSettings] = useState([]);
  const [theme, setTheme] = useState([]);
  const [loading, setLoading] = useState(false);
  const colorItems = [];
  const mounted = useRef(false);

  const fetchCurrentTheme = async () => {
    const response = await getTheme();
    console.log('theme', response);
    setTheme(response);
  };

  const setPaletteData = ($key, $data) => {
    console.log('data now in parent', $key, $data);

    // const currentValue = Object.entries(theme.settings.color.palette.theme).find(([key, val]) => $data === val);
    let newTheme = theme;
    let themeColours = theme.settings.color.palette.theme.filter(function (entry) {
      if (entry.slug === $key) {
        entry.color = $data;
      }
      return entry;
    });

    console.log('theme colours', themeColours);

    newTheme.settings.color.palette.theme = themeColours;

    // currentValue.color = $data;

    if (theme === newTheme) {
      console.log('they match');
    } else {
      console.log('no match');
    }

    setTheme(newTheme);

    console.log('new theme', newTheme);

    setLoading(true);

    console.log('loading set true');

    //console.log('current valuessss', currentValue);
  };

  const saveSettings = async () => {
    console.log('save');
    await setThemeSettings(theme);
    setTheme(theme);
  };

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

  if (theme.length !== 0) {
    const themePallette = theme.settings.color.palette.theme;
    {
      themePallette.map((value) =>
        colorItems.push(
          <ColourField
            key={value.slug}
            color={value.color}
            slug={value.slug}
            name={value.name}
            setPaletteData={setPaletteData}
          />,
        ),
      );
    }
  }

  console.log('rerender');

  return (
    <>
      <Panel>
        <PanelBody
          title={__('Global Colours')}
          icon={''}
          initialOpen={true}
          onToggle={(e) => console.log('toggled', e)}
        >
          <PanelRow>{colorItems}</PanelRow>
        </PanelBody>
        <PanelBody title={__('Block Settings')}>
          <PanelRow></PanelRow>
        </PanelBody>
      </Panel>
      <Button isPrimary onClick={() => saveSettings()}>
        {__('Save')}
      </Button>
    </>
  );
};

export default ThemeSettings;
