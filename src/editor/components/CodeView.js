/**
 * Renders code view component.
 *
 * @param {Object} props             Component props
 * @param {Object} props.themeConfig Current theme configuration
 */
const CodeView = ( { themeConfig } ) => {
	return <pre>{ JSON.stringify( themeConfig, null, 2 ) }</pre>;
};

export default CodeView;
