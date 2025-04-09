/**
 * Checks is given value is a spacing preset.
 *
 * @param {Array|undefined} colors CSS color strings.
 * @param {string}          angle  CSS gradient angle.
 *
 * @return {string} CSS gradient string for the duotone swatch.
 */
export function getGradientFromCSSColors( colors = [], angle = '90deg' ) {
	const l = 100 / colors.length;

	const stops = colors
		.map( ( c, i ) => `${ c } ${ i * l }%, ${ c } ${ ( i + 1 ) * l }%` )
		.join( ', ' );

	return `linear-gradient( ${ angle }, ${ stops } )`;
}

/**
 * Removes incompatible characters, replaces spaces with '-' and converts to lower case.
 *
 * @param {string} slug Unformatted slug.
 *
 * @return {string} formatted slug.
 */
export function formatSlug( slug ) {
	return slug
		.replace( /[^a-zA-Z0-9 -]/g, '' )
		.replace( /\s+/g, '-' )
		.toLowerCase();
}
