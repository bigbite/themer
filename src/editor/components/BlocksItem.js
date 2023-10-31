import { useState } from '@wordpress/element';

import Styles from './Styles';

/**
 * Individual block item
 *
 * @param {Object} props       Component props
 * @param {string} props.block Block name
 */
const BlocksItem = ( { block } ) => {
	const [ isOpen, setIsOpen ] = useState( false );
	if ( ! block ) {
		return;
	}

	const path = `styles.blocks.${ block.name }`;

	return (
		<details
			className="themer--blocks-item-component"
			open={ isOpen }
			onToggle={ () => setIsOpen( ! isOpen ) }
		>
			<summary>
				<span>
					{ block?.icon?.src }
					{ block?.title }
				</span>
			</summary>
			{ isOpen && (
				<div className="themer--blocks-item-component--styles">
					<Styles path={ path } />
				</div>
			) }
		</details>
	);
};

export default BlocksItem;
