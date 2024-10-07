import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { __experimentalBorderBoxControl as BorderBoxControl } from '@wordpress/components';

import getThemeOption from '../../utils/get-theme-option';
import EditorContext from '../context/EditorContext';
import StylesContext from '../context/StylesContext';

import StylesBorderRadius from './StylesBorderRadius';

/**
 * Reusable border control style component
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 */
const Border = ( { selector } ) => {
	const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig );
	const themePalette = getThemeOption(
		'settings.color.palette.theme',
		themeConfig
	);

	const onChange = ( newValue ) => {
		// If the value has a radius, we need to merge it with the new value
		const valueRadius = value?.radius;
		console.log( valueRadius );
		let updatedValue = newValue;
		if ( valueRadius ) {
			updatedValue = {
				...newValue,
				radius: valueRadius,
			};
		}

		// Set the new value in the user config
		let config = structuredClone( userConfig );
		config = set( config, selector, updatedValue );
		setUserConfig( config );
	};

	return (
		<>
			<span className="themer--styles__item__title">
				{ __( 'Border and radius', 'themer' ) }
			</span>
			<div className="themer--styles__item__columns themer--styles__item__columns--2">
				<div>
					<span className="themer--styles__item__label">
						{ __( 'Border', 'themer' ) }
					</span>
					<BorderBoxControl
						colors={ themePalette }
						onChange={ onChange }
						value={ value }
					/>
				</div>
				<div>
					<span className="themer--styles__item__label">
						{ __( 'Radius', 'themer' ) }
					</span>
					<StylesBorderRadius
						selector={ `${ selector }.radius` }
						onChange={ onChange }
						value={ value }
					/>
				</div>
			</div>
		</>
	);
};

export default Border;
