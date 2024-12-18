import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext, useState, useEffect } from '@wordpress/element';
import { TextareaControl } from '@wordpress/components';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import StylesContext from '../../context/StylesContext';

/**
 * Component for border settings
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 */
const SettingsCustom = ( { selector } ) => {
	const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig );

	const [ isValidObject, setIsValidObject ] = useState( '' );
	const [ custom, setCustom ] = useState( '' );

	const saveButton = document.querySelector( '.themer-save-button' );

	useEffect( () => {
		setCustom( JSON.stringify( value ) );
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

	function isJSONString( str ) {
		if ( ! str ) {
			return;
		}
		try {
			JSON.parse( str );
		} catch ( e ) {
			saveButton.setAttribute( 'disabled', '' );
			return false;
		}
		saveButton.removeAttribute( 'disabled' );
		handleNewValue( JSON.parse( str ) );
		return true;
	}

	useEffect( () => {
		if ( ! custom ) {
			return setIsValidObject( '' );
		}
		// eslint-disable-next-line no-unused-expressions
		isJSONString( custom )
			? setIsValidObject( 'Valid object' )
			: setIsValidObject( 'Invalid object' );
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ custom ] );

	const handleNewValue = ( newValue ) => {
		let config = structuredClone( userConfig );
		config = set( config, selector, newValue );
		setUserConfig( config );
	};

	return (
		<>
			<span className="themer--styles__item__title">
				{ __( 'Custom Settings Object', 'themer' ) }
			</span>
			<span>
				<TextareaControl
					value={ custom }
					onChange={ ( val ) => setCustom( val ) }
				/>
				{ isValidObject }
			</span>
		</>
	);
};

export default SettingsCustom;
