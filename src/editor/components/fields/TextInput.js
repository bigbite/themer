/* eslint-disable react/no-danger */
import { dispatchContexts, showContexts, themeContexts } from '../ThemeSettings';
const { useState } = wp.element;
const { TextControl, ColorPalette, ColorPicker, Panel, PanelHeader, PanelRow, PanelBody, Button } =
  wp.components;
const { __ } = wp.i18n;

const logTheme = (themeData) => {
  console.log('theme data');
};

const TextInput = (props) => {
  const showToggle = showContexts();
  const themeData = themeContexts();
  console.log('show toggle', showToggle);
  console.log('theme data', themeData);
  return (
    <>
      <div className="field">{showToggle[0] ? console.log('show') : console.log('hide')}</div>
      <Button onClick={() => console.log('theme data', themeData)}>Log theme</Button>
    </>
  );
};

export default TextInput;
