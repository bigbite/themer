import apiFetch, { APIFetchOptions } from '@wordpress/api-fetch';
import { useEffect, useState } from '@wordpress/element';
import { debounce } from 'lodash';

/**
 * Debounces an API fetch call and returns the response
 *
 * @param {*} initialState - initial state, returned if the api call fails
 * @param {APIFetchOptions} args - api fetch options
 * @param {*} value - value to check for changes
 * @param {*} delay - debounce delay
 * @returns {*} API response
 */
const useDebouncedApiFetch = ( initialState, args, value, delay = 1000 ) => {
	const [ state, setState ] = useState( initialState );

	useEffect( () => {
		const controller = new AbortController();

		const updatePreviewCss = async () => {
			try {
				const res = await apiFetch( {
					signal: controller.signal,
					...args,
				} );
				if ( res ) {
					setState( res );
				}
			} catch ( err ) {
				if ( err.name !== 'AbortError' ) {
					// eslint-disable-next-line no-console - allow logging error to console
					console.error( err );
				}
			}
		};

		debounce( updatePreviewCss, delay )();

		return () => {
			// abort any pending API calls on unmount/re-render
			controller.abort();
		};
	}, [ value, setState ] );

	return state;
};

export default useDebouncedApiFetch;
