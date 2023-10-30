import { __ } from '@wordpress/i18n';
import { set } from 'lodash';
import { useContext } from '@wordpress/element';
import {
	__experimentalUnitControl as UnitControl, // eslint-disable-line @wordpress/no-unsafe-wp-apis
	__experimentalBoxControl as BoxControl, // eslint-disable-line @wordpress/no-unsafe-wp-apis
} from '@wordpress/components';

import {
	isCssLengthUnit,
	spacingToVar,
	varToSpacing,
} from '../../utils/block-helpers';
import getThemeOption from '../../utils/get-theme-option';
import EditorContext from '../context/EditorContext';
import StylesContext from '../context/StylesContext';

/**
 * Parses a user value from theme.json into a valid CSS value.
 *
 * @param {string}  value               - The value to be parsed.
 * @param {boolean} allowNegativeValues - Can the value be negative.
 * @param {Array}   themeSpacingSizes   - Array of spacing value objects.
 * @return {string} - The parsed value.
 */
const parseUserValue = (
	value,
	allowNegativeValues = true,
	themeSpacingSizes
) => {
	const convertedValue = varToSpacing( value, themeSpacingSizes );
	if ( convertedValue === '' || ! isCssLengthUnit( convertedValue ) ) {
		return '0px';
	}

	if ( ! allowNegativeValues && convertedValue.startsWith( '-' ) ) {
		return convertedValue.substring( 1 );
	}

	return convertedValue;
};

/**
 * Loops thorugh the axial spacing values and parses them into valid CSS values.
 *
 * @param {string} type              - The type of spacing to parse.
 * @param {Object} spacingStyles     - The existing spacing styles.
 * @param {Array}  themeSpacingSizes - Array of spacing value objects.
 * @return {Object} - The parsed spacing values object.
 */
const parseMarginPaddingValues = ( type, spacingStyles, themeSpacingSizes ) => {
	if ( ! spacingStyles?.[ type ] ) {
		return {};
	}
	const keys = Object.keys( spacingStyles?.[ type ] );

	keys.forEach( ( key ) => {
		const allowNegativeValues = type === 'margin' || false;
		const parsedValue = parseUserValue(
			spacingStyles?.[ type ]?.[ key ],
			allowNegativeValues,
			themeSpacingSizes
		);
		spacingStyles[ type ][ key ] = parsedValue;
	} );

	return spacingStyles[ type ];
};

/**
 * Reusable spacing control style component
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 */
const Spacing = ( { selector } ) => {
	const { themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const spacingStyles = getThemeOption( selector, themeConfig );
	const themeSpacingSizes = getThemeOption(
		'settings.spacing.spacingSizes',
		themeConfig
	)?.theme;

	/**
	 * Updates the theme config with the new value.
	 *
	 * @param {string|Object} newVal - The new value.
	 * @param {string}        type   - The type of spacing to update. E.g. margin.
	 */
	const handleNewValue = ( newVal, type ) => {
		if ( type === 'margin' || type === 'padding' ) {
			const spacingKeys = Object.keys( newVal );
			spacingKeys.forEach( ( key ) => {
				if ( ! newVal[ key ] ) {
					newVal[ key ] = '0px';
				}
				newVal[ key ] = spacingToVar(
					newVal[ key ],
					themeSpacingSizes
				);
			} );
			spacingStyles[ type ] = { ...newVal };
		} else {
			spacingStyles[ type ] = spacingToVar( newVal, themeSpacingSizes );
		}

		let config = structuredClone( themeConfig );
		config = set( config, selector, spacingStyles );
		setUserConfig( config );
	};

	return (
		<>
			<span className="themer--blocks-item-component--styles--title">
				{ __( 'Spacing', 'themer' ) }
			</span>
			<UnitControl
				label={ __( 'Block Gap', 'themer' ) }
				value={ parseUserValue(
					spacingStyles?.blockGap,
					true,
					themeSpacingSizes
				) }
				onChange={ ( newVal ) =>
					handleNewValue( spacingToVar( newVal ), 'blockGap' )
				}
			/>
			<BoxControl
				values={ parseMarginPaddingValues(
					'padding',
					spacingStyles,
					themeSpacingSizes
				) }
				onChange={ ( newVal ) => handleNewValue( newVal, 'padding' ) }
				label={ __( 'Padding', 'themer' ) }
				allowReset={ false }
			/>
			<BoxControl
				values={ parseMarginPaddingValues(
					'margin',
					spacingStyles,
					themeSpacingSizes
				) }
				onChange={ ( newVal ) => handleNewValue( newVal, 'margin' ) }
				label={ __( 'Margin', 'themer' ) }
				allowReset={ false }
			/>
		</>
	);
};

export default Spacing;
