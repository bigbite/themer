import { getBlockFromExample } from '@wordpress/blocks';
import {
	__experimentalHeading as Heading,
	Button,
	Icon,
} from '@wordpress/components';
import { useContext, useEffect } from '@wordpress/element';
import { seen } from '@wordpress/icons';

import Styles from './Styles';

import EditorContext from '../context/EditorContext';

import { getCoreBlocksFromSchema } from '../../utils/block-helpers';
import { getHeadingPreview } from '../../utils/blockPreviews';

/**
 * Individual block item
 *
 * @param {Object} props          Component props
 * @param {string} props.name     Block name
 * @param {string} props.selector Selector to locate this block in the schema
 */
const BlockItem = ( { name, selector } ) => {
	const { schema, previewBlocks, setPreviewBlocks, resetPreviewBlocks } =
		useContext( EditorContext );

	/**
	 * Reset the preview blocks when the component unmounts
	 */
	useEffect( () => {
		return () => {
			resetPreviewBlocks();
		};
	}, [ resetPreviewBlocks ] );

	if ( ! name ) {
		return;
	}

	/**
	 * Toggle the preview example for this block on/off
	 * Examples are defined during block registration
	 *
	 * @return {void}
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

	const schemaBlocks = getCoreBlocksFromSchema( schema );

	const block = schemaBlocks?.find(
		( schemaBlock ) => schemaBlock.name === name
	);

	/**
	 * The example is active if the preview blocks key matches the block name
	 */
	const isExampleActive = previewBlocks.name === block.name;
	const stylesSelector = `styles.${ selector }`;

	return (
		<>
			<span className="themer-styles-heading">
				<Icon icon={ block.icon.src } size={ 24 } />
				<Heading level={ 4 }>{ block.title }</Heading>
				{ block.example && (
					<Button
						className="themer-styles-heading__right"
						onClick={ toggleExample }
						icon={ seen }
						isPressed={ isExampleActive }
						label="Toggle example"
					/>
				) }
			</span>
			<p>{ block.description }</p>
			<Styles selector={ stylesSelector } />
		</>
	);
};

export default BlockItem;
