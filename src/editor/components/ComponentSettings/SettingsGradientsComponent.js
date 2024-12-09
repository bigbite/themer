import { set, get } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext, useState, useEffect } from '@wordpress/element';
import { TextControl, GradientPicker, Button, Modal } from '@wordpress/components';
import { plus } from '@wordpress/icons';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import StylesContext from '../../context/StylesContext';

const SettingsGradientComponent = ( { selector, label } ) => {

    const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig ).custom || {};

    const [ newGradient, setNewGradient ] = useState( { gradient: null, name: '', slug: '' } );
    const [ currentGradient, setCurrentGradient ] = useState ( { value: '', key: '' } );
    const [ isOpen, setIsOpen ] = useState( false );

	const onChange = ( newValue ) => {
        let config = structuredClone( userConfig );
		config = set(
			config,
            `${selector}.custom[${currentGradient.key}].gradient`, newValue );
		setUserConfig( config );
	};

    useEffect(() => {
        setCurrentGradient( { value: value[currentGradient.key]?.gradient, key: currentGradient.key } );
    }, [ value ])

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
        setCurrentGradient( { value: '', key: '' } );
        setUserConfig( config );
    };

    const handleNewGradient = () => {
        let config = structuredClone( userConfig );
        let obj = get(
        config,
        `${selector}.custom`
        ) || [];
        obj.push({ ...newGradient });
        config = set (
            config, 
            `${selector}.custom`, obj
        );
        setIsOpen( false );
        setNewGradient( { gradient: '', name: '', slug: '' } );
        setUserConfig( config );
    }

    return (
        <div>
            <span className="themer--styles__item__title">
                { label }
            </span>
            <span class="themer--color-palette">
            <GradientPicker value={ currentGradient.value } clearable={ false } gradients={ value } onChange={ ( newValue, key ) => setCurrentGradient( { value: newValue, key } ) } disableCustomGradients={true} />
            <Button icon={plus} onClick={()=>setIsOpen(!isOpen)}/>
            </span>
            { currentGradient.value && 
            <Modal
            title={__('Edit Gradient', 'themer')}
            shouldCloseOnEsc
            shouldCloseOnClickOutside
            onRequestClose={() => setCurrentGradient({ value: '', key: '' })}
            >
            <GradientPicker value={ currentGradient.value ?? null } onChange={ ( newValue ) => onChange( newValue ) } />
            <Button isPrimary onClick={ ()=>{ setCurrentGradient( { value: '', key: '' } ) } }>Save Gradient</Button>
            <Button isPrimary onClick={ ()=>{ handleDeleteGradient( currentGradient.key ) } }>Delete Gradient</Button>
            </Modal>
                }
            { isOpen && (
                <Modal
                title={__('Add New Gradient', 'themer')}
                shouldCloseOnEsc
                shouldCloseOnClickOutside
                onRequestClose={() => setIsOpen(!isOpen)}
                >
                    <TextControl label={ __( 'Name', 'themer' ) } value={ newGradient.name } onChange={( name )=>{ setNewGradient({ ...newGradient, name }) }} />
                    <TextControl label={ __( 'Slug', 'themer' ) } value={ newGradient.slug } onChange={( slug )=>{ setNewGradient({ ...newGradient, slug }) }} />
                    <GradientPicker value={ newGradient.gradient ?? null } onChange={( gradient )=>{ setNewGradient({ ...newGradient, gradient }) }} />
                    <Button isPrimary onClick={ ()=>{ handleNewGradient() } }>{ __( 'Add Gradient', 'themer' ) }</Button>
                </Modal>
            )}
        </div>
    )

}

export default SettingsGradientComponent;