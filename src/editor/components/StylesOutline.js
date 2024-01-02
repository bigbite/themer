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
import { hexToVar, varToHex, isCssLengthUnit } from '../../utils/block-helpers';

// Specify the units we support as common units like % are not supported by outline, but you could still put that in theme.json.
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
 * Reusable outline control style component
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 */
const Outline = ( { selector } ) => {
	const { themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const outlineStyles = getThemeOption( selector, themeConfig );
	const themePalette = getThemeOption(
		'settings.color.palette.theme',
		themeConfig
	);

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

	// Updates a property value in the outline object.
	const handleNewValue = ( value, key ) => {
		const newOutlineStyles = { ...outlineStyles, [ key ]: value };
		let config = structuredClone( themeConfig );
		config = set( config, selector, newOutlineStyles );
		setUserConfig( config );
	};

	return (
		<>
			<span className="themer--blocks-item-component--styles--title">
				{ __( 'Outline', 'themer' ) }
			</span>
			<UnitControl
				label={ __( 'Width', 'themer' ) }
				value={ parseUserValue( outlineStyles?.width ) }
				onChange={ ( newValue ) => handleNewValue( newValue, 'width' ) }
				units={ unitControlUnits }
				min={ 0 }
			/>
			<SelectControl
				label={ __( 'Style', 'themer' ) }
				value={ outlineStyles?.style || '' }
				onChange={ ( newValue ) => handleNewValue( newValue, 'style' ) }
				options={ [
					{
						disabled: true,
						label: __( 'Select an option', 'themer' ),
						value: '',
					},
					{
						label: __( 'None', 'themer' ),
						value: 'none',
					},
					{
						label: __( 'Dotted', 'themer' ),
						value: 'dotted',
					},
					{
						label: __( 'Dashed', 'themer' ),
						value: 'dashed',
					},
					{
						label: __( 'Solid', 'themer' ),
						value: 'solid',
					},
					{
						label: __( 'Double', 'themer' ),
						value: 'double',
					},
					{
						label: __( 'Groove', 'themer' ),
						value: 'groove',
					},
					{
						label: __( 'Ridge', 'themer' ),
						value: 'ridge',
					},
					{
						label: __( 'Inset', 'themer' ),
						value: 'inset',
					},
					{
						label: __( 'Outset', 'themer' ),
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
