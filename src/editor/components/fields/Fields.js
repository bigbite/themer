/* eslint-disable react/no-danger */
import { dispatchContexts, showContexts, themeContexts } from '../ThemeSettings';
import SingleField from './Field';
const { useState, useEffect, useRef } = wp.element;
const { TextControl, PanelBody, Button, FormToggle } = wp.components;
const { __ } = wp.i18n;


const Fields = (props) => {
  const [field, setField ] = useState();
  const showToggle = showContexts();
  const { theme, setTheme } = themeContexts();

  if (!theme) {
    return;
  }

  // const headings = theme?.styles?.elements;
  const headings = theme;

  if (!headings) {
    return null;
  }

  const saveTheme = () => {
    console.log('saving');
  }

const renderInputs = (data, path) => {
  const inputs = Object.entries(data).map(([key, value]) => {
    if (
      typeof value === "object" && 
      value !== null
    ) {
    const currentPath = path + `.${key}`;
      return (
        <div>
          <PanelBody
          title={ key }
		      initialOpen={ true }
          >
          <div class="sub-group">
            {renderInputs(value, currentPath)}
          </div>
          </PanelBody>
        </div>
      )
    }
    if(typeof value === "string") {
      const currentPath = path;
    return (
      <div>
      <SingleField 
      parent={currentPath}
      id={key}
      value = {value}
      headings={headings}
      />
      </div>
    );
    }
    if(typeof value === 'boolean') {
      return (
        <div>
          {key}
          <FormToggle checked={value}/>
        </div>
      )
    }
  });
  return inputs;
};

  return (
    <>
        {renderInputs(headings)}
         <Button isPrimary onClick={saveTheme} text='Submit' />
    </>
  );
};

export default Fields;
