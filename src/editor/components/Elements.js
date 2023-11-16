import {
	__experimentalUseNavigator as useNavigator,
	Button,
} from '@wordpress/components';
import { useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import EditorContext from '../context/EditorContext';
import { getElementsFromSchema } from '../../utils/block-helpers';
import getThemeOption from '../../utils/get-theme-option';

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
		<section className="themer--blocks-component">
			<ul>
				{ elements.map( ( element ) => {
					const route = location.path + '/' + element;
					return (
						<li>
							<Button onClick={ () => goTo( route ) }>
								{ element }
							</Button>
						</li>
					);
				} ) }
			</ul>
		</section>
	);
};

export default Elements;
