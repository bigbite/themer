import { set, get } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';
import { TextControl, ColorPicker, Button, Modal, ColorPalette} from '@wordpress/components';
import { plus } from '@wordpress/icons';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import StylesContext from '../../context/StylesContext';

const SettingsPaletteComponent = ( { selector, label } ) => {

    const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig ).custom || {};

    const [ newColor, setNewColor ] = useState( { color: '', name: '', slug: '' } );
    const [ currentColor, setCurrentColor ] = useState ( { value: '', key: '' } );
    const [ isOpen, setIsOpen ] = useState( false );

	const onChange = ( newValue ) => {
        let config = structuredClone( userConfig );
		config = set(
			config,
            `${selector}.custom[${currentColor.key}].color`, newValue );
		setUserConfig( config );
	};

    const handleDeleteColor = ( key ) => {
        let config = structuredClone( userConfig );
        let obj = get(
            config,
            `${selector}.custom`
        );

        obj.splice( key, 1 );

        config = set (
            config, 
            `${selector}.custom`, obj
        );
        setCurrentColor( { value: '', key: '' } );
        setUserConfig( config );
    };

    const handleNewColor = () => {
        let config = structuredClone( userConfig );
        let obj = get(
        config,
        `${selector}.custom`
        );

        obj.push({ ...newColor });
        config = set (
            config, 
            `${selector}.custom`, obj
        );
        setIsOpen( false );
        setNewColor( { color: '', name: '', slug: '' } );
        setUserConfig( config );
    }

    return (
        <div>
            <span className="themer--styles__item__title">
                { label }
            </span>
            <span class="themer--color-palette">
            <ColorPalette value={ currentColor.value } clearable={false} colors={ value } onChange={ ( newValue, key ) => setCurrentColor( {value: newValue, key } ) } disableCustomColors={true} />
            <Button icon={plus} onClick={()=>setIsOpen(!isOpen)}/>
            </span>
            { currentColor.value && 
            <Modal
            title={__('Edit Color', 'themer')}
            shouldCloseOnEsc
            shouldCloseOnClickOutside
            onRequestClose={() => setCurrentColor({ value: '', key: '' })}
            >
            <ColorPicker color={ currentColor.value } onChange={ ( newValue ) => onChange( newValue ) } />
            <Button isPrimary onClick={ ()=>{ setCurrentColor( { value: '', key: '' } ) } }>Save Color</Button>
            <Button isPrimary onClick={ ()=>{ handleDeleteColor( currentColor.key ) } }>Delete Color</Button>
            </Modal>
                }
            { isOpen && (
                <Modal
                title={__('Add New Color', 'themer')}
                shouldCloseOnEsc
                shouldCloseOnClickOutside
                onRequestClose={() => setIsOpen(!isOpen)}
                >
                    <TextControl label={ __( 'Name', 'themer' ) } value={ newColor.name } onChange={( name )=>{ setNewColor({ ...newColor, name }) }} />
                    <TextControl label={ __( 'Slug', 'themer' ) } value={ newColor.slug } onChange={( slug )=>{ setNewColor({ ...newColor, slug }) }} />
                    <ColorPicker color={ newColor.color } onChange={( color )=>{ setNewColor({ ...newColor, color }) }} />
                    <Button isPrimary onClick={ ()=>{ handleNewColor() } }>{ __( 'Add Color', 'themer' ) }</Button>
                </Modal>
            )}
        </div>
    )

}

export default SettingsPaletteComponent;