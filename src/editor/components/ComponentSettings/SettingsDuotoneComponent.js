import { set, get } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';
import { TextControl, ColorPicker, Button, Modal, PanelBody } from '@wordpress/components';
import { cancelCircleFilled } from '@wordpress/icons';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import StylesContext from '../../context/StylesContext';

const SettingsDuotoneComponent = ( { selector, label } ) => {

    const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig ).custom || {};
    const [newDuotone, setNewDuotone] = useState( { name: '', colors: ['', ''], slug: '' } );
    const [isOpen, setIsOpen] = useState( false );

	const onChange = ( newValue, key, field ) => {
        let config = structuredClone( userConfig );
		config = set(
			config,
            `${selector}.custom[${key}].${field}`, newValue );
		setUserConfig( config );
	};

   const handleNewDuotone = ( newVal, index ) => {
        let newState = structuredClone( newDuotone );
        newState.colors[index] = newVal;
        setNewDuotone( newState );
    }

    const saveNewDuotone = () => {
        let config = structuredClone( userConfig );
        let obj = get(
        config,
        `${selector}.custom`
        );

        if ( !obj ) {
            config = set(
                config,
                `${selector}.custom`, []
            );
        }

        obj = get( config, 
            `${selector}.custom`
        )

        obj.push(newDuotone);

        config = set (
            config, 
            `${selector}.custom`, obj
        );

        setUserConfig( config );
        setNewDuotone( { name: '', colors: ['', ''], slug: '' } );
        setIsOpen( false );
    }

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

        setUserConfig( config );
    };

    return (
        <div>
            <span className="themer--styles__item__title">
                { __( label, 'themer' ) }
            </span>
            <div>
            {isOpen && (
                <Modal 
                shouldCloseOnEsc
                shouldCloseOnClickOutside
                onRequestClose={() => setIsOpen(!isOpen)}
                title={__('Add Duotone', 'themer')}>
                <div class="themer--styles__modal-wrapper">
                <TextControl label={ __( 'Name', 'themer' ) } onChange={( name )=>setNewDuotone( {...newDuotone, name} )} />
                <TextControl label={ __( 'Slug', 'themer' ) } onChange={(slug)=>setNewDuotone({ ...newDuotone, slug })}/>
                <div class="themer--styles__colorPicker-wrapper">
                    <ColorPicker label={ __( 'Color 1', 'themer' ) } onChange={( color )=>{handleNewDuotone(color, [0]) }}/>
                    <ColorPicker label={ __( 'Color 2', 'themer' ) } onChange={( color )=>{handleNewDuotone(color, [1]) }}/>
                </div>
                <Button  
                    onClick={() => { saveNewDuotone() }}
                    isPrimary>
                        Save Duotone
                </Button>
                
                </div>
                </Modal> 
                )
            }
             </div>
            {value.length > 0 && 
                value.map(( val, key ) => {
                    return (
                        <div class="themer--item-wrapper">
                            <PanelBody title={ val['name'] } initialOpen={ false }>
                                <TextControl label={ __( 'Name', 'themer' ) } value={ val['name'] } onChange={( newValue )=>{ onChange( newValue, key, 'name' ) }}/>
                                <TextControl label={ __( 'Slug', 'themer' ) } value={ val['slug'] } onChange={( newValue )=>{ onChange( newValue, key, 'slug' ) }}/>
                                <div class="themer--styles__colorPicker-wrapper">
                                    <span class="themer--styles__item__title">
                                    {__('Color 1', 'themer')}
                                    <ColorPicker color={ val['colors'][0] } onChange={ ( color )=>{onChange( color, key, 'colors[0]' )} }/>
                                    </span>
                                    <span class="themer--styles__item__title">
                                    {__('Color 2', 'themer')}
                                    <ColorPicker color={ val['colors'][1] } onChange={ ( color )=>{onChange( color, key, 'colors[1]' )} }/>
                                    </span>
                                </div>    
                            </PanelBody>
                            <Button icon={ cancelCircleFilled } onClick={ ()=>{ handleDeleteDuotone( key ) } } />
                        </div>
                    )
                })
            }
            <Button isPrimary onClick={ () => setIsOpen( !isOpen ) }>Add Duotone</Button>
        </div>
    )

};

export default SettingsDuotoneComponent;