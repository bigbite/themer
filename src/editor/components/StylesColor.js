import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { ColorPalette } from '@wordpress/components';

import { varToHex, hexToVar } from '../../utils/block-helpers';
import getThemeOption from '../../utils/get-theme-option';
import EditorContext from '../context/EditorContext';
import StylesContext from '../context/StylesContext';

/**
 * Reusable color control style component
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 */
const Color = ( { selector } ) => {
	const { themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const colorStyles = getThemeOption( selector, themeConfig ) || {};
	const themePalette = getThemeOption(
		'settings.color.palette.theme',
		themeConfig
	);

	const onChange = ( newValue, key ) => {
		let config = structuredClone( themeConfig );
		config = set(
			config,
			[ selector, key ].join( '.' ),
			hexToVar( newValue, themePalette )
		);
		setUserConfig( config );
	};

	const allPalettes = [ 'background', 'text' ].map( ( key ) => (
		<div key={ key } className="themer--blocks-item-component--column">
			<span className="themer--blocks-item-component--styles--label">
				{ key }
			</span>
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
			<span className="themer--blocks-item-component--styles--title">
				{ __( 'Color', 'themer' ) }
			</span>
			<div className="themer--blocks-item-component--columns themer--blocks-item-component--columns-2">
				{ allPalettes }
			</div>
		</>
	);
};

export default Color;
