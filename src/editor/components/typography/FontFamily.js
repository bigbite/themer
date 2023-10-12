/* eslint-disable jsdoc/check-line-alignment */

import { __experimentalFontFamilyControl as FontFamilyControl } from '@wordpress/block-editor'; // eslint-disable @wordpress/no-unsafe-apis
import { useContext } from '@wordpress/element';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';

/**
 * Converts a CSS variable to a font family.
 *
 * @param {string} cssVar CSS variable as string.
 * @param {Array} fontFamilies Registered font families.
 * @return {string} Font family name.
 */
const varToFontFamily = ( cssVar, fontFamilies ) => {
	if ( ! cssVar ) {
		return cssVar;
	}

	const cssVarName = cssVar.replace(
		/var\(--wp--preset--font-family--(.+?)\)/g,
		'$1'
	);
	const fontFamily = fontFamilies.find(
		( fontFamilyObj ) => fontFamilyObj.slug === cssVarName
	);

	return fontFamily ? fontFamily.fontFamily : cssVar;
};

/**
 * Converts a font family to a CSS variable.
 *
 * @param {string} fontFamily Font family.
 * @param {Array} fontFamilies Registered font families.
 * @return {string} CSS variable.
 */
const fontFamilyToVar = ( fontFamily, fontFamilies ) => {
	const fontFamilyObj = fontFamilies.find(
		( obj ) => obj.fontFamily === fontFamily
	);

	return fontFamilyObj?.slug
		? `var(--wp--preset--font-family--${ fontFamilyObj.slug })`
		: fontFamily;
};

/**
 * Component for setting the font family.
 *
 * @param {Object} props Component props
 * @param {Array} props.typographyStyles Current typography styles.
 * @param {Function} props.handleNewValue Callback to update the theme config.
 */
const FontFamily = ( { typographyStyles, handleNewValue } ) => {
	const { themeConfig } = useContext( EditorContext );
	const fontFamilies = getThemeOption(
		'settings.typography.fontFamilies',
		themeConfig
	)?.theme;

	return (
		<FontFamilyControl
			value={ varToFontFamily(
				typographyStyles?.fontFamily,
				fontFamilies
			) }
			onChange={ ( newVal ) =>
				handleNewValue( fontFamilyToVar( newVal ), 'fontFamily' )
			}
			fontFamilies={ fontFamilies }
		/>
	);
};

export default FontFamily;
