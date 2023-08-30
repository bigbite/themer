import { select } from '@wordpress/data';
import { getColorObjectByAttributeValues, getColorObjectByColorValue } from '@wordpress/block-editor';

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
 * Returns a coresponding hex value using a given css variable name
 * from the theme config
 *
 * @param {string} cssVar Color as a css variable name
 *
 * @return {string} Color as a hex string or original string
 */
export const varToHex = ( cssVar, themePalette ) => {
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
 * @param {string} cssHex Color as a hex string
 *
 * @return {string} Color as a css variable name or original string
 */
export const hexToVar = ( cssHex, themePalette ) => {
	const colorObj = getColorObjectByColorValue(
		themePalette,
		cssHex
	);

	return colorObj?.slug ? `var(--wp--preset--color--${colorObj.slug})` : cssHex;
};
