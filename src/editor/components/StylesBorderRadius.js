import { set } from 'lodash';
import { useContext } from '@wordpress/element';
import { __experimentalBorderRadiusControl as BorderRadiusControl } from '@wordpress/block-editor';

import getThemeOption from '../../utils/get-theme-option';
import EditorContext from '../context/EditorContext';
import StylesContext from '../context/StylesContext';

/**
 * Reusable border control style component
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 */
const BorderRadius = ( { selector } ) => {
	const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig );

	/**
	 * Handle changes to the border radius value
	 *
	 * @param {string} newValue The updated linked value
	 */
	const onChange = ( newValue ) => {
		let config = structuredClone( userConfig );
		config = set( config, selector, newValue );
		setUserConfig( config );
	};

	return (
		<>
			<BorderRadiusControl values={ value } onChange={ onChange } />
		</>
	);
};

export default BorderRadius;
