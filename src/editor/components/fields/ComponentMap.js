import { TextControl, ColorPicker } from '@wordpress/components';
import FontPicker from './Components/FontPicker';
import SpacingControl from './Components/SpacingControl';

/**
 * Returns appropriate component depending on field type
 *
 * @param {Object}   props
 * @param {string}   props.label
 * @param {string}   props.value
 * @param {Function} props.onChange
 * @param {Object}   props.data
 */
const ComponentMap = ( { label, value, onChange, data } ) => {
	const colorPickerArray = [ 'background', 'text' ];
	const fontPickerArray = [
		'fontFamily',
		'fontSize',
		'lineHeight',
		'textDecoration',
	];
	const blockGapArray = [ 'blockGap', 'top', 'right', 'bottom', 'left' ];

	switch ( true ) {
		case colorPickerArray.includes( label ):
			return (
				<ColorPicker
					defaultValue={ value }
					onChange={ ( val ) => onChange( val ) }
				/>
			);
		case fontPickerArray.includes( label ):
			return (
				<div className="themer-nav-fontpicker">
					<FontPicker
						id={ label }
						value={ value }
						onChange={ ( val ) => onChange( val ) }
						data={ data }
					/>
				</div>
			);
		case blockGapArray.includes( label ):
			return (
				<SpacingControl
					id={ label }
					value={ value }
					onChange={ ( val ) => onChange( val ) }
					data={ data }
				/>
			);
		default:
			return (
				<TextControl
					value={ value }
					onChange={ ( val ) => onChange( val ) }
				/>
			);
	}
};

export default ComponentMap;
