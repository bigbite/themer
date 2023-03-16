/* eslint-disable react/no-danger */
import { dispatchContexts, showContexts, themeContexts } from '../ThemeSettings';
const { useState, useContext } = wp.element;
const { TextControl, ColorPalette, ColorPicker, Panel, PanelHeader, PanelRow, PanelBody, Button } =
  wp.components;
const { __ } = wp.i18n;

const logTheme = (themeData) => {
  console.log('theme data');
};

const TextInput = (props) => {
  const showToggle = showContexts();
  const { theme, setTheme } = themeContexts();

  //const { theme, setTheme } = useContext(themeContexts);
  //console.log('show set theme', setTheme);
  return (
    <>
      <div className="field">{showToggle[0] ? console.log('show') : console.log('hide')}</div>
      <Button
        isPrimary
        onClick={() => {
          console.log('theme data', theme);
          const updateTheme = theme;
          updateTheme.settings.layout.contentSize = '800px';
          setTheme(updateTheme);
        }}
      >
        Set content width to 800px
      </Button>
    </>
  );
};

export default TextInput;
