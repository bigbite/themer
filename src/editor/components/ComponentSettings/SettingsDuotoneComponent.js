import { set, get, isEmpty } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';
import {
	TextControl,
	DuotonePicker,
	Button,
	Modal,
	ColorIndicator,
} from '@wordpress/components';
import { plus, swatch } from '@wordpress/icons';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import StylesContext from '../../context/StylesContext';
import {
	getGradientFromCSSColors,
	formatSlug,
} from '../../../utils/style-helpers';

/**
 * Component for Duotone settings
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 */
const SettingsDuotoneComponent = ( { selector } ) => {
	const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig )?.theme || [];

	const [ newDuotone, setNewDuotone ] = useState( {
		colors: [],
		name: '',
		slug: '',
	} );
	const [ currentDuotone, setCurrentDuotone ] = useState( {
		colors: [],
		name: '',
		slug: '',
		key: '',
	} );

	const [ isOpen, setIsOpen ] = useState( false );

	const onChange = ( newValue, field ) => {
		setCurrentDuotone( { ...currentDuotone, [ field ]: newValue } );
		let config = structuredClone( userConfig );
		config = set(
			config,
			`${ selector }.theme[${ currentDuotone.key }].${ field }`,
			newValue
		);
		setUserConfig( config );
	};

	const handleDeleteDuotone = ( key ) => {
		let config = structuredClone( userConfig );
		const obj = get( config, `${ selector }.theme` );

		obj.splice( key, 1 );

		config = set( config, `${ selector }.theme`, obj );
		setCurrentDuotone( { value: '', key: '' } );
		setUserConfig( config );
	};

	const handleNewDuotone = () => {
		let config = structuredClone( userConfig );
		const obj = get( config, `${ selector }.theme` ) || [];
		obj.push( { ...newDuotone } );
		config = set( config, `${ selector }.theme`, obj );
		setIsOpen( false );
		setNewDuotone( { colors: [], name: '', slug: '' } );
		setUserConfig( config );
	};

	const renderModal = ( isNew ) => {
		return (
			<Modal
				className="themer-settings--modal"
				title={
					isNew
						? __( 'Add New Duotone', 'themer' )
						: __( 'Edit Duotone', 'themer' )
				}
				shouldCloseOnEsc
				shouldCloseOnClickOutside
				onRequestClose={ () => {
					setCurrentDuotone( {
						colors: [],
						name: '',
						slug: '',
						key: '',
					} );
					setIsOpen( false );
				} }
			>
				<div className="themer-settings--modal__content">
					<TextControl
						label={ __( 'Name', 'themer' ) }
						value={
							isNew ? newDuotone?.name : currentDuotone?.name
						}
						onChange={ ( name ) => {
							return isNew
								? setNewDuotone( { ...newDuotone, name } )
								: onChange( name, 'name' );
						} }
					/>
					<TextControl
						label={ __( 'Slug', 'themer' ) }
						value={
							isNew ? newDuotone?.slug : currentDuotone?.slug
						}
						onChange={ ( slug ) => {
							slug = formatSlug( slug );
							return isNew
								? setNewDuotone( { ...newDuotone, slug } )
								: onChange( slug, 'slug' );
						} }
					/>
					<DuotonePicker
						value={
							isNew
								? newDuotone.colors ?? null
								: currentDuotone.colors ?? null
						}
						duotonePalette={ [] }
						colorPalette={ [] }
						unsetable={ false }
						clearable={ false }
						onChange={ ( newValue ) => {
							return isNew
								? setNewDuotone( {
										...newDuotone,
										colors: newValue,
								  } )
								: onChange( newValue, 'colors' );
						} }
					/>
					<div className="themer-settings--modal__actions">
						<Button
							isPrimary
							disabled={
								isEmpty( newDuotone?.colors ) &&
								isEmpty( currentDuotone?.colors )
							}
							onClick={ () => {
								return isNew
									? handleNewDuotone()
									: setCurrentDuotone( {
											colors: [],
											name: '',
											slug: '',
											key: '',
									  } );
							} }
						>
							{ isNew
								? __( 'Add', 'default' )
								: __( 'Save', 'default' ) }
						</Button>
						<Button
							isPrimary
							disabled={ isNew }
							isDestructive
							onClick={ () => {
								handleDeleteDuotone( currentDuotone?.key );
							} }
						>
							{ __( 'Delete', 'default' ) }
						</Button>
					</div>
				</div>
			</Modal>
		);
	};

	return (
		<div>
			<span className="themer--settings__item__title">
				{ __( 'Duotone Settings', 'themer' ) }
			</span>
			<span className="themer--color-palette">
				{ value.map( ( duotone, index ) => {
					const color = getGradientFromCSSColors( duotone.colors );
					return (
						<div key={ index }>
							<Button
								className="components-color-list-picker__swatch-button"
								icon={
									duotone?.colors ? (
										<ColorIndicator
											colorValue={ color }
											className="components-color-list-picker__swatch-color"
										/>
									) : (
										swatch
									)
								}
								onClick={ () => {
									setCurrentDuotone( {
										...duotone,
										key: index,
									} );
								} }
							/>
						</div>
					);
				} ) }
				<Button icon={ plus } onClick={ () => setIsOpen( ! isOpen ) } />
			</span>
			{ ! isEmpty( currentDuotone?.colors ) && renderModal() }
			{ isOpen && renderModal( true ) }
		</div>
	);
};

export default SettingsDuotoneComponent;
