import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import StylesContext from '../../context/StylesContext';

import SettingsDuotoneComponent from './SettingsDuotoneComponent';
import SettingsGradientsComponent from './SettingsGradientsComponent';
import SettingsPaletteComponent from './SettingsPaletteComponent';

/**
 * Component for color settings
 *
 * @param {Object} props             Component props
 * @param {string} props.selector    Property target selector
 * @param {string} props.description Property description
 */
const SettingsBorder = ( { selector, description } ) => {
	const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig ) || {};

	const handleNewValue = ( newValue, key ) => {
		let config = structuredClone( userConfig );
		config = set( config, [ selector, key ].join( '.' ), newValue );
		setUserConfig( config );
	};

	return (
		<>
			<span className="themer--settings__item__title">
				{ __( 'Color Settings', 'themer' ) }
			</span>
			{ description && (
				<p className="themer--settings__item__description">
					{ description }
				</p>
			) }
			<ToggleControl
				label={ __( 'Background', 'themer' ) }
				checked={ value?.background }
				onChange={ ( newValue ) =>
					handleNewValue( newValue, 'background' )
				}
			/>
			<ToggleControl
				label={ __( 'Button', 'themer' ) }
				checked={ value?.button }
				onChange={ ( newValue ) =>
					handleNewValue( newValue, 'button' )
				}
			/>
			<ToggleControl
				label={ __( 'Caption', 'themer' ) }
				checked={ value?.caption }
				onChange={ ( newValue ) =>
					handleNewValue( newValue, 'caption' )
				}
			/>
			<ToggleControl
				label={ __( 'Custom', 'themer' ) }
				checked={ value?.custom }
				onChange={ ( newValue ) =>
					handleNewValue( newValue, 'custom' )
				}
			/>
			<ToggleControl
				label={ __( 'Custom Duotone', 'themer' ) }
				checked={ value?.customDuotone }
				onChange={ ( newValue ) =>
					handleNewValue( newValue, 'customDuotone' )
				}
			/>
			<ToggleControl
				label={ __( 'Custom Gradient', 'themer' ) }
				checked={ value?.customGradient }
				onChange={ ( newValue ) =>
					handleNewValue( newValue, 'customGradient' )
				}
			/>
			<ToggleControl
				label={ __( 'Default Duotone', 'themer' ) }
				checked={ value?.defaultDuotone }
				onChange={ ( newValue ) =>
					handleNewValue( newValue, 'defaultDuotone' )
				}
			/>
			<ToggleControl
				label={ __( 'Default Gradients', 'themer' ) }
				checked={ value?.defaultGradients }
				onChange={ ( newValue ) =>
					handleNewValue( newValue, 'defaultGradients' )
				}
			/>
			<ToggleControl
				label={ __( 'Default Palette', 'themer' ) }
				checked={ value?.defaultPalette }
				onChange={ ( newValue ) =>
					handleNewValue( newValue, 'defaultPalette' )
				}
			/>
			<SettingsDuotoneComponent selector={ `${ selector }.duotone` } />
			<SettingsGradientsComponent
				selector={ `${ selector }.gradients` }
			/>
			<ToggleControl
				label={ __( 'Heading', 'themer' ) }
				checked={ value?.heading }
				onChange={ ( newValue ) =>
					handleNewValue( newValue, 'heading' )
				}
			/>
			<ToggleControl
				label={ __( 'Link', 'themer' ) }
				checked={ value?.link }
				onChange={ ( newValue ) => handleNewValue( newValue, 'link' ) }
			/>
			<SettingsPaletteComponent
				label={ __( 'Palette Settings', 'themer' ) }
				selector={ `${ selector }.palette` }
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
