import { __ } from '@wordpress/i18n';
import { globe, blockDefault, html } from '@wordpress/icons';

import NavListItem from './NavListItem';
import NavBlockList from './NavBlockList';
import NavElementList from './NavElementList';

/**
 * Breadcrumbs
 */
const Navigator = () => {
	return (
		<ul className="themer-nav-list">
			<NavListItem
				icon={ globe }
				label={ __( 'Site', 'themer' ) }
				route="/"
			/>
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

export default Navigator;
