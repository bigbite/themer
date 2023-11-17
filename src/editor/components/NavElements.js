import {
	__experimentalNavigatorProvider as NavigatorProvider,
	__experimentalNavigatorScreen as NavigatorScreen,
	__experimentalUseNavigator as useNavigator,
	__experimentalHeading as Heading,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import NavigatorBreadcrumbs from './NavigatorBreadcrumbs';
import ElementList from './ElementList';
import ElementItem from './ElementItem';
import PseudoItem from './PseudoItem';

/**
 * Elements navigational component
 */
const NavElements = () => {
	const { params } = useNavigator();

	return (
		<>
			<NavigatorBreadcrumbs />

			{ /* element list screen */ }
			<NavigatorScreen path="/elements">
				<Heading level={ 4 }>{ __( 'Elements', 'themer' ) }</Heading>
				<p>
					{ __(
						'Customise the appearance of specific HTML elements for the whole site.',
						'themer'
					) }
				</p>
				<ElementList selector="elements" />
			</NavigatorScreen>

			{ /* element screen */ }
			<NavigatorScreen path="/elements/:elementName">
				<ElementItem
					name={ params.elementName }
					selector={ `elements.${ params.elementName }` }
				/>
			</NavigatorScreen>

			{ /* psuedo screen */ }
			<NavigatorScreen path="/elements/:elementName/:pseudoName">
				<PseudoItem
					name={ params.pseudoName }
					selector={ `elements.${ params.elementName }.${ params.pseudoName }` }
				/>
			</NavigatorScreen>
		</>
	);
};

const NavElementsWithProvider = () => {
	return (
		<NavigatorProvider initialPath="/elements">
			<NavElements />
		</NavigatorProvider>
	);
};

export default NavElementsWithProvider;
