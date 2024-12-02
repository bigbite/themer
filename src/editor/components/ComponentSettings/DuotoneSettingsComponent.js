import { set, values } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { __experimentalBorderBoxControl as BorderBoxControl } from '@wordpress/components';
import { ToggleControl, DuotonePicker, DuotoneSwatch, ColorPicker, ColorPalette } from '@wordpress/components';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import StylesContext from '../../context/StylesContext';

const DuotoneSettingsComponent = ({selector}) => {

    const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig ).default;
	const themePalette = getThemeOption(
		'settings.color.palette.theme',
		themeConfig
	);


	const onChange = ( newValue ) => {
        console.log(newValue);

	};

    // we need to set an array of two colours, a name and a slug for the duotone.

    return (
        <div>
            {
        Object.keys(value).map((key) => {
           return (
            <div>
            {/* {value[key].name} */}
            {console.log(value[key])}
            {/* <DuotonePicker duotonePalette={value[key]} /> */}
            {/* <DuotoneSwatch values={[value[key].colors]} /> */}
            </div>
           )
        } )
    }

        <DuotonePicker duotonePalette={value} onChange={onChange} />
        </div>
    )

};

export default DuotoneSettingsComponent;