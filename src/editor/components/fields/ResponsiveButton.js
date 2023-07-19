import {
	DropdownMenu,
	MenuGroup,
	MenuItemsChoice,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { desktop, tablet, mobile } from '@wordpress/icons';

/**
 * button to handle responsive preview options
 *
 * @param {Object}   props
 * @param {Function} props.setPreviewSize
 * @param {string}   props.previewSize
 */

const options = [
	{
		label: 'Desktop',
		value: desktop,
	},
	{
		label: 'Tablet',
		value: tablet,
	},
	{
		label: 'Mobile',
		value: mobile,
	},
];

const ResponsiveButton = ( { setPreviewSize, previewSize } ) => {
	const [ icon, setIcon ] = useState( desktop );
	/**
	 * Updates icon depending on chosen screen size
	 *
	 * @param {string} val screen size.
	 */
	useEffect( () => {
		setIcon( previewSize );
	}, [ previewSize ] );

	return (
		<div className="themer-responsive-top">
			<DropdownMenu
				icon={ previewSize ? icon : desktop }
				label="Select a size"
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
		</div>
	);
};

export default ResponsiveButton;
