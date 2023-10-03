import {
	DropdownMenu,
	MenuGroup,
	MenuItemsChoice,
} from '@wordpress/components';
import { desktop, tablet, mobile } from '@wordpress/icons';

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
 * @param {Object}   props
 * @param {Function} props.setPreviewSize
 * @param {string}   props.previewSize
 */

const ResponsiveButton = ( { setPreviewSize, previewSize } ) => {
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
		<div className="themer-responsive-top">
			<DropdownMenu icon={ handleIcon } label="Select a size">
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
