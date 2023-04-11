/* eslint-disable react/no-danger */
import { dispatchContexts, showContexts, themeContexts } from '../ThemeSettings';
const { useState, useEffect, useRef } = wp.element;
const { TextControl, PanelBody, Button } =
  wp.components;
const { __ } = wp.i18n;

const SingleField = (props) => {

	const [ text, setText ] = useState(props.value);
	const { theme, setTheme } = themeContexts();

	const onChange = (e) => { 
		var path = `${props.parent}.${props.id}`;
		if (path.charAt(0)==='.') {
			path = path.substring(1);
		}

		setText(e.target.value);
		const updateTheme = { ...theme };

		function updateObject(object, newValue, path) {
			var stack = path.split('.');
			while(stack.length > 1) {
				object = object[stack.shift()];
			}
			object[stack.shift()] = newValue;
		}
		
		updateObject(updateTheme, e.target.value, path);

		setTheme(updateTheme);
		console.log(theme);

	;}

  return (
    <>
	<div class='field-header'>
	{props.id} 
	</div>
		<input 
        type="text" 
        id={props.id}
        value={text} 
        onChange={(val) => onChange(val)}
		parent={props.parent}
		/>

    </>
  );
};

export default SingleField;
