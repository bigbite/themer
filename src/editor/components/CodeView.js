import { __ } from '@wordpress/i18n';
/**
 * Renders code view component.
 *
 * @param {Object} props             Component props
 * @param {Object} props.themeConfig Current theme configuration
 */
const CodeView = ( { themeConfig } ) => {
	return (
		<>
			<span className="themer--styles__item__title">
				{ __( 'Settings', 'themer' ) }
			</span>
			<pre>{ JSON.stringify( themeConfig.settings, null, 2 ) }</pre>
			<span className="themer--styles__item__title">
				{ __( 'Styles', 'themer' ) }
			</span>
			<pre>{ JSON.stringify( themeConfig.styles, null, 2 ) }</pre>
		</>
	);
};

export default CodeView;
