import { __experimentalUseNavigator as useNavigator } from '@wordpress/components';
import { useContext } from '@wordpress/element';

import EditorContext from '../context/EditorContext';
import { getElementsFromSchema } from '../../utils/block-helpers';
import getThemeOption from '../../utils/get-theme-option';

import NavButton from './NavButton';

/**
 * Elements tab menu component
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Selector to locate these elements in the schema
 */
const Elements = ( { selector } ) => {
	const { schema, themeConfig } = useContext( EditorContext );
	const { goTo, location } = useNavigator();

	const stylesSelector = `styles.${ selector }`;
	const themeJSONElements = getThemeOption( stylesSelector, themeConfig );

	if ( ! themeJSONElements ) {
		return null;
	}

	const schemaElements = getElementsFromSchema( schema );
	// filter out any elements not present in theme.json
	const elements = schemaElements?.filter( ( element ) =>
		Object.keys( themeJSONElements )?.includes( element )
	);

	return (
		<section>
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
