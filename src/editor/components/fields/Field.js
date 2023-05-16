/* eslint-disable react/no-danger */
const { useState, useEffect, useRef } = wp.element;
const { TextControl, PanelBody, Button } =
  wp.components;
const { __ } = wp.i18n;

const SingleField = (props) => {

	const [ text, setText ] = useState(props.value);
	const [ con, setCon ] = useState();

	const onChange = (e) => { 
		var path = `${props.parent}.${props.id}`;
		if (path.charAt(0)==='.') {
			path = path.substring(1);
		}
		setText(e.target.value);
		function updateObject(object, newValue, path) {
			var stack = path.split('.');
			while(stack.length > 1) {
				object = object[stack.shift()];
			}
			object[stack.shift()] = newValue;
			console.log(object);
			wp.data.dispatch('core').editEntityRecord(
				'root',
				'globalStyles',
				'5',
				{
					'styles': {
						color : 
							object
						
					}
				}
			);

			console.log(wp.data.select('core').getEditedEntityRecord('root', 'globalStyles', '5'))
		}
		updateObject(props.data, e.target.value, path);

		
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
