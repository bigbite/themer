import { __ } from '@wordpress/i18n';
import { globe, blockDefault, html } from '@wordpress/icons';

import NavListItem from './NavListItem';
import BlockList from './BlockList';
import ElementList from './ElementList';

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
				<BlockList />
			</NavListItem>
			<NavListItem icon={ html } label={ __( 'Elements', 'themer' ) }>
				<ElementList selector="elements" route="/elements" />
			</NavListItem>
		</ul>
	);
};

export default Navigator;
