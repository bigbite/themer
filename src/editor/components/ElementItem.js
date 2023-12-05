import { __experimentalHeading as Heading } from '@wordpress/components';

import Styles from './Styles';

/**
 * Renders the element styles visible in the styles panel
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
			<span className="themer-styles-heading">
				<Heading level={ 4 }>{ name }</Heading>
			</span>
			<Styles selector={ stylesSelector } />
		</>
	);
};

export default ElementItem;
