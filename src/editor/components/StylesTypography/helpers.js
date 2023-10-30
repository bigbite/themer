import { isCssLengthUnit } from '../../../utils/block-helpers';

const VALID_FONT_STYLES = [ 'italic', 'normal' ];
const VALID_LETTER_SPACING_UNITS = [ 'px', 'rem', 'em' ];
const VALID_TEXT_DECORATION_VALUES = [ 'none', 'underline', 'line-through' ];
const VALID_TEXT_TRANSFORM_VALUES = [ 'uppercase', 'lowercase', 'capitalize' ];
const VALID_FONT_SIZE_UNITS = [ 'px', 'rem', 'em' ];
export const MAX_TEXT_COLUMNS = 6;

/**
 * Parses a font weight value from theme.json.
 * Must be 1-9 followed by 2 zeros to be valid.
 *
 * @param {string} fontWeight Font weight value to parse.
 * @return {string} Valid font weight value or normal.
 */
export const parseFontWeight = ( fontWeight ) => {
	if ( fontWeight === 'normal' ) return '400';
	if ( fontWeight === 'bold' ) return '700';

	const regex = /^([1-9]+[0]{2})$/;
	return regex.test( fontWeight ) ? fontWeight : '400';
};

/**
 * Parses a font style value from theme.json.
 * Value must be in VALID_FONT_STYLES array to be valid.
 *
 * @param {string} fontStyle Font style value to parse.
 * @return {string} Valid font style value or normal.
 */
export const parseFontStyle = ( fontStyle ) =>
	VALID_FONT_STYLES.includes( fontStyle ) ? fontStyle : 'normal';

/**
 * Parses a line height value from theme.json.
 * Value must be a multiplier value to be valid.
 * Returns null if invalid so the control doesn't render, but unit values (e.g. px, rem) can still be used in theme.json.
 *
 * @param {string} lineHeight Line height value to parse.
 * @return {string | null}  Valid line height value or null.
 */
export const parseLineHeight = ( lineHeight ) => {
	const regex = /^[0-9]+(\.[0-9]+)?$/;
	return regex.test( lineHeight ) ? lineHeight : undefined;
};

/**
 * Parses a letter spacing value from theme.json.
 * Values with unit in VALID_LETTER_SPACING_UNITS array are deemed valid.
 * If an invalid unit is used, the value converted to px is returned.
 * 'normal' is returned on invalid values so the control doesn't render, but the letter spacing isn't broken.
 *
 * @param {string} letterSpacing Letter spacing value to parse.
 * @return {string} Valid letter spacing value or 'normal'.
 */
export const parseLetterSpacing = ( letterSpacing ) => {
	const isValidCss = isCssLengthUnit( letterSpacing );
	if ( ! isValidCss ) return '0px';

	const unit = letterSpacing.replaceAll( /[^a-z]/gi, '' );
	return VALID_LETTER_SPACING_UNITS.includes( unit )
		? letterSpacing
		: letterSpacing.replace( unit, 'px' );
};

/**
 * Parses a text decoration value from theme.json.
 * Value must be in VALID_TEXT_DECORATION_VALUES array to be valid.
 *
 * @param {string} textDecoration Text decoration value to parse.
 * @return {string} Valid text decoration value or 'none'.
 */
export const parseTextDecoration = ( textDecoration ) =>
	VALID_TEXT_DECORATION_VALUES.includes( textDecoration )
		? textDecoration
		: 'none';

/**
 * Parses a text transform value from theme.json.
 * Value must be in VALID_TEXT_TRANSFORM_VALUES array to be valid.
 *
 * @param {string} textTransform Text transform value to parse.
 * @return {string} Valid text transform value or 'none'.
 */
export const parseTextTransform = ( textTransform ) =>
	VALID_TEXT_TRANSFORM_VALUES.includes( textTransform )
		? textTransform
		: 'none';

/**
 * Parses a text columns value from theme.json.
 * Value must be a number less than or equal to MAX_TEXT_COLUMNS to be valid.
 * Falls back to 1 if invalid value is supplied.
 *
 * @param {string} textColumns Text columns value to parse.
 * @return {string} Valid text columns value or '1'.
 */
export const parseTextColumns = ( textColumns ) => {
	if ( ! textColumns || parseInt( textColumns, 10 ) > MAX_TEXT_COLUMNS ) {
		return '1';
	}
	return textColumns;
};

/**
 * Converts a CSS variable to an actual value.
 *
 * @param {string} cssVar    CSS variable name.
 * @param {Array}  fontSizes Font sizes registered by the theme.
 * @return {string} Font size value.
 */
export const varToFontSize = ( cssVar, fontSizes ) => {
	if ( ! cssVar ) {
		return cssVar;
	}

	const cssVarName = cssVar.replace(
		/var\(--wp--preset--font-size--(.+?)\)/g,
		'$1'
	);
	const fontSize = fontSizes.find(
		( fontSizeObj ) => fontSizeObj.slug === cssVarName
	);

	return fontSize ? fontSize.size : cssVar;
};

/**
 * Converts a font size value to a CSS variable.
 *
 * @param {string} fontSize  The value to convert.
 * @param {Array}  fontSizes Font sizes registered by the theme.
 * @return {string} CSS variable.
 */
export const fontSizeToVar = ( fontSize, fontSizes ) => {
	const fontSizeObj = fontSizes.find( ( obj ) => obj.size === fontSize );
	return fontSizeObj?.slug
		? `var(--wp--preset--font-size--${ fontSizeObj.slug })`
		: fontSize;
};

/**
 * Parses a value from theme.json into a valid font size value.
 * Valid if its a CSS variable or a value using px, em or rem units.
 *
 * @param {string} fontSize The value to convert.
 * @return {string} Valid font size value or 1rem if invalid value is supplied.
 */
export const parseFontSize = ( fontSize ) => {
	const isVar = /var\(--wp--preset--font-size--(.+?)\)/.test( fontSize );
	if ( isVar ) return fontSize;
	if ( ! isCssLengthUnit( fontSize ) ) return '1rem';

	const units = fontSize.replaceAll( /[^a-z]/gi, '' );
	return VALID_FONT_SIZE_UNITS.includes( units )
		? fontSize
		: fontSize.replace( units, 'px' );
};

/**
 * Converts a CSS variable to a font family.
 *
 * @param {string} cssVar       CSS variable as string.
 * @param {Array}  fontFamilies Registered font families.
 * @return {string} Font family name.
 */
export const varToFontFamily = ( cssVar, fontFamilies ) => {
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
 * @param {string} fontFamily   Font family.
 * @param {Array}  fontFamilies Registered font families.
 * @return {string} CSS variable.
 */
export const fontFamilyToVar = ( fontFamily, fontFamilies ) => {
	const fontFamilyObj = fontFamilies.find(
		( obj ) => obj.fontFamily === fontFamily
	);

	return fontFamilyObj?.slug
		? `var(--wp--preset--font-family--${ fontFamilyObj.slug })`
		: fontFamily;
};
