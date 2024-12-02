import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import StylesContext from '../../context/StylesContext';


const PositionSettings = ({selector}) => {
    const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig ) || {};
	const borderStyles = getThemeOption( selector, themeConfig );

	const handleNewValue = ( value, key ) => {
		const newBorderStyles = { ...borderStyles, [ key ]: value };
		let config = structuredClone( userConfig );
		config = set( config, selector, newBorderStyles );
		setUserConfig( config );
	};

    return ( <>
        <span className="themer--styles__item__title">
            { __( 'Border', 'themer' ) }
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
            }
        </span>
    </>)
}

export default PositionSettings;