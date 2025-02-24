import { __ } from '@wordpress/i18n';
import { MenuItem } from '@wordpress/components';
import { useState } from '@wordpress/element';
import TemplateManagerModal from './TemplateManagerModal';

/**
 * Renders the button to export theme.json
 *
 * @param {Object} props
 * @param {Function} props.onClose Callback to close the modal
 */
const ButtonTemplateManager = ( { onClose } ) => {
	const [ isModalOpen, setIsModalOpen ] = useState( false );

	return (
		<>
			<MenuItem
				role="menuitem"
				onClick={ () => {
					// onClose();
					setIsModalOpen( true );
				} }
				info={ __( 'Manage block templates.', 'themer' ) }
			>
				{ __( 'Block Templates', 'themer' ) }
			</MenuItem>
			<TemplateManagerModal isModalOpen={ isModalOpen } />
		</>
	);
};

export default ButtonTemplateManager;
