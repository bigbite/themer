import { TextControl, ColorPicker } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

import FontPicker from './Components/FontPicker';
import SpacingControl from './Components/SpacingControl';

/**
 * Returns appropriate component depending on field type
 *
 * @param {Object}   props
 * @param {string}   props.label
 * @param {string}   props.value
 * @param {Function} props.onChange
 */
const ComponentMap = ( { label, value, onChange } ) => {
	const { currentThemeBaseGlobalStyles } = useSelect( ( select ) => {
		return {
			currentThemeBaseGlobalStyles:
				select(
					'core'
				).__experimentalGetCurrentThemeBaseGlobalStyles(),
		};
	} );

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
						base={ currentThemeBaseGlobalStyles }
					/>
				</div>
			);
		case blockGapArray.includes( label ):
			return (
				<SpacingControl
					id={ label }
					value={ value }
					onChange={ ( val ) => onChange( val ) }
					base={ currentThemeBaseGlobalStyles }
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
