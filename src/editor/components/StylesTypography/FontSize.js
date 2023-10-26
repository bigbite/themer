import { FontSizePicker } from '@wordpress/components';
import { useContext } from '@wordpress/element';
import { isEmpty } from 'lodash';
import { isCssLengthUnit } from '../../../utils/block-helpers';
import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';

const VALID_FONT_SIZE_UNITS = [ 'px', 'rem', 'em' ];

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
const parseFontSize = ( fontSize ) => {
	const isVar = /var\(--wp--preset--font-size--(.+?)\)/.test( fontSize );
	if ( isVar ) return fontSize;
	if ( ! isCssLengthUnit( fontSize ) ) return '1rem';

	const units = fontSize.replaceAll( /[^a-z]/gi, '' );
	return VALID_FONT_SIZE_UNITS.includes( units )
		? fontSize
		: fontSize.replace( units, 'px' );
};

/**
 * Component for setting the font size.
 *
 * @param {Object}   props                  Component props
 * @param {Array}    props.typographyStyles Current typography styles.
 * @param {Function} props.handleNewValue   Callback to update the theme config.
 */
const FontSize = ( { typographyStyles, handleNewValue } ) => {
	const { themeConfig } = useContext( EditorContext );
	const fontSizes = getThemeOption(
		'settings.typography.fontSizes',
		themeConfig
	)?.theme;

	if ( ! fontSizes || isEmpty( fontSizes ) ) {
		return false;
	}

	return (
		<FontSizePicker
			value={ varToFontSize(
				parseFontSize( typographyStyles?.fontSize ),
				fontSizes
			) }
			withSlider
			fontSizes={ fontSizes }
			onChange={ ( newVal ) =>
				handleNewValue( fontSizeToVar( newVal, fontSizes ), 'fontSize' )
			}
			disableCustomFontSizes={ false }
			withReset={ false }
			size="__unstable-large"
			__nextHasNoMarginBottom
		/>
	);
};

export default FontSize;
