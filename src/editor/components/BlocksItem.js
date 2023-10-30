import { useState } from '@wordpress/element';

import Border from './StylesBorder';
import Color from './StylesColor';
import Typography from './StylesTypography';
import Filter from './StylesFilter';
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
	const [ isOpen, setIsOpen ] = useState( false );
	if ( ! block ) {
		return;
	}

	const blockSelector = [ 'styles', 'blocks', block.name ];
	const hasBorderStyles = getThemeOption(
		[ ...blockSelector, 'border' ].join( '.' ),
		themeConfig
	);
	const hasColorStyles = getThemeOption(
		[ ...blockSelector, 'color' ].join( '.' ),
		themeConfig
	);
	const hasTypographyStyles = getThemeOption(
		[ ...blockSelector, 'typography' ].join( '.' ),
		themeConfig
	);
	const hasFilterStyles = getThemeOption(
		[ ...blockSelector, 'filter' ].join( '.' ),
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

	if ( ! hasBorderStyles && ! hasColorStyles ) {
		return;
	}

	return (
		<details
			className="themer--blocks-item-component"
			open={ isOpen }
			onToggle={ () => setIsOpen( ! isOpen ) }
		>
			<summary>{ block }</summary>
			{ isOpen && (
				<div className="themer--blocks-item-component--styles">
					{ hasBorderStyles && (
						<Border
							selector={ [ ...blockSelector, 'border' ].join(
								'.'
							) }
						/>
					) }
					{ hasColorStyles && (
						<Color
							selector={ [ ...blockSelector, 'color' ].join(
								'.'
							) }
						/>
					) }
					{ hasFilterStyles && (
						<Filter
							selector={ [ ...blockSelector, 'filter' ].join(
								'.'
							) }
						/>
					) }
					{ hasSpacingStyles && (
						<Spacing
							selector={ [ ...blockSelector, 'spacing' ].join(
								'.'
							) }
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
							selector={ [ ...blockSelector, 'outline' ].join(
								'.'
							) }
						/>
					) }
					{ hasShadowStyles && (
						<Shadow
							selector={ [ ...blockSelector, 'shadow' ].join(
								'.'
							) }
						/>
					) }
					{ hasTypographyStyles && (
						<Typography
							selector={ [ ...blockSelector, 'typography' ].join(
								'.'
							) }
						/>
					) }
				</div>
			) }
		</details>
	);
};

export default BlocksItem;
