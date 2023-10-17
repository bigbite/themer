import { FontSizePicker } from '@wordpress/components';
import { useContext } from '@wordpress/element';
import { isEmpty } from 'lodash';
import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';

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
 * THIS COMPONENT IS STILL IN PROGRESS - HAVING ISSUES WITH `FontSizePicker` COMPONENT.
 * Component for setting the font family.
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
			value={ varToFontSize( typographyStyles?.fontSize, fontSizes ) }
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
