import { FontSizePicker } from '@wordpress/components';
import { useContext } from '@wordpress/element';
import { isEmpty } from 'lodash';
import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import { parseFontSize, fontSizeToVar, varToFontSize } from './helpers';

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
