/**
 * Get the luminance of a colour
 *
 * @param {string} colour The colour to convert to luminance value
 *
 * @return {number} The luminance value
 */
const getLuminance = ( colour ) => {
	const rgb = colour.match( /\w\w/g ).map( ( c ) => parseInt( c, 16 ) / 255 );
	const [ r, g, b ] = rgb.map( ( c ) => {
		return c <= 0.03928
			? c / 12.92
			: Math.pow( ( c + 0.055 ) / 1.055, 2.4 );
	} );
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/**
 * Compare two colours and return their contrast ratio.
 *
 * @param {string} colour1 This is an example function/method parameter description.
 * @param {string} colour2 This is a second example.
 *
 * @return {number} The contrast ratio between the colours
 */
const getContrastRatio = ( colour1, colour2 ) => {
	const luminance1 = getLuminance( colour1 );
	const luminance2 = getLuminance( colour2 );
	return (
		( Math.max( luminance1, luminance2 ) + 0.05 ) /
		( Math.min( luminance1, luminance2 ) + 0.05 )
	);
};

export { getLuminance, getContrastRatio };
