import { useContext } from '@wordpress/element';
import { html, styles } from '@wordpress/icons';

import EditorContext from '../context/EditorContext';

import { getCoreBlocksFromSchema } from '../../utils/block-helpers';
import getThemeOption from '../../utils/get-theme-option';

import NavListItem from './NavListItem';
import NavElementList from './NavElementList';
import NavVariationList from './NavVariationList';

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

	return (
		<section>
			<ul className="themer-nav-list">
				{ schemaBlocks.map( ( block ) => {
					// get all styles for this block
					const blockStyles = themeBlockStyles[ block.name ] || {};

					// check if the block has any styles that aren't elements
					const { elements, ...rest } = blockStyles;
					const hasBlockStyles = Object.keys( rest ).length > 0;

					const route = '/blocks/' + encodeURIComponent( block.name );
					const elementRoute =
						'/blocks/' +
						encodeURIComponent( block.name ) +
						'/elements';
					const elementsSelector = `blocks.${ block.name }.elements`;

					const varRoute =
						'/blocks/' +
						encodeURIComponent( block.name ) +
						'/variations';

					return (
						<NavListItem
							key={ block.name }
							icon={ block?.icon?.src }
							label={ block.title }
							route={ route }
							hasStyles={ hasBlockStyles }
						>
							<NavListItem
								key={ 'elements' }
								label={ 'Elements' }
								icon={ html }
							>
								<NavElementList
									selector={ elementsSelector }
									route={ elementRoute }
								/>
							</NavListItem>
							<NavListItem
								key={ 'variations' }
								label={ 'Variations' }
								icon={ styles }
							>
								<NavVariationList
									selector={ `blocks.${ block.name }.variations` }
									route={ varRoute }
								/>
							</NavListItem>
						</NavListItem>
					);
				} ) }
			</ul>
		</section>
	);
};

export default NavBlockList;
