import { set, get } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';
import { Button, TextControl, Modal } from '@wordpress/components';
import { plus } from '@wordpress/icons';

import getThemeOption from '../../../../utils/get-theme-option';
import EditorContext from '../../../context/EditorContext';
import StylesContext from '../../../context/StylesContext';

const FontFaces = ( { selector } ) => {
	const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig ) || [];

	const [ currentSize, setCurrentSize ] = useState( {} );
	const [ newSize, setNewSize ] = useState( {} );
	const [ isOpen, setIsOpen ] = useState( false );

	const handleNewValue = ( newValue, key, index ) => {
		setCurrentSize( { ...currentSize, [ key ]: newValue } );
		let config = structuredClone( userConfig );
		config = set( config, `${ selector }[${ index }].${ key }`, newValue );
		setUserConfig( config );
	};

	const handleDelete = ( index ) => {
		let config = structuredClone( userConfig );
		let obj = get( config, selector );
		obj.splice( index, 1 );
		config = set( config, selector, obj );
		setUserConfig( config );
		setCurrentSize( {} );
	};

	return (
		<div>
			<span className="themer--styles__item__title">
				{ __( 'Font Sizes', 'themer' ) }
			</span>
			{ value.map( ( size, index ) => {
				return (
					<Button
						onClick={ () => {
							setCurrentSize( {
								...size,
								index,
							} );
						} }
					>
						{ size?.name }
					</Button>
				);
			} ) }
			<Button icon={ plus } onClick={ () => setIsOpen( true ) } />
			{ isOpen && (
				<Modal onRequestClose={ () => setIsOpen( false ) }>
					<TextControl
						label={ __( 'Name', 'themer' ) }
						value={ newSize?.name }
						onChange={ ( val ) =>
							setNewSize( { ...newSize, name: val } )
						}
					/>
					<TextControl
						label={ __( 'Slug', 'themer' ) }
						value={ newSize?.slug }
						onChange={ ( val ) =>
							setNewSize( { ...newSize, slug: val } )
						}
					/>
					<TextControl
						label={ __( 'Size', 'themer' ) }
						value={ newSize?.size }
						onChange={ ( val ) =>
							setNewSize( { ...newSize, size: val } )
						}
					/>
					<TextControl
						label={ __( 'Min', 'themer' ) }
						value={ newSize?.fluid?.min }
						onChange={ ( val ) =>
							setNewSize( {
								...newSize,
								fluid: { ...newSize.fluid, min: val },
							} )
						}
					/>
					<TextControl
						label={ __( 'Max', 'themer' ) }
						value={ newSize?.fluid?.max }
						onChange={ ( val ) =>
							setNewSize( {
								...newSize,
								fluid: { ...newSize.fluid, max: val },
							} )
						}
					/>
					<Button
						onClick={ () => {
							let config = structuredClone( userConfig );
							let obj = get( config, selector ) || [];
							obj.push( newSize );
							config = set( config, selector, obj );
							setUserConfig( config );
							setNewSize( {} );
							setIsOpen( false );
						} }
					>
						Save
					</Button>
				</Modal>
			) }
			{ currentSize?.name && (
				<Modal onRequestClose={ () => setCurrentSize( {} ) }>
					<TextControl
						label={ __( 'Name', 'themer' ) }
						value={ currentSize?.name }
						onChange={ ( val ) =>
							handleNewValue( val, 'name', currentSize.index )
						}
					/>
					<TextControl
						label={ __( 'Slug', 'themer' ) }
						value={ currentSize?.slug }
						onChange={ ( val ) =>
							handleNewValue( val, 'slug', currentSize.index )
						}
					/>
					<TextControl
						label={ __( 'Size', 'themer' ) }
						value={ currentSize?.size }
						onChange={ ( val ) =>
							handleNewValue( val, 'size', currentSize.index )
						}
					/>
					<TextControl
						label={ __( 'Min', 'themer' ) }
						value={ currentSize?.fluid?.min }
						onChange={ ( val ) =>
							handleNewValue(
								val,
								'fluid.min',
								currentSize.index
							)
						}
					/>
					<TextControl
						label={ __( 'Max', 'themer' ) }
						value={ currentSize?.fluid?.max }
						onChange={ ( val ) =>
							handleNewValue(
								val,
								'fluid.max',
								currentSize.index
							)
						}
					/>
					<Button
						onClick={ () => {
							setCurrentSize( {} );
						} }
					>
						Save
					</Button>
					<Button
						onClick={ () => {
							handleDelete( currentSize.index );
						} }
					>
						Delete
					</Button>
				</Modal>
			) }
		</div>
	);
};

export default FontFaces;
