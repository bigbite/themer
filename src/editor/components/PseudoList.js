import { useContext } from '@wordpress/element';

import EditorContext from '../context/EditorContext';
import getThemeOption from '../../utils/get-theme-option';
import { getAllPseudos } from '../../utils/block-helpers';

import NavListItem from './NavListItem';

/**
 * Navigational list of pseudo elements
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Selector to locate these pseudos in the schema
 * @param {string} props.route    Route to this pseudo
 */
const PseudoList = ( { selector, route } ) => {
	const { themeConfig } = useContext( EditorContext );

	const stylesSelector = `styles.${ selector }`;
	const themeJSONParent = getThemeOption( stylesSelector, themeConfig );

	const allPseudos = getAllPseudos();
	const allPseudoNames = allPseudos.map( ( pseudo ) => pseudo.name );

	// get all the pseudos that are present on the parent in theme.json
	const themeJSONPseudos = Object.keys( themeJSONParent || {} )?.filter(
		( pseudo ) => allPseudoNames.includes( pseudo )
	);

	if ( 0 === themeJSONPseudos.length ) {
		return null;
	}

	// filter out any pseudos not present in theme.json
	const pseudos = allPseudos.filter( ( pseudo ) =>
		themeJSONPseudos.includes( pseudo.name )
	);

	return (
		<>
			<ul className="themer-nav-list">
				{ pseudos.map( ( pseudo ) => {
					const pseudoRoute = `${ route }/${ pseudo.name }`;

					return (
						<NavListItem
							key={ pseudoRoute }
							icon={ pseudo.icon }
							label={ pseudo.name.replace( ':', '' ) }
							route={ pseudoRoute }
						/>
					);
				} ) }
			</ul>
		</>
	);
};

export default PseudoList;
