import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import StylesContext from '../../context/StylesContext';


const ColorSettings = ({selector}) => {
    const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig ) || {};
	const colorStyles = getThemeOption( selector, themeConfig );

	const handleNewValue = ( value, key ) => {
		const newColorStyles = { ...colorStyles, [ key ]: value };
		let config = structuredClone( userConfig );
		config = set( config, selector, newColorStyles );
		setUserConfig( config );
	};

    return ( <>
        <span className="themer--styles__item__title">
            { __( 'Color', 'themer' ) }
            {Object.keys(value).map((key) => {
                if (typeof value[key] !== 'object') {
                    return (
                        <ToggleControl 
                        key={key}
                        label={key}
                        checked={value[key]}
                        onChange={(newValue) => handleNewValue( newValue, key)}
                        />
                    )
                } 
            })
            // we need to handle objects here
            }
        </span>
    </>)
}

export default ColorSettings;