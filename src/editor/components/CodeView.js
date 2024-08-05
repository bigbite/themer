import { useState, useEffect, useRef } from '@wordpress/element';
import Editor from '@monaco-editor/react';

const CodeView = ( { themeConfig, onDataChange } ) => {
	const [ editorInstance, setEditorInstance ] = useState( null );
	const [ data, setData ] = useState( '' );
	const isExternalChange = useRef( false );
	const lastChangePosition = useRef( null );

	const model = editorInstance ? editorInstance.getModel() : null;

	useEffect( () => {
		if ( ! editorInstance ) return;

		const newData = JSON.stringify( themeConfig, null, 2 );

		isExternalChange.current = true;
		if ( model ) {
			const fullRange = model.getFullModelRange();
			editorInstance.executeEdits( '', [
				{
					range: fullRange,
					text: newData,
					forceMoveMarkers: true,
				},
			] );

			// Find the line numbers that were changed
			const changes = editorInstance.getModel().getLinesContent();
			for ( let i = 0; i < changes.length; i++ ) {
				if ( changes[ i ] !== data.split( '\n' )[ i ] ) {
					lastChangePosition.current = i + 1;
					editorInstance.revealPositionInCenter( {
						lineNumber: i + 1,
						column: 1,
					} );
					break;
				}
			}
		}
		isExternalChange.current = false;

		onDataChange( newData );
	}, [ themeConfig, onDataChange, editorInstance, model, data ] );

	const handleEditorDidMount = ( editor, monaco ) => {
		setEditorInstance( editor );
		editor.onDidChangeModelContent( ( event ) => {
			if ( isExternalChange.current ) return;
			const lastChange = event.changes[ event.changes.length - 1 ];
			const position = lastChange.range.startLineNumber;
			lastChangePosition.current = position;
		} );
	};

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
			onMount={ handleEditorDidMount }
		/>
	);
};

export default CodeView;
