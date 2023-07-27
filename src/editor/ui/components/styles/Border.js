import { set, merge } from 'lodash';
import { __ } from '@wordpress/i18n';
import { select, dispatch } from '@wordpress/data';
import { useContext, useState } from '@wordpress/element';
import { __experimentalBorderBoxControl as BorderBoxControl } from '@wordpress/components';

import getThemeOption from '../../utils/get-theme-option';
import EditorContext from '../../../context/EditorContext';

/**
 * Reusable border control style component
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 */
const Border = ( { selector } ) => {
	const { globalStylesId, themeConfig } = useContext( EditorContext );
	console.log(
		'pullquote border',
		themeConfig?.styles?.blocks?.[ 'core/pullquote' ]?.border
	);

	const colors = getThemeOption(
		'settings.color.palette.theme',
		themeConfig
	);
	const value = getThemeOption( selector, themeConfig );

	const [ text, setText ] = useState( value );
	const context = { ...{} };

	/**
	 * updates entity record on field edit
	 *
	 * @param {*} newValue
	 */
	const edit = ( newValue ) => {
		const updated = set( context, selector, newValue );
		const newObj = merge( themeConfig, updated );
		dispatch( 'core' ).editEntityRecord(
			'root',
			'globalStyles',
			globalStylesId,
			{
				styles: newObj.styles || {},
				settings: newObj.settings || {},
			}
		);
	};

	/**
	 * gets field path and value and passes to edit
	 *
	 * @param {Event} e Change event.
	 */
	const onChange = ( e ) => {
		setText( e );
		edit( e );
	};

	return (
		<BorderBoxControl
			colors={ colors }
			label={ __( 'Borders', 'default' ) }
			onChange={ onChange }
			value={ text || value }
		/>
	);
};

export default Border;
