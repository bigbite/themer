/* eslint-disable react/no-danger */
const { useState } = wp.element;
const { TextControl, ColorPalette, ColorPicker, Panel, PanelHeader, PanelRow, PanelBody } = wp.components;
const { __ } = wp.i18n;

/** The main app container */
const ColorField = ( props ) => {

    const [paletteVisible, setPaletteVisible] = useState(false);

    console.log('color is here', props);
    console.log('palttete', paletteVisible);

    return (
    <>  
        <div className="colorField">
            <div 
                className="colorPickerPreview" 
                style={{backgroundColor: props.color}}
                onClick={() => setPaletteVisible(!paletteVisible)}
            >
            </div>
            {paletteVisible && 
                <ColorPicker
                    className="colorPicker"
                    color={props.color}
                    defaultValue='#ff9900'
                    onChange={($val) => props.setPaletteData(props.slug, $val)}
                />
            }
            <TextControl
                label={ __( 'Name' ) }
                value={ props.name }
                onChange={ e => console.log(e) }
            />
            <TextControl
                label={ __( 'Slug' ) }
                value={ props.slug }
                onChange={ e => console.log(e) }
            />
        </div>
    </>
    );
};

export default ColorField;