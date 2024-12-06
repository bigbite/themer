import SettingsComponent from './SettingsComponent';
import SettingsBorder from './SettingsBorder';
import ColorSettings from './ColorSettings';
// import CustomSettings from './CustomSettings';
import LayoutSettings from './LayoutSettings';
import SpacingSettings from './SpacingSettings';
import TypographySettings from './TypographySettings';
import DimensionSettings from './DimensionSettings';
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
        <SettingsComponent selector={ `${ selector }` } />
		<SettingsBorder selector={ `${ selector }.border` } />
		{/* <ColorSettings selector={ `${ selector }.color` } /> */}
		{/* <CustomSettings selector={ `${ selector }.custom` } /> */}
		{/* <LayoutSettings selector={ `${ selector }.layout` } /> */}
		{/* <SpacingSettings selector={ `${ selector }.spacing` } /> */}
		{/* <TypographySettings selector={ `${ selector }.typography` } /> */}
		{/* <DimensionSettings selector={ `${ selector }.dimensions` } /> */}
		{/* <ShadowSettings selector={ `${ selector }.shadow` } /> */}
		{/* <BackgroundSettings selector={ `${ selector }.background` } /> */}
			</div>
		</div>
	);
};

export default Styles;
