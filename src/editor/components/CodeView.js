/**
 * Renders code view component.
 *
 * @param {Object} props             Component props
 * @param {Object} props.themeConfig Current theme configuration
 */
const CodeView = ( { themeConfig } ) => {
	return (
		<pre>
			<code>{ JSON.stringify( themeConfig, null, 2 ) }</code>
		</pre>
	);
};

export default CodeView;
