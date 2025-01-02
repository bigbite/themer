import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import StylesContext from '../../context/StylesContext';

/**
 * Component for site Dimension settings
 *
 * @param {Object} props             Component props
 * @param {string} props.selector    Property target selector
 * @param {string} props.description Property description
 */
const SettingsDimensions = ( { selector, description } ) => {
	const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig ) || [];

	const handleNewValue = ( newValue, key ) => {
		let config = structuredClone( userConfig );
		config = set( config, [ selector, key ].join( '.' ), newValue );
		setUserConfig( config );
	};

	return (
		<>
			<span className="themer--settings__item__title">
				{ __( 'Dimensions Settings', 'themer' ) }
			</span>
			{ description && (
				<p className="themer--settings__item__description">
					{ description }
				</p>
			) }
			<ToggleControl
				label={ __( 'Aspect Ratio', 'themer' ) }
				checked={ value?.aspectRatio }
				onChange={ ( val ) => {
					handleNewValue( val, 'aspectRatio' );
				} }
			/>
			<ToggleControl
				label={ __( 'Min Height', 'themer' ) }
				checked={ value?.minHeight }
				onChange={ ( val ) => {
					handleNewValue( val, 'minHeight' );
				} }
			/>
		</>
	);
};

export default SettingsDimensions;
