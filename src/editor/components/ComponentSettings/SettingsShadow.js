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

const SettingsShadow = ( { selector, description } ) => {
	const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig ) || [];
	const customPresets = value?.presets?.custom || [];

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
			get( config, `${ selector }.presets.custom[${ index }]` )
		);

		obj = {
			...obj,
			name: currentPreset?.name,
			slug: currentPreset?.slug,
			shadow: currentPreset?.shadow,
		};
		config = set( config, `${ selector }.presets.custom[${ index }]`, obj );
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
		const obj = get( config, `${ selector }.presets.custom` ) || [];
		obj.push( { ...newPreset } );
		config = set( config, `${ selector }.presets.custom`, obj );
		setUserConfig( config );
		setShow( false );
	};

	const handleDeletePreset = ( index ) => {
		let config = structuredClone( userConfig );
		const obj = get( config, `${ selector }.presets.custom` );
		obj.splice( index, 1 );
		config = set( config, `${ selector }.presets.custom`, obj );
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
			<span className="themer--settings__item__title">
				{ __( 'Shadow Settings', 'themer' ) }
			</span>
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
				{ __( 'Custom Presets', 'themer' ) }
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
						<Modal onRequestClose={ () => setShow( false ) }>
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
