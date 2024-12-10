import SettingsComponent from './SettingsComponent';
import SettingsBorder from './SettingsBorder';
import SettingsColor from './SettingsColor';
// import CustomSettings from './CustomSettings';
import SettingsLayout from './SettingsLayout';
import SettingsSpacing from './SettingsSpacing';
import TypographySettings from './TypographySettings';
import SettingsDimensions from './SettingsDimensions';
import ShadowSettings from './ShadowSettings';
// import BackgroundSettings from './BackgroundSettings';

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
			<div className="themer--styles__item">
				{ /* <SettingsComponent selector={ `${ selector }` } />
				<SettingsBorder selector={ `${ selector }.border` } />
				<SettingsColor selector={ `${ selector }.color` } /> */ }
				{ /* <CustomSettings selector={ `${ selector }.custom` } /> */ }
				{ /* <SettingsLayout selector={ `${ selector }.layout` } />
				<SettingsSpacing selector={ `${ selector }.spacing` } /> */ }
				{/* <TypographySettings selector={ `${ selector }.typography` } /> */}
				<SettingsDimensions selector={ `${ selector }.dimensions` } />
				{ /* <ShadowSettings selector={ `${ selector }.shadow` } /> */ }
				{ /* <BackgroundSettings selector={ `${ selector }.background` } /> */ }
			</div>
		</div>
	);
};

export default Styles;
