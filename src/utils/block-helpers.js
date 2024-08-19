import { select } from '@wordpress/data';
import {
	getColorObjectByAttributeValues,
	getColorObjectByColorValue,
} from '@wordpress/block-editor';
import {
	blockDefault,
	button,
	link,
	heading,
	headingLevel1,
	headingLevel2,
	headingLevel3,
	headingLevel4,
	headingLevel5,
	headingLevel6,
	html,
} from '@wordpress/icons';
import { getCustomValueFromPreset } from '../utils/block-editor.js';

export const getAllPseudos = () => {
	return [
		{
			name: ':hover',
			icon: html,
		},
		{
			name: ':focus',
			icon: html,
		},
		{
			name: ':active',
			icon: html,
		},
		{
			name: ':visited',
			icon: html,
		},
		{
			name: ':link',
			icon: html,
		},
		{
			name: ':any-link',
			icon: html,
		},
	];
};

/**
 * Returns a list of HTML elements defined by the schema
 *
 * @param {Object} schema Theme schema JSON
 *
 * @return {Array<Object>} List of HTML elements
 */
export const getElementsFromSchema = ( schema ) => {
	const schemaElements = Object.keys(
		schema?.definitions?.stylesElementsPropertiesComplete?.properties || {}
	);

	/**
	 * Extend the element with additonal metadata
	 * e.g icon
	 */
	const elements = schemaElements.map( ( elementName ) => {
		switch ( elementName ) {
			case 'button':
				return {
					name: elementName,
					icon: button,
				};
			case 'link':
				return {
					name: elementName,
					icon: link,
				};
			case 'heading':
				return {
					name: elementName,
					icon: heading,
				};
			case 'h1':
				return {
					name: elementName,
					icon: headingLevel1,
				};
			case 'h2':
				return {
					name: elementName,
					icon: headingLevel2,
				};
			case 'h3':
				return {
					name: elementName,
					icon: headingLevel3,
				};
			case 'h4':
				return {
					name: elementName,
					icon: headingLevel4,
				};
			case 'h5':
				return {
					name: elementName,
					icon: headingLevel5,
				};
			case 'h6':
				return {
					name: elementName,
					icon: headingLevel6,
				};
			default:
				return {
					name: elementName,
					icon: html,
				};
		}
	} );

	return elements;
};

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
export const isHex = ( string ) => {
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

	const cssVarName = cssVar?.replace(
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
 * Converts a css variable to a duotone colour array.
 *
 * @param {string} cssVar              The css variable to convert.
 * @param {Array}  themeDuotoneOptions The theme duotone options.
 * @return {Array} The duotone colors array.
 */
export const varToDuotone = ( cssVar, themeDuotoneOptions ) => {
	if ( ! cssVar ) {
		return cssVar;
	}

	const slug = cssVar.replace( /var\(--wp--preset--duotone--(.+?)\)/g, '$1' );

	const duotone = themeDuotoneOptions?.find( ( option ) => {
		return option.slug === slug;
	} );

	return duotone?.colors || themeDuotoneOptions?.[ 0 ]?.colors;
};

/**
 * Converts a duotone colors array to a css variable.
 *
 * @param {Array} duotoneColors       The duotone colors array.
 * @param {Array} themeDuotoneOptions The theme duotone options.
 * @return {string} The css variable.
 */
export const duotoneToVar = ( duotoneColors, themeDuotoneOptions ) => {
	if ( ! duotoneColors || duotoneColors?.length !== 2 ) {
		return duotoneColors;
	}

	const duotoneObj = themeDuotoneOptions?.find( ( option ) => {
		return (
			option.colors.includes( duotoneColors[ 0 ] ) &&
			option.colors.includes( duotoneColors[ 1 ] )
		);
	} );

	return duotoneObj?.slug
		? `var(--wp--preset--duotone--${ duotoneObj.slug })`
		: '';
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

/**
 * Recursively removes empty values from an object or array.
 *
 * This function traverses the input object or array and removes any values that are:
 * - null
 * - undefined
 * - empty strings
 * - empty arrays
 * - empty objects
 *
 * If an array becomes empty after its elements are filtered, it is removed (i.e., replaced with null).
 * If an object becomes empty after its properties are filtered, it is removed (i.e., replaced with null).
 *
 * @param {Object|Array} obj - The input object or array to be filtered.
 * @return {Object|Array|null} - The filtered object or array, or null if it becomes empty.
 */
export const removeEmptyValues = ( obj ) => {
	if ( Array.isArray( obj ) ) {
		const filteredArray = obj
			.map( ( item ) => removeEmptyValues( item ) )
			.filter(
				( item ) =>
					item !== null &&
					item !== undefined &&
					item !== '' &&
					! ( Array.isArray( item ) && item.length === 0 ) &&
					! (
						typeof item === 'object' &&
						Object.keys( item ).length === 0
					)
			);
		return filteredArray.length > 0 ? filteredArray : null;
	} else if ( typeof obj === 'object' && obj !== null ) {
		const filteredObject = Object.keys( obj ).reduce( ( acc, key ) => {
			const value = removeEmptyValues( obj[ key ] );
			if (
				value !== null &&
				value !== undefined &&
				value !== '' &&
				! ( Array.isArray( value ) && value.length === 0 ) &&
				! (
					typeof value === 'object' &&
					Object.keys( value ).length === 0
				)
			) {
				acc[ key ] = value;
			}
			return acc;
		}, {} );
		return Object.keys( filteredObject ).length > 0 ? filteredObject : null;
	}
	return obj;
};
