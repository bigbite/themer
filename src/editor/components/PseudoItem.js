import { __experimentalHeading as Heading } from '@wordpress/components';

import Styles from './Styles';

/**
 * Renders the pseudo styles visible in the styles panel
 *
 * @param {Object} props          Component props
 * @param {string} props.name     Pseudo name
 * @param {string} props.selector Selector to locate this pseudo in the schema
 */
const PseudoItem = ( { name, selector } ) => {
	const stylesSelector = `styles.${ selector }`;

	return (
		<>
			<span className="themer-styles-heading">
				<Heading level={ 4 }>{ name.replace( ':', '' ) }</Heading>
			</span>
			<Styles selector={ stylesSelector } />
		</>
	);
};

export default PseudoItem;
