/* eslint-disable react/no-danger */
const { useState, useEffect, useRef } = wp.element;
const { TextControl, PanelBody, Button } =
  wp.components;
const { __ } = wp.i18n;
import { ColorPicker } from '@wordpress/components';

const SingleField = (props) => {
	const getGlobalStylesId = () => wp.data.select('core').__experimentalGetCurrentGlobalStylesId();
	const [ text, setText ] = useState(props.value);
	const [ con, setCon ] = useState();

	const edit = (object) => {
		wp.data.dispatch('core').editEntityRecord(
			'root',
			'globalStyles',
			getGlobalStylesId(),
			{
				'styles': {
					color : 
						object
					
				}
			}
		);
	}

	const onChange = (e) => { 
		var path = `${props.parent}.${props.id}`;
		if (path.charAt(0)==='.') {
			path = path.substring(1);
		}
		setText(e);
		function updateObject(object, newValue, path) {
			var stack = path.split('.');
			while(stack.length > 1) {
				object = object[stack.shift()];
			}
			object[stack.shift()] = newValue;
			edit(object);

			console.log(wp.data.select('core').getEditedEntityRecord('root', 'globalStyles', '5'))
		}
		updateObject(props.data, e, path);
	;}
		return (
			<>
			<>{props.id}</>
			<ColorPicker 
			color={text ? text : props.color}
			onChange={(val) =>onChange(val)}
			/>
			<TextControl label='Overwrite value' value={ text ? text: props.color} onChange={(val)=>onChange(val)}/>
			</>
		)
};

export default SingleField;
