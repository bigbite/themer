import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { ColorPalette } from '@wordpress/components';

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

	const onChange = ( newValue, key ) => {
		let config = structuredClone( userConfig );
		config = set(
			config,
			[ selector, key ].join( '.' ),
			hexToVar( newValue, themePalette ) ?? ''
		);
		setUserConfig( config );
	};

	const colorPalettes = [ 'background', 'text' ].map( ( key ) => (
		<div key={ key } className="themer--styles__item__column">
			<span className="themer--styles__item__label">{ key }</span>
			<ColorPalette
				label={ __( 'Color', 'themer' ) }
				colors={ themePalette }
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
			<div className="themer--styles__item__columns themer--styles__item__columns--2">
				{ colorPalettes }
				<Gradient selector={ `${ selector }.gradient` } />
			</div>
		</>
	);
};

export default Color;
