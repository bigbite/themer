import ThemerComponent from './ThemerComponent';

/**
 * Wrapper for app
 */
const ComponentWrapper = ( { editorSettings } ) => (
	<>
		<div className="App">
			<ThemerComponent editorSettings={ editorSettings } />
		</div>
	</>
);
export default ComponentWrapper;
