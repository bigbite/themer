import { __ } from '@wordpress/i18n';
import { dispatch } from '@wordpress/data';
import { useContext } from '@wordpress/element';
import { __experimentalBorderBoxControl as BorderBoxControl } from '@wordpress/components';

import getThemeOption from '../../utils/get-theme-option';
import EditorContext from '../../../context/EditorContext';

/**
 * Reusable border control style component
 *
 * @param {object} props          Component props
 * @param {string} props.selector Property target selector
 */
const Border = ( { selector } ) => {
	const { globalStylesId, themeConfig } = useContext( EditorContext );
	const value = getThemeOption( selector, themeConfig );
	const colors = getThemeOption( 'settings.color.palette.theme', themeConfig );

	const onChange = ( newValue ) => {
		// need to update styles here with dispatch and globalStylesId
	};

	return (
		<BorderBoxControl
			colors={ colors }
			label={ __( 'Borders', 'default' ) }
			onChange={ onChange }
			value={ value }
		/>
	);
};

export default Border;
