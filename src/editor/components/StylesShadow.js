import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import {
	ToggleControl,
	__experimentalUnitControl as UnitControl, // eslint-disable-line @wordpress/no-unsafe-wp-apis
	ColorPalette,
} from '@wordpress/components';

import { isHex } from '../../utils/block-helpers';
import getThemeOption from '../../utils/get-theme-option';
import EditorContext from '../context/EditorContext';
import StylesContext from '../context/StylesContext';

/**
 * Reusable shadow control style component
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 */
const Shadow = ( { selector } ) => {
	const { themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const shadowStyles = getThemeOption( selector, themeConfig );
	const themePalette = getThemeOption(
		'settings.color.palette.theme',
		themeConfig
	);

	// Regex to match a number followed by a unit, e.g. 6px, 6em, 6rem, 6vh, 6vw.
	const LENGTH_REG = /^[0-9]+[a-zA-Z%]+?$/;
	const isCssUnit = ( value ) =>
		( value === '0' || LENGTH_REG.test( value ) ) && value !== 'inset';

	// Specify the units we support as common units like % are not supported by box shadow, but you could still put that in theme.json.
	const ALLOWED_UNITS = [ 'px', 'em', 'rem', 'vh', 'vw' ];

	/**
	 * Parses the value first stored in theme.json to a valid value that uses our supported units.
	 * If a user first entered a bad value, e.g. 6ls, then we will default to 6px.
	 * If a user supplies no value, we will default to 0px.
	 *
	 * @param {string} value - One of the box shadow values e.g. 6px
	 * @return {string} - The parsed value.
	 */
	const parseUserValue = ( value ) => {
		if ( ! value ) {
			return '0px';
		}
		return ALLOWED_UNITS.some( ( unit ) => value.includes( unit ) )
			? value
			: `${ value.replace( /[^0-9]/g, '' ) }px`;
	};

	// Handles one of the values in the box shadow property changing.
	const handleNewValue = ( newVal, key ) => {
		if ( key === 'inset' ) {
			shadowObj[ key ] = newVal ? 'inset' : '';
		} else {
			shadowObj[ key ] = newVal?.trim() || '0px';
		}
		const updatedShadowStyles = Object.values( shadowObj )
			.join( ' ' )
			.trim();

		let config = structuredClone( themeConfig );
		config = set( config, selector, updatedShadowStyles );
		setUserConfig( config );
	};

	const shadowStylesArray = shadowStyles.split( ' ' );
	const shadowValues = shadowStylesArray.filter( isCssUnit ).slice( 0, 4 );
	const shadowColor = shadowStylesArray.find(
		( value ) => ! isCssUnit( value ) && value !== 'inset'
	);
	const shadowObj = {
		inset: shadowStyles.includes( 'inset' ) ? 'inset' : '',
		offsetX: parseUserValue( shadowValues?.[ 0 ] ),
		offsetY: parseUserValue( shadowValues?.[ 1 ] ),
		blurRadius: parseUserValue( shadowValues?.[ 2 ] ),
		spreadRadius: parseUserValue( shadowValues?.[ 3 ] ),
		color: shadowColor && isHex( shadowColor ) ? shadowColor : '#000000',
	};

	// Units available to select in the unit control components.
	const unitControlUnits = ALLOWED_UNITS.map( ( unit ) => {
		return {
			value: unit,
			label: unit,
			default: 0,
		};
	} );

	return (
		<>
			<span className="themer--blocks-item-component--styles--title">
				{ __( 'Shadow', 'themer' ) }
			</span>
			<span>
				{ __(
					'Manage the default box shadow of different global elements on the site.',
					'themer'
				) }
			</span>
			<ToggleControl
				checked={ shadowObj.inset === 'inset' }
				label={ __( 'Inset', 'themer' ) }
				onChange={ ( newVal ) => handleNewValue( newVal, 'inset' ) }
				style={ { marginBottom: '0px' } }
			/>
			<div className="themer--blocks-item-component--columns themer--blocks-item-component--columns-2">
				<UnitControl
					label={ __( 'Offset X', 'themer' ) }
					value={ shadowObj.offsetX }
					onChange={ ( newVal ) =>
						handleNewValue( newVal, 'offsetX' )
					}
					units={ unitControlUnits }
				/>
				<UnitControl
					label={ __( 'Offset Y', 'themer' ) }
					value={ shadowObj.offsetY }
					onChange={ ( newVal ) =>
						handleNewValue( newVal, 'offsetY' )
					}
					units={ unitControlUnits }
				/>
				<UnitControl
					label={ __( 'Blur radius', 'themer' ) }
					value={ shadowObj.blurRadius }
					onChange={ ( newVal ) =>
						handleNewValue( newVal, 'blurRadius' )
					}
					units={ unitControlUnits }
				/>
				<UnitControl
					label={ __( 'Spread radius', 'themer' ) }
					value={ shadowObj.spreadRadius }
					onChange={ ( newVal ) =>
						handleNewValue( newVal, 'spreadRadius' )
					}
					units={ unitControlUnits }
				/>
			</div>
			<span>
				<span className="themer--blocks-item-component--styles--label">
					{ __( 'Shadow Colour', 'themer' ) }
				</span>
				<ColorPalette
					colors={ themePalette }
					onChange={ ( newVal ) => handleNewValue( newVal, 'color' ) }
					value={ shadowObj.color }
				/>
			</span>
		</>
	);
};

export default Shadow;
