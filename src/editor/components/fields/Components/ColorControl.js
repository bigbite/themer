import { ColorPicker } from '@wordpress/components';
import {
	useSetting,
	getColorObjectByAttributeValues,
	getColorObjectByColorValue,
} from '@wordpress/block-editor';

const getCurrentGlobalSetting = ( path, base ) => {
	const pathArr = path.split( '.' );
	return pathArr.reduce( ( o, i ) => o[ i ], base );
};

const ColorControl = ( { path, value, base } ) => {
	const themeColors = useSetting( 'color.palette.theme' );
	const defaultColors = useSetting( 'color.palette.default' );
	const customColors = useSetting( 'color.palette.custom' );

	wp.data
		.dispatch( 'core/block-editor' )
		.updateSettings( window.themerPlugin.editor_settings );

	// console.log( path, 'path' );

	// console.log( base, 'base' );

	console.log( themeColors );

	const globalSettingValue = getCurrentGlobalSetting( path, base );

	const cssVarName = globalSettingValue.replace( /var\(([^)]*)\)/g, '$1' );

	// console.log( cssVarName );

	const test = getColorObjectByAttributeValues( themeColors );

	console.log( test );

	const hexValue = getComputedStyle(
		document.documentElement
	).getPropertyValue( cssVarName ); // stylesheet missing

	// console.log( hexValue );

	// console.log( getCurrentGlobalSetting( path, base ), 'newpath' );

	return (
		<ColorPicker
			defaultValue={ value }
			onChange={ ( val ) => onChange( val ) }
		/>
	);
};

export default ColorControl;
