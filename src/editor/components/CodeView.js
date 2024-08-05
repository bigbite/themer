import { useContext } from '@wordpress/element';

import EditorContext from '../context/EditorContext';
import getThemeOption from '../../utils/get-theme-option';

/**
 * Renders code view component.
 *
 * @param {Object} props             Component props
 * @param {Object} props.themeConfig Current theme configuration
 */
const CodeView = ( { themeConfig } ) => {
	const { propsMetaConfig } = useContext(EditorContext);

	/**
	 * 
	 * 
	 * @param {*} propsMetaConfig 
	 * @returns 
	 */
	const createReplacer = (fullPath) => (key, value) => {
		// calculate the full path to the current key.
		const newFullPath = `${fullPath}.${key}`;

		const propsMeta = getThemeOption(`${newFullPath}.themerPropsMeta`, propsMetaConfig) ?? {};
		const selectorId = propsMeta?.id ?? '';
		//const stringifiedThemeConfig = typeof value === 'object' ? JSON.stringify( value, createReplacer(newFullPath), 2 ) : value;
		const stringifiedThemeConfig = JSON.stringify(value);

		console.log(typeof(value));

		return value;

		//if ( selectorId ) {
			return `<span id="themer-styles-prop-id-${selectorId}" >${value}<span>`
		//}

		return stringifiedThemeConfig;
	}
	
	return (
		<pre>
			<code>{ JSON.stringify(themeConfig, createReplacer(''), 2 ) }</code>
		</pre>
	);
};

export default CodeView;
