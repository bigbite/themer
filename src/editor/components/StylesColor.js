import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { ColorPalette } from '@wordpress/components';

import getThemeOption from '../../utils/get-theme-option';
import EditorContext from '../context/EditorContext';
import StylesContext from '../context/StylesContext';

/**
 * Reusable color control style component
 */
const Color = ( { selector } ) => {
	const { themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const colorStyles = getThemeOption( selector, themeConfig );

	console.log(colorStyles);

	const themePalette = getThemeOption(
		'settings.color.palette.theme',
		themeConfig
	);

	const onChange = ( newValue ) => {
		let config = structuredClone( themeConfig );
		config = set( config, selector, newValue );
		setUserConfig( config );
	};

	return Object.keys(colorStyles).map(key => (
		<>
			<label>{__( 'Color', 'themer' )}: {key}</label>
			<ColorPalette
				label={ __( 'Color', 'themer' ) }
				colors={ themePalette }
				onChange={ onChange }
				value={ colorStyles[key] }
			/>
		</>
	));
};

export default Color;
