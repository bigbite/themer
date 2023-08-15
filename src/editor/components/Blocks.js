import { __ } from '@wordpress/i18n';
import { useState, useContext } from '@wordpress/element';

import Search from './Search';
import BlocksItem from './BlocksItem';
import EditorContext from '../context/EditorContext';
import { getCoreBlocks } from '../../utils/block-helpers';

/**
 * Blocks tab menu component
 */
const Blocks = () => {
	const { themeConfig, schema } = useContext( EditorContext );
	const [ searchValue, setSearchValue ] = useState();

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
			{ getCoreBlocks( undefined, themeConfig, schema )?.map(
				( block ) => {
					if (
						searchValue?.length > 0 &&
						! block.toLowerCase().includes( searchValue )
					) {
						return false;
					}

					return (
						<BlocksItem
							key={ block }
							block={ block }
							themeConfig={ themeConfig }
						/>
					);
				}
			) }
		</section>
	);
};

export default Blocks;
