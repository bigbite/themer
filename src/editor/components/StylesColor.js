import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext, useState, useEffect, useRef } from '@wordpress/element';
import { ColorPalette } from '@wordpress/components';
import { ContrastChecker } from '@wordpress/block-editor';

import { varToHex, hexToVar } from '../../utils/block-helpers';
import getThemeOption from '../../utils/get-theme-option';
import EditorContext from '../context/EditorContext';
import StylesContext from '../context/StylesContext';
import Gradient from './StylesGradient';

/**
 * Reusable color control style component
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 */
const Color = ( { selector } ) => {
	const containerRef = useRef( null );
	const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const colorStyles = getThemeOption( selector, themeConfig ) || {};
	const themePalette = getThemeOption(
		'settings.color.palette.theme',
		themeConfig
	);

	const onChange = ( newValue, key ) => {
		let config = structuredClone( userConfig );
		config = set(
			config,
			[ selector, key ].join( '.' ),
			hexToVar( newValue, themePalette ) ?? ''
		);
		setUserConfig( config );
	};

	/**
	 * Define mouse state and related functions
	 */
	const [ isMouseDown, setIsMouseDown ] = useState( false );
	const handleMouseDown = () => setIsMouseDown( true );
	const handleMouseUp = () => setIsMouseDown( false );

	/**
	 * Define colour variables, used to avoid jumping colour picker when ContrastChecker display toggles
	 */
	const [ textColour, setTextColour ] = useState( colorStyles.text );
	const [ backgroundColour, setBackgroundColour ] = useState(
		colorStyles.background
	);

	/**
	 * When the values are changed, ensure the mouse buttons have been released before updating
	 */
	useEffect( () => {
		if ( ! isMouseDown ) {
			setTextColour( colorStyles.text );
			setBackgroundColour( colorStyles.background );
		}
	}, [ isMouseDown, colorStyles.text, colorStyles.background ] );

	/**
	 * Add and remove the mouse event listeners
	 */
	useEffect( () => {
		const container = containerRef.current;

		if ( container ) {
			container.addEventListener( 'mousedown', handleMouseDown );
			container.addEventListener( 'mouseup', handleMouseUp );
		}

		return () => {
			if ( container ) {
				container.removeEventListener( 'mousedown', handleMouseDown );
				container.removeEventListener( 'mouseup', handleMouseUp );
			}
		};
	}, [] );

	const colorPalettes = [ 'background', 'text' ].map( ( key ) => (
		<div key={ key } className="themer--styles__item__column">
			<span className="themer--styles__item__label">{ key }</span>
			<ColorPalette
				colors={ themePalette }
				label={ __( 'Color', 'themer' ) }
				onChange={ ( value ) => onChange( value, key ) }
				value={ varToHex( colorStyles[ key ], themePalette ) }
			/>
		</div>
	) );

	return (
		<>
			<span className="themer--styles__item__title">
				{ __( 'Color', 'themer' ) }
			</span>
			<ContrastChecker
				textColor={ varToHex( textColour, themePalette ) }
				backgroundColor={ varToHex( backgroundColour, themePalette ) }
			/>
			<div
				ref={ containerRef }
				className="themer--styles__item__columns themer--styles__item__columns--2"
			>
				{ colorPalettes }
				<Gradient selector={ `${ selector }.gradient` } />
			</div>
		</>
	);
};

export default Color;
