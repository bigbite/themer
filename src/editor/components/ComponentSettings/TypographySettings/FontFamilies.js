import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';
import { ToggleControl, Button, TextControl } from '@wordpress/components';
import { plus } from '@wordpress/icons';

import FontFace from './FontFace'
import getThemeOption from '../../../../utils/get-theme-option';
import EditorContext from '../../../context/EditorContext';
import StylesContext from '../../../context/StylesContext';

const FontFamilies = ({ selector }) => {
    const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig ) || [];
    const fontFamilies = value?.fontFamilies?.custom || [];

    const handleNewValue = ( newValue, key ) => {
        console.log('test');
		let config = structuredClone( userConfig );
		config = set( config, [ selector, key ].join( '.' ), newValue );
        console.log(config);
		setUserConfig( config );
	};

    return (
        <div>
            <h2>Font Family</h2>
            {/* Font Face - object { fontFamily, FontStretch, FontStyle, FontWeight } */
            /* src - array with a url */}
            {/* font family - string, name - string, slug - string */}

            <h3>Font Family</h3>
            <TextControl label={'Font Family'} value={fontFamilies[0]?.fontFamily} onChange={(val)=>{handleNewValue(val, 'fontFamily')}}/>
            <TextControl label={'name'} value={fontFamilies[0]?.name} onChange={(val)=>{handleNewValue(val, 'name')}}/>
            <TextControl label={'slug'} value={fontFamilies[0]?.slug} onChange={(val)=>{handleNewValue(val, 'slug')}}/>
            <FontFace familyIndex={0} selector={`${selector}.fontFace`} />
        </div>
    )
}

export default FontFamilies;