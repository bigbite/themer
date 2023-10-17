/* eslint-disable @wordpress/no-unsafe-wp-apis */

// TODO: NOT YET IN CORE WP BUT IN THEME.JSON SCHEMA
// writing-mode - __experimentalWritingModeControl
// text-columns - NumberControl

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
						fontStyle: typographyStyles?.fontStyle || 'default',
						fontWeight: typographyStyles?.fontWeight || 'default',
					} }
					onChange={ ( newVal ) => {
						handleNewValue( newVal?.fontWeight, 'fontWeight' );
						handleNewValue( newVal?.fontStyle, 'fontStyle' );
					} }
					size="__unstable-large"
					__nextHasNoMarginBottom
				/>
				{ typographyStyles?.lineHeight && (
					<LineHeightControl
						value={ typographyStyles.lineHeight }
						onChange={ ( newVal ) =>
							handleNewValue( newVal, 'lineHeight' )
						}
						size="__unstable-large"
						__unstableInputWidth="auto"
						__nextHasNoMarginBottom
					/>
				) }
				{ typographyStyles?.letterSpacing && (
					<LetterSpacingControl
						value={ typographyStyles.letterSpacing }
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
				) }
			</div>
			<div className="themer--blocks-item-component--columns themer--blocks-item-component--columns-2">
				<TextDecorationControl
					value={ typographyStyles?.textDecoration || 'none' }
					onChange={ ( newVal ) =>
						handleNewValue( newVal, 'textDecoration' )
					}
				/>
				<TextTransformControl
					value={ typographyStyles?.textTransform || 'none' }
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
