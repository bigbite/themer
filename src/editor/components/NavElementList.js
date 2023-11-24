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

	// filter out any elements not present in the active theme styles
	const themeElements = getThemeOption( `styles.${ selector }`, themeConfig );
	const elements = schemaElements?.filter( ( element ) =>
		Object.keys( themeElements )?.includes( element.name )
	);

	return (
		<section>
			<ul className="themer-nav-list">
				{ elements.map( ( element ) => {
					const elementRoute = `${ route }/${ element.name }`;
					const elementSelector = `${ selector }.${ element.name }`;

					/**
					 * Check if this element has any pseudo styles
					 */
					const hasPseudoElements =
						Object.keys(
							themeElements[ element.name ] || {}
						).filter( ( key ) => key.startsWith( ':' ) ).length > 0;

					return (
						<NavListItem
							key={ elementSelector }
							icon={ element.icon }
							label={ element.name }
							route={ elementRoute }
						>
							{ hasPseudoElements && (
								<NavPseudoList
									selector={ elementSelector }
									route={ elementRoute }
								/>
							) }
						</NavListItem>
					);
				} ) }
			</ul>
		</section>
	);
};

export default NavElementList;
