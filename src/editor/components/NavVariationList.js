import { useContext } from '@wordpress/element';
import { handle } from '@wordpress/icons';

import EditorContext from '../context/EditorContext';
import getThemeOption from '../../utils/get-theme-option';

import NavListItem from './NavListItem';

/**
 * Nav Variation list
 *
 * Renders the variations list in the navigation panel
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Selector to locate these variations in the schema
 * @param {string} props.route    Base route to use when navigating to child elements
 */
const NavVariationList = ( { selector, route } ) => {
	const { themeConfig } = useContext( EditorContext );

	// get styles for all variations at this selector
	const themeVarStyles =
		getThemeOption( `styles.${ selector }`, themeConfig ) || {};

	const varStyles = Object.entries( themeVarStyles ).map( ( tab ) => {
		return {
			name: tab[ 0 ],
		};
	} );

	return (
		<>
			<ul className="themer-nav-list">
				{ varStyles.map( ( variation ) => {
					const varRoute = `${ route }/${ variation.name }`;
					return (
						<NavListItem
							key={ varRoute }
							label={ variation.name }
							route={ varRoute }
							icon={ handle }
						/>
					);
				} ) }
			</ul>
		</>
	);
};

export default NavVariationList;
