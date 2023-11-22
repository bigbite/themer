import { useContext } from '@wordpress/element';

import EditorContext from '../context/EditorContext';
import { getElementsFromSchema } from '../../utils/block-helpers';
import getThemeOption from '../../utils/get-theme-option';

import NavListItem from './NavListItem';
import PseudoList from './PseudoList';

/**
 * Navigational list of elements
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Selector to locate these elements in the schema
 * @param {string} props.route    Route to this element
 */
const ElementList = ( { selector, route } ) => {
	const { schema, themeConfig } = useContext( EditorContext );

	const stylesSelector = `styles.${ selector }`;
	const themeJSONElements = getThemeOption( stylesSelector, themeConfig );

	if ( ! themeJSONElements ) {
		return null;
	}

	const schemaElements = getElementsFromSchema( schema );
	// filter out any elements not present in theme.json
	const elements = schemaElements?.filter( ( element ) =>
		Object.keys( themeJSONElements )?.includes( element.name )
	);

	return (
		<section>
			<ul className="themer-nav-list">
				{ elements.map( ( element ) => {
					const elementRoute = `${ route }/${ element.name }`;
					const elementSelector = `${ selector }.${ element.name }`;

					/**
					 * Find out if this element has any pseudo elements by checking
					 * if any of the keys start with a colon
					 */
					const hasPseudoElements =
						Object.keys(
							themeJSONElements[ element.name ] || {}
						).filter( ( key ) => key.startsWith( ':' ) ).length > 0;

					return (
						<NavListItem
							key={ elementSelector }
							icon={ element.icon }
							label={ element.name }
							route={ elementRoute }
						>
							{ hasPseudoElements && (
								<PseudoList
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

export default ElementList;
