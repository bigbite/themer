import { __ } from '@wordpress/i18n';
import { set } from 'lodash';
import { useContext } from '@wordpress/element';
import {
	__experimentalUnitControl as UnitControl,
	__experimentalBoxControl as BoxControl,
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

	// TODO: support shorthand CSS values in theme.json
	if (
		typeof spacingStyles?.padding === 'string' ||
		typeof spacingStyles?.margin === 'string'
	) {
		return null;
	}

	/**
	 * Updates the theme config with the new value.
	 *
	 * @param {string|Object} newVal - The new value.
	 * @param {string}        type   - The type of spacing to update. E.g. margin.
	 */
	const handleNewValue = ( newVal, type ) => {
		let newSpacingStyles = { ...spacingStyles };
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
			newSpacingStyles = { ...spacingStyles, [ type ]: { ...newVal } };
		} else {
			newSpacingStyles = {
				...spacingStyles,
				[ type ]: spacingToVar( newVal, themeSpacingSizes ),
			};
		}

		let config = structuredClone( themeConfig );
		config = set( config, selector, newSpacingStyles );
		setUserConfig( config );
	};

	return (
		<>
			<span className="themer--styles__item__title">
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
