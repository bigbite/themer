/* eslint-disable @wordpress/no-unsafe-wp-apis */

// TODO: NOT YET IN CORE WP BUT IN THEME.JSON SCHEMA
// writing-mode - __experimentalWritingModeControl

import { __ } from '@wordpress/i18n';
import { set } from 'lodash';
import { useContext } from '@wordpress/element';
import {
	__experimentalTextDecorationControl as TextDecorationControl,
	__experimentalFontAppearanceControl as FontAppearanceControl,
	__experimentalTextTransformControl as TextTransformControl,
	__experimentalLetterSpacingControl as LetterSpacingControl,
	LineHeightControl,
} from '@wordpress/block-editor';
import { __experimentalNumberControl as NumberControl } from '@wordpress/components';
import {
	MAX_TEXT_COLUMNS,
	parseFontStyle,
	parseFontWeight,
	parseLetterSpacing,
	parseLineHeight,
	parseTextColumns,
	parseTextDecoration,
	parseTextTransform,
} from './helpers';
import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import StylesContext from '../../context/StylesContext';
import FontFamily from './FontFamily';
import FontSize from './FontSize';

/**
 * Reusable Typography component
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 */
const Typography = ( { selector } ) => {
	const { themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const typographyStyles = getThemeOption( selector, themeConfig );

	/**
	 * Updates the theme config with the new value.
	 *
	 * @param {string} newVal The new value.
	 * @param {string} key    The property to be updated.
	 */
	const handleNewValue = ( newVal, key ) => {
		typographyStyles[ key ] = newVal;
		let config = structuredClone( themeConfig );
		config = set( config, selector, typographyStyles );
		setUserConfig( config );
	};

	return (
		<>
			<span className="themer--blocks-item-component--styles--title">
				{ __( 'Typography', 'themer' ) }
			</span>
			<FontFamily
				typographyStyles={ typographyStyles }
				handleNewValue={ handleNewValue }
			/>
			<div className="themer--blocks-item-component--columns themer--blocks-item-component--columns-2">
				<FontSize
					typographyStyles={ typographyStyles }
					handleNewValue={ handleNewValue }
				/>
				<FontAppearanceControl
					value={ {
						fontStyle: parseFontStyle(
							typographyStyles?.fontStyle
						),
						fontWeight: parseFontWeight(
							typographyStyles?.fontWeight
						),
					} }
					onChange={ ( newVal ) => {
						handleNewValue( newVal?.fontWeight, 'fontWeight' );
						handleNewValue( newVal?.fontStyle, 'fontStyle' );
					} }
					size="__unstable-large"
					__nextHasNoMarginBottom
				/>
				<LineHeightControl
					value={ parseLineHeight( typographyStyles?.lineHeight ) }
					onChange={ ( newVal ) =>
						handleNewValue( newVal, 'lineHeight' )
					}
					size="__unstable-large"
					__unstableInputWidth="auto"
					__nextHasNoMarginBottom
				/>
				<LetterSpacingControl
					value={ parseLetterSpacing(
						typographyStyles?.letterSpacing
					) }
					onChange={ ( newVal ) => {
						if ( newVal === '' ) {
							handleNewValue( '0px', 'letterSpacing' );
						} else {
							handleNewValue( newVal, 'letterSpacing' );
						}
					} }
					size="__unstable-large"
					__unstableInputWidth="auto"
				/>
				<NumberControl
					label={ __( 'Text columns', 'themer' ) }
					max={ MAX_TEXT_COLUMNS }
					min={ 1 }
					onChange={ ( newVal ) =>
						handleNewValue( newVal, 'textColumns' )
					}
					size="__unstable-large"
					spinControls="custom"
					value={ parseTextColumns( typographyStyles?.textColumns ) }
					initialPosition={ 1 }
				/>
				<TextDecorationControl
					value={ parseTextDecoration(
						typographyStyles?.textDecoration
					) }
					onChange={ ( newVal ) =>
						handleNewValue( newVal, 'textDecoration' )
					}
				/>
				<TextTransformControl
					value={ parseTextTransform(
						typographyStyles?.textTransform
					) }
					onChange={ ( newVal ) =>
						handleNewValue( newVal, 'textTransform' )
					}
					showNone
				/>
			</div>
		</>
	);
};

export default Typography;
