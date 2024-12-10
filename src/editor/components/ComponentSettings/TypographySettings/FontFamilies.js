import { set, get } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';
import { ToggleControl, Button, TextControl } from '@wordpress/components';
import { plus } from '@wordpress/icons';

import FontFace from './FontFace';
import getThemeOption from '../../../../utils/get-theme-option';
import EditorContext from '../../../context/EditorContext';
import StylesContext from '../../../context/StylesContext';

const FontFamilies = ( { selector } ) => {
	const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig ) || [];

	const [ currentFont, setCurrentFont ] = useState( {
		fontFamily: '',
		name: '',
		slug: '',
		index: '',
	} );

	const handleNewValue = ( newValue, key ) => {
		setCurrentFont( { ...currentFont, [ key ]: newValue } );
		if ( currentFont.index === '' ) {
			return;
		}
		let config = structuredClone( userConfig );
		config = set(
			config,
			`${ selector }[${ currentFont.index }].${ key }`,
			newValue
		);
		setUserConfig( config );
	};

	const handleFontFamilyChange = () => {
		let config = structuredClone( userConfig );
		let obj = get( config, `${ selector }` ) || [];
		obj.push( {
			fontFamily: currentFont.fontFamily,
			name: currentFont.name,
			slug: currentFont.slug,
		} );
		config = set( config, `${ selector }`, obj );
		setUserConfig( config );
		setCurrentFont( {
			fontFamily: currentFont.fontFamily,
			name: currentFont.name,
			slug: currentFont.slug,
			index: obj.length - 1,
		} );
	};

	return (
		<div>
			<h2>Font Family</h2>
			{ value.map( ( font, index ) => {
				return (
					<Button
						onClick={ () =>
							setCurrentFont( {
								fontFamily: font.fontFamily,
								name: font.name,
								slug: font.slug,
								index: index,
							} )
						}
					>
						{ font.name }
					</Button>
				);
			} ) }
			<TextControl
				label={ 'Font Family' }
				value={ currentFont.fontFamily }
				onChange={ ( fontFamily ) => {
					handleNewValue( fontFamily, 'fontFamily' );
				} }
			/>
			<TextControl
				label={ 'name' }
				value={ currentFont.name }
				onChange={ ( name ) => {
					handleNewValue( name, 'name' );
				} }
			/>
			<TextControl
				label={ 'slug' }
				value={ currentFont.slug }
				onChange={ ( slug ) => {
					handleNewValue( slug, 'slug' );
				} }
			/>
			<Button
				disabled={ currentFont.index !== '' }
				onClick={ () => handleFontFamilyChange( currentFont.index ) }
			>
				{ 'Add' }
			</Button>
			<Button
				disabled={ ! currentFont.name }
				onClick={ () =>
					setCurrentFont( {
						fontFamily: '',
						name: '',
						slug: '',
						index: '',
					} )
				}
			>
				Reset
			</Button>
			<FontFace
				familyIndex={ currentFont.index }
				selector={ `${ selector }` }
			/>
		</div>
	);
};

export default FontFamilies;
