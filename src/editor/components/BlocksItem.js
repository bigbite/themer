import Border from './StylesBorder';
import Color from './StylesColor';
import Spacing from './StylesSpacing';
import Dimensions from './StylesDimensions';
import Outline from './StylesOutline';
import Shadow from './StylesShadow';
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
	const hasSpacingStyles = getThemeOption(
		[ ...blockSelector, 'spacing' ].join( '.' ),
		themeConfig
	);
	const hasDimensionsStyles = getThemeOption(
		[ ...blockSelector, 'dimensions' ].join( '.' ),
		themeConfig
	);
	const hasOutlineStyles = getThemeOption(
		[ ...blockSelector, 'outline' ].join( '.' ),
		themeConfig
	);
	const hasShadowStyles = getThemeOption(
		[ ...blockSelector, 'shadow' ].join( '.' ),
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
				{ hasSpacingStyles && (
					<Spacing
						selector={ [ ...blockSelector, 'spacing' ].join( '.' ) }
					/>
				) }
				{ hasDimensionsStyles && (
					<Dimensions
						selector={ [ ...blockSelector, 'dimensions' ].join(
							'.'
						) }
					/>
				) }
				{ hasOutlineStyles && (
					<Outline
						selector={ [ ...blockSelector, 'outline' ].join( '.' ) }
					/>
				) }
				{ hasShadowStyles && (
					<Shadow
						selector={ [ ...blockSelector, 'shadow' ].join( '.' ) }
					/>
				) }
			</div>
		</details>
	);
};

export default BlocksItem;
