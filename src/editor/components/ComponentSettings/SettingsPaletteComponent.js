import { set, get } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';
import {
	TextControl,
	ColorPicker,
	Button,
	Modal,
	ColorIndicator,
} from '@wordpress/components';
import { plus, swatch } from '@wordpress/icons';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import StylesContext from '../../context/StylesContext';
import { formatSlug } from '../../../utils/style-helpers';

/**
 * Component for Palette settings
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 * @param {string} props.label    Property label
 */
const SettingsPaletteComponent = ( { selector, label } ) => {
	const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig )?.theme || [];

	const [ newColor, setNewColor ] = useState( {
		color: '',
		name: '',
		slug: '',
	} );
	const [ currentColor, setCurrentColor ] = useState( {
		value: '',
		name: '',
		slug: '',
		key: '',
	} );
	const [ isOpen, setIsOpen ] = useState( false );

	const onChange = ( newValue, field ) => {
		setCurrentColor( { ...currentColor, [ field ]: newValue } );

		let config = structuredClone( userConfig );
		config = set(
			config,
			`${ selector }.theme[${ currentColor.key }].${ field }`,
			newValue
		);
		setUserConfig( config );
	};

	const handleDeleteColor = ( key ) => {
		let config = structuredClone( userConfig );
		const obj = get( config, `${ selector }.theme` );

		obj.splice( key, 1 );

		config = set( config, `${ selector }.theme`, obj );
		setCurrentColor( { value: '', key: '' } );
		setUserConfig( config );
	};

	const handleNewColor = () => {
		let config = structuredClone( userConfig );
		const obj = get( config, `${ selector }.theme` ) || [];

		obj.push( { ...newColor } );

		config = set( config, `${ selector }.theme`, obj );
		setIsOpen( false );
		setNewColor( { color: '', name: '', slug: '' } );
		setUserConfig( config );
	};

	const renderModal = ( isNew ) => {
		return (
			<Modal
				title={
					isNew
						? __( 'Add New Color', 'themer' )
						: __( 'Edit Color', 'themer' )
				}
				shouldCloseOnEsc
				shouldCloseOnClickOutside
				onRequestClose={ () => {
					setCurrentColor( { value: '', key: '' } );
					setIsOpen( false );
				} }
			>
				<TextControl
					label={ __( 'Name', 'themer' ) }
					value={ isNew ? newColor?.name : currentColor.name }
					onChange={ ( name ) => {
						return isNew
							? setNewColor( { ...newColor, name } )
							: onChange( name, 'name' );
					} }
				/>
				<TextControl
					label={ __( 'Slug', 'themer' ) }
					value={ isNew ? newColor?.slug : currentColor.slug }
					onChange={ ( slug ) => {
						slug = formatSlug( slug );
						return isNew
							? setNewColor( { ...newColor, slug } )
							: onChange( slug, 'slug' );
					} }
				/>
				<ColorPicker
					color={ isNew ? newColor?.color : currentColor?.value }
					onChange={ ( newValue ) =>
						isNew
							? setNewColor( { ...newColor, color: newValue } )
							: onChange( newValue, 'color' )
					}
				/>
				<Button
					isPrimary
					disabled={ ! currentColor?.value && ! newColor?.color }
					onClick={ () => {
						return isNew
							? handleNewColor()
							: setCurrentColor( { value: '', key: '' } );
					} }
				>
					{ isNew
						? __( 'Add Color', 'themer' )
						: __( 'Save Color', 'themer' ) }
				</Button>
				<Button
					isPrimary
					disabled={ isNew }
					onClick={ () => {
						handleDeleteColor( currentColor?.key );
					} }
				>
					{ __( 'Delete Color', 'themer' ) }
				</Button>
			</Modal>
		);
	};

	return (
		<div>
			<span className="themer--settings__item__title">{ label }</span>
			<span className="themer--color-palette">
				{ value.map( ( val, index ) => {
					return (
						<div key={ index }>
							<Button
								className="components-color-list-picker__swatch-button"
								icon={
									val?.color ? (
										<ColorIndicator
											colorValue={ val?.color }
											className="components-color-list-picker__swatch-color"
										/>
									) : (
										swatch
									)
								}
								onClick={ () => {
									setCurrentColor( {
										value: val?.color,
										name: val?.name,
										slug: val?.slug,
										key: index,
									} );
								} }
							/>
						</div>
					);
				} ) }
				<Button icon={ plus } onClick={ () => setIsOpen( ! isOpen ) } />
			</span>
			{ currentColor.value && renderModal() }
			{ isOpen && renderModal( true ) }
		</div>
	);
};

export default SettingsPaletteComponent;
