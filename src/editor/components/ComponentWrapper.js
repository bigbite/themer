import ThemerComponent from './fields/ThemerComponent';
import composeUI from '../utils/schemaParser';

const SchemaUI = composeUI();

/**
 * Wrapper for app
 */
const ComponentWrapper = () => (
	<>
		<div className="App">
			<SchemaUI />
			<ThemerComponent />
		</div>
	</>
);
export default ComponentWrapper;
