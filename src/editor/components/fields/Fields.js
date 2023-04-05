/* eslint-disable react/no-danger */
import { dispatchContexts, showContexts, themeContexts } from '../ThemeSettings';
import SingleField from './Field';
const { useState, useEffect, useRef } = wp.element;
const { TextControl, PanelBody, Button } =
  wp.components;
const { __ } = wp.i18n;

const Fields = (props) => {
  const [field, setField ] = useState();
  const showToggle = showContexts();
  const { theme, setTheme } = themeContexts();


  const onChange = (event) => {
    console.log(event);

  // var key = event.target.id;
  // var val = event.target.value;
  // var par = event.target.parent;
    // console.log(event.target);
  // var obj  = {};
  // obj[key] = val;
  // setField(obj);
  // console.log(field);
  };

  // const saveTheme = () => {
  //   console.log(field);
  //   let updateTheme = { ...headings };
  // }

  if (!theme) {
    return;
  }

  const headings = theme?.styles?.spacing;

  useEffect(() => {

    setField(headings);

    // console.log(field);
  
    },[headings]);

  // console.log(headings);

  if (!headings) {
    return null;
  }



const renderInputs = (data, parent) => {
  const inputs = Object.entries(data).map(([key, value]) => {
    if (
      typeof value === "object" &&
      !Array.isArray(value) &&
      value !== null
    ) {
      return (
        <div>
          <PanelBody
           title={key}
		      initialOpen={ true }
          >
          <div class="sub-group">
            {/* {console.log('sub value goes here', value)} */}
            {renderInputs(value, key)}
          </div>
          </PanelBody>
        </div>
      )
    }
    // console.log(value, parent);
    return (
      <div>
      <PanelBody
        title={key}
		    initialOpen={ true }
      >
        <TextControl 
        label={key}
        value={field ? field[`${key} + ${Math.random()}`] : value} 
        onChange={(e)=>onChange(e, key, Math.random(), value)} />
        {/* <input 
        type="text" 
        label={key} 
        parent={parent}
        id={key}
        value={field ? field[`${key} + ${Math.random()}`] : value} 
        onChange={(e) => onChange(e)}/> */}
      </PanelBody>

      {/* <SingleField 
      label={key}
      id={key}
      parent={parent}
      value={field ? field[` + ${Math.random()}`] : value}
      onChange={onChange}
      /> */}

          </div>
    );
  });
  return inputs;
};

  return (
    <>
        {renderInputs(headings)}
        
        {/* <Button variant='primary'
        onClick={saveTheme}
        >New Save</Button> */}

        {/* <SingleField /> */}

    </>
  );
};

export default Fields;
