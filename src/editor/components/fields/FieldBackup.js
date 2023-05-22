/* eslint-disable react/no-danger */
const { useState, useEffect, useRef } = wp.element;
import { ColorPicker } from '@wordpress/components';

const { __ } = wp.i18n;

const SingleField = (props) => {
	console.log(wp.data.select('core').getEditedEntityRecord('root', 'globalStyles', '5'))


	const [ text, setText ] = useState(props.value);
	const [ con, setCon ] = useState();
	const getGlobalStylesId = () => wp.data.select('core').__experimentalGetCurrentGlobalStylesId();

	const onChange = (e) => {
		const text = e.target.value;
		var path = `${props.parent}.${props.id}`;
		if (path.charAt(0)==='.') {
			path = path.substring(1);
		}
		setText(text);

		const merge = (target, source) => {
			// Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
			for (const key of Object.keys(source)) {
			  if (source[key] instanceof Object) Object.assign(source[key], merge(target[key], source[key]))
			}
			// Join `target` and modified `source`
			Object.assign(target || {}, source)
			return target
		  }
	
		function updateObject(path) {
			const current = wp.data.select('core').getEditedEntityRecord('root', 'globalStyles', '5');
			var stack = path.split('.');
			const result = stack.reverse().reduce((res, key) => ({[key]: res}), text);
			wp.data.dispatch('core').editEntityRecord(
				'root',
				'globalStyles',
				getGlobalStylesId(),
				merge(current, result)
			);
		}
		updateObject(path);

	;}


		return (
			<>
			<div class='field-header'>
			{props.id} 
			</div>
				<input 
				type="text" 
				id={props.id}
				value={text ? text : props.value} 
				onChange={(val) => onChange(val)}
				parent={props.parent}
				/>
		
			</>
		)

		// return (
		// 	<>
		// 	<>{props.id}</>
		// 	<ColorPicker 
		// 	color={text ? text : props.color}
		// 	onChange={(val) =>onChange(val)}
		// 	/>
		// 	</>
		// )


};

export default SingleField;
