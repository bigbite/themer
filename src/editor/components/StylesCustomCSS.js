/* eslint-disable jsdoc/check-line-alignment */
import { __ } from '@wordpress/i18n';
import { set } from 'lodash';
import { useContext } from '@wordpress/element';
import { TextareaControl } from '@wordpress/components';

import getThemeOption from '../../utils/get-theme-option';
import EditorContext from '../context/EditorContext';
import StylesContext from '../context/StylesContext';
import ClearCustomisation from './ClearCustomisation';

/**
 * Reusable custom CSS component
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 */
const CustomCSS = ( { selector } ) => {
	const { themeConfig, userConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const cssStyles = getThemeOption( selector, themeConfig ) ?? '';

	/**
	 * Updates the theme config with the new value.
	 *
	 * @param {string} newVal - The new value.
	 */
	const handleNewValue = ( newVal ) => {
		let config = structuredClone( themeConfig );
		config = set( config, selector, newVal );
		setUserConfig( config );
	};

	return (
		<>
			<span className="themer--blocks-item-component--styles--title is-custom-css">
				{ __( 'Custom CSS', 'themer' ) }
				<ClearCustomisation
					selector={ selector }
					userConfig={ userConfig }
					themeConfig={ cssStyles }
				/>
			</span>
			<TextareaControl
				help={
					<p>
						<a
							href={ encodeURI(
								'https://developer.wordpress.org/news/2023/04/per-block-css-with-theme-json/'
							) }
							target="_blank"
							rel="noreferrer"
						>
							{ __( 'CSS syntax help', 'themer' ) }
						</a>
					</p>
				}
				value={ cssStyles }
				onChange={ handleNewValue }
			/>
		</>
	);
};

export default CustomCSS;
