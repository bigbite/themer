import { useContext } from '@wordpress/element';

import EditorContext from '../context/EditorContext';
import { getElementsFromSchema } from '../../utils/block-helpers';
import getThemeOption from '../../utils/get-theme-option';

import NavListItem from './NavListItem';
import NavPseudoList from './NavPseudoList';

/**
 * Nav Element list
 *
 * Renders the element list in the navigation panel
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Selector to locate these elements in the schema
 * @param {string} props.route    Base route to use when navigating to child elements
 */
const NavElementList = ( { selector, route } ) => {
	const { schema, themeConfig } = useContext( EditorContext );

	// get all valid elements from the schema
	const schemaElements = getElementsFromSchema( schema );

	// sort the elements by name
	const orderedSchema = schemaElements.sort( ( a, b ) =>
		a.name.localeCompare( b.name )
	);

	// get styles for all elements at this selector
	const themeElementStyles =
		getThemeOption( `styles.${ selector }`, themeConfig ) || {};

	return (
		<section>
			<ul className="themer-nav-list">
				{ orderedSchema.map( ( element ) => {
					// get all styles for this element
					const elementStyles =
						themeElementStyles[ element.name ] || {};

					// check if this element has any styles that aren't pseudos
					const hasElementStyles =
						Object.keys( elementStyles ).filter(
							( key ) => ! key.startsWith( ':' )
						).length > 0;

					const elementRoute = `${ route }/${ element.name }`;
					const elementSelector = `${ selector }.${ element.name }`;

					return (
						<NavListItem
							key={ elementSelector }
							icon={ element.icon }
							label={ element.name }
							route={ elementRoute }
							hasStyles={ hasElementStyles }
						>
							<NavPseudoList
								selector={ elementSelector }
								route={ elementRoute }
							/>
						</NavListItem>
					);
				} ) }
			</ul>
		</section>
	);
};

export default NavElementList;
