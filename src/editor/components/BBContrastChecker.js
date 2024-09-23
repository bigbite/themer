import { Notice } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const BBContrastChecker = ( { background, foreground } ) => {
	/**
	 * If either colour is not provided, don't render anything
	 */
	if ( ! background || ! foreground ) {
		return;
	}

	/**
	 * Get the luminance of a colour
	 *
	 * @param {string} colour The colour to convert to luminance value
	 *
	 * @return {int} The luminance value
	 */
	const getLuminance = ( colour ) => {
		const rgb = colour
			.match( /\w\w/g )
			.map( ( c ) => parseInt( c, 16 ) / 255 );
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

	/**
	 * Determine the colour contrast ratio
	 */
	const contrastRatio = getContrastRatio( background, foreground );

	/**
	 * Determine the message to output
	 */
	const displayMessage =
		contrastRatio >= 4.5
			? __(
					'The selected colours do not meet the colour contrast ratio for AAA (7:1) accessibility standards',
					'themer'
			  )
			: __(
					'The selected colours do not meet the colour contrast ratio for AA (4.5:1) accessibility standards',
					'themer'
			  );

	/**
	 * Set the notice display level based on the contrast ratio
	 */
	const displayMessageImportance = contrastRatio >= 4.5 ? 'info' : 'warning';

	return (
		<>
			<div className="contrast-checker">
				<p className="contrast-checker-title">
					{ __( 'WCAG Check:', 'themer' ) }
				</p>
				<p className="contrast-checker-ratio">
					{ contrastRatio.toFixed( 1 ) } : 1
				</p>
				<div className="contrast-checker-badges">
					<p className={ contrastRatio >= 4.5 ? 'pass' : ' fail' }>
						&#x2713; { __( 'AA', 'themer' ) }
					</p>
					<p className={ contrastRatio >= 7 ? 'pass' : ' fail' }>
						&#x2713; { __( 'AAA ', 'themer' ) }
					</p>
				</div>
			</div>
			{ contrastRatio < 7 && (
				<Notice
					status={ displayMessageImportance }
					isDismissible={ false }
				>
					{ displayMessage }
				</Notice>
			) }
		</>
	);
};

export default BBContrastChecker;
