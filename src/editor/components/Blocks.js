import { __ } from '@wordpress/i18n';
import { useState, useContext } from '@wordpress/element';

import Search from './Search';
import BlocksItem from './BlocksItem';
import EditorContext from '../context/EditorContext';
import { getCoreBlocksFromSchema } from '../../utils/block-helpers';

/**
 * Blocks tab menu component
 */
const Blocks = () => {
	const { themeConfig, schema } = useContext( EditorContext );
	const [ searchValue, setSearchValue ] = useState();

	const schemaBlocks = getCoreBlocksFromSchema( schema );
	const themeJSONBlocks = Object.keys( themeConfig?.styles?.blocks ?? {} );

	// filter out any blocks not present in theme.json
	const blocks = schemaBlocks?.filter( ( block ) =>
		themeJSONBlocks?.includes( block.name )
	);

	return (
		<section className="themer--blocks-component">
			<h2>{ __( 'Blocks', 'themer' ) }</h2>
			<p>
				{ __(
					'Customise the appearance of specific blocks for the whole site.',
					'themer'
				) }
			</p>
			<Search setValue={ setSearchValue } />
			{ blocks.map( ( block ) => {
				if (
					searchValue?.length > 0 &&
					! block.name.toLowerCase().includes( searchValue )
				) {
					return false;
				}

				return <BlocksItem key={ block.name } block={ block } />;
			} ) }
		</section>
	);
};

export default Blocks;
