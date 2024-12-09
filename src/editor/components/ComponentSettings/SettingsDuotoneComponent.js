import { set, get } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';
import { TextControl, DuotonePicker, Button, Modal, ColorIndicator } from '@wordpress/components';
import { plus, swatch } from '@wordpress/icons';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import StylesContext from '../../context/StylesContext';
import { getGradientFromCSSColors } from '../../../utils/style-helpers';

const SettingsDuotoneComponent = ( { selector, label } ) => {

    const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig )?.custom || [];

    const [ newDuotone, setNewDuotone ] = useState( { colors: [], name: '', slug: '' } );
    const [ currentDuotone, setCurrentDuotone ] = useState ( { value: '', key: '' } );
    const [ isOpen, setIsOpen ] = useState( false );

	const onChange = ( newValue ) => {
        setCurrentDuotone( { value: newValue, key: currentDuotone.key } );
        let config = structuredClone( userConfig );
		config = set(
			config,
            `${selector}.custom[${currentDuotone.key}].colors`, newValue );
		setUserConfig( config );
	};

    const handleDeleteDuotone = ( key ) => {
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
        setCurrentDuotone( { value: '', key: '' } );
        setUserConfig( config );
    };

    const handleNewDuotone = () => {
        let config = structuredClone( userConfig );
        let obj = get(
        config,
        `${selector}.custom`
        ) || [];
        obj.push({ ...newDuotone });
        config = set (
            config, 
            `${selector}.custom`, obj
        );
        setIsOpen( false );
        setNewDuotone( { colors: [], name: '', slug: '' } );
        setUserConfig( config );
    }

    return (
        <div>
            <span className="themer--styles__item__title">
                { label }
            </span>
            <span class="themer--color-palette">
            { value.map((duotone, index) => {
                const color = getGradientFromCSSColors(duotone.colors);
                return (
                <div>
                    <Button 
                    className="components-color-list-picker__swatch-button"
                    icon={
                    duotone?.colors ?
                    <ColorIndicator 
                        colorValue={ color }
                        className="components-color-list-picker__swatch-color"
                        />
                    : swatch
                    } 
                    onClick={()=>{setCurrentDuotone({ value: duotone?.colors, key: index })}} />
                </div>
            )
            })}
            <Button icon={plus} onClick={()=>setIsOpen(!isOpen)}/>
            </span>
            { currentDuotone.value && 
            <Modal
            title={__('Edit Duotone', 'themer')}
            shouldCloseOnEsc
            shouldCloseOnClickOutside
            onRequestClose={() => setCurrentDuotone({ value: '', key: '' })}
            >
            <DuotonePicker value={ currentDuotone.value ?? null } duotonePalette={[]} colorPalette={[]} unsetable={ false } onChange={ ( newValue ) => onChange( newValue ) } />
            <Button isPrimary onClick={ ()=>{ setCurrentDuotone( { value: '', key: '' } ) } }>Save Duotone</Button>
            <Button isPrimary onClick={ ()=>{ handleDeleteDuotone( currentDuotone.key ) } }>Delete Duotone</Button>
            </Modal>
                }
            { isOpen && (
                <Modal
                title={__('Add New Duotone', 'themer')}
                shouldCloseOnEsc
                shouldCloseOnClickOutside
                onRequestClose={() => setIsOpen(!isOpen)}
                >
                    <TextControl label={ __( 'Name', 'themer' ) } value={ newDuotone.name } onChange={( name )=>{ setNewDuotone({ ...newDuotone, name }) }} />
                    <TextControl label={ __( 'Slug', 'themer' ) } value={ newDuotone.slug } onChange={( slug )=>{ setNewDuotone({ ...newDuotone, slug }) }} />
                    <DuotonePicker value={ newDuotone.colors ?? null } duotonePalette={[]} colorPalette={[]} onChange={( colors )=>{ setNewDuotone({ ...newDuotone, colors }) }} />
                    <Button isPrimary onClick={ ()=>{ handleNewDuotone() } }>{ __( 'Add Duotone', 'themer' ) }</Button>
                </Modal>
            )}
        </div>
    )

}

export default SettingsDuotoneComponent;
