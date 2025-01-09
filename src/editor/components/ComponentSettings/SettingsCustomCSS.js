import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext, useState, useEffect } from '@wordpress/element';
import { TextareaControl } from '@wordpress/components';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import StylesContext from '../../context/StylesContext';

/**
 * Component for custom settings
 *
 * @param {Object} props             Component props
 * @param {string} props.selector    Property target selector
 * @param {string} props.description Property description
 */
const SettingsCustom = ( { selector, description } ) => {
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
			{ description && (
				<p className="themer--settings__item__description">
					{ description }
				</p>
			) }
			<span>
				<TextareaControl
					help={
						<p>
							<a
								href={ encodeURI(
									'https://developer.wordpress.org/news/2023/08/adding-and-using-custom-settings-in-theme-json/'
								) }
								target="_blank"
								rel="noreferrer"
							>
								{ __( 'CSS syntax help', 'themer' ) }
							</a>
						</p>
					}
					value={ custom }
					onChange={ ( val ) => setCustom( val ) }
				/>
				{ isValidObject }
			</span>
		</>
	);
};

export default SettingsCustom;
