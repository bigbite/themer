import { useContext } from '@wordpress/element';

import EditorContext from '../context/EditorContext';
import getThemeOption from '../../utils/get-theme-option';
import { getAllPseudos } from '../../utils/block-helpers';

import NavListItem from './NavListItem';

/**
 * Nav Pseudo list
 *
 * Renders the pseudo list in the navigation panel
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Selector to locate these pseudos in the schema
 * @param {string} props.route    Base route to use when navigating to child elements
 */
const NavPseudoList = ( { selector, route } ) => {
	const { themeConfig } = useContext( EditorContext );

	// get all valid pseudos
	const allPseudos = getAllPseudos();

	// get all active theme styles for the element
	const themeElement = getThemeOption( `styles.${ selector }`, themeConfig );

	// filter the element styles so we end up with only the pseudo styles
	const allPseudoNames = allPseudos.map( ( pseudo ) => pseudo.name );
	const themePseudos = Object.keys( themeElement || {} )?.filter(
		( pseudo ) => allPseudoNames.includes( pseudo )
	);

	// filter out any psuedos not present in the active theme styles
	const pseudos = allPseudos.filter( ( pseudo ) =>
		themePseudos.includes( pseudo.name )
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

export default NavPseudoList;
