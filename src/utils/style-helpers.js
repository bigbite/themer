/**
 * Generate a duotone gradient from a list of colors.
 *
 * @param colors CSS color strings.
 * @param angle  CSS gradient angle.
 *
 * @return  CSS gradient string for the duotone swatch.
 */
export function getGradientFromCSSColors(
	colors = [],
	angle = '90deg'
) {
	const l = 100 / colors.length;

	const stops = colors
		.map( ( c, i ) => `${ c } ${ i * l }%, ${ c } ${ ( i + 1 ) * l }%` )
		.join( ', ' );

	return `linear-gradient( ${ angle }, ${ stops } )`;
}