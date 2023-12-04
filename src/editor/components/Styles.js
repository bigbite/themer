import { useContext } from '@wordpress/element';

import Border from './StylesBorder';
import Color from './StylesColor';
import Typography from './StylesTypography';
import Filter from './StylesFilter';
import Spacing from './StylesSpacing';
import Dimensions from './StylesDimensions';
import Outline from './StylesOutline';
import Shadow from './StylesShadow';

import getThemeOption from '../../utils/get-theme-option';
import EditorContext from '../context/EditorContext';

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
	const { themeConfig } = useContext( EditorContext );

	if ( ! selector ) {
		return;
	}

	const hasBorderStyles = getThemeOption(
		`${ selector }.border`,
		themeConfig
	);
	const hasColorStyles = getThemeOption( `${ selector }.color`, themeConfig );
	const hasTypographyStyles = getThemeOption(
		`${ selector }.typography`,
		themeConfig
	);
	const hasFilterStyles = getThemeOption(
		`${ selector }.filter`,
		themeConfig
	);
	const hasSpacingStyles = getThemeOption(
		`${ selector }.spacing`,
		themeConfig
	);
	const hasDimensionsStyles = getThemeOption(
		`${ selector }.dimensions`,
		themeConfig
	);
	const hasOutlineStyles = getThemeOption(
		`${ selector }.outline`,
		themeConfig
	);
	const hasShadowStyles = getThemeOption(
		`${ selector }.shadow`,
		themeConfig
	);

	return (
		<div className="themer--blocks-item-component">
			<div className="themer--blocks-item-component--styles">
				{ hasBorderStyles && (
					<Border selector={ `${ selector }.border` } />
				) }
				{ hasColorStyles && (
					<Color selector={ `${ selector }.color` } />
				) }
				{ hasTypographyStyles && (
					<Typography selector={ `${ selector }.typography` } />
				) }
				{ hasFilterStyles && (
					<Filter selector={ `${ selector }.filter` } />
				) }
				{ hasSpacingStyles && (
					<Spacing selector={ `${ selector }.spacing` } />
				) }
				{ hasDimensionsStyles && (
					<Dimensions selector={ `${ selector }.dimensions` } />
				) }
				{ hasOutlineStyles && (
					<Outline selector={ `${ selector }.outline` } />
				) }
				{ hasShadowStyles && (
					<Shadow selector={ `${ selector }.shadow` } />
				) }
			</div>
		</div>
	);
};

export default Styles;
