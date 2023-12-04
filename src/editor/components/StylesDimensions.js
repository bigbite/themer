import { useContext } from '@wordpress/element';
import { set } from 'lodash';
import {
	SelectControl,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import getThemeOption from '../../utils/get-theme-option';
import EditorContext from '../context/EditorContext';
import StylesContext from '../context/StylesContext';
import { isCssLengthUnit } from '../../utils/block-helpers';

const SELECT_OPTIONS = [
	{
		disabled: true,
		label: __( 'Select an Option', 'themer' ),
		value: '',
	},
	{ label: __( 'Absolute Value', 'themer' ), value: 'unit' },
	{ label: __( 'Fit Content', 'themer' ), value: 'fit-content' },
	{ label: __( 'Min Content', 'themer' ), value: 'min-content' },
	{ label: __( 'Max Content', 'themer' ), value: 'max-content' },
];

// Determines the value of the type dropdown from the minHeight value.
const parseTypeValue = ( minHeight ) => {
	if ( minHeight.includes( 'fit-content' ) ) {
		return 'fit-content';
	}
	if ( isCssLengthUnit( minHeight ) ) {
		return 'unit';
	}
	if ( minHeight === 'min-content' || minHeight === 'max-content' ) {
		return minHeight;
	}
	return '';
};

// Determines the unit value from the minHeight value.
const parseUnitValue = ( minHeight, typeValue ) => {
	if ( isCssLengthUnit( minHeight ) ) {
		return minHeight;
	}
	if ( typeValue === 'fit-content' ) {
		return minHeight
			.replace( 'fit-content(', '' )
			.replace( ')', '' )
			.trim();
	}
	return '0px';
};

/**
 * Reusable dimensions control style component
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 */
const Dimensions = ( { selector } ) => {
	const { themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const dimensionsStyles = getThemeOption( selector, themeConfig );
	const { minHeight } = dimensionsStyles;
	const typeValue = parseTypeValue( minHeight.trim() );
	const unitValue = parseUnitValue( minHeight.trim(), typeValue );

	// Updates a property value in the outline object.
	const handleNewValue = ( value ) => {
		dimensionsStyles.minHeight = value;
		let config = structuredClone( themeConfig );
		config = set( config, selector, dimensionsStyles );
		setUserConfig( config );
	};

	// Handle the value of the type dropdown changing.
	const handleTypeChange = ( value ) => {
		switch ( value ) {
			case 'unit':
				handleNewValue( unitValue );
				break;
			case 'fit-content':
				handleNewValue( `fit-content(${ unitValue })` );
				break;
			default:
				handleNewValue( value );
				break;
		}
	};

	// Handle the value of the unit input changing.
	const handleUnitChange = ( value ) => {
		const parsedValue = value === '' ? '0px' : value;
		if ( typeValue === 'fit-content' ) {
			handleNewValue( `fit-content(${ parsedValue })` );
		} else if ( typeValue === 'unit' ) {
			handleNewValue( parsedValue );
		}
	};

	return (
		<>
			<span className="themer--blocks-item-component--styles--title">
				{ __( 'Dimensions', 'themer' ) }
			</span>
			<span>
				{ __(
					'Manage the default dimensions of different global elements on the site.',
					'themer'
				) }
			</span>
			<span className="themer--blocks-item-component--styles--label">
				{ __( 'Min Height', 'themer' ) }
			</span>
			<div className="themer--blocks-item-component--columns themer--blocks-item-component--columns-2">
				<SelectControl
					label={ __( 'Type', 'themer' ) }
					options={ SELECT_OPTIONS }
					value={ typeValue }
					onChange={ handleTypeChange }
				/>
				<UnitControl
					label={ __( 'Value', 'themer' ) }
					value={ unitValue }
					onChange={ handleUnitChange }
					disabled={
						typeValue !== 'fit-content' && typeValue !== 'unit'
					}
				/>
			</div>
		</>
	);
};

export default Dimensions;
