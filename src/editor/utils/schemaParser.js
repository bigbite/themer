const fetchSchema = async () => {
	const response = await fetch(
		'https://raw.githubusercontent.com/WordPress/gutenberg/trunk/schemas/json/theme.json'
	);
	console.log( 'response', response );
	const schema = await response.json();
	return schema;
};

const generateComponents = ( themejson, settings ) => {
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

	return <div>UI</div>;
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

const composeUI = async () => {
	console.log( 'compose UI' );

	//let ui = '';

	// const uiMarkup = fetchSchema().then( ( schema ) => {
	// 	//console.log( 'schema', schema );

	// 	const settings = Object.entries( schema.definitions )
	// 		.filter( ( [ settingsKey ] ) =>
	// 			/^settingsProperties(?!Complete)\w+$/.test( settingsKey )
	// 		)
	// 		.reduce(
	// 			( settingsObj, [ , { properties } ] ) =>
	// 				Object.assign( settingsObj, properties ),
	// 			{}
	// 		);

	// 	//ui = generateComponents( schema, settings );

	// 	const SchemaUI = () => (
	// 		<>
	// 			<div className="SchemaUI">wergewr</div>
	// 		</>
	// 	);

	// 	console.log( 'ui' );
	// 	return SchemaUI();
	// } );

	//console.log( 'return everything now', uiMarkup );

	const SchemaUI = () => (
		<>
			<div className="SchemaUI">wergewr</div>
		</>
	);

	//console.log( 'return UI' );

	return SchemaUI;

	//data.then( console.log() );
};

export default composeUI;
