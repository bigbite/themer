import { set, get } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';
import { Button, TextControl, Modal } from '@wordpress/components';
import { plus } from '@wordpress/icons';

import FontFace from './FontFace';
import getThemeOption from '../../../../utils/get-theme-option';
import EditorContext from '../../../context/EditorContext';
import StylesContext from '../../../context/StylesContext';

/**
 * Component for site appearance settings
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 */
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
	const [ newFont, setNewFont ] = useState( {
		fontFamily: '',
		name: '',
		slug: '',
	} );

	const [ isOpen, setIsOpen ] = useState( false );

	const handleUpdateValue = ( index ) => {
		let config = structuredClone( userConfig );
		let obj = structuredClone( get( config, `${ selector }[${ index }]` ) );

		obj = {
			...obj,
			...currentFont,
		};
		config = set( config, `${ selector }[${ index }]`, obj );
		setUserConfig( config );
	};

	const handleFontFamilyChange = () => {
		let config = structuredClone( userConfig );
		const obj = get( config, `${ selector }` ) || [];
		obj.push( {
			fontFamily: newFont.fontFamily,
			name: newFont.name,
			slug: newFont.slug,
		} );

		config = set( config, `${ selector }`, obj );
		setUserConfig( config );
		setNewFont( {
			fontFamily: '',
			name: '',
			slug: '',
		} );
		setIsOpen( false );
	};

	const handleDeleteFontFamily = ( index ) => {
		let config = structuredClone( userConfig );
		const obj = get( config, `${ selector }` );

		obj.splice( index, 1 );

		config = set( config, `${ selector }`, obj );
		setUserConfig( config );
		setCurrentFont( {
			fontFamily: '',
			name: '',
			slug: '',
			index: '',
		} );
	};

	return (
		<div className="themer--typography-options">
			<div className="themer--settings__item__title">
				{ __( 'Font Families', 'themer' ) }
			</div>
			{ value.map( ( font, index ) => {
				return (
					<Button
						onClick={ () =>
							setCurrentFont( {
								fontFamily: font.fontFamily,
								name: font.name,
								slug: font.slug,
								index,
							} )
						}
						key={ index }
						variant="secondary"
					>
						{ font.name }
					</Button>
				);
			} ) }
			{ currentFont.index !== '' && (
				<Modal
					onRequestClose={ () =>
						setCurrentFont( {
							fontFamily: '',
							name: '',
							slug: '',
							index: '',
						} )
					}
				>
					<div className="themer--settings__item__title">
						{ __( 'Font Families', 'themer' ) }
					</div>
					<TextControl
						label={ __( 'Font Family', 'themer' ) }
						value={ currentFont.fontFamily }
						onChange={ ( fontFamily ) => {
							setCurrentFont( { ...currentFont, fontFamily } );
						} }
					/>
					<TextControl
						label={ __( 'Name', 'themer' ) }
						value={ currentFont.name }
						onChange={ ( name ) => {
							setCurrentFont( { ...currentFont, name } );
						} }
					/>
					<TextControl
						label={ __( 'Slug', 'themer' ) }
						value={ currentFont.slug }
						onChange={ ( slug ) => {
							setCurrentFont( { ...currentFont, slug } );
						} }
					/>
					<div className="themer-settings--modal__actions">
						<Button
							onClick={ () => {
								setCurrentFont( {
									...currentFont,
									index: currentFont.index,
								} );
								handleUpdateValue( currentFont.index );
							} }
							variant="primary"
						>
							{ __( 'Save', 'default' ) }
						</Button>
						<Button
							disabled={ currentFont.index === '' }
							isDestructive
							variant="primary"
							onClick={ () =>
								handleDeleteFontFamily( currentFont.index )
							}
						>
							{ __( 'Delete', 'default' ) }
						</Button>
					</div>
					<FontFace
						familyIndex={ currentFont.index }
						selector={ `${ selector }` }
					/>
				</Modal>
			) }
			{ isOpen && (
				<Modal onRequestClose={ () => setIsOpen( ! isOpen ) }>
					<div className="themer--settings__item__title">
						{ __( 'Font Families', 'themer' ) }
					</div>
					<TextControl
						label={ __( 'Font Family', 'themer' ) }
						value={ newFont.fontFamily }
						onChange={ ( fontFamily ) => {
							setNewFont( { ...newFont, fontFamily } );
						} }
					/>
					<TextControl
						label={ __( 'Name', 'themer' ) }
						value={ newFont.name }
						onChange={ ( name ) => {
							setNewFont( { ...newFont, name } );
						} }
					/>
					<TextControl
						label={ __( 'Slug', 'themer' ) }
						value={ newFont.slug }
						onChange={ ( slug ) => {
							setNewFont( { ...newFont, slug } );
						} }
					/>
					<Button
						onClick={ () => {
							handleFontFamilyChange();
							setIsOpen( ! isOpen );
						} }
						variant="primary"
					>
						{ __( 'Save', 'default' ) }
					</Button>
				</Modal>
			) }
			<Button icon={ plus } onClick={ () => setIsOpen( ! isOpen ) } />
		</div>
	);
};

export default FontFamilies;
