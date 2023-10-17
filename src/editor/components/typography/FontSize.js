import { FontSizePicker } from '@wordpress/block-editor';
import { useContext } from '@wordpress/element';
import { isEmpty } from 'lodash';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';

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
			value={ typographyStyles?.fontSize }
			withSlider
			fontSizes={ fontSizes }
			onChange={ ( newVal ) => handleNewValue( newVal, 'fontSize' ) }
		/>
	);
};

export default FontSize;
