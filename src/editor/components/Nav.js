import { __ } from '@wordpress/i18n';
import { globe, blockDefault, html, settings } from '@wordpress/icons';

import NavListItem from './NavListItem';
import NavBlockList from './NavBlockList';
import NavElementList from './NavElementList';

/**
 * Nav
 *
 * Renders the main navigation panel, which displays a nested list of nav items
 */
const Nav = () => {
	return (
		<ul className="themer-nav-list">
			<li className="themer-nav-list__item themer-nav-list__item--hasSettings">
				<NavListItem
					icon={ globe }
					label={ __( 'Site', 'themer' ) }
					route="/"
					hasStyles
				/>
				<NavListItem icon={ settings } route="/settings" hasStyles />
			</li>
			<NavListItem
				icon={ blockDefault }
				label={ __( 'Blocks', 'themer' ) }
			>
				<NavBlockList />
			</NavListItem>
			<NavListItem icon={ html } label={ __( 'Elements', 'themer' ) }>
				<NavElementList selector="elements" route="/elements" />
			</NavListItem>
		</ul>
	);
};

export default Nav;
