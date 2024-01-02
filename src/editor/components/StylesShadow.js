import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import {
	ToggleControl,
	__experimentalUnitControl as UnitControl,
	ColorPalette,
} from '@wordpress/components';

import { varToHex, hexToVar, isCssLengthUnit } from '../../utils/block-helpers';
import getThemeOption from '../../utils/get-theme-option';
import EditorContext from '../context/EditorContext';
import StylesContext from '../context/StylesContext';

// Specify the units we support as common units like % are not supported by box shadow, but you could still put that in theme.json.
const ALLOWED_UNITS = [ 'px', 'em', 'rem', 'vh', 'vw' ];
// Units available to select in the unit control components.
const unitControlUnits = ALLOWED_UNITS.map( ( unit ) => {
	return {
		value: unit,
		label: unit,
		default: 0,
	};
} );

/**
 * Parses the value stored in theme.json to a valid value that uses our supported units.
 * If a user first entered a bad value, e.g. 6ls, then we will default to 6px.
 * If a user supplies no value, we will default to 0px.
 *
 * @param {string} value - Value to be parsed.
 * @return {string} - The parsed value.
 */
const parseUserValue = ( value ) => {
	if ( value === '' || ! isCssLengthUnit( value ) ) {
		return '0px';
	}
	return ALLOWED_UNITS.some( ( unit ) => value.includes( unit ) )
		? value
		: `${ value.replace( /[^0-9]/g, '' ) }px`;
};

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
	const COLOR_FALLBACK = hexToVar( '#000000', themePalette );

	// Handles one of the values in the box shadow property changing.
	const handleNewValue = ( newVal, key ) => {
		if ( key === 'inset' ) {
			shadowObj[ key ] = newVal ? 'inset' : '';
		} else if ( key === 'color' ) {
			shadowObj[ key ] = newVal?.trim() || COLOR_FALLBACK;
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

	const shadowUnitValues = shadowStyles
		?.split( ' ' )
		.filter( isCssLengthUnit );
	// Remove 'inset' and each of the unit values from the string to get the color
	let shadowColor = shadowStyles?.replace( 'inset', '' ).trim();
	shadowUnitValues?.forEach( ( value ) => {
		shadowColor = shadowColor.replace( value, '' ).trim();
	} );
	const shadowObj = {
		inset: shadowStyles?.includes( 'inset' ) ? 'inset' : '',
		offsetX: parseUserValue( shadowUnitValues?.[ 0 ] ),
		offsetY: parseUserValue( shadowUnitValues?.[ 1 ] ),
		blurRadius: parseUserValue( shadowUnitValues?.[ 2 ] )?.startsWith( '-' )
			? parseUserValue( shadowUnitValues?.[ 2 ] )?.substring( 1 )
			: parseUserValue( shadowUnitValues?.[ 2 ] ),
		spreadRadius: parseUserValue( shadowUnitValues?.[ 3 ] ),
		color: shadowColor || COLOR_FALLBACK,
	};

	return (
		<>
			<span className="themer--blocks-item-component--styles--title">
				{ __( 'Shadow', 'themer' ) }
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
					value={ shadowObj?.blurRadius }
					onChange={ ( newVal ) =>
						handleNewValue( newVal, 'blurRadius' )
					}
					units={ unitControlUnits }
					min={ 0 }
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
					{ __( 'Shadow Color', 'themer' ) }
				</span>
				<ColorPalette
					colors={ themePalette }
					onChange={ ( newVal ) =>
						handleNewValue(
							hexToVar( newVal, themePalette ),
							'color'
						)
					}
					value={ varToHex( shadowObj.color, themePalette ) }
				/>
			</span>
		</>
	);
};

export default Shadow;
