import { LineHeightControl } from '@wordpress/block-editor';

/**
 * Component for controlling the line height of the block typography.
 *
 * @param {Object}   props                  Component props
 * @param {string}   props.typographyStyles The current typography styles.
 * @param {Function} props.handleNewValue   Callback to update the theme config.
 */
const LineHeight = ( { typographyStyles, handleNewValue } ) => {
	if ( ! typographyStyles.lineHeight ) {
		return null;
	}

	return (
		<LineHeightControl
			value={ typographyStyles.lineHeight }
			onChange={ ( newVal ) => handleNewValue( newVal, 'lineHeight' ) }
			size="__unstable-large"
			__unstableInputWidth="auto"
		/>
	);
};
export default LineHeight;
