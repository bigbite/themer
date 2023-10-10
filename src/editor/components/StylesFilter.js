/* eslint-disable jsdoc/check-line-alignment */
import { __ } from '@wordpress/i18n';
import { set, union } from 'lodash';
import { useContext } from '@wordpress/element';
import { DuotonePicker } from '@wordpress/components';

import getThemeOption from '../../utils/get-theme-option';
import EditorContext from '../context/EditorContext';
import StylesContext from '../context/StylesContext';
import { varToDuotone, duotoneToVar } from '../../utils/block-helpers';

/**
 * Reusable spacing control style component
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 */
const Filter = ( { selector } ) => {
	const { themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const filterStyles = getThemeOption( selector, themeConfig );
	const duotoneThemeObj = getThemeOption(
		'settings.color.duotone',
		themeConfig
	);
	const duotonePalettes = Object.keys( duotoneThemeObj );
	let duotoneOptions = [];
	duotonePalettes.forEach(
		( palette ) =>
			( duotoneOptions = union(
				duotoneOptions,
				duotoneThemeObj[ palette ]
			) )
	);

	/**
	 * Updates the theme config with the new value.
	 *
	 * @param {string} newVal - The new value.
	 */
	const handleNewValue = ( newVal ) => {
		filterStyles.duotone = duotoneToVar( newVal, duotoneOptions );
		let config = structuredClone( themeConfig );
		config = set( config, selector, filterStyles );
		setUserConfig( config );
	};

	return (
		<>
			<span className="themer--blocks-item-component--styles--title is-filter">
				{ __( 'Filter', 'themer' ) }
			</span>
			<DuotonePicker
				duotonePalette={ duotoneOptions }
				onChange={ ( newVal ) => handleNewValue( newVal ) }
				value={ varToDuotone( filterStyles?.duotone, duotoneOptions ) }
				disableCustomColors={ true }
				disableCustomDuotones={ true }
				clearable={ false }
				unsetable={ false }
			/>
		</>
	);
};

export default Filter;
