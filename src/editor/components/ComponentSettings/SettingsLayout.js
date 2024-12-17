import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { __experimentalUnitControl as UnitControl } from '@wordpress/components';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import StylesContext from '../../context/StylesContext';

const SettingsLayout = ( { selector } ) => {
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
			<span className="themer--styles__item__title">
				{ __( 'Layout Settings', 'themer' ) }
				<UnitControl
					label={ __( 'Content Size', 'themer' ) }
					value={ value?.contentSize }
					onChange={ ( newValue ) =>
						handleNewValue( newValue, 'contentSize' )
					}
				/>
				<UnitControl
					label={ __( 'Wide Size', 'themer' ) }
					value={ value?.wideSize }
					onChange={ ( newValue ) =>
						handleNewValue( newValue, 'wideSize' )
					}
				/>
			</span>
		</>
	);
};

export default SettingsLayout;
