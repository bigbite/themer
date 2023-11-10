import { getBlockFromExample } from '@wordpress/blocks';
import { Button } from '@wordpress/components';
import { useState, useContext, useEffect } from '@wordpress/element';
import { seen, unseen } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import Styles from './Styles';

import EditorContext from '../context/EditorContext';

import { getHeadingPreview } from '../../utils/blockPreviews';

/**
 * Individual block item
 *
 * @param {Object} props       Component props
 * @param {string} props.block Block name
 */
const BlocksItem = ( { block } ) => {
	const [ isOpen, setIsOpen ] = useState( false );
	const { previewBlocks, setPreviewBlocks, resetPreviewBlocks } =
		useContext( EditorContext );

	/**
	 * Reset the preview when the component is closed or unmounted
	 */
	useEffect( () => {
		if ( ! isOpen ) {
			resetPreviewBlocks();
		}
		return () => resetPreviewBlocks();
	}, [ isOpen ] );

	if ( ! block ) {
		return;
	}

	const path = `styles.blocks.${ block.name }`;

	/**
	 * The example is active if the preview blocks key matches the block name
	 */
	const isExampleActive = previewBlocks.name === block.name;

	/**
	 * Toggle the preview example for this block on/off
	 * Examples are defined during block registration
	 *
	 * @returns void
	 */
	const toggleExample = () => {
		if ( isExampleActive ) {
			resetPreviewBlocks();
			return;
		}

		if ( 'core/heading' === block.name ) {
			setPreviewBlocks( {
				name: block.name,
				blocks: getHeadingPreview(),
			} );
			return;
		}

		setPreviewBlocks( {
			name: block.name,
			blocks: [ getBlockFromExample( block.name, block.example ) ],
		} );
	};

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
					{ block.example && (
						<div>
							<Button
								onClick={ toggleExample }
								icon={ isExampleActive ? unseen : seen }
								label="Toggle example"
							/>
						</div>
					) }
					<Styles path={ path } />
				</div>
			) }
		</details>
	);
};

export default BlocksItem;
