import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { __experimentalBorderBoxControl as BorderBoxControl } from '@wordpress/components';
import { ToggleControl, DuotonePicker } from '@wordpress/components';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import StylesContext from '../../context/StylesContext';

import DuotoneSettingsComponent from './DuotoneSettingsComponent';
import PaletteSettingsComponent from './PaletteSettingsComponent';

/**
 * Reusable border control style component
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 */
const SettingsComponent = ( { selector } ) => {
	const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig ) || {};
	const outlineStyles = getThemeOption( selector, themeConfig );
    console.log(value);

	const handleNewValue = ( value, key ) => {
		const newOutlineStyles = { ...outlineStyles, [ key ]: value };
		let config = structuredClone( userConfig );
		config = set( config, selector, newOutlineStyles );
		setUserConfig( config );
	};

	return (
		<>
			<span className="themer--styles__item__title">
				{ __( 'Settings', 'themer' ) }
                {Object.keys(value).map((key) => {
                    if (typeof value[key] !== 'object') {
                    return (
                        <ToggleControl 
                        key={key}
                        label={key}
                        checked={value[key]}
                        onChange={(newValue) => handleNewValue(newValue, key)}
                        />
                    )
                } 
                    // need to handle objects here
            })
                }
              
        

			</span>
		</>
	);
};

export default SettingsComponent;
