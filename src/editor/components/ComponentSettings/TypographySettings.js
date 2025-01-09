import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import StylesContext from '../../context/StylesContext';
import FontFamilies from './TypographySettings/FontFamilies';
import FontSizes from './TypographySettings/FontSizes';

/**
 * Component for Typography settings
 *
 * @param {Object} props             Component props
 * @param {string} props.selector    Property target selector
 * @param {string} props.description Property description
 */
const TypographySettings = ( { selector, description } ) => {
	const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig ) || [];

	const handleNewValue = ( newValue, key ) => {
		let config = structuredClone( userConfig );
		config = set( config, [ selector, key ].join( '.' ), newValue );
		setUserConfig( config );
	};
	return (
		<>
			{ description && (
				<p className="themer--settings__item__description">
					{ description }
				</p>
			) }
			<div>
				<ToggleControl
					label={ __( 'Custom Font Size', 'themer' ) }
					checked={ value?.customFontSize }
					onChange={ ( val ) => {
						handleNewValue( val, 'customFontSize' );
					} }
				/>
				<ToggleControl
					label={ __( 'Default Font Sizes', 'themer' ) }
					checked={ value?.defaultFontSizes }
					onChange={ ( val ) => {
						handleNewValue( val, 'defaultFontSizes' );
					} }
				/>
				<ToggleControl
					label={ __( 'Drop Cap', 'themer' ) }
					checked={ value?.dropCap }
					onChange={ ( val ) => {
						handleNewValue( val, 'dropCap' );
					} }
				/>
				<FontFamilies selector={ `${ selector }.fontFamilies.theme` } />
				<FontSizes selector={ `${ selector }.fontSizes.theme` } />
				<ToggleControl
					label={ __( 'Font Style', 'themer' ) }
					checked={ value?.fontStyle }
					onChange={ ( val ) => {
						handleNewValue( val, 'fontStyle' );
					} }
				/>
				<ToggleControl
					label={ __( 'Font Weight', 'themer' ) }
					checked={ value?.fontWeight }
					onChange={ ( val ) => {
						handleNewValue( val, 'fontWeight' );
					} }
				/>
				<ToggleControl
					label={ __( 'Letter Spacing', 'themer' ) }
					checked={ value?.letterSpacing }
					onChange={ ( val ) => {
						handleNewValue( val, 'letterSpacing' );
					} }
				/>
				<ToggleControl
					label={ __( 'Line Height', 'themer' ) }
					checked={ value?.lineHeight }
					onChange={ ( val ) => {
						handleNewValue( val, 'lineHeight' );
					} }
				/>
				<ToggleControl
					label={ __( 'Text Decoration', 'themer' ) }
					checked={ value?.textDecoration }
					onChange={ ( val ) => {
						handleNewValue( val, 'textDecoration' );
					} }
				/>
				<ToggleControl
					label={ __( 'Text Transform', 'themer' ) }
					checked={ value?.textTransform }
					onChange={ ( val ) => {
						handleNewValue( val, 'textTransform' );
					} }
				/>
				<ToggleControl
					label={ __( 'Writing Mode', 'themer' ) }
					checked={ value?.writingMode }
					onChange={ ( val ) => {
						handleNewValue( val, 'writingMode' );
					} }
				/>
				<ToggleControl
					label={ __( 'Fluid', 'themer' ) }
					checked={ value?.fluid }
					onChange={ ( val ) => {
						handleNewValue( val, 'fluid' );
					} }
				/>
			</div>
		</>
	);
};

export default TypographySettings;
