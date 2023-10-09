import { moreVertical } from '@wordpress/icons';
import { DropdownMenu } from '@wordpress/components';

/**
 * Menus
 */
import ToolsMoreMenuGroup from './ToolsMoreMenuGroup';

/**
 * Renders the more menu dropdown
 */
const MoreMenuDropdown = () => {
	return (
		<DropdownMenu icon={ moreVertical } label="">
			{ () => <ToolsMoreMenuGroup /> }
		</DropdownMenu>
	);
};

export default MoreMenuDropdown;
