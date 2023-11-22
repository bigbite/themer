import { useContext } from '@wordpress/element';

import EditorContext from '../context/EditorContext';
import { getCoreBlocksFromSchema } from '../../utils/block-helpers';
import getThemeOption from '../../utils/get-theme-option';

import NavListItem from './NavListItem';
import ElementList from './ElementList';

/**
 * Block list
 */
const BlockList = () => {
	const { themeConfig, schema } = useContext( EditorContext );

	const schemaBlocks = getCoreBlocksFromSchema( schema );
	const themeJSONBlocks = Object.keys( themeConfig?.styles?.blocks ?? {} );

	// filter out any blocks not present in theme.json
	const blocks = schemaBlocks?.filter( ( block ) =>
		themeJSONBlocks?.includes( block.name )
	);

	return (
		<section>
			<ul className="themer-nav-list">
				{ blocks.map( ( block ) => {
					const blockStyles = getThemeOption(
						`styles.blocks.${ block.name }`,
						themeConfig
					);
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
								<ElementList
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

export default BlockList;
