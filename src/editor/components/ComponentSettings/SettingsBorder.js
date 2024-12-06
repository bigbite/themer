import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import StylesContext from '../../context/StylesContext';

/**
 * Component for border settings
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 */
const SettingsBorder = ( { selector } ) => {
	const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig ) || {};
	const siteSettings = getThemeOption( selector, themeConfig );

    console.log(value);
	const handleNewValue = ( value, key ) => {
		const newSiteSettings = { ...siteSettings, [ key ]: value };
		let config = structuredClone( userConfig );
		config = set( config, selector, newSiteSettings );
		setUserConfig( config );
	};

	return (
		<>
			<span className="themer--styles__item__title">
				{ __( 'Border Settings', 'themer' ) }
				</span>
				<ToggleControl
					label={ __( 'Color', 'themer' ) }
					checked={ value?.color }
					onChange={ ( newValue ) => handleNewValue( newValue, 'color' ) }
					/>
				<ToggleControl
					label={ __( 'Radius', 'themer' ) }
					checked={ value?.radius }
					onChange={ ( newValue ) => handleNewValue( newValue, 'radius' ) }
					/>
                <ToggleControl
					label={ __( 'Style', 'themer' ) }
					checked={ value?.style }
					onChange={ ( newValue ) => handleNewValue( newValue, 'style' ) }
					/>
				<ToggleControl
					label={ __( 'Width', 'themer' ) }
					checked={ value?.width }
					onChange={ ( newValue ) => handleNewValue( newValue, 'width' ) }
					/>    
		</>
	);
};

export default SettingsBorder;
