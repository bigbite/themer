import { useEffect, useState } from '@wordpress/element';
import Editor from '@monaco-editor/react';

/**
 * Renders code view component.
 *
 * @param {Object}   props              Component props
 * @param {Object}   props.themeConfig  Current theme configuration
 * @param {Function} props.onDataChange Callback to handle data change
 */
const CodeView = ( { themeConfig, onDataChange } ) => {
	const [ data, setData ] = useState(
		JSON.stringify( themeConfig, null, 2 )
	);

	useEffect( () => {
		const newData = JSON.stringify( themeConfig, null, 2 );
		setData( newData );
		onDataChange( newData );
	}, [ themeConfig, onDataChange ] );

	return (
		<Editor
			height="90vh"
			defaultLanguage="json"
			value={ data }
			options={ { readOnly: false } }
			onChange={ ( value ) => {
				setData( value );
				onDataChange( value );
			} }
		/>
	);
};

export default CodeView;
