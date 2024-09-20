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

	// get styles for all blocks
	const themeBlockStyles = getThemeOption( `styles.blocks`, themeConfig );

	// sort the blocks by title
	const orderedSchema = schemaBlocks.sort( ( a, b ) =>
		a.title.localeCompare( b.title )
	);

	return (
		<section>
			<ul className="themer-nav-list">
				{ orderedSchema.map( ( block ) => {
					// get all styles for this block
					const blockStyles = themeBlockStyles[ block.name ] || {};

					// check if the block has any styles that aren't elements
					const { elements, ...rest } = blockStyles;
					const hasBlockStyles = Object.keys( rest ).length > 0;

					const route = '/blocks/' + encodeURIComponent( block.name );
					const elementsSelector = `blocks.${ block.name }.elements`;

					return (
						<NavListItem
							key={ block.name }
							icon={ block?.icon?.src }
							label={ block.title }
							route={ route }
							hasStyles={ hasBlockStyles }
						>
							<NavElementList
								selector={ elementsSelector }
								route={ route }
							/>
						</NavListItem>
					);
				} ) }
			</ul>
		</section>
	);
};

export default NavBlockList;
