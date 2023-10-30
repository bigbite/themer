import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { MenuItem } from '@wordpress/components';
import { download } from '@wordpress/icons';

/**
 * Renders the button to export theme.json
 */
const ButtonExport = () => {
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
		<MenuItem
			onClick={ fetchThemeJSON }
			icon={ download }
			role="menuitem"
			info={ __( 'Export the updated theme.json file.', 'themer' ) }
		>
			{ __( 'Export theme.json', 'themer' ) }
		</MenuItem>
	);
};

export default ButtonExport;
