import { set, debounce } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext, useState, useEffect } from '@wordpress/element';
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
	const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const colorStyles = getThemeOption( selector, themeConfig ) || {};
	const themePalette = getThemeOption(
		'settings.color.palette.theme',
		themeConfig
	);

	/**
	 * Function to handle the color palette changes
	 *
	 * @param {string} newValue The value of the setting
	 * @param {string} key      The key of the setting
	 */
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
	 * Define color variables, used to avoid jumping color picker when ContrastChecker display toggles
	 */
	const [ textColor, setTextColor ] = useState( colorStyles.text );
	const [ backgroundColor, setBackgroundColor ] = useState(
		colorStyles.background
	);

	useEffect( () => {
		/**
		 * Hook to debounce the assignment of colors
		 * This approach addresses an interaction issue with custom color palettes
		 */
		const debouncedUpdateColors = debounce( () => {
			setTextColor( colorStyles.text );
			setBackgroundColor( colorStyles.background );
		}, 150 );
		debouncedUpdateColors();

		return () => {
			debouncedUpdateColors.cancel();
		};
	}, [
		colorStyles.text,
		colorStyles.background,
		setTextColor,
		setBackgroundColor,
	] );

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
				textColor={ varToHex( textColor, themePalette ) }
				backgroundColor={ varToHex( backgroundColor, themePalette ) }
			/>
			<div className="themer--styles__item__columns themer--styles__item__columns--2">
				{ colorPalettes }
				<Gradient selector={ `${ selector }.gradient` } />
			</div>
		</>
	);
};

export default Color;
