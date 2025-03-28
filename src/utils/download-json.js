import apiFetch from '@wordpress/api-fetch';

import { saveJsonFile } from './save-file';

/**
 * Fetch theme JSON object
 */
const downloadThemeJSON = async () => {
	try {
		const response = await apiFetch( {
			path: '/themer/v1/export?include[]=block&include[]=theme&include[]=user',
		} );
		saveJsonFile( 'theme.json', JSON.stringify( response, null, '\t' ) );
	} catch ( error ) {
		console.error( error ); // eslint-disable-line no-console -- Output of caught error
	}
};

/**
 * Fetch theme JSON object
 */
const downloadCustomisations = async () => {
	try {
		const response = await apiFetch( {
			path: '/themer/v1/export?include[]=user',
		} );
		saveJsonFile( 'style.json', JSON.stringify( response, null, '\t' ) );
	} catch ( error ) {
		console.error( error ); // eslint-disable-line no-console -- Output of caught error
	}
};

export { downloadThemeJSON, downloadCustomisations };
