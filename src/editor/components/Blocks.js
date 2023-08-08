import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

import Search from './Search';
import BlocksItem from './BlocksItem';
import { getCoreBlocks } from '../../utils/block-helpers';

/**
 * Blocks tab menu component
 */
const Blocks = () => {
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
			{ getCoreBlocks()?.map( ( block ) => {
				if (
					searchValue?.length > 0 &&
					! (
						block?.title?.toLowerCase().includes( searchValue ) ||
						block?.name?.toLowerCase().includes( searchValue )
					)
				) {
					return false;
				}

				return <BlocksItem key={ block?.name } block={ block } />;
			} ) }
		</section>
	);
};

export default Blocks;
