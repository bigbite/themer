import { set, get } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';
import {
	ToggleControl,
	Button,
	TextControl,
	Modal,
} from '@wordpress/components';
import { plus } from '@wordpress/icons';

import getThemeOption from '../../../../utils/get-theme-option';
import EditorContext from '../../../context/EditorContext';
import StylesContext from '../../../context/StylesContext';

const FontFace = ( { familyIndex, selector } ) => {
	const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig ) || [];

	const [ show, setShow ] = useState( false );
	const [ newFontFace, setNewFontFace ] = useState( {
		fontFamily: '',
		fontStretch: '',
		fontStyle: '',
		fontWeight: '',
	} );
	const [ currentFontFace, setCurrentFontFace ] = useState( {
		fontFamily: '',
		fontStretch: '',
		fontStyle: '',
		fontWeight: '',
	} );

	const handleNewValue = ( newValue, key ) => {
		setCurrentFontFace( { ...currentFontFace, [ key ]: newValue } );
		let config = structuredClone( userConfig );
		config = set(
			config,
			`${ selector }[${ familyIndex }.fontFace[${ currentFontFace.index }].${ key }`,
			newValue
		);
		setUserConfig( config );
	};

	const pushNewFontFace = () => {
		let config = structuredClone( userConfig );
		let obj =
			get( config, `${ selector }[${ familyIndex }].fontFace` ) || [];
		obj.push( { ...newFontFace } );
		config = set( config, `${ selector }[${ familyIndex }].fontFace`, obj );
		setUserConfig( config );
		setShow( false );
	};

	const fontFaces = value[ familyIndex ]?.fontFace || [];

	return (
		<div>
			<h2>Font Face</h2>
			<Button
				disabled={ familyIndex === '' }
				icon={ plus }
				onClick={ () => setShow( ! show ) }
			/>
			{ fontFaces.map( ( fam, index ) => {
				if ( familyIndex === '' ) {
					return;
				}
				return (
					<Button
						onClick={ () =>
							setCurrentFontFace( {
								fontFamily: fam.fontFamily,
								fontStretch: fam.fontStretch,
								fontStyle: fam.fontStyle,
								fontWeight: fam.fontWeight,
								index,
							} )
						}
					>
						{ fam.fontFamily }
					</Button>
				);
			} ) }
			{ show && (
				<Modal onRequestClose={ () => setShow( false ) }>
					<TextControl
						label={ 'Font Family' }
						value={ value?.fontFamily }
						onChange={ ( fontFamily ) => {
							setNewFontFace( { ...newFontFace, fontFamily } );
						} }
					/>
					<TextControl
						label={ 'Font Stretch' }
						value={ value?.fontStretch }
						onChange={ ( fontStretch ) => {
							setNewFontFace( { ...newFontFace, fontStretch } );
						} }
					/>
					<TextControl
						label={ 'Font Style' }
						value={ value?.fontStyle }
						onChange={ ( fontStyle ) => {
							setNewFontFace( { ...newFontFace, fontStyle } );
						} }
					/>
					<TextControl
						label={ 'Font Weight' }
						value={ value?.fontWeight }
						onChange={ ( fontWeight ) => {
							setNewFontFace( { ...newFontFace, fontWeight } );
						} }
					/>

					{ /* <TextControl label={'src'}/> */ }
					<Button
						label={ 'Save New Font Face' }
						onClick={ pushNewFontFace }
					>
						Save
					</Button>
				</Modal>
			) }
			{ currentFontFace.fontFamily && (
				<Modal
					onRequestClose={ () =>
						setCurrentFontFace( {
							fontFamily: '',
							fontStretch: '',
							fontStyle: '',
							fontWeight: '',
						} )
					}
				>
					<TextControl
						label={ 'Font Family' }
						value={ currentFontFace.fontFamily }
						onChange={ ( fontFamily ) => {
							handleNewValue( fontFamily, 'fontFamily' );
						} }
					/>
					<TextControl
						label={ 'Font Stretch' }
						value={ currentFontFace.fontStretch }
						onChange={ ( fontStretch ) => {
							handleNewValue( fontStretch, 'fontStretch' );
						} }
					/>
					<TextControl
						label={ 'Font Style' }
						value={ currentFontFace.fontStyle }
						onChange={ ( fontStyle ) => {
							handleNewValue( fontStyle, 'fontStyle' );
						} }
					/>
					<TextControl
						label={ 'Font Weight' }
						value={ currentFontFace.fontWeight }
						onChange={ ( fontWeight ) => {
							handleNewValue( fontWeight, 'fontWeight' );
						} }
					/>
					<Button
						label={ 'Save Font Face' }
						onClick={ () =>
							setCurrentFontFace( {
								fontFamily: '',
								fontStretch: '',
								fontStyle: '',
								fontWeight: '',
							} )
						}
					>
						Save
					</Button>
				</Modal>
			) }
		</div>
	);
};

export default FontFace;
