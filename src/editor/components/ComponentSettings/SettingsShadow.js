import { set, get } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';
import {
	ToggleControl,
	TextControl,
	Modal,
	Button,
} from '@wordpress/components';
import { plus } from '@wordpress/icons';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import StylesContext from '../../context/StylesContext';

/**
 * Component for Shadow settings
 *
 * @param {Object} props             Component props
 * @param {string} props.selector    Property target selector
 * @param {string} props.description Property description
 */
const SettingsShadow = ( { selector, description } ) => {
	const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig ) || [];
	const customPresets = value?.presets?.theme || [];

	const [ show, setShow ] = useState( false );
	const [ newPreset, setNewPreset ] = useState( {
		name: '',
		slug: '',
		shadow: '',
	} );
	const [ currentPreset, setCurrentPreset ] = useState( {
		name: '',
		slug: '',
		shadow: '',
		index: '',
	} );

	const handleNewValue = ( newValue, key ) => {
		let config = structuredClone( userConfig );
		config = set( config, [ selector, key ].join( '.' ), newValue );
		setUserConfig( config );
	};

	const handleNewPreset = ( index ) => {
		let config = structuredClone( userConfig );
		let obj = structuredClone(
			get( config, `${ selector }.presets.theme[${ index }]` )
		);

		obj = {
			...obj,
			name: currentPreset?.name,
			slug: currentPreset?.slug,
			shadow: currentPreset?.shadow,
		};
		config = set( config, `${ selector }.presets.theme[${ index }]`, obj );
		setUserConfig( config );

		setCurrentPreset( {
			name: '',
			slug: '',
			shadow: '',
			index: '',
		} );
	};

	const pushNewPreset = () => {
		let config = structuredClone( userConfig );
		const obj = get( config, `${ selector }.presets.theme` ) || [];
		obj.push( { ...newPreset } );
		config = set( config, `${ selector }.presets.theme`, obj );
		setUserConfig( config );
		setShow( false );
	};

	const handleDeletePreset = ( index ) => {
		let config = structuredClone( userConfig );
		const obj = get( config, `${ selector }.presets.theme` );
		obj.splice( index, 1 );
		config = set( config, `${ selector }.presets.theme`, obj );
		setUserConfig( config );
		setCurrentPreset( {
			name: '',
			slug: '',
			shadow: '',
			index: '',
		} );
	};

	return (
		<>
			{ description && (
				<p className="themer--settings__item__description">
					{ description }
				</p>
			) }
			<ToggleControl
				label={ __( 'Default Presets', 'themer' ) }
				checked={ value?.defaultPresets }
				onChange={ ( val ) => {
					handleNewValue( val, 'defaultPresets' );
				} }
			/>
			<div className="themer--shadow-options">
				<div className="themer--settings__item__title">
					{ __( 'Custom Presets', 'themer' ) }
				</div>
				{ customPresets.map( ( preset, index ) => {
					return (
						<Button
							onClick={ () => {
								setCurrentPreset( {
									name: preset?.name,
									slug: preset?.slug,
									shadow: preset?.shadow,
									index,
								} );
							} }
							key={ index }
							variant="secondary"
						>
							{ preset.name }
						</Button>
					);
				} ) }
			</div>
			{
				<span>
					<Button icon={ plus } onClick={ () => setShow( ! show ) }>
						{ __( 'Add New Shadow Preset', 'themer' ) }
					</Button>
					{ show && (
						<Modal
							className="themer-settings--modal"
							title={ __( 'Add New Shadow', 'themer' ) }
							shouldCloseOnEsc
							shouldCloseOnClickOutside
							onRequestClose={ () => setShow( false ) }
						>
							<TextControl
								label={ __( 'Name', 'themer' ) }
								value={ newPreset.name }
								onChange={ ( name ) =>
									setNewPreset( { ...newPreset, name } )
								}
							/>
							<TextControl
								label={ __( 'Slug', 'themer' ) }
								value={ newPreset.slug }
								onChange={ ( slug ) =>
									setNewPreset( { ...newPreset, slug } )
								}
							/>
							<TextControl
								label={ __( 'Shadow', 'themer' ) }
								value={ newPreset.shadow }
								onChange={ ( shadow ) =>
									setNewPreset( { ...newPreset, shadow } )
								}
							/>
							<Button onClick={ () => pushNewPreset() }>
								{ __( 'Add Preset', 'themer' ) }
							</Button>
						</Modal>
					) }
				</span>
			}
			{ currentPreset.index !== '' && (
				<Modal
					className="themer-settings--modal"
					title={ __( 'Edit Shadow', 'themer' ) }
					shouldCloseOnEsc
					shouldCloseOnClickOutside
					onRequestClose={ () =>
						setCurrentPreset( {
							name: '',
							slug: '',
							shadow: '',
							index: '',
						} )
					}
				>
					<TextControl
						label={ __( 'Name', 'themer' ) }
						value={ currentPreset.name }
						onChange={ ( name ) =>
							setCurrentPreset( { ...currentPreset, name } )
						}
					/>
					<TextControl
						label={ __( 'Slug', 'themer' ) }
						value={ currentPreset.slug }
						onChange={ ( slug ) =>
							setCurrentPreset( { ...currentPreset, slug } )
						}
					/>
					<TextControl
						label={ __( 'Shadow', 'themer' ) }
						value={ currentPreset.shadow }
						onChange={ ( shadow ) =>
							setCurrentPreset( { ...currentPreset, shadow } )
						}
					/>
					<Button
						onClick={ () => {
							handleNewPreset( currentPreset?.index );
						} }
					>
						Save
					</Button>
					<Button
						onClick={ () => {
							handleDeletePreset( currentPreset?.index );
						} }
					>
						Delete
					</Button>
				</Modal>
			) }
		</>
	);
};

export default SettingsShadow;
