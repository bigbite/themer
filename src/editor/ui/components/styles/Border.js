/* eslint-disable @wordpress/no-unsafe-wp-apis */

import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext, useState, useEffect } from '@wordpress/element';
import { __experimentalBorderBoxControl as BorderBoxControl } from '@wordpress/components';

import getThemeOption from '../../utils/get-theme-option';
import EditorContext from '../../../context/EditorContext';
import StylesContext from '../../../context/StylesContext';

/**
 * Reusable border control style component
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 */
const Border = ( { selector } ) => {
	const { themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig );
	const colors = getThemeOption(
		'settings.color.palette.theme',
		themeConfig
	);
	const [ borders, setBorders ] = useState( value );

	const onChange = ( newValue ) => {
		setBorders( newValue );
	};

	useEffect( () => {
		let config = structuredClone( themeConfig );
		config = set( config, selector, {} );
		config = set( config, selector, borders );

		setUserConfig( config );
	}, [ borders, selector, setUserConfig, themeConfig ] );

	return (
		<BorderBoxControl
			colors={ colors }
			label={ __( 'Borders', 'themer' ) }
			onChange={ onChange }
			value={ borders }
		/>
	);
};

export default Border;
