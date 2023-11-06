import { useContext } from '@wordpress/element';

import Border from './StylesBorder';
import Color from './StylesColor';
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
 * This component will render the styles components for the given path.
 *
 * This can be reused on any path that references the stylesProperties schema object:
 * https://raw.githubusercontent.com/WordPress/gutenberg/trunk/schemas/json/theme.json
 *
 * @param {Object} props      Component props
 * @param {string} props.path Path to styles object within theme config
 */
const Styles = ( { path } ) => {
	const { themeConfig } = useContext( EditorContext );

	if ( ! path ) {
		return;
	}

	const hasBorderStyles = getThemeOption( `${ path }.border`, themeConfig );
	const hasColorStyles = getThemeOption( `${ path }.color`, themeConfig );
	const hasFilterStyles = getThemeOption( `${ path }.filter`, themeConfig );
	const hasSpacingStyles = getThemeOption( `${ path }.spacing`, themeConfig );
	const hasDimensionsStyles = getThemeOption(
		`${ path }.dimensions`,
		themeConfig
	);
	const hasOutlineStyles = getThemeOption( `${ path }.outline`, themeConfig );
	const hasShadowStyles = getThemeOption( `${ path }.shadow`, themeConfig );

	return (
		<div className="themer--blocks-item-component">
			<div className="themer--blocks-item-component--styles">
				{ hasBorderStyles && (
					<Border selector={ `${ path }.border` } />
				) }
				{ hasColorStyles && <Color selector={ `${ path }.color` } /> }
				{ hasFilterStyles && (
					<Filter selector={ `${ path }.filter` } />
				) }
				{ hasSpacingStyles && (
					<Spacing selector={ `${ path }.spacing` } />
				) }
				{ hasDimensionsStyles && (
					<Dimensions selector={ `${ path }.dimensions` } />
				) }
				{ hasOutlineStyles && (
					<Outline selector={ `${ path }.outline` } />
				) }
				{ hasShadowStyles && (
					<Shadow selector={ `${ path }.shadow` } />
				) }
			</div>
		</div>
	);
};

export default Styles;
