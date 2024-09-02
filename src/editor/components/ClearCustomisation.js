/**
 * Component for clearing customisation for individual style components
 */
import { set, get } from 'lodash';
import { __ } from '@wordpress/i18n';
import { DropdownMenu, MenuItem, MenuGroup } from '@wordpress/components';
import { menu, trash } from '@wordpress/icons';
import { useContext, useMemo } from '@wordpress/element';
import StylesContext from '../context/StylesContext';

const ClearCustomisation = ( { selector, userConfig, themeConfigVal } ) => {
	const { setUserConfig } = useContext( StylesContext );

	// Check if the current value is different from the default value to determine if button should be enabled.
	const flagCustomisation = useMemo( () => {
		const currentVal = get( userConfig, selector );
		if ( currentVal !== themeConfigVal ) {
			return true;
		}
	}, [ selector, userConfig, themeConfigVal ] );

	// Sets userConfig for selector to themeConfig value.
	const onClick = () => {
		let config = structuredClone( userConfig );
		config = set( config, selector, themeConfigVal );
		setUserConfig( config );
	};
	return (
		<DropdownMenu
			icon={ menu }
			label={ __( 'Select an option', 'themer' ) }
		>
			{ () => (
				<>
					<MenuGroup>
						<MenuItem
							icon={ trash }
							onClick={ onClick }
							disabled={ ! flagCustomisation }
						>
							{ __( 'Remove customisation', 'themer' ) }
						</MenuItem>
					</MenuGroup>
				</>
			) }
		</DropdownMenu>
	);
};
export default ClearCustomisation;
