/* eslint-disable react/no-danger */
import { dispatchContexts, showContexts } from '../ThemeSettings';
const { useState } = wp.element;
const { TextControl, ColorPalette, ColorPicker, Panel, PanelHeader, PanelRow, PanelBody } =
  wp.components;
const { __ } = wp.i18n;

const TextInput = (props) => {
  const showToggle = showContexts();
  return (
    <>
      <div className="field">{showToggle[0] ? alert('showntoggle') : ' '}</div>
    </>
  );
};

export default TextInput;
