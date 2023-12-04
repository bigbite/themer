import { __experimentalFontFamilyControl as FontFamilyControl } from '@wordpress/block-editor';
import { useContext } from '@wordpress/element';
import { isEmpty } from 'lodash';
import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import { fontFamilyToVar, varToFontFamily } from './helpers';

/**
 * Component for setting the font family.
 *
 * @param {Object}   props                  Component props
 * @param {Array}    props.typographyStyles Current typography styles.
 * @param {Function} props.handleNewValue   Callback to update the theme config.
 */
const FontFamily = ( { typographyStyles, handleNewValue } ) => {
	const { themeConfig } = useContext( EditorContext );
	const fontFamilies = getThemeOption(
		'settings.typography.fontFamilies',
		themeConfig
	)?.theme;

	if ( ! fontFamilies || isEmpty( fontFamilies ) ) {
		return false;
	}

	return (
		<FontFamilyControl
			value={ varToFontFamily(
				typographyStyles?.fontFamily,
				fontFamilies
			) }
			onChange={ ( newVal ) =>
				handleNewValue(
					fontFamilyToVar( newVal, fontFamilies ),
					'fontFamily'
				)
			}
			fontFamilies={ fontFamilies }
			__nextHasNoMarginBottom
			size="__unstable-large"
		/>
	);
};

export default FontFamily;
