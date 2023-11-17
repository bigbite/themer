import { __experimentalHeading as Heading } from '@wordpress/components';

import Styles from './Styles';
import PseudoList from './PseudoList';

/**
 * Individual element item
 *
 * @param {Object} props          Component props
 * @param {string} props.name     Element name
 * @param {string} props.selector Selector to locate this element in the schema
 */
const ElementItem = ( { name, selector } ) => {
	if ( ! name ) {
		return;
	}

	const stylesSelector = `styles.${ selector }`;

	return (
		<>
			<Heading level={ 4 }>Element Styles</Heading>
			<Styles selector={ stylesSelector } />
			<PseudoList selector={ stylesSelector } />
		</>
	);
};

export default ElementItem;
