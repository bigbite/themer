import { __experimentalHeading as Heading, Icon } from '@wordpress/components';
import { useContext } from '@wordpress/element';

import Styles from './Styles';
import Elements from './Elements';

import EditorContext from '../context/EditorContext';
import { getCoreBlocksFromSchema } from '../../utils/block-helpers';

/**
 * Individual block item
 *
 * @param {Object} props          Component props
 * @param {string} props.name     Block name
 * @param {string} props.selector Selector to locate this block in the schema
 */
const BlocksItem = ( { name, selector } ) => {
	const { schema } = useContext( EditorContext );

	if ( ! name ) {
		return;
	}

	const schemaBlocks = getCoreBlocksFromSchema( schema );

	const block = schemaBlocks?.find(
		( schemaBlock ) => schemaBlock.name === name
	);

	const stylesSelector = `styles.${ selector }`;
	const elementsSelector = `${ selector }.elements`;

	return (
		<>
			<span className="themer--icon-heading">
				<Icon icon={ block.icon.src } size={ 24 } />
				<Heading level={ 4 }>{ block.title }</Heading>
			</span>
			<p>{ block.description }</p>
			<Styles selector={ stylesSelector } />
			<Elements selector={ elementsSelector } />
		</>
	);
};

export default BlocksItem;
