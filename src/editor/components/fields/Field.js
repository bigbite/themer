/* eslint-disable react/no-danger */
const { useState, useEffect, useRef } = wp.element;
const { TextControl, PanelBody, Button } =
  wp.components;
const { __ } = wp.i18n;
import { ColorPicker } from '@wordpress/components';
import { get, set, merge, isEmpty } from 'lodash';

const SingleField = (props) => {
	const getGlobalStylesId = () => wp.data.select('core').__experimentalGetCurrentGlobalStylesId();
	const [ text, setText ] = useState(props.value);
	const [base, setBase] = useState()
	const context = {...{}};

	const cleanEmptyObject = ( object ) => {
		if (
			object === null ||
			typeof object !== 'object' ||
			Array.isArray( object )
		) {
			return object;
		}
		const cleanedNestedObjects = Object.fromEntries(
			Object.entries( object )
				.map( ( [ key, value ] ) => [ key, cleanEmptyObject( value ) ] )
				.filter( ( [ , value ] ) => value !== undefined )
		);
		return isEmpty( cleanedNestedObjects ) ? undefined : cleanedNestedObjects;
	};

	const edit = (object, path, newValue) => {
		const current = {...wp.data.select('core').getEditedEntityRecord('root', 'globalStyles', getGlobalStylesId())};
		const updated = set(context, path, newValue);
		const newObj = merge(current, updated)
		wp.data.dispatch('core').editEntityRecord(
			'root',
			'globalStyles',
			getGlobalStylesId(),
			{
				styles: cleanEmptyObject(newObj.styles) || {},
				settings: cleanEmptyObject(newObj.settings) || {},
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
			edit(object, path, newValue);
		}
		updateObject(props.data, e, path);
	}
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
