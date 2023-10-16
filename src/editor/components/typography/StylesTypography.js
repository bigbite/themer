/* eslint-disable jsdoc/check-line-alignment */
// font-weight - SelectControl
// line-height - __experimentalNumberControl
// text-decoration - __experimentalTextDecorationControl
// text-transform - __experimentalTextTransformControl
// writing-mode - __experimentalWritingModeControl
// font-style - __experimentalFontAppearanceControl
// letter-spacing - __experimentalLetterSpacingControl
// text-columns - NumberControl

import { __ } from '@wordpress/i18n';
import { set } from 'lodash';
import { useContext } from '@wordpress/element';
import { __experimentalNumberControl as NumberControl } from '@wordpress/components';
import {
	__experimentalTextDecorationControl as TextDecorationControl,
	__experimentalTextTransformControl as TextTransformControl,
	__experimentalWritingModeControl as WritingModeControl,
	__experimentalFontAppearanceControl as FontAppearanceControl,
	__experimentalLetterSpacingControl as LetterSpacingControl,
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
	 * @param {string} newVal - The new value.
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
			<FontSize
				typographyStyles={ typographyStyles }
				handleNewValue={ handleNewValue }
			/>
		</>
	);
};

export default Typography;
