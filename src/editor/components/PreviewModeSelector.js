import {
	DropdownMenu,
	MenuGroup,
	MenuItemsChoice,
} from '@wordpress/components';
import { useContext } from '@wordpress/element';

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
		<DropdownMenu label="Select a mode">
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
