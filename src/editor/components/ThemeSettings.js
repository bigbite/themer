/* eslint-disable react/no-danger */
import ColourField from "./fields/ColorField";
import { getTheme, setThemeSettings } from '../api';

const { useState, useRef, useEffect } = wp.element;
const { ColorPalette, ColorPicker, Panel, PanelHeader, PanelRow, PanelBody, Button } = wp.components;
const { __ } = wp.i18n;

/** The main app container */
const ThemeSettings = () => {

    const [colourSettings, setColourSettings] = useState([]);
    const [theme, setTheme] = useState([]);
    const colorItems = [];

    const fetchCurrentTheme = async () => {
        const response = await getTheme();
        console.log('theme', response);
        setTheme(response);
    };

    const setPaletteData = ($key, $data) => {
        console.log('data now in parent', $key, $data);
        console.log('theme', theme);

        // const currentValue = Object.entries(theme.settings.color.palette.theme).find(([key, val]) => $data === val);
        const newTheme = theme;
        const currentValue = newTheme.settings.color.palette.theme.filter(function (entry) { return entry.slug === $key; });

        currentValue.color = $data;

        setTheme(newTheme);



        console.log('current valuessss', currentValue);
    }

    const saveSettings = async () => {
        console.log('save');
        await setThemeSettings(
            theme
        );
    }

    useEffect(() => {
        fetchCurrentTheme();
    }, [true]);

    console.log('theme', theme);
    
    if (theme.length !== 0) {
        const themePallette = theme.settings.color.palette.theme;
        {themePallette.map((value) => (
            colorItems.push(<ColourField key={value.slug}
                color={ value.color }
                slug={ value.slug }
                name={ value.name }
                setPaletteData={setPaletteData}
                
            />)
        ))}
    }

    return (
    <>
        <Panel>
            <PanelBody
                title={ __( 'Global Colours' ) }
                icon={ '' }
                initialOpen={ true }
                onToggle={ (e) => console.log("toggled", e) }
            >
                <PanelRow>
                    {colorItems}
                </PanelRow>
            </PanelBody>
            <PanelBody
                title={ __( 'Block Settings' ) }
            >
                <PanelRow>
                </PanelRow>
            </PanelBody>
        </Panel>
        <Button 
            isPrimary
            onClick={ () => saveSettings() }
        >
            { __( 'Save' ) }
        </Button>
    </>
    );
};

export default ThemeSettings;