import { set, get } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';
import { ToggleControl, Button, TextControl, Modal } from '@wordpress/components';
import { plus } from '@wordpress/icons';

import getThemeOption from '../../../../utils/get-theme-option';
import EditorContext from '../../../context/EditorContext';
import StylesContext from '../../../context/StylesContext';

const FontFace = ( { familyIndex, selector } ) => {
    const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig ) || [];

    const [ show, setShow ] = useState(false);
    const [ newFontFace, setNewFontFace ] = useState({ fontFamily: '', fontStretch: '', fontStyle: '', fontWeight: '' });

    const handleNewValue = ( newValue, key ) => {
		let config = structuredClone( userConfig );
		config = set( config, [ selector, key ].join( '.' ), newValue );
		setUserConfig( config );
	};

    const pushNewFontFace = () => {
        let config = structuredClone( userConfig );
        let obj = get( config, `${ selector }` ) || [];
        obj.push( { ...newFontFace } );
        config = set( config, `${ selector }`, obj );
        setUserConfig( config );
    }

    console.log(value);

    const fams = (themeConfig?.settings?.typography?.fontFamilies?.custom[0]?.fontFace);

    return (
        <div>
            <h2>Font Face</h2>
            <Button label={'Add Font Face'} icon={plus} onClick={ () => setShow( !show ) } />
            
            { fams.map( (fam, index) => {
                console.log(fam);
                return (
                    <Button>{fam.fontFamily}</Button>
                )
        })
            }
            {/* Font Face - object { fontFamily, FontStretch, FontStyle, FontWeight } */
            /* src - array with a url */}
            {/* font family - string, name - string, slug - string */}
            {show &&
            <Modal onRequestClose={ ()=>setShow(false) }>
            <TextControl label={'Font Family'} value={value?.fontFamily} onChange={(fontFamily)=>{ setNewFontFace( { ...newFontFace, fontFamily } )}} />
            <TextControl label={'Font Stretch'} value={value?.fontStretch} onChange={(fontStretch)=>{ setNewFontFace( { ...newFontFace, fontStretch } )}} />
            <TextControl label={'Font Style'} value={value?.fontStyle} onChange={(fontStyle)=>{ setNewFontFace( { ...newFontFace, fontStyle } )}} />
            <TextControl label={'Font Weight'} value={value?.fontWeight} onChange={(fontWeight)=>{ setNewFontFace( { ...newFontFace, fontWeight } )}} />

            {/* <TextControl label={'src'}/> */}
            <Button label={'Save Font Face'} onClick={pushNewFontFace}>Save</Button>
            </Modal>
            }
        </div>
    )
}

export default FontFace;