import { set, get } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';
import { TextControl, GradientPicker, Button, Modal, PanelBody } from '@wordpress/components';
import { cancelCircleFilled } from '@wordpress/icons';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import StylesContext from '../../context/StylesContext';

const SettingsGradientsComponent = ( { selector, label } ) => {

    const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig ).custom || {};
    const [newGradient, setNewGradient] = useState( { name: '', gradient: '', slug: '' } );
    const [isOpen, setIsOpen] = useState( false );

	const onChange = ( newValue, key, field ) => {
        let config = structuredClone( userConfig );
		config = set(
			config,
            `${selector}.custom[${key}].${field}`, newValue );
		setUserConfig( config );
	};

    const saveNewGradient = () => {
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

        obj.push(newGradient);

        config = set (
            config, 
            `${selector}.custom`, obj
        );

        setUserConfig( config );
        setNewGradient( { name: '', gradient: '', slug: '' } );
        setIsOpen( false );
    }

    const handleDeleteGradient = ( key ) => {
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
                title={__('Add Gradient', 'themer')}>
                <div class="themer--styles__modal-wrapper">
                <TextControl label={ __( 'Name', 'themer' ) } value={ newGradient.name } onChange={( name )=>setNewGradient( {...newGradient, name} )} />
                <TextControl label={ __( 'Slug', 'themer' ) } onChange={(slug)=>setNewGradient({ ...newGradient, slug })}/>
                <div class="themer--styles__colorPicker-wrapper">
                    <GradientPicker value={ newGradient.gradient } onChange={( gradient )=>{ setNewGradient({ ...newGradient, gradient }) }}/>
                </div>
                <Button  
                    onClick={() => { saveNewGradient() }}
                    isPrimary>
                        Save Gradient
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
                                    {__('Gradient', 'themer')}
                                    <GradientPicker value={ val['gradient'] } onChange={ ( gradient )=>{ onChange( gradient, key, 'gradient' )} }/>
                                    </span>
                                </div>    
                            </PanelBody>
                            <Button icon={ cancelCircleFilled } onClick={ ()=>{ handleDeleteGradient( key ) } } />
                        </div>
                    )
                })
            }
            <Button isPrimary onClick={ () => setIsOpen( !isOpen ) }>Add Gradient</Button>
        </div>
    )

};

export default SettingsGradientsComponent;