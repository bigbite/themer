import { set, get, values } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { __experimentalBorderBoxControl as BorderBoxControl } from '@wordpress/components';
import { ToggleControl, DuotonePicker, DuotoneSwatch, ColorPicker, ColorPalette, Button, TextControl, Popover } from '@wordpress/components';
import { useState } from '@wordpress/element';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import StylesContext from '../../context/StylesContext';

const PaletteSettingsComponent = ({selector}) => {

    const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig ).theme;
	const themePalette = getThemeOption(
		'settings.color.palette.theme',
		themeConfig
	);
    const [ newPalette, setNewPalette] = useState(false);

    const onChange = ( newValue, key, slug ) => {
        console.log(newValue, key, slug);
        let config = structuredClone( userConfig );

        // config = get(
		// 	config,
		// 	[ selector, key ].join( '.' ),
		// 	hexToVar( newValue, themePalette ) ?? ''
		// );
        console.log(themeConfig);

    };

    return (
        <div>
            <h3>Palette</h3>
            {
            Object.keys(value).map((key) => {
                    return (
                        <div>
                            <h4>{value[key]?.name}</h4>
                            <TextControl label='name' value={value[key]?.name} onChange={( val ) => onChange( val, key, value[key]?.slug ) } />
                            <TextControl label='slug' value={value[key]?.slug}/>
                            <TextControl label='color' value={value[key]?.color} />
                        </div>
                    )
            })
        }
            <Button onClick={()=> {setNewPalette(!newPalette)}}>Add New</Button>

            {/* { newPalette && (
                <Popover>
                <TextControl label='name' />
                <TextControl label='slug' />
                <ColorPicker />
                <Button >Save</Button>
                </Popover>
            ) } */}

        </div>

        
    )
}

export default PaletteSettingsComponent;