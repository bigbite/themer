import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { download } from '@wordpress/icons';
import { MenuGroup, MenuItem } from '@wordpress/components';

/**
 * Renders the tools menu
 */
const ToolsMoreMenuGroup = () => {
	const isExportSupported =
		window.isSecureContext && 'showSaveFilePicker' in window;

	/**
	 * Fetch theme JSON object
	 */
	const fetchThemeJSON = async () => {
		try {
			const response = await apiFetch( { path: '/themer/v1/export' } );
			saveThemeJSON( JSON.stringify( response, null, '\t' ) );
		} catch ( error ) {
			console.error( error ); // eslint-disable-line no-console -- Output of caught error
		}
	};

	/**
	 * Save JSON blob to a file
	 *
	 * @param {Object} data theme.json data
	 */
	const saveThemeJSON = async ( data ) => {
		const blob = new Blob( [ data ], { type: 'application/json' } ); // eslint-disable-line no-undef -- Blob available in browser environment

		const handle = await window.showSaveFilePicker( {
			suggestedName: 'theme.json',
		} );
		const stream = await handle.createWritable();

		await stream.write( blob );
		await stream.close();
	};

	if ( ! isExportSupported ) {
		return;
	}

	return (
		<MenuGroup label={ __( 'Tools', 'themer' ) }>
			<MenuItem
				icon={ download }
				onClick={ fetchThemeJSON }
				info={ __( 'Export the updated theme.json file', 'themer' ) }
			>
				{ __( 'Export', 'themer' ) }
			</MenuItem>
		</MenuGroup>
	);
};

export default ToolsMoreMenuGroup;
