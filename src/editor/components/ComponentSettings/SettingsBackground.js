import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import StylesContext from '../../context/StylesContext';

/**
 * Component for background settings
 *
 * @param {Object} props             Component props
 * @param {string} props.selector    Property target selector
 * @param {string} props.description Property description
 */
const BackgroundSettings = ( { selector, description } ) => {
	const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig ) || {};

	const handleNewValue = ( newValue, key ) => {
		let config = structuredClone( userConfig );
		config = set( config, [ selector, key ].join( '.' ), newValue );
		setUserConfig( config );
	};

	return (
		<>
			{ description && (
				<p className="themer--settings__item__description">
					{ description }
				</p>
			) }
			<ToggleControl
				label={ __( 'Background Image', 'themer' ) }
				checked={ value?.backgroundImage }
				onChange={ ( newValue ) =>
					handleNewValue( newValue, 'backgroundImage' )
				}
			/>
			<ToggleControl
				label={ __( 'Background Size', 'themer' ) }
				checked={ value?.backgroundSize }
				onChange={ ( newValue ) =>
					handleNewValue( newValue, 'backgroundSize' )
				}
			/>
		</>
	);
};

export default BackgroundSettings;
