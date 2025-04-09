import {
	Button,
	MenuGroup,
	MenuItem,
	DropdownMenu,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { trash, moreVertical } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import ButtonExport from './ButtonExport';
import TemplateManagerModal from './TemplateManagerModal';
import TemplatePartManagerModal from './TemplatePartManagerModal';
import SavedPatternsModal from './SavedPatternsModal';

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
	const [ isTemplateManagerOpen, setIsTemplateManagerOpen ] =
		useState( false );
	const [ isTemplatePartManagerOpen, setIsTemplatePartManagerOpen ] =
		useState( false );
	const [ isSavedPatternsOpen, setIsSavedPatternsOpen ] = useState( false );
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
				{ ( { onClose } ) => (
					<>
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
						<MenuGroup
							label={ __( 'Management', 'themer' ) }
							className="themer-more-menu"
						>
							<MenuItem
								role="menuitem"
								onClick={ () => {
									onClose();
									setIsTemplateManagerOpen( true );
								} }
								info={ __(
									'Manage block templates.',
									'themer'
								) }
							>
								{ __( 'Block Templates', 'themer' ) }
							</MenuItem>
							<MenuItem
								role="menuitem"
								onClick={ () => {
									onClose();
									setIsTemplatePartManagerOpen( true );
								} }
								info={ __(
									'Manage template parts.',
									'themer'
								) }
							>
								{ __( 'Template Parts', 'themer' ) }
							</MenuItem>
							<MenuItem
								role="menuitem"
								onClick={ () => {
									onClose();
									setIsSavedPatternsOpen( true );
								} }
								info={ __(
									'Manage saved patterns.',
									'themer'
								) }
							>
								{ __( 'Saved Patterns', 'themer' ) }
							</MenuItem>
						</MenuGroup>
					</>
				) }
			</DropdownMenu>
			<TemplateManagerModal
				isOpen={ isTemplateManagerOpen }
				setIsOpen={ setIsTemplateManagerOpen }
			/>
			<TemplatePartManagerModal
				isOpen={ isTemplatePartManagerOpen }
				setIsOpen={ setIsTemplatePartManagerOpen }
			/>
			<SavedPatternsModal
				isOpen={ isSavedPatternsOpen }
				setIsOpen={ setIsSavedPatternsOpen }
			/>
		</div>
	);
};

export default Topbar;
