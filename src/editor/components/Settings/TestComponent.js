/* eslint-disable jsdoc/check-line-alignment */
import { __ } from '@wordpress/i18n';
import { isEmpty, set } from 'lodash';
import { useContext } from '@wordpress/element';
import { ToggleControl, PanelBody } from '@wordpress/components';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import StylesContext from '../../context/StylesContext';

import SettingsGradient from './SettingsComponents/SettingsGradient';
import SettingsPalette from './SettingsComponents/SettingsPalette';

/**
 * Reusable custom CSS component
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 */
const TestComponent = ( { selector } ) => {
	const { themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const settings = getThemeOption( selector, themeConfig ) ?? '';

	// console.log( themeConfig.settings.blocks[ 'core/audio' ] );

	/**
	 * Updates the theme config with the new value.
	 *
	 * @param {string} newVal - The new value.
	 * @param {string} item - The item to update.
	 */
	const handleNewValue = ( newVal, item ) => {
		let config = structuredClone( themeConfig );
		const newSel = selector + '.' + item;
		config = set( config, newSel, newVal );
		setUserConfig( config );
	};

	return (
		<>
			<span className="themer--blocks-item-component--styles--title">
				<PanelBody
					title={ __( 'Color Settings', 'themer' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Background', 'themer' ) }
						onChange={ ( newVal ) =>
							handleNewValue( newVal, 'background' )
						}
						checked={ settings?.background }
					/>
					<ToggleControl
						label={ __( 'Custom', 'themer' ) }
						onChange={ ( newVal ) =>
							handleNewValue( newVal, 'custom' )
						}
						checked={ settings?.custom }
					/>
					<ToggleControl
						label={ __( 'customDuotone', 'themer' ) }
						onChange={ ( newVal ) =>
							handleNewValue( newVal, 'customDuotone' )
						}
						checked={ settings?.customDuotone }
					/>
					<ToggleControl
						label={ __( 'customGradient', 'themer' ) }
						onChange={ ( newVal ) =>
							handleNewValue( newVal, 'customGradient' )
						}
						checked={ settings?.customGradient }
					/>
					<ToggleControl
						label={ __( 'defaultDuotone', 'themer' ) }
						onChange={ ( newVal ) =>
							handleNewValue( newVal, 'defaultDuotone' )
						}
						checked={ settings?.defaultDuotone }
					/>
					<ToggleControl
						label={ __( 'defaultGradients', 'themer' ) }
						onChange={ ( newVal ) =>
							handleNewValue( newVal, 'defaultGradients' )
						}
						checked={ settings?.defaultGradients }
					/>
					<ToggleControl
						label={ __( 'defaultPalette', 'themer' ) }
						onChange={ ( newVal ) =>
							handleNewValue( newVal, 'defaultPalette' )
						}
						checked={ settings?.defaultPalette }
					/>
					<ToggleControl
						label={ __( 'Link', 'themer' ) }
						onChange={ ( newVal ) =>
							handleNewValue( newVal, 'link' )
						}
						checked={ settings?.link }
					/>
					<ToggleControl
						label={ __( 'Text', 'themer' ) }
						onChange={ ( newVal ) =>
							handleNewValue( newVal, 'text' )
						}
						checked={ settings?.text }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Duotone', 'themer' ) }
					initialOpen={ false }
				>
					TBC...
				</PanelBody>
				<PanelBody
					title={ __( 'Gradient Settings', 'themer' ) }
					initialOpen={ false }
				>
					<SettingsPalette
						selector={ `${ selector }.gradients.theme` }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Palette Settings', 'themer' ) }
					initialOpen={ false }
				>
					<SettingsPalette
						selector={ `${ selector }.palette.theme` }
					/>
				</PanelBody>
			</span>
		</>
	);
};

export default TestComponent;
