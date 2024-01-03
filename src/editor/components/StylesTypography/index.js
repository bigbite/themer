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
	 */
	const handleNewValue = ( newVal ) => {
		const newTypographyStyles = { ...typographyStyles, ...newVal };
		let config = structuredClone( themeConfig );
		config = set( config, selector, newTypographyStyles );
		setUserConfig( config );
	};

	return (
		<>
			<span className="themer--styles__item__title">
				{ __( 'Typography', 'themer' ) }
			</span>
			<FontFamily
				typographyStyles={ typographyStyles }
				onChange={ ( val ) => handleNewValue( { fontFamily: val } ) }
			/>
			<div className="themer--styles__item__columns themer--styles__item__columns--2">
				<FontSize
					typographyStyles={ typographyStyles }
					onChange={ ( val ) => handleNewValue( { fontSize: val } ) }
				/>
				<FontAppearanceControl
					value={
						! typographyStyles?.fontStyle &&
						! typographyStyles?.fontWeight
							? 'default'
							: {
									fontStyle: parseFontStyle(
										typographyStyles?.fontStyle
									),
									fontWeight: parseFontWeight(
										typographyStyles?.fontWeight
									),
							  }
					}
					onChange={ handleNewValue }
					size="__unstable-large"
					__nextHasNoMarginBottom
				/>
				<LineHeightControl
					value={ parseLineHeight( typographyStyles?.lineHeight ) }
					onChange={ ( val ) =>
						handleNewValue( { lineHeight: val } )
					}
					size="__unstable-large"
					__unstableInputWidth="auto"
					__nextHasNoMarginBottom
				/>
				<LetterSpacingControl
					value={ parseLetterSpacing(
						typographyStyles?.letterSpacing
					) }
					onChange={ ( val ) => {
						if ( val === '' ) {
							handleNewValue( { letterSpacing: '0px' } );
						} else {
							handleNewValue( { letterSpacing: val } );
						}
					} }
					size="__unstable-large"
					__unstableInputWidth="auto"
				/>
				<NumberControl
					label={ __( 'Text columns', 'themer' ) }
					max={ MAX_TEXT_COLUMNS }
					min={ 1 }
					onChange={ ( val ) =>
						handleNewValue( { textColumns: val } )
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
					onChange={ ( val ) =>
						handleNewValue( { textDecoration: val } )
					}
				/>
				<TextTransformControl
					value={ parseTextTransform(
						typographyStyles?.textTransform
					) }
					onChange={ ( val ) =>
						handleNewValue( { textTransform: val } )
					}
					showNone
				/>
			</div>
		</>
	);
};

export default Typography;
