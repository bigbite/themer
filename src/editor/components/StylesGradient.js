import { set } from 'lodash';
import { useContext } from '@wordpress/element';
import { GradientPicker } from '@wordpress/components';

import getThemeOption from '../../utils/get-theme-option';
import EditorContext from '../context/EditorContext';
import StylesContext from '../context/StylesContext';
/**
 * Reusable GradientPicker component
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 */
const Gradient = ( { selector } ) => {
	const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig );

	const defaultPalette = getThemeOption(
		'settings.color.gradients.default',
		themeConfig
	);
	const themePalette = getThemeOption(
		'settings.color.gradients.theme',
		themeConfig
	);
	const defaultGradientOption = getThemeOption(
		'settings.color.defaultGradients',
		themeConfig
	);
	const customGradientOption = getThemeOption(
		'settings.color.customGradient',
		themeConfig
	);

	const onChange = ( newValue ) => {
		let config = structuredClone( userConfig );
		config = set( config, selector, newValue );
		setUserConfig( config );
	};

	// We only want to populate gradients object with defaultPalette if defaultGradientOption is true (which it is by default)
	// and we only want to populate themePalette if themePalette is not empty to avoid unnecessary headings being created.
	const getGradients = () => {
		const gradients = [];
		if ( themePalette ) {
			gradients.push( {
				name: 'Theme',
				gradients: themePalette,
			} );
		}
		if ( defaultGradientOption && defaultPalette ) {
			gradients.push( {
				name: 'Default',
				gradients: defaultPalette,
			} );
		}
		return gradients;
	};

	if ( getGradients().length > 0 ) {
		return (
			<div key="Gradient" className="themer--styles__item__column">
				<span className="themer--styles__item__label">Gradient</span>
				<GradientPicker
					value={ value }
					onChange={ onChange }
					gradients={ getGradients() }
					disableCustomGradients={ ! customGradientOption }
				/>
			</div>
		);
	}
};

export default Gradient;
