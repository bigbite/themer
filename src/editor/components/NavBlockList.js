import { useContext } from '@wordpress/element';

import EditorContext from '../context/EditorContext';

import { getCoreBlocksFromSchema } from '../../utils/block-helpers';
import getThemeOption from '../../utils/get-theme-option';

import NavListItem from './NavListItem';
import NavElementList from './NavElementList';

/**
 * Nav Block list
 *
 * Renders the block list in the navigation panel
 */
const NavBlockList = () => {
	const { themeConfig, schema } = useContext( EditorContext );

	// get all valid blocks from the schema
	const schemaBlocks = getCoreBlocksFromSchema( schema );

	// filter out any blocks not present in the active theme styles
	const themeBlocks = getThemeOption( 'styles.blocks', themeConfig );
	const blocks = schemaBlocks?.filter( ( element ) =>
		Object.keys( themeBlocks )?.includes( element.name )
	);

	return (
		<section>
			<ul className="themer-nav-list">
				{ blocks.map( ( block ) => {
					const blockStyles = getThemeOption(
						`styles.blocks.${ block.name }`,
						themeConfig
					);

					/**
					 * Check if this block has any element styles and also
					 * confirm whether it has styles that are not element styles
					 */
					const { elements, ...rest } = blockStyles;
					const hasElementStyles = !! elements;
					const hasBlockStyles = Object.keys( rest ).length > 0;

					const route = '/blocks/' + encodeURIComponent( block.name );
					const elementsSelector = `blocks.${ block.name }.elements`;

					return (
						<NavListItem
							key={ block.name }
							icon={ block?.icon?.src }
							label={ block.title }
							route={ hasBlockStyles && route }
						>
							{ hasElementStyles && (
								<NavElementList
									selector={ elementsSelector }
									route={ route }
								/>
							) }
						</NavListItem>
					);
				} ) }
			</ul>
		</section>
	);
};

export default NavBlockList;
