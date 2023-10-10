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

const parseUserValue = ( value, allowNegativeValues = true ) => {
	if (
		value === '' ||
		! isCssLengthUnit( value ) ||
		( ! allowNegativeValues && ! value )
	) {
		return '0px';
	}

	return value;
};

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

	const handleNewValue = ( newVal, type ) => {
		if ( type === 'margin' || type === 'padding' ) {
			const spacingKeys = Object.keys( newVal );
			spacingKeys.forEach( ( key ) => {
				if ( ! newVal[ key ] ) {
					newVal[ key ] = '0px';
				}
				newVal[ key ] = spacingToVar( newVal[ key ] );
			} );
			spacingStyles[ type ] = { ...newVal };
		} else {
			spacingStyles[ type ] = newVal;
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
					varToSpacing( spacingStyles?.blockGap, themeSpacingSizes )
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
