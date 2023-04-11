/* eslint-disable react/no-danger */
import { dispatchContexts, showContexts, themeContexts } from '../ThemeSettings';
const { useState, useEffect, useRef } = wp.element;
const { TextControl, PanelBody, Button } =
  wp.components;
const { __ } = wp.i18n;

const SingleField = (props) => {

	const [ structure, setStructure ] = useState();
	const [ text, setText ] = useState(props.value);
	const [ valuePath, setValuePath] = useState();

	const onChange = (e) => { 
		console.log(props.parent);
		const path = `${props.parent}/${props.id}`;

		// const path = {
		// 	[props.parent]: {
		// 		[props.id]: {

		// 		}
		// 	}
		// }
		setText(e.target.value);
		setValuePath(path);

		console.log(valuePath);
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
