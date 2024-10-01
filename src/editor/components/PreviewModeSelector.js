import {
	DropdownMenu,
	MenuGroup,
	MenuItemsChoice,
} from '@wordpress/components';
import { useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

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
 * button to handle responsive preview options
 *
 */
const ResponsiveButton = () => {
	const { previewMode, setPreviewMode } = useContext( EditorContext );

	return (
		<DropdownMenu label={ __( 'Select a mode', 'themer' ) }>
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

export default ResponsiveButton;
