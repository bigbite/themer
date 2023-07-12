import { ColorPicker } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import {
	getColorObjectByAttributeValues,
	useSetting,
} from '@wordpress/block-editor';

const ColorControl = ( { value, onChange } ) => {
	wp.data
		.dispatch( 'core/block-editor' )
		.updateSettings( window.themerPlugin.editor_settings );

	const themeColors = useSetting( 'color.palette.theme' );
	const cssVarName = value.replace(
		/var\(--wp--preset--color--(.+?)\)/g,
		'$1'
	);

	const [ hexValue, setHexValue ] = useState( '#fff' );
	const previewElement = document.querySelector( '.editor-styles-wrapper' ); // Contains the css vars we need

	useEffect( () => {
		if ( previewElement ) {
			const colorObj = getColorObjectByAttributeValues(
				themeColors,
				cssVarName
			);
			setHexValue( colorObj.color );
		}
	}, [ cssVarName, previewElement, themeColors ] );

	return (
		<>
			<ColorPicker
				defaultValue={ hexValue }
				color={ hexValue }
				onChange={ ( val ) => onChange( val ) }
			/>
		</>
	);
};

export default ColorControl;
