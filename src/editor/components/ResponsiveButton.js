import {
	DropdownMenu,
	MenuGroup,
	MenuItemsChoice,
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { desktop, tablet, mobile } from '@wordpress/icons';
import { useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import EditorContext from '../context/EditorContext';

const OPTIONS = [
	{
		label: 'Desktop',
		value: 'Desktop',
	},
	{
		label: 'Tablet',
		value: 'Tablet',
	},
	{
		label: 'Mobile',
		value: 'Mobile',
	},
];

const ICON_MAP = {
	Desktop: desktop,
	Tablet: tablet,
	Mobile: mobile,
};

/**
 * button to handle responsive preview options
 *
 */
const ResponsiveButton = () => {
	const { previewMode } = useContext( EditorContext );

	const deviceType = useSelect(
		( select ) => select( editorStore ).getDeviceType(),
		[]
	);

	const { setDeviceType } = useDispatch( editorStore );

	return (
		<DropdownMenu
			icon={ ICON_MAP[ deviceType ] }
			label={ __( 'Select a size', 'themer' ) }
			toggleProps={ { disabled: previewMode === 'code' } }
		>
			{ () => (
				<MenuGroup>
					<MenuItemsChoice
						choices={ OPTIONS }
						value={ deviceType }
						onSelect={ ( size ) => {
							setDeviceType( size );
						} }
					/>
				</MenuGroup>
			) }
		</DropdownMenu>
	);
};

export default ResponsiveButton;
