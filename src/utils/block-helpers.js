import { select } from '@wordpress/data';
import {
	getColorObjectByAttributeValues,
	getColorObjectByColorValue,
} from '@wordpress/block-editor';
import { blockDefault } from '@wordpress/icons';

/**
 * Returns a list of core blocks defined by the schema with supplemental metadata
 *
 * @param {Object} schema Theme schema JSON
 *
 * @return {Array} Core blocks
 */
export const getCoreBlocksFromSchema = ( schema ) => {
	const schemaBlocks = Object.keys(
		schema?.definitions?.stylesBlocksPropertiesComplete?.properties || {}
	);

	const blocks = schemaBlocks.map( ( blockName ) => {
		/**
		 * Pull additional block data from the core store
		 */
		const block = select( 'core/blocks' ).getBlockType( blockName );

		/**
		 * If the block is not registered, construct a fallback
		 */
		if ( ! block ) {
			const title = getBlockTitleFromName( blockName );
			return {
				name: blockName,
				title,
				icon: { src: blockDefault },
			};
		}
		return block;
	} );
	return blocks;
};

/**
 * Generate a title from a block name
 * ie: core/comment-author-avatar -> Comment Author Avatar
 *
 * @param {string} blockName
 * @return {string} Generated block title
 */
export const getBlockTitleFromName = ( blockName ) => {
	return blockName
		.split( '/' )[ 1 ]
		.split( '-' )
		.map( ( word ) => word.charAt( 0 ).toUpperCase() + word.slice( 1 ) )
		.join( ' ' );
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
