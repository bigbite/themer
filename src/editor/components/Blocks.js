import {
	__experimentalUseNavigator as useNavigator,
	Button,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState, useContext } from '@wordpress/element';

import Search from './Search';
import EditorContext from '../context/EditorContext';
import { getCoreBlocksFromSchema } from '../../utils/block-helpers';

/**
 * Blocks tab menu component
 */
const Blocks = () => {
	const { themeConfig, schema } = useContext( EditorContext );
	const [ searchValue, setSearchValue ] = useState();
	const { goTo } = useNavigator();

	const schemaBlocks = getCoreBlocksFromSchema( schema );
	const themeJSONBlocks = Object.keys( themeConfig?.styles?.blocks ?? {} );

	// filter out any blocks not present in theme.json
	const blocks = schemaBlocks?.filter( ( block ) =>
		themeJSONBlocks?.includes( block.name )
	);

	return (
		<section className="themer--blocks-component">
			<Search setValue={ setSearchValue } />
			<ul>
				{ blocks.map( ( block ) => {
					if (
						searchValue?.length > 0 &&
						! block.name.toLowerCase().includes( searchValue )
					) {
						return false;
					}

					const route = '/blocks/' + encodeURIComponent( block.name );

					return (
						<li key={ block.name }>
							<Button
								icon={ block?.icon?.src }
								onClick={ () => goTo( route ) }
							>
								{ block?.title }
							</Button>
						</li>
					);
				} ) }
			</ul>
		</section>
	);
};

export default Blocks;
