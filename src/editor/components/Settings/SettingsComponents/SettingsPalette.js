import { set } from 'lodash';
import { useContext } from '@wordpress/element';
import { __experimentalPaletteEdit as PaletteEdit } from '@wordpress/components';

import getThemeOption from '../../../../utils/get-theme-option';
import EditorContext from '../../../context/EditorContext';
import StylesContext from '../../../context/StylesContext';
/**
 * Reusable GradientPicker component
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 */
const Palette = ( { selector } ) => {
	const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const paletteValues = getThemeOption( selector, themeConfig ) || [];

	const onChange = ( value ) => {
		let config = structuredClone( userConfig );
		config = set( config, selector, value );
		setUserConfig( config );
	};

	console.log( selector );

	if ( selector === 'settings.blocks.core/audio.color.palette.theme' ) {
		return (
			<PaletteEdit
				colors={ paletteValues }
				emptyMessage="Colors are empty"
				onChange={ ( newVal ) => {
					onChange( newVal );
				} }
				paletteLabel="Colors"
			/>
		);
	}

	return (
		<PaletteEdit
			gradients={ paletteValues }
			emptyMessage="Gradients are empty"
			onChange={ ( newVal ) => {
				onChange( newVal );
			} }
			paletteLabel="Gradients"
		/>
	);
};

export default Palette;
