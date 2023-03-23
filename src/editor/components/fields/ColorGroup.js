/* eslint-disable react/no-danger */
import { dispatchContexts, showContexts } from '../ThemeSettings';
import TextInput from './TextInput';
const { useState, useEffect } = wp.element;

const { TextControl, ColorPalette, ColorPicker, Panel, PanelHeader, PanelRow, PanelBody } =
  wp.components;
const { __ } = wp.i18n;

/** The main app container */
const ColorGroup = (props) => {
  const showToggle = showContexts();

  const dispatch = dispatchContexts();

  const showDialog = () => {
    dispatch({ type: 'showDialog', value: true });
  };

  return (
    <>
      <div className="colorGroup">
        <div>Group Init</div>
        <TextInput />
        <button onClick={showDialog}>show Dialog</button>
      </div>
    </>
  );
};

export default ColorGroup;
