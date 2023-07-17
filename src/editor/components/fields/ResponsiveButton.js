import {
	DropdownMenu,
	MenuGroup,
	MenuItemsChoice,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { desktop, tablet, mobile } from '@wordpress/icons';

/**
 * button to handle responsive preview options
 *
 * @param {Object}   props
 * @param {Function} props.setPreviewSize
 * @param {string}   props.previewSize
 */

const ResponsiveButton = ( { setPreviewSize, previewSize } ) => {
	const [ icon, setIcon ] = useState( desktop );

	const options = [
		{
			label: 'Desktop',
			value: '768px',
		},
		{
			label: 'Tablet',
			value: '514px',
		},
		{
			label: 'Mobile',
			value: '384px',
		},
	];
	/**
	 * Updates icon depending on chosen screen size
	 *
	 * @param {string} val screen size.
	 */
	const handleIcon = ( val ) => {
		switch ( val ) {
			case '768px':
				setIcon( desktop );
				break;
			case '514px':
				setIcon( tablet );
				break;
			case '384px':
				setIcon( mobile );
				break;
			default:
				setIcon( desktop );
		}
	};

	return (
		<div className="themer-responsive-top">
			<DropdownMenu icon={ icon } label="Select a size">
				{ () => (
					<MenuGroup>
						<MenuItemsChoice
							choices={ options }
							value={ previewSize }
							onSelect={ ( size ) => {
								setPreviewSize( size );
								handleIcon( size );
							} }
						/>
					</MenuGroup>
				) }
			</DropdownMenu>
		</div>
	);
};

export default ResponsiveButton;
