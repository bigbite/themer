import {
	__experimentalNavigatorProvider as NavigatorProvider,
	__experimentalNavigatorScreen as NavigatorScreen,
	__experimentalUseNavigator as useNavigator,
	__experimentalHeading as Heading,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import NavigatorBreadcrumbs from './NavigatorBreadcrumbs';
import BlockList from './BlockList';
import BlockItem from './BlockItem';
import ElementItem from './ElementItem';
import PseudoItem from './PseudoItem';

/**
 * Blocks navigational component
 */
const NavBlocks = () => {
	const { params } = useNavigator();

	return (
		<>
			<NavigatorBreadcrumbs />

			{ /* block list screen */ }
			<NavigatorScreen path="/blocks">
				<Heading level={ 4 }>{ __( 'Blocks', 'themer' ) }</Heading>
				<p>
					{ __(
						'Customise the appearance of specific blocks for the whole site.',
						'themer'
					) }
				</p>
				<BlockList />
			</NavigatorScreen>

			{ /* block screen */ }
			<NavigatorScreen path="/blocks/:blockName">
				<BlockItem
					name={ params.blockName }
					selector={ `blocks.${ params.blockName }` }
				/>
			</NavigatorScreen>

			{ /* element screen */ }
			<NavigatorScreen path="/blocks/:blockName/:elementName">
				<ElementItem
					name={ params.elementName }
					selector={ `blocks.${ params.blockName }.elements.${ params.elementName }` }
				/>
			</NavigatorScreen>

			{ /* psuedo screen */ }
			<NavigatorScreen path="/blocks/:blockName/:elementName/:pseudoName">
				<PseudoItem
					name={ params.pseudoName }
					selector={ `blocks.${ params.blockName }.elements.${ params.elementName }.${ params.pseudoName }` }
				/>
			</NavigatorScreen>
		</>
	);
};

const NavBlocksWithProvider = () => {
	return (
		<NavigatorProvider initialPath="/blocks">
			<NavBlocks />
		</NavigatorProvider>
	);
};

export default NavBlocksWithProvider;
