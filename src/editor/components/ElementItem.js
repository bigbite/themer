import {
	__experimentalHeading as Heading,
	Button,
} from '@wordpress/components';
import { useContext, useEffect } from '@wordpress/element';
import { seen } from '@wordpress/icons';

import Styles from './Styles';
import PseudoList from './PseudoList';

import EditorContext from '../context/EditorContext';
import { getElementPreview } from '../../utils/blockPreviews';

/**
 * Individual element item
 *
 * @param {Object}  props                   Component props
 * @param {string}  props.name              Element name
 * @param {string}  props.selector          Selector to locate this element in the schema
 * @param {boolean} props.showPreviewToggle Whether to show the preview toggle button
 */
const ElementItem = ( { name, selector, showPreviewToggle = true } ) => {
	const { previewBlocks, setPreviewBlocks, resetPreviewBlocks } =
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

	const elementPreviewBlocks = getElementPreview( name );

	/**
	 * The example is active if the preview blocks key matches the element name
	 */
	const isExampleActive = previewBlocks.name === name;

	/**
	 * Toggle the preview example for this block on/off
	 * Uses the example defined during block registration to render the preview
	 *
	 * @return {void}
	 */
	const toggleExample = () => {
		if ( isExampleActive ) {
			resetPreviewBlocks();
			return;
		}

		setPreviewBlocks( { name, blocks: elementPreviewBlocks } );
	};

	const stylesSelector = `styles.${ selector }`;

	return (
		<>
			<span className="themer--icon-heading">
				<Heading level={ 4 }>Element Styles</Heading>
				{ elementPreviewBlocks && showPreviewToggle && (
					<Button
						className="themer--icon-heading__right"
						onClick={ toggleExample }
						icon={ seen }
						isPressed={ isExampleActive }
						label="Toggle example"
					/>
				) }
			</span>
			<Styles selector={ stylesSelector } />
			<PseudoList selector={ stylesSelector } />
		</>
	);
};

export default ElementItem;
