import { __experimentalHeading as Heading } from '@wordpress/components';

import Styles from './Styles';

/**
 * Individual pseudo item
 *
 * @param {Object} props      Component props
 * @param {string} props.name Pseudo name
 * @param {string} props.selector Selector to locate this pseudo in the schema
 */
const PseudoItem = ( { name, selector } ) => {
	if ( ! name ) {
		return;
	}

	const stylesSelector = `styles.${ selector }`;

	return (
		<>
			<Heading level={ 4 }>Pseudo Styles</Heading>
			<Styles selector={ stylesSelector } />
		</>
	);
};

export default PseudoItem;
