import { useEffect, useState } from '@wordpress/element';

const SchemaWrapper = () => {
	const [ schema, setSchema ] = useState( '' );
	const [ ui, setUi ] = useState( '' );

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

	const generateStylesUI = ( title, data ) => {
		console.log( 'Generate UI for', title );
		console.log( 'data for ', title, data );

		return <div>{ title }</div>;
	};

	const generateSettingsUI = ( title, data ) => {
		console.log( 'Generate UI for', title );
		console.log( 'data for ', title, data );
		return <div>{ title }</div>;
	};

	const generateComponents = ( themejson, settings ) => {
		const settingSections = keys( settings );

		//console.log( 'theme schema', themejson );
		//console.log( 'Settings sections', settingSections );
		console.log( 'ALL POSSIBLE SETTINGS UI HERE' );
		let settingsUI = [];
		settingSections.forEach( ( section ) => {
			settingsUI.push(
				generateSettingsUI( section, settings[ section ] )
			);
		} );

		const styles = themejson.definitions.stylesProperties.properties;
		const styleSections = keys( styles );

		console.log( 'ALL POSSIBLE STYLES UI HERE' );
		let stylesUI = [];
		styleSections.forEach( ( section ) => {
			stylesUI.push( generateStylesUI( section, styles[ section ] ) );
		} );

		return (
			<div>
				<h2>Settings</h2>
				{ settingsUI }
				<h2>Styles</h2>
				{ stylesUI }
			</div>
		);
	};

	useEffect( () => {
		const url =
			'https://raw.githubusercontent.com/WordPress/gutenberg/trunk/schemas/json/theme.json';

		const fetchData = async () => {
			try {
				const response = await fetch( url );
				const json = await response.json();
				console.log( json );
				setSchema( json );
				const settings = await Object.entries( json.definitions )
					.filter( ( [ settingsKey ] ) =>
						/^settingsProperties(?!Complete)\w+$/.test(
							settingsKey
						)
					)
					.reduce(
						( settingsObj, [ , { properties } ] ) =>
							Object.assign( settingsObj, properties ),
						{}
					);

				const ui = await generateComponents( json, settings );
				setUi( ui );
			} catch ( error ) {
				console.log( 'error', error );
			}
		};

		fetchData();
	}, [] );

	return <div>{ ui }</div>;
};

export default SchemaWrapper;
