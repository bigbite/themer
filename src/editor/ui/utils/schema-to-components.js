import { styleComponentMap } from './component-map';

/**
 * Maps style properties to React components
 *
 * @param {object} components Theme to React component map
 * @param {object} properties Theme style allowed properties
 */
const generateStyleComponents = ( components, properties ) => {
	if ( ! properties ) {
		return;
	}

	for ( const property in properties ) {
		const style = styleComponentMap?.[ property ];

		if ( ! style ) {
			continue;
		}

		components.styles[ property ] = style;
	}
};

/**
 * Generates React components for parts of the theme.json schema
 *
 * @returns {object} Mapped components
 */
const schemaComponents = async () => {
	const url =
		'https://raw.githubusercontent.com/WordPress/gutenberg/trunk/schemas/json/theme.json';

	try {
		const response = await fetch( url );
		const components = { settings: {}, styles: {} };

		if ( ! response?.ok ) {
			throw new Error(
				`${ response?.status } ${ response?.statusText }`
			);
		}

		const schema = await response.json();

		generateStyleComponents(
			components,
			schema?.definitions?.stylesProperties?.properties
		);

		return components;
	} catch ( error ) {
		console.error( error ); // eslint-disable-line no-console -- Output of caught error
	}
};

export default schemaComponents;
