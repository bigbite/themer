import { set, get } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';
import {
	ToggleControl,
	TextControl,
	Modal,
	Button,
} from '@wordpress/components';
import { plus, cancelCircleFilled } from '@wordpress/icons';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import StylesContext from '../../context/StylesContext';

const SettingsShadow = ( { selector } ) => {
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

	const handleNewValue = ( newValue, key ) => {
		let config = structuredClone( userConfig );
		config = set( config, [ selector, key ].join( '.' ), newValue );
		setUserConfig( config );
	};

	const pushNewPreset = () => {
		let config = structuredClone( userConfig );
		let obj = get( config, `${ selector }.presets.custom` ) || [];
		obj.push( { ...newPreset } );
		config = set( config, `${ selector }.presets.custom`, obj );
		setUserConfig( config );
		setShow( false );
	};

	const handleDeletePreset = ( index ) => {
		let config = structuredClone( userConfig );
		let obj = get( config, `${ selector }.presets.custom` );

		obj.splice( index, 1 );

		config = set( config, `${ selector }.presets.custom`, obj );
		setUserConfig( config );
	};

	return (
		<>
			<span className="themer--styles__item__title">
				{ __( 'Shadow Settings', 'themer' ) }
			</span>
			<ToggleControl
				label={ __( 'Default Presets', 'themer' ) }
				checked={ value?.defaultPresets }
				onChange={ ( val ) => {
					handleNewValue( val, 'defaultPresets' );
				} }
			/>
			{ __( 'Custom Presets', 'themer' ) }
			{ customPresets.map( ( preset, index ) => {
				return (
					<div>
						{ preset.name }
						<TextControl
							label={ __( 'Name', 'themer' ) }
							value={ preset.name }
							onChange={ ( val ) =>
								handleNewValue(
									val,
									`presets.custom.${ index }.name`
								)
							}
						/>
						<TextControl
							label={ __( 'Slug', 'themer' ) }
							value={ preset.slug }
							onChange={ ( val ) =>
								handleNewValue(
									val,
									`presets.custom.${ index }.slug`
								)
							}
						/>
						<TextControl
							label={ __( 'Shadow', 'themer' ) }
							value={ preset.shadow }
							onChange={ ( val ) =>
								handleNewValue(
									val,
									`presets.custom.${ index }.shadow`
								)
							}
						/>
						<Button
							icon={ cancelCircleFilled }
							onClick={ () => handleDeletePreset( index ) }
						/>
					</div>
				);
			} ) }
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
		</>
	);
};

export default SettingsShadow;
