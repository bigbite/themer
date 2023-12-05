import Border from './StylesBorder';
import Color from './StylesColor';
import Typography from './StylesTypography';
import Filter from './StylesFilter';
import Spacing from './StylesSpacing';
import Dimensions from './StylesDimensions';
import Outline from './StylesOutline';
import Shadow from './StylesShadow';

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
		<div className="themer--blocks-item-component">
			<div className="themer--blocks-item-component--styles">
				<Border selector={ `${ selector }.border` } />
				<Color selector={ `${ selector }.color` } />
				<Typography selector={ `${ selector }.typography` } />
				<Filter selector={ `${ selector }.filter` } />
				<Spacing selector={ `${ selector }.spacing` } />
				<Dimensions selector={ `${ selector }.dimensions` } />
				<Outline selector={ `${ selector }.outline` } />
				<Shadow selector={ `${ selector }.shadow` } />
			</div>
		</div>
	);
};

export default Styles;
