import { __experimentalFontAppearanceControl as FontAppearanceControl } from '@wordpress/block-editor'; // eslint-disable-line @wordpress/no-unsafe-wp-apis

/**
 * Component for controlling the font style & weight.
 *
 * @param {Object}   props                  Component props
 * @param {string}   props.typographyStyles The current typography styles.
 * @param {Function} props.handleNewValue   Callback to update the theme config.
 */
const FontAppearance = ( { typographyStyles, handleNewValue } ) => {
	return (
		<FontAppearanceControl
			value={ {
				fontStyle: typographyStyles?.fontStyle,
				fontWeight: typographyStyles?.fontWeight,
			} }
			onChange={ ( newVal ) => {
				handleNewValue( newVal?.fontWeight, 'fontWeight' );
				handleNewValue( newVal?.fontStyle, 'fontStyle' );
			} }
		/>
	);
};

export default FontAppearance;
