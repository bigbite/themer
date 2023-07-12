import { ColorPicker } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import getCurrentGlobalSetting from '../../../lib/getCurrentGlobalSetting';

const ColorControl = ( { path, value, base, onChange } ) => {
	wp.data
		.dispatch( 'core/block-editor' )
		.updateSettings( window.themerPlugin.editor_settings );

	const [ hexValue, setHexValue ] = useState( '#fff' );
	const globalSettingValue = getCurrentGlobalSetting( path, base );
	const cssVarName = globalSettingValue.replace( /var\(([^)]*)\)/g, '$1' );
	const previewElement = document.querySelector( '.editor-styles-wrapper' ); // Contains the css vars we need

	useEffect( () => {
		if ( previewElement ) {
			const hex =
				getComputedStyle( previewElement ).getPropertyValue(
					cssVarName
				);
			setHexValue( hex );
		}
	} );

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
