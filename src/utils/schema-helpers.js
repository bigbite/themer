import { styleComponentMap } from './component-map';

/**
 * Maps style properties to React components
 *
 * @param {Object} properties Theme style allowed properties
 *
 * @return {Object} Mapped components
 */
export const generateStyleComponents = ( properties ) => {
	if ( ! properties ) {
		return {};
	}

	const components = {};

	for ( const property in properties ) {
		const style = styleComponentMap?.[ property ];

		if ( ! style ) {
			continue;
		}

		components[ property ] = style;
	}

	return components;
};

/**
 * Fetch theme.json schema data
 *
 * @return {Object} theme.json schema json
 */
const fetchSchema = async () => {
	let schema = {};
	const url =
		'https://raw.githubusercontent.com/WordPress/gutenberg/trunk/schemas/json/theme.json';

	try {
		const response = await fetch( url );

		if ( ! response?.ok ) {
			throw new Error(
				`${ response?.status } ${ response?.statusText }`
			);
		}

		schema = await response.json();
	} catch ( error ) {
		console.error( error ); // eslint-disable-line no-console -- Output of caught error
	}

	return schema ?? {};
};

export default fetchSchema;
