/* eslint-disable react/no-danger */
const { useState, useEffect, useRef } = wp.element;
const { TextControl, PanelBody, Button } =
  wp.components;
const { __ } = wp.i18n;
import { mergeWith, isEmpty } from 'lodash';
import { ColorPicker } from '@wordpress/components';

const SingleField = (props) => {
	const getGlobalStylesId = () => wp.data.select('core').__experimentalGetCurrentGlobalStylesId();
	const [ text, setText ] = useState(props.value);
	const [ con, setCon ] = useState();

	const getRes = (object, newObj) => {
		console.log(object, newObj);

		if(!newObj){
	
			return;
		}
	
		return mergeWith(object, {...newObj})
	}

	const onChange = (e) => { 
		var path = `${props.parent}.${props.id}`;
		if (path.charAt(0)==='.') {
			path = path.substring(1);
		}
		setText(e);
		function updateObject(o, newValue, path) {
			const object = wp.data.select('core').getEditedEntityRecord('root', 'globalStyles', getGlobalStylesId()).styles;
			let newObj = {};
			let pointer = newObj;
			path.split('.').map((key, index, arr) => {
				pointer = (pointer[key] = (index == arr.length - 1? newValue: {}));
			});

console.log(newObj)
			wp.data.dispatch('core').editEntityRecord(
				'root',
				'globalStyles',
				getGlobalStylesId(),
				{'styles':
				getRes(object, newObj)
			}
			);
		}
		updateObject(props.data, e, path);
	;}
		return (
			<>
			<>{props.id}</>
			{/* <ColorPicker 
			color={text ? text : props.color}
			onChange={(val) =>onChange(val)}
			/> */}
			<TextControl label='Overwrite value' value={ text ? text: props.color} onChange={(val)=>onChange(val)}/>
			</>
		)
};

export default SingleField;
