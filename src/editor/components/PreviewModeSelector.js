import {
	DropdownMenu,
	MenuGroup,
	MenuItemsChoice,
} from '@wordpress/components';
import { useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { moreVertical } from '@wordpress/icons';

import EditorContext from '../context/EditorContext';

const options = [
	{
		label: 'Visual',
		value: 'visual',
	},
	{
		label: 'Code',
		value: 'code',
	},
];

/**
 * Dropdown menu to select the preview mode
 */
const PreviewModeSelector = () => {
	const { previewMode, setPreviewMode } = useContext( EditorContext );

	return (
		<DropdownMenu
			icon={ moreVertical }
			label={ __( 'Select a mode', 'themer' ) }
		>
			{ () => (
				<MenuGroup>
					<MenuItemsChoice
						choices={ options }
						value={ previewMode }
						onSelect={ ( mode ) => {
							setPreviewMode( mode );
						} }
					/>
				</MenuGroup>
			) }
		</DropdownMenu>
	);
};

export default PreviewModeSelector;
