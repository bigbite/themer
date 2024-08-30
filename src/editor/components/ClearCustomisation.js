/**
 * Component for clearing customisation for individual style components
 */
import { set, get } from 'lodash';

import { DropdownMenu, MenuItem, MenuGroup } from '@wordpress/components';
import { menu, trash } from '@wordpress/icons';
import { useContext } from '@wordpress/element';
import StylesContext from '../context/StylesContext';

const ClearCustomisation = ( { selector, userConfig, themeConfigVal } ) => {
	const { setUserConfig } = useContext( StylesContext );

	// Check if the current value is different from the default value to determine if button should be enabled.
	const flagCustomisation = () => {
		const currentVal = get( userConfig, selector );
		if ( currentVal !== themeConfigVal ) {
			return true;
		}
	};

	// Sets userConfig for selector to themeConfig value.
	const onClick = () => {
		let config = structuredClone( userConfig );
		config = set( config, selector, themeConfigVal );
		setUserConfig( config );
	};
	return (
		<DropdownMenu icon={ menu } label="Select an option">
			{ () => (
				<>
					<MenuGroup>
						<MenuItem
							icon={ trash }
							onClick={ onClick }
							disabled={ ! flagCustomisation() }
						>
							Remove customisation
						</MenuItem>
					</MenuGroup>
				</>
			) }
		</DropdownMenu>
	);
};
export default ClearCustomisation;
