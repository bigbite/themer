/**
 * Checks is given value is a spacing preset.
 *
 * @param {string} value Value to check
 *
 * @return {boolean} Return true if value is string in format var:preset|spacing|.
 */
export function isValueSpacingPreset( value ) {
	if ( ! value?.includes ) {
		return false;
	}
	return value === '0' || value.includes( 'var:preset|spacing|' );
}

/**
 * Returns the slug section of the given spacing preset string.
 *
 * @param {string} value Value to extract slug from.
 *
 * @return {string|undefined} The int value of the slug from given spacing preset.
 */
export function getSpacingPresetSlug( value ) {
	if ( ! value ) {
		return;
	}

	if ( value === '0' || value === 'default' ) {
		return value;
	}

	const slug = value.match( /var:preset\|spacing\|(.+)/ );

	return slug ? slug[ 1 ] : undefined;
}

/**
 * Converts a spacing preset into a custom value.
 *
 * @param {string} value        Value to convert
 * @param {Array}  spacingSizes Array of the current spacing preset objects
 *
 * @return {string} Mapping of the spacing preset to its equivalent custom value.
 */
export function getCustomValueFromPreset( value, spacingSizes ) {
	if ( ! isValueSpacingPreset( value ) ) {
		return value;
	}

	const slug = getSpacingPresetSlug( value );
	const spacingSize = spacingSizes.find(
		( size ) => String( size.slug ) === slug
	);

	return spacingSize?.size;
}
