import { __ } from '@wordpress/i18n';
import { set, union } from 'lodash';
import { useContext } from '@wordpress/element';
import { DuotonePicker } from '@wordpress/components';

import getThemeOption from '../../utils/get-theme-option';
import EditorContext from '../context/EditorContext';
import StylesContext from '../context/StylesContext';
import { varToDuotone, duotoneToVar } from '../../utils/block-helpers';

/**
 * Reusable filter control style component
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 */
const Filter = ( { selector } ) => {
	const { themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
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

	if ( duotoneOptions.length === 0 ) {
		return null;
	}

	const filterStyles = getThemeOption( selector, themeConfig );

	/**
	 * Updates the theme config with the new value.
	 *
	 * @param {string} newVal - The new value.
	 */
	const handleNewValue = ( newVal ) => {
		const newFilterStyles = {
			...filterStyles,
			duotone: duotoneToVar( newVal, duotoneOptions ),
		};
		let config = structuredClone( themeConfig );
		config = set( config, selector, newFilterStyles );
		setUserConfig( config );
	};

	return (
		<>
			<span className="themer--styles__item__title themer--styles__item__title--filter">
				{ __( 'Filter', 'themer' ) }
			</span>
			<DuotonePicker
				duotonePalette={ duotoneOptions }
				onChange={ handleNewValue }
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
