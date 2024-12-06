import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import StylesContext from '../../context/StylesContext';

/**
 * Component for color settings
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 */
const SettingsBorder = ( { selector } ) => {
	const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig ) || {};

	const handleNewValue = ( newValue, key ) => {
		let config = structuredClone( userConfig );
		config = set(
			config,
			[ selector, key ].join( '.' ), newValue );
		setUserConfig( config );
	};

	return (
		<>
			<span className="themer--styles__item__title">
				{ __( 'Color Settings', 'themer' ) }
				</span>
				<ToggleControl
					label={ __( 'Background', 'themer' ) }
					checked={ value?.background }
					onChange={ ( newValue ) => handleNewValue( newValue, 'background' ) }
					/>
				<ToggleControl
					label={ __( 'Custom', 'themer' ) }
					checked={ value?.custom }
					onChange={ ( newValue ) => handleNewValue( newValue, 'custom' ) }
					/>
                <ToggleControl
					label={ __( 'Custom Duotone', 'themer' ) }
					checked={ value?.customDuotone }
					onChange={ ( newValue ) => handleNewValue( newValue, 'customDuotone' ) }
					/>
				<ToggleControl
					label={ __( 'Custom Gradient', 'themer' ) }
					checked={ value?.customGradient }
					onChange={ ( newValue ) => handleNewValue( newValue, 'customGradient' ) }
					/>
                <ToggleControl
                    label={ __( 'Default Duotone', 'themer' ) }
                    checked={ value?.defaultDuotone }
                    onChange={ ( newValue ) => handleNewValue( newValue, 'defaultDuotone' ) }
                />
                <ToggleControl
                    label={ __( 'Default Gradients', 'themer' ) }
                    checked={ value?.defaultGradients }
                    onChange={ ( newValue ) => handleNewValue( newValue, 'defaultGradients' ) }
                />
                <ToggleControl
                    label={ __( 'Default Palette', 'themer' ) }
                    checked={ value?.defaultPalette }
                    onChange={ ( newValue ) => handleNewValue( newValue, 'defaultPalette' ) }
                />
                <ToggleControl
                    label={ __( 'Link', 'themer' ) }
                    checked={ value?.link }
                    onChange={ ( newValue ) => handleNewValue( newValue, 'link' ) }
                />
                <ToggleControl
                    label={ __( 'Text', 'themer' ) }
                    checked={ value?.text }
                    onChange={ ( newValue ) => handleNewValue( newValue, 'text' ) }
                />
		</>
	);
};

export default SettingsBorder;
