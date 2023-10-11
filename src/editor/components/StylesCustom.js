/* eslint-disable jsdoc/check-line-alignment */
import { __ } from '@wordpress/i18n';
import { set } from 'lodash';
import { useContext } from '@wordpress/element';
import { TextareaControl } from '@wordpress/components';

import getThemeOption from '../../utils/get-theme-option';
import EditorContext from '../context/EditorContext';
import StylesContext from '../context/StylesContext';

/**
 * Reusable custom CSS component
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 */
const CustomCSS = ( { selector } ) => {
	const { themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const cssStyles = getThemeOption( selector, themeConfig );

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
			<span className="themer--blocks-item-component--styles--title is-filter">
				{ __( 'Custom CSS', 'themer' ) }
			</span>
			<TextareaControl
				help={
					<p>
						{ __( 'Check out this ', 'themer' ) }
						<a
							href="https://developer.wordpress.org/news/2023/04/per-block-css-with-theme-json/"
							target="_blank"
							rel="noreferrer"
						>
							{ __( 'WordPress blog post', 'themer' ) }
						</a>
						{ __( ' for help with syntax. ', 'themer' ) }
					</p>
				}
				value={ cssStyles }
				onChange={ ( newVal ) => handleNewValue( newVal ) }
			/>
		</>
	);
};

export default CustomCSS;
