import {
	__experimentalHeading as Heading,
	__experimentalUseNavigator as useNavigator,
} from '@wordpress/components';
import { useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import EditorContext from '../context/EditorContext';
import { getElementsFromSchema } from '../../utils/block-helpers';
import getThemeOption from '../../utils/get-theme-option';

import NavButton from './NavButton';

/**
 * Elements tab menu component
 *
 * @param {Object} props      Component props
 * @param {string} props.selector Selector to locate these elements in the schema
 */
const Elements = ( { selector } ) => {
	const { schema, themeConfig } = useContext( EditorContext );
	const { goTo, location } = useNavigator();

	const stylesSelector = `styles.${ selector }`;
	const schemaElements = getElementsFromSchema( schema );
	const themeJSONElements = getThemeOption( stylesSelector, themeConfig );

	if ( ! themeJSONElements ) {
		return null;
	}

	// filter out any elements not present in theme.json
	const elements = schemaElements?.filter( ( element ) =>
		Object.keys( themeJSONElements )?.includes( element )
	);

	return (
		<section>
			<Heading level={ 4 }>Elements</Heading>
			<ul>
				{ elements.map( ( element ) => {
					const route = location.path + '/' + element;
					return (
						<li key={ route }>
							<NavButton onClick={ () => goTo( route ) }>
								{ element }
							</NavButton>
						</li>
					);
				} ) }
			</ul>
		</section>
	);
};

export default Elements;
