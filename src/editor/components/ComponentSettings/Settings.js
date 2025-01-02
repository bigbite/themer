import { Panel, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';

import EditorContext from '../../context/EditorContext';

import SettingsAppearanceTools from './SettingsAppearanceTools';
import SettingsBorder from './SettingsBorder';
import SettingsColor from './SettingsColor';
import SettingsCustom from './SettingsCustom';
import SettingsLayout from './SettingsLayout';
import SettingsSpacing from './SettingsSpacing';
import TypographySettings from './TypographySettings';
import SettingsDimensions from './SettingsDimensions';
import SettingsShadow from './SettingsShadow';
import SettingsPosition from './SettingsPosition';
import SettingsBackground from './SettingsBackground';

/**
 * Settings component
 *
 * This component will render the settings components for the given selector.
 *
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Selector for settings object within theme config
 */
const Settings = ( { selector } ) => {
	const { schema } = useContext( EditorContext );

	if ( ! selector ) {
		return;
	}

	const definitions = schema?.definitions;

	return (
		<div className="themer--settings">
			<Panel header={ __( 'Site Settings', 'themer' ) }>
				<PanelBody
					title={ __( 'Appearance Tools', 'themer' ) }
					initialOpen={ false }
				>
					<SettingsAppearanceTools
						selector={ `${ selector }` }
						description={
							definitions?.settingsAppearanceToolsProperties
								?.properties?.appearanceTools?.description
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Border Settings', 'themer' ) }
					initialOpen={ false }
				>
					<SettingsBorder
						selector={ `${ selector }.border` }
						description={
							definitions?.settingsBorderProperties?.properties
								?.border?.description
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Color Settings', 'themer' ) }
					initialOpen={ false }
				>
					<SettingsColor
						selector={ `${ selector }.color` }
						description={
							definitions?.settingsColorProperties?.properties
								?.color?.description
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Custom Settings', 'themer' ) }
					initialOpen={ false }
				>
					<SettingsCustom
						selector={ `${ selector }.custom` }
						description={
							definitions?.settingsCustomAdditionalProperties
								?.description
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Layout Settings', 'themer' ) }
					initialOpen={ false }
				>
					<SettingsLayout
						selector={ `${ selector }.layout` }
						description={
							definitions?.settingsLayoutProperties?.properties
								?.layout?.description
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Spacing Settings', 'themer' ) }
					initialOpen={ false }
				>
					<SettingsSpacing
						selector={ `${ selector }.spacing` }
						description={
							definitions?.settingsSpacingProperties?.properties
								?.spacing?.description
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Typography Settings', 'themer' ) }
					initialOpen={ false }
				>
					<TypographySettings
						selector={ `${ selector }.typography` }
						description={
							definitions?.settingsTypographyProperties
								?.properties?.typography?.description
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Dimensions Settings', 'themer' ) }
					initialOpen={ false }
				>
					<SettingsDimensions
						selector={ `${ selector }.dimensions` }
						description={
							definitions?.settingsDimensionsProperties
								?.properties?.dimensions?.description
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Shadow Settings', 'themer' ) }
					initialOpen={ false }
				>
					<SettingsShadow
						selector={ `${ selector }.shadow` }
						description={
							definitions?.settingsShadowProperties?.properties
								?.shadow?.description
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Position Settings', 'themer' ) }
					initialOpen={ false }
				>
					<SettingsPosition
						selector={ `${ selector }.position` }
						description={
							definitions?.settingsPositionProperties?.properties
								?.position?.description
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Background Settings', 'themer' ) }
					initialOpen={ false }
				>
					<SettingsBackground
						selector={ `${ selector }.background` }
						description={
							definitions?.settingsBackgroundProperties
								?.properties?.background?.description
						}
					/>
				</PanelBody>
			</Panel>
		</div>
	);
};

export default Settings;
