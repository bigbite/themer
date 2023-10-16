import { select } from '@wordpress/data';
import {
	getColorObjectByAttributeValues,
	getColorObjectByColorValue,
} from '@wordpress/block-editor';
import { getCustomValueFromPreset } from '../utils/block-editor.js';

/**
 * Returns a list of core blocks that are in the theme.json schema
 * and also have styles set in theme.json
 *
 * @param {Object} themeConfig Theme JSON
 * @param {Object} schema      Theme schema JSON
 *
 * @return {Array} Core blocks
 */
const getCoreBlocksFromSchema = ( themeConfig, schema ) => {
	const schemaBlocks = Object.keys(
		schema?.definitions?.stylesBlocksPropertiesComplete?.properties ?? {}
	);
	const themeJSONBlocks = Object.keys( themeConfig?.styles?.blocks ?? {} );

	return schemaBlocks?.filter( ( block ) =>
		themeJSONBlocks?.includes( block )
	);
};

/**
 * Returns a list of registered core blocks
 *
 * @param {number} mode        Mode of operation
 *                             0: Use core store as data source
 *                             1: Use schema and theme.json as data source
 * @param {Object} themeConfig Theme JSON
 * @param {Object} schema      Theme schema JSON
 *
 * @return {Array} Core blocks
 */
export const getCoreBlocks = ( mode = 0, themeConfig = {}, schema = {} ) => {
	switch ( mode ) {
		case 1:
			return select( 'core/blocks' ).getBlockTypes();
		case 0:
		default:
			return getCoreBlocksFromSchema( themeConfig, schema );
	}
};

/**
 * Returns a list of registered custom blocks
 *
 * @return {Array} Custom blocks
 */
export const getCustomBlocks = () => [];

/**
 * Checks is a provided string in a valid hex value
 *
 * @param {string} string string to check
 *
 * @return {boolean} If the string is a valid hex value
 */
const isHex = ( string ) => {
	const regex = /^#([0-9a-f]{3}){1,2}$/i;
	return regex.test( string );
};

/**
 * Returns a coresponding hex value using a given css variable name
 * from the theme config
 *
 * @param {string} cssVar       Color as a css variable name
 * @param {Array}  themePalette The themes palette as an array of objects
 *
 * @return {string} Color as a hex string or original string
 */
export const varToHex = ( cssVar, themePalette ) => {
	if ( isHex( cssVar ) ) {
		return cssVar;
	}

	const cssVarName = cssVar.replace(
		/var\(--wp--preset--color--(.+?)\)/g,
		'$1'
	);

	const colorObj = getColorObjectByAttributeValues(
		themePalette,
		cssVarName
	);

	return colorObj?.color ?? cssVar;
};

/**
 * Returns a coresponding variable name from the theme config
 * using a given hex string
 *
 * @param {string} cssHex       Color as a hex string
 * @param {Array}  themePalette The themes palette as an array of objects
 *
 * @return {string} Color as a css variable name or original string
 */
export const hexToVar = ( cssHex, themePalette ) => {
	if ( ! isHex( cssHex ) ) {
		return cssHex;
	}

	const colorObj = getColorObjectByColorValue( themePalette, cssHex );

	return colorObj?.slug
		? `var(--wp--preset--color--${ colorObj.slug })`
		: cssHex;
};

/**
 * Returns if a value is in the format of css unit.
 * This will pass on any combination of an optional '-' and number followed by x number of letters, so its recommended to use this with another check on the specific units you want to support.
 *
 * @param {string} value - Value to be checked.
 * @return {boolean} - If the value is likely a css unit.
 */
export const isCssLengthUnit = ( value ) => {
	const LENGTH_REG = /^[-]?([0-9]*[.])?[0-9]+[a-zA-Z%]+?$/;
	return value === '0' || LENGTH_REG.test( value );
};

/**
 * Converts a spacing value to its corresponding css variable.
 * E.g. `1.5rem` -> `var(--wp--preset--spacing--medium)`
 *
 * @param {string} spacingValue      - The value to be converted.
 * @param {Array}  themeSpacingSizes - The theme spacing sizes.
 * @return {string} - The converted value or the original value if no match was found.
 */
export const spacingToVar = ( spacingValue, themeSpacingSizes ) => {
	const slug = themeSpacingSizes?.find(
		( obj ) => obj.size === spacingValue
	)?.slug;
	return slug ? `var(--wp--preset--spacing--${ slug })` : spacingValue;
};

/**
 * Converts a CSS variable to its corresponding spacing value.
 * `getCustomValueFromPreset` expects the var in vertical bar format so we need to convert to that first if necessary.
 *
 * @param {string} spacingValue      - The value to be converted.
 * @param {Array}  themeSpacingSizes - The theme spacing sizes.
 * @return {string} - The converted value or the original value if no match was found.
 */
export const varToSpacing = ( spacingValue, themeSpacingSizes ) => {
	let valueInCorrectFormat = spacingValue;
	const slug = spacingValue?.match( /var:preset\|spacing\|(.+)/ );

	if ( ! slug && spacingValue?.startsWith( 'var(--wp--preset--spacing' ) ) {
		valueInCorrectFormat = spacingValue
			?.replace( '(--wp--', ':' )
			?.replaceAll( '--', '|' )
			?.replace( ')', '' );
	}

	return getCustomValueFromPreset( valueInCorrectFormat, themeSpacingSizes );
};
