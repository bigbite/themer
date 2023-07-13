import ThemerComponent from './fields/ThemerComponent';
import SchemaWrapper from './SchemaWrapper';

/**
 * Wrapper for app
 */
const ComponentWrapper = () => (
	<>
		<div className="App">
			<SchemaWrapper />
			<ThemerComponent />
		</div>
	</>
);
export default ComponentWrapper;
