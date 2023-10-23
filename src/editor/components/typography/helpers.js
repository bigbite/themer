import { isCssLengthUnit } from '../../../utils/block-helpers';

const VALID_FONT_STYLES = [ 'italic', 'normal' ];
const VALID_LETTER_SPACING_UNITS = [ 'px', 'rem', 'em' ];
const VALID_TEXT_DECORATION_VALUES = [ 'none', 'underline', 'line-through' ];
const VALID_TEXT_TRANSFORM_VALUES = [ 'uppercase', 'lowercase', 'capitalize' ];
export const MAX_TEXT_COLUMNS = 6;

/**
 * Parses a font weight value from theme.json.
 * Must be 1-9 followed by 2 zeros to be valid.
 *
 * @param {string} fontWeight Font weight value to parse.
 * @return {string} Valid font weight value or default.
 */
export const parseFontWeight = ( fontWeight ) => {
	const regex = /^([1-9]+[0]{2})$/;
	return regex.test( fontWeight ) ? fontWeight : 'default';
};

/**
 * Parses a font style value from theme.json.
 * Value must be in VALID_FONT_STYLES array to be valid.
 *
 * @param {string} fontStyle Font style value to parse.
 * @return {string} Valid font style value or default.
 */
export const parseFontStyle = ( fontStyle ) =>
	VALID_FONT_STYLES.includes( fontStyle ) ? fontStyle : 'default';

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
