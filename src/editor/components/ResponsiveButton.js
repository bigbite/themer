import {
	DropdownMenu,
	MenuGroup,
	MenuItemsChoice,
} from '@wordpress/components';
import { desktop, tablet, mobile } from '@wordpress/icons';
import { useContext } from '@wordpress/element';

import EditorContext from '../context/EditorContext';

const options = [
	{
		label: 'Desktop',
		value: 'desktop',
	},
	{
		label: 'Tablet',
		value: 'tablet',
	},
	{
		label: 'Mobile',
		value: 'mobile',
	},
];

/**
 * button to handle responsive preview options
 *
 */
const ResponsiveButton = () => {
	const { previewSize, setPreviewSize, previewMode } =
		useContext( EditorContext );
	/**
	 * Updates icon depending on chosen screen size
	 */
	const handleIcon = () => {
		switch ( previewSize ) {
			case 'desktop':
				return desktop;
			case 'tablet':
				return tablet;
			case 'mobile':
				return mobile;
			default:
				return desktop;
		}
	};

	return (
		<DropdownMenu
			icon={ handleIcon }
			label="Select a size"
			toggleProps={ { disabled: previewMode === 'code' } }
		>
			{ () => (
				<MenuGroup>
					<MenuItemsChoice
						choices={ options }
						value={ previewSize }
						onSelect={ ( size ) => {
							setPreviewSize( size );
						} }
					/>
				</MenuGroup>
			) }
		</DropdownMenu>
	);
};

export default ResponsiveButton;
