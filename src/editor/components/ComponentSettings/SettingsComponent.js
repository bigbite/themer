import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import StylesContext from '../../context/StylesContext';

/**
 * Component for site settings
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 */
const SettingsComponent = ( { selector } ) => {
	const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig ) || {};
	const siteSettings = getThemeOption( selector, themeConfig );

	const handleNewValue = ( value, key ) => {
		const newSiteSettings = { ...siteSettings, [ key ]: value };
		let config = structuredClone( userConfig );
		config = set( config, selector, newSiteSettings );
		setUserConfig( config );
	};

	return (
		<>
			<span className="themer--styles__item__title">
				{ __( 'Site Settings', 'themer' ) }
				</span>
				<ToggleControl
					label={ __( 'Appearance Tools', 'themer' ) }
					checked={ value?.appearanceTools }
					onChange={ ( newValue ) => handleNewValue( newValue, 'appearanceTools' ) }
					/>
				<ToggleControl
					label={ __( 'Use Root Padding Aware Alignments', 'themer' ) }
					checked={ value?.useRootPaddingAwareAlignments }
					onChange={ ( newValue ) => handleNewValue( newValue, 'useRootPaddingAwareAlignments' ) }
					/>
		</>
	);
};

export default SettingsComponent;
