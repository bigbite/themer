import { __experimentalHeading as Heading, Icon } from '@wordpress/components';
import { useContext } from '@wordpress/element';

import Styles from './Styles';

import EditorContext from '../context/EditorContext';

import { getCoreBlocksFromSchema } from '../../utils/block-helpers';

import PreviewExampleButton from './PreviewExampleButton';

/**
 * Renders the block styles visible in the styles panel
 *
 * @param {Object} props          Component props
 * @param {string} props.name     Block name
 * @param {string} props.selector Selector to locate this block in the schema
 */
const BlockItem = ( { name, selector } ) => {
	const { schema, previewBlocks } = useContext( EditorContext );

	if ( ! name ) {
		return;
	}

	const schemaBlocks = getCoreBlocksFromSchema( schema );
	const block = schemaBlocks?.find(
		( schemaBlock ) => schemaBlock.name === name
	);

	const stylesSelector = `styles.${ selector }`;

	return (
		<>
			<span className="themer-styles-heading">
				<Icon icon={ block.icon.src } size={ 24 } />
				<Heading level={ 4 }>{ block.title }</Heading>
				<PreviewExampleButton />
			</span>
			<p>{ block.description }</p>
			<Styles selector={ stylesSelector } />
		</>
	);
};

export default BlockItem;
