import { set, get } from 'lodash';
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
		value: '',
		key: '',
	} );
	const [ isOpen, setIsOpen ] = useState( false );

	const onChange = ( newValue ) => {
		setCurrentGradient( { value: newValue, key: currentGradient.key } );
		let config = structuredClone( userConfig );
		config = set(
			config,
			`${ selector }.theme[${ currentGradient.key }].gradient`,
			newValue
		);
		setUserConfig( config );
	};

	const handleDeleteGradient = ( key ) => {
		let config = structuredClone( userConfig );
		const obj = get( config, `${ selector }.theme` );

		obj.splice( key, 1 );

		config = set( config, `${ selector }.theme`, obj );
		setCurrentGradient( { value: '', key: '' } );
		setUserConfig( config );
	};

	const handleNewGradient = () => {
		let config = structuredClone( userConfig );
		const obj = get( config, `${ selector }.theme` ) || [];
		obj.push( { ...newGradient } );
		config = set( config, `${ selector }.theme`, obj );
		setIsOpen( false );
		setNewGradient( { gradient: '', name: '', slug: '' } );
		setUserConfig( config );
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
										value: val?.gradient,
										key: index,
									} );
								} }
							/>
						</div>
					);
				} ) }
				<Button icon={ plus } onClick={ () => setIsOpen( ! isOpen ) } />
			</span>
			{ currentGradient.value && (
				<Modal
					title={ __( 'Edit Gradient', 'themer' ) }
					shouldCloseOnEsc
					shouldCloseOnClickOutside
					onRequestClose={ () =>
						setCurrentGradient( { value: '', key: '' } )
					}
				>
					<GradientPicker
						value={ currentGradient.value ?? null }
						onChange={ ( newValue ) => onChange( newValue ) }
					/>
					<Button
						isPrimary
						onClick={ () => {
							setCurrentGradient( { value: '', key: '' } );
						} }
					>
						Save Gradient
					</Button>
					<Button
						isPrimary
						onClick={ () => {
							handleDeleteGradient( currentGradient?.key );
						} }
					>
						Delete Gradient
					</Button>
				</Modal>
			) }
			{ isOpen && (
				<Modal
					title={ __( 'Add New Gradient', 'themer' ) }
					shouldCloseOnEsc
					shouldCloseOnClickOutside
					onRequestClose={ () => setIsOpen( ! isOpen ) }
				>
					<TextControl
						label={ __( 'Name', 'themer' ) }
						value={ newGradient?.name }
						onChange={ ( name ) => {
							setNewGradient( { ...newGradient, name } );
						} }
					/>
					<TextControl
						label={ __( 'Slug', 'themer' ) }
						value={ newGradient?.slug }
						onChange={ ( slug ) => {
							setNewGradient( { ...newGradient, slug } );
						} }
					/>
					<GradientPicker
						value={ newGradient?.gradient ?? null }
						onChange={ ( gradient ) => {
							setNewGradient( { ...newGradient, gradient } );
						} }
					/>
					<Button
						isPrimary
						onClick={ () => {
							handleNewGradient();
						} }
					>
						{ __( 'Add Gradient', 'themer' ) }
					</Button>
				</Modal>
			) }
		</div>
	);
};

export default SettingsGradientComponent;
