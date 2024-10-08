import {
	Button,
	MenuGroup,
	MenuItem,
	DropdownMenu,
} from '@wordpress/components';
import { trash, moreVertical } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import ButtonExport from './ButtonExport';

/**
 * Topbar component
 *
 * Used to save, reset, and perform other global actions in themer.
 *
 * @param {Object}   props
 * @param {boolean}  props.isDirty Whether the user has unsaved changes
 * @param {Function} props.onReset Callback to reset the user's changes
 * @param {Function} props.onSave  Callback to save the user's changes
 * @param {Function} props.onClear Callback to clear all customisations
 */
const Topbar = ( { isDirty, onReset, onSave, onClear } ) => {
	return (
		<div className="themer-topbar">
			<Button
				isSecondary
				onClick={ onReset }
				text={ __( 'Reset', 'themer' ) }
				disabled={ ! isDirty }
			/>
			<Button
				isPrimary
				onClick={ onSave }
				text={ __( 'Save', 'themer' ) }
				disabled={ ! isDirty }
			/>
			<DropdownMenu icon={ moreVertical }>
				{ () => (
					<MenuGroup
						label={ __( 'Tools', 'themer' ) }
						className="themer-more-menu"
					>
						<ButtonExport />
						<MenuItem
							role="menuitem"
							icon={ trash }
							info={ __(
								'Resets all customisations to your initial theme.json configuration.',
								'themer'
							) }
							onClick={ onClear }
							isDestructive
						>
							{ __( 'Clear all customisations', 'themer' ) }
						</MenuItem>
					</MenuGroup>
				) }
			</DropdownMenu>
		</div>
	);
};

export default Topbar;
