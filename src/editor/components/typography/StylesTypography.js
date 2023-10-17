// font-weight - __experimentalFontAppearanceControl
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

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import StylesContext from '../../context/StylesContext';
import FontFamily from './FontFamily';
import FontSize from './FontSize';
import FontAppearance from './FontAppearance';

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
			<FontSize
				typographyStyles={ typographyStyles }
				handleNewValue={ handleNewValue }
			/>
			<FontAppearance
				typographyStyles={ typographyStyles }
				handleNewValue={ handleNewValue }
			/>
		</>
	);
};

export default Typography;
