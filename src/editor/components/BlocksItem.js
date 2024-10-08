import Border from './StylesBorder';
import Color from './StylesColor';
import CustomCSS from './StylesCustomCSS';
import getThemeOption from '../../utils/get-theme-option';

/**
 * Individual block item
 *
 * @param {Object} props             Component props
 * @param {string} props.block       Block name
 * @param {Object} props.themeConfig Theme JSON
 */
const BlocksItem = ( { block, themeConfig } ) => {
	if ( ! block ) {
		return;
	}

	const blockSelector = [ 'styles', 'blocks', block ];
	const hasBorderStyles = getThemeOption(
		[ ...blockSelector, 'border' ].join( '.' ),
		themeConfig
	);
	const hasColorStyles = getThemeOption(
		[ ...blockSelector, 'color' ].join( '.' ),
		themeConfig
	);
	const hasCustomCSSStyles = getThemeOption(
		[ ...blockSelector, 'css' ].join( '.' ),
		themeConfig
	);

	return (
		<details className="themer--blocks-item-component">
			<summary>{ block }</summary>
			<div className="themer--blocks-item-component--styles">
				{ hasBorderStyles && (
					<Border
						selector={ [ ...blockSelector, 'border' ].join( '.' ) }
					/>
				) }
				{ hasColorStyles && (
					<Color
						selector={ [ ...blockSelector, 'color' ].join( '.' ) }
					/>
				) }
				{ ( hasCustomCSSStyles || hasCustomCSSStyles === '' ) && (
					<CustomCSS
						selector={ [ ...blockSelector, 'css' ].join( '.' ) }
					/>
				) }
			</div>
		</details>
	);
};

export default BlocksItem;
