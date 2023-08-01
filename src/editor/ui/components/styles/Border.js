import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { dispatch } from '@wordpress/data';
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
	const { globalStylesId, themeConfig } = useContext( EditorContext );
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
	}, [ borders ] );

	return (
		<BorderBoxControl
			colors={ colors }
			label={ __( 'Borders', 'default' ) }
			onChange={ onChange }
			value={ borders }
		/>
	);
};

export default Border;
