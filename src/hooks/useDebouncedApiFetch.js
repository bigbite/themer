import apiFetch from '@wordpress/api-fetch';
import { APIFetchOptions } from '@wordpress/api-fetch/src/types';
import { useEffect, useState } from '@wordpress/element';
import { debounce } from 'lodash';

/**
 * Debounces an API fetch call and returns the response
 *
 * @param {*}               initialState - initial state, returned if the api call fails
 * @param {APIFetchOptions} args         - api fetch options
 * @param {*}               value        - value to check for changes
 * @param {*}               delay        - debounce delay
 * @return {*} API response
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
					// eslint-disable-next-line no-console
					console.error( err );
				}
			}
		};

		debounce( updatePreviewCss, delay )();

		return () => {
			// abort any pending API calls on unmount/re-render
			controller.abort();
		};
	}, [ value, setState, args, delay ] );

	return state;
};

export default useDebouncedApiFetch;
