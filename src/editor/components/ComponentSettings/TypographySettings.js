import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { ToggleControl, Button } from '@wordpress/components';
import { plus } from '@wordpress/icons';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import StylesContext from '../../context/StylesContext';
import FontFamilies from './TypographySettings/FontFamilies';
import FontSizes from './TypographySettings/FontSizes';

const TypographySettings = ( { selector } ) => {
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
			<span className="themer--styles__item__title">
				{ __( 'Typography', 'themer' ) }
			</span>
			<div>
				<ToggleControl
					label={ __( 'Custom Font Size', 'themer' ) }
					checked={ value?.customFontSize }
					onChange={ ( val ) => {
						handleNewValue( val, 'customFontSize' );
					} }
				/>
				<ToggleControl
					label={ __( 'Drop Cap', 'themer' ) }
					checked={ value?.dropCap }
					onChange={ ( val ) => {
						handleNewValue( val, 'dropCap' );
					} }
				/>
				{
					<>
						<FontFamilies
							selector={ `${ selector }.fontFamilies.custom` }
						/>
						<FontSizes
							selector={ `${ selector }.fontSizes.custom` }
						/>
					</>
				}
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
			</div>
		</>
	);
};

export default TypographySettings;
