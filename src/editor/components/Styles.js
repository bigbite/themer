import { __ } from '@wordpress/i18n';

import StylesItem from './StylesItem';

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
		<div className="themer--styles">
			<StylesItem selector={ `${ selector }.border` } title={ __( 'Border', 'themer' ) }>
				<Border selector={ `${ selector }.border` } />
			</StylesItem>
			<div className="themer--styles__item">
				<Color selector={ `${ selector }.color` } />
			</div>
			<div className="themer--styles__item">
				<Typography selector={ `${ selector }.typography` } />
			</div>
			<div className="themer--styles__item">
				<Filter selector={ `${ selector }.filter` } />
			</div>
			<div className="themer--styles__item">
				<Spacing selector={ `${ selector }.spacing` } />
			</div>
			<div className="themer--styles__item">
				<Dimensions selector={ `${ selector }.dimensions` } />
			</div>
			<div className="themer--styles__item">
				<Outline selector={ `${ selector }.outline` } />
			</div>
			<div className="themer--styles__item">
				<Shadow selector={ `${ selector }.shadow` } />
			</div>
		</div>
	);
};

export default Styles;
