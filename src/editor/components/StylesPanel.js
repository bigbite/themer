import {
	__experimentalNavigatorScreen as NavigatorScreen,
	__experimentalUseNavigator as useNavigator,
} from '@wordpress/components';

import NavigatorBreadcrumbs from './NavigatorBreadcrumbs';
import Site from './Site';
import BlockItem from './BlockItem';
import ElementItem from './ElementItem';
import PseudoItem from './PseudoItem';

/**
 * Styles Panel
 *
 * Renders a specific screen depending on the current path
 *
 */
const StylesPanel = () => {
	const { params } = useNavigator();

	return (
		<>
			<NavigatorBreadcrumbs />

			{ /* site screen */ }
			<NavigatorScreen path="/">
				<Site />
			</NavigatorScreen>

			{ /* block screen */ }
			<NavigatorScreen path="/blocks/:blockName">
				<BlockItem
					name={ params.blockName }
					selector={ `blocks.${ params.blockName }` }
				/>
			</NavigatorScreen>

			{ /* block/element screen */ }
			<NavigatorScreen path="/blocks/:blockName/elements/:elementName">
				<ElementItem
					name={ params.elementName }
					selector={ `blocks.${ params.blockName }.elements.${ params.elementName }` }
				/>
			</NavigatorScreen>

			{ /* block/element/psuedo screen */ }
			<NavigatorScreen path="/blocks/:blockName/elements/:elementName/:pseudoName">
				<PseudoItem
					name={ params.pseudoName }
					selector={ `blocks.${ params.blockName }.elements.${ params.elementName }.${ params.pseudoName }` }
				/>
			</NavigatorScreen>

			{ /* block/variation screen */ }
			<NavigatorScreen path="/blocks/:blockName/variations/:varName">
				<PseudoItem
					name={ params.varName }
					selector={ `blocks.${ params.blockName }.variations.${ params.varName }` }
				/>
			</NavigatorScreen>

			{ /* element screen */ }
			<NavigatorScreen path="/elements/:elementName">
				<ElementItem
					name={ params.elementName }
					selector={ `elements.${ params.elementName }` }
				/>
			</NavigatorScreen>

			{ /* element/psuedo screen */ }
			<NavigatorScreen path="/elements/:elementName/:pseudoName">
				<PseudoItem
					name={ params.pseudoName }
					selector={ `elements.${ params.elementName }.${ params.pseudoName }` }
				/>
			</NavigatorScreen>
		</>
	);
};

export default StylesPanel;
