import { FontSizePicker } from '@wordpress/block-editor';
import { useContext } from '@wordpress/element';
import { isEmpty } from 'lodash';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';

/**
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
			fontSizes={ [
				{
					name: 'Small',
					size: '12px',
					slug: 'small',
				},
				{
					name: 'Normal',
					size: '16px',
					slug: 'normal',
				},
				{
					name: 'Big',
					size: '26px',
					slug: 'big',
				},
			] }
			onChange={ ( newVal ) => handleNewValue( newVal, 'fontSize' ) }
		/>
	);
};

export default FontSize;
