import { __ } from '@wordpress/i18n';
import { MenuItem } from '@wordpress/components';
import { download } from '@wordpress/icons';

import {
	downloadThemeJSON,
	downloadCustomisations,
} from '../../utils/download-json';

/**
 * Renders the button to export theme.json
 */
const ButtonExport = () => {
	const isExportSupported =
		window.isSecureContext && 'showSaveFilePicker' in window;

	if ( ! isExportSupported ) {
		return;
	}

	return (
		<>
			<MenuItem
				onClick={ downloadThemeJSON }
				icon={ download }
				role="menuitem"
				info={ __(
					'Export a complete updated theme.json file.',
					'themer'
				) }
			>
				{ __( 'Export theme.json', 'themer' ) }
			</MenuItem>
			<MenuItem
				onClick={ downloadCustomisations }
				icon={ download }
				role="menuitem"
				info={ __( 'Export only your customisations.', 'themer' ) }
			>
				{ __( 'Export customisations', 'themer' ) }
			</MenuItem>
		</>
	);
};

export default ButtonExport;
