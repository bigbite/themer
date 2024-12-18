import { Panel, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import SettingsComponent from './SettingsComponent';
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
 * Styles component
 *
 * This component will render the styles components for the given selector.
 *
 * This can be reused with any selector that references the stylesProperties schema object:
 * https://raw.githubusercontent.com/WordPress/gutenberg/trunk/schemas/json/theme.json
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Selector for styles object within theme config
 */
const Styles = ( { selector } ) => {
	if ( ! selector ) {
		return;
	}

	return (
		<div className="themer--styles">
			<Panel header={ __( 'Site Settings', 'themer' ) }>
				<PanelBody
					title={ __( 'Site Settings', 'themer' ) }
					initialOpen={ false }
				>
					<SettingsComponent selector={ `${ selector }` } />
				</PanelBody>
				<PanelBody
					title={ __( 'Border Settings', 'themer' ) }
					initialOpen={ false }
				>
					<SettingsBorder selector={ `${ selector }.border` } />
				</PanelBody>
				<PanelBody
					title={ __( 'Color Settings', 'themer' ) }
					initialOpen={ false }
				>
					<SettingsColor selector={ `${ selector }.color` } />
				</PanelBody>
				<PanelBody
					title={ __( 'Custom Settings', 'themer' ) }
					initialOpen={ false }
				>
					<SettingsCustom selector={ `${ selector }.custom` } />
				</PanelBody>
				<PanelBody
					title={ __( 'Layout Settings', 'themer' ) }
					initialOpen={ false }
				>
					<SettingsLayout selector={ `${ selector }.layout` } />
				</PanelBody>
				<PanelBody
					title={ __( 'Spacing Settings', 'themer' ) }
					initialOpen={ false }
				>
					<SettingsSpacing selector={ `${ selector }.spacing` } />
				</PanelBody>
				<PanelBody
					title={ __( 'Typography Settings', 'themer' ) }
					initialOpen={ false }
				>
					<TypographySettings
						selector={ `${ selector }.typography` }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Dimensions Settings', 'themer' ) }
					initialOpen={ false }
				>
					<SettingsDimensions
						selector={ `${ selector }.dimensions` }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Shadow Settings', 'themer' ) }
					initialOpen={ false }
				>
					<SettingsShadow selector={ `${ selector }.shadow` } />
				</PanelBody>
				<PanelBody
					title={ __( 'Position Settings', 'themer' ) }
					initialOpen={ false }
				>
					<SettingsPosition selector={ `${ selector }.position` } />
				</PanelBody>
				<PanelBody
					title={ __( 'Background Settings', 'themer' ) }
					initialOpen={ false }
				>
					<SettingsBackground
						selector={ `${ selector }.background` }
					/>
				</PanelBody>
			</Panel>
		</div>
	);
};

export default Styles;
