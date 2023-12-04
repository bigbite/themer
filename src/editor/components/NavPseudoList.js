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

	// get styles for all pseudos at this selector
	const themeElementStyles =
		getThemeOption( `styles.${ selector }`, themeConfig ) || {};

	return (
		<>
			<ul className="themer-nav-list">
				{ allPseudos.map( ( pseudo ) => {
					const pseudoStyles = themeElementStyles[ pseudo.name ];

					const pseudoRoute = `${ route }/${ pseudo.name }`;

					return (
						<NavListItem
							key={ pseudoRoute }
							icon={ pseudo.icon }
							label={ pseudo.name.replace( ':', '' ) }
							route={ pseudoRoute }
							hasStyles={ pseudoStyles }
						/>
					);
				} ) }
			</ul>
		</>
	);
};

export default NavPseudoList;
