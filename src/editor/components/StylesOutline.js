import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import {
	SelectControl,
	__experimentalUnitControl as UnitControl,
	ColorPalette,
} from '@wordpress/components';

import getThemeOption from '../../utils/get-theme-option';
import EditorContext from '../context/EditorContext';
import StylesContext from '../context/StylesContext';
import { hexToVar, varToHex } from '../../utils/block-helpers';

/**
 * Reusable outline control style component
 */
const Outline = ( { selector } ) => {
	const { themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const outlineStyles = getThemeOption( selector, themeConfig );
	const themePalette = getThemeOption(
		'settings.color.palette.theme',
		themeConfig
	);
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

	const LENGTH_REG = /^[0-9]+[a-zA-Z%]+?$/;
	const isCssUnit = ( value ) => value === '0' || LENGTH_REG.test( value );

	/**
	 * Parses the value stored in theme.json to a valid value that uses our supported units.
	 * If a user first entered a bad value, e.g. 6ls, then we will default to 6px.
	 * If a user supplies no value, we will default to 0px.
	 *
	 * @param {string} value - Value to be parsed.
	 * @return {string} - The parsed value.
	 */
	const parseUserValue = ( value ) => {
		if ( ! value || ! isCssUnit( value ) ) {
			return '0px';
		}
		return ALLOWED_UNITS.some( ( unit ) => value.includes( unit ) )
			? value
			: `${ value.replace( /[^0-9]/g, '' ) }px`;
	};

	/**
	 * Updates a property value in the outline object.
	 *
	 * @param {string} value - New value for the property.
	 * @param {string} key - The property to be updated.
	 */
	const handleNewValue = ( value, key ) => {
		outlineStyles[ key ] = value;
		let config = structuredClone( themeConfig );
		config = set( config, selector, outlineStyles );
		setUserConfig( config );
	};

	return (
		<>
			<span className="themer--blocks-item-component--styles--title">
				{ __( 'Outline', 'themer' ) }
			</span>
			<span>
				{ __(
					'Manage the default outline of different global elements on the site.',
					'themer'
				) }
			</span>
			<UnitControl
				label={ __( 'Width', 'themer' ) }
				value={ parseUserValue( outlineStyles?.width ) }
				onChange={ ( newValue ) => handleNewValue( newValue, 'width' ) }
				units={ unitControlUnits }
			/>
			<SelectControl
				label={ __( 'Style', 'themer' ) }
				value={ outlineStyles?.style }
				onChange={ ( newValue ) => handleNewValue( newValue, 'style' ) }
				options={ [
					{
						disabled: true,
						label: 'Select an Option',
						value: '',
					},
					{
						label: 'None',
						value: 'none',
					},
					{
						label: 'Dotted',
						value: 'dotted',
					},
					{
						label: 'Dashed',
						value: 'dashed',
					},
					{
						label: 'Solid',
						value: 'solid',
					},
					{
						label: 'Double',
						value: 'double',
					},
					{
						label: 'Groove',
						value: 'groove',
					},
					{
						label: 'Ridge',
						value: 'ridge',
					},
					{
						label: 'Inset',
						value: 'inset',
					},
					{
						label: 'Outset',
						value: 'outset',
					},
				] }
			/>
			<UnitControl
				label={ __( 'Offset', 'themer' ) }
				value={ parseUserValue( outlineStyles?.offset ) }
				onChange={ ( newValue ) =>
					handleNewValue( newValue, 'offset' )
				}
				units={ unitControlUnits }
			/>
			<span>
				<span className="themer--blocks-item-component--styles--label">
					{ __( 'Color', 'themer' ) }
				</span>
				<ColorPalette
					colors={ themePalette }
					onChange={ ( newValue ) =>
						handleNewValue(
							hexToVar( newValue, themePalette ),
							'color'
						)
					}
					value={ varToHex( outlineStyles?.color, themePalette ) }
				/>
			</span>
		</>
	);
};

export default Outline;
