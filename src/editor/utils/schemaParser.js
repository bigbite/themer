let themejson = '';

const fetchSchema = async () => {
	//console.log( 'fetch schema file' );

	const response = await fetch(
		'https://raw.githubusercontent.com/WordPress/gutenberg/trunk/schemas/json/theme.json'
	);
	const themejson = await response.json();

	// Settings
	const settings = Object.entries( themejson.definitions )
		.filter( ( [ settingsKey ] ) =>
			/^settingsProperties(?!Complete)\w+$/.test( settingsKey )
		)
		.reduce(
			( settingsObj, [ , { properties } ] ) =>
				Object.assign( settingsObj, properties ),
			{}
		);

	//console.log( 'settings', settings );

	const settingSections = keys( settings );

	//console.log( 'theme schema', themejson );
	//console.log( 'Settings sections', settingSections );
	console.log( 'ALL POSSIBLE SETTINGS UI HERE' );
	settingSections.forEach( ( section ) => {
		generateSettingsUI( section, settings[ section ] );
	} );

	const styles = themejson.definitions.stylesProperties.properties;
	const styleSections = keys( styles );

	console.log( 'ALL POSSIBLE STYLES UI HERE' );
	styleSections.forEach( ( section ) => {
		generateStylesUI( section, styles[ section ] );
	} );

	// console.log( 'styles', styleSections );
};

const generateStylesUI = ( title, data ) => {
	console.log( 'Generate UI for', title );
	console.log( 'data for ', title, data );
};

const generateSettingsUI = ( title, data ) => {
	console.log( 'Generate UI for', title );
	console.log( 'data for ', title, data );
};

/**
 * Convert object keys to an array.
 *
 * @param {*} maybeObject
 * @return {Array} Object keys
 */
const keys = ( maybeObject ) => {
	if ( typeof maybeObject !== 'object' ) {
		return [];
	}
	return Object.keys( maybeObject );
};

const getSettingsUI = () => {};

const composeUI = () => {
	console.log( 'composer UI' );

	const schema = fetchSchema();
};

export default composeUI;
