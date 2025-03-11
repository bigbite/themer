import { set, get, isEmpty } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';
import {
	TextControl,
	GradientPicker,
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
 * Component for Gradient settings
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 */
const SettingsGradientComponent = ( { selector } ) => {
	const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig )?.theme || [];

	const [ newGradient, setNewGradient ] = useState( {
		gradient: null,
		name: '',
		slug: '',
	} );
	const [ currentGradient, setCurrentGradient ] = useState( {
		gradient: null,
		name: '',
		slug: '',
		key: '',
	} );
	const [ isOpen, setIsOpen ] = useState( false );
	const onChange = ( newValue, field ) => {
		setCurrentGradient( { ...currentGradient, [ field ]: newValue } );
		let config = structuredClone( userConfig );
		config = set(
			config,
			`${ selector }.theme[${ currentGradient.key }].${ field }`,
			newValue
		);
		setUserConfig( config );
	};

	const handleDeleteGradient = ( key ) => {
		let config = structuredClone( userConfig );
		const obj = get( config, `${ selector }.theme` );

		obj.splice( key, 1 );

		config = set( config, `${ selector }.theme`, obj );
		setCurrentGradient( { gradient: null, name: '', slug: '', key: '' } );
		setUserConfig( config );
	};

	const handleNewGradient = () => {
		let config = structuredClone( userConfig );
		const obj = get( config, `${ selector }.theme` ) || [];
		obj.push( { ...newGradient } );
		config = set( config, `${ selector }.theme`, obj );
		setIsOpen( false );
		setNewGradient( { gradient: null, name: '', slug: '' } );
		setUserConfig( config );
	};

	const renderModal = ( isNew ) => {
		return (
			<Modal
				className="themer-settings--modal"
				title={
					isNew
						? __( 'Add New Gradient', 'default' )
						: __( 'Edit Gradient', 'default' )
				}
				shouldCloseOnEsc
				shouldCloseOnClickOutside
				onRequestClose={ () => {
					setCurrentGradient( {
						gradient: null,
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
							isNew ? newGradient?.name : currentGradient?.name
						}
						onChange={ ( name ) => {
							return isNew
								? setNewGradient( { ...newGradient, name } )
								: onChange( name, 'name' );
						} }
					/>
					<TextControl
						label={ __( 'Slug', 'themer' ) }
						value={
							isNew ? newGradient?.slug : currentGradient?.slug
						}
						onChange={ ( slug ) => {
							slug = formatSlug( slug );
							return isNew
								? setNewGradient( { ...newGradient, slug } )
								: onChange( slug, 'slug' );
						} }
					/>
					<GradientPicker
						value={
							isNew
								? newGradient?.gradient
								: currentGradient.gradient ?? null
						}
						onChange={ ( gradient ) => {
							return isNew
								? setNewGradient( {
										...newGradient,
										gradient,
								  } )
								: onChange( gradient, 'gradient' );
						} }
					/>
					<div className="themer-settings--modal__actions">
						<Button
							isPrimary
							disabled={
								! currentGradient?.gradient &&
								! newGradient?.gradient
							}
							onClick={ () => {
								return isNew
									? handleNewGradient()
									: setCurrentGradient( {
											gradient: null,
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
								handleDeleteGradient( currentGradient?.key );
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
				{ __( 'Gradient Settings', 'themer' ) }
			</span>
			<span className="themer--color-palette">
				{ value.map( ( val, index ) => {
					return (
						<div key={ index }>
							<Button
								className="components-color-list-picker__swatch-button"
								icon={
									val?.gradient ? (
										<ColorIndicator
											colorValue={ val?.gradient }
											className="components-color-list-picker__swatch-color"
										/>
									) : (
										swatch
									)
								}
								onClick={ () => {
									setCurrentGradient( {
										...val,
										key: index,
									} );
								} }
							/>
						</div>
					);
				} ) }
				<Button icon={ plus } onClick={ () => setIsOpen( ! isOpen ) } />
			</span>
			{ ! isEmpty( currentGradient?.gradient ) && renderModal() }
			{ isOpen && renderModal( true ) }
		</div>
	);
};

export default SettingsGradientComponent;
