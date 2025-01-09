import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext, useState, useEffect } from '@wordpress/element';
import { ToggleControl, CheckboxControl } from '@wordpress/components';

import getThemeOption from '../../../utils/get-theme-option';
import EditorContext from '../../context/EditorContext';
import StylesContext from '../../context/StylesContext';

/**
 * Component for Spacing settings
 *
 * @param {Object} props             Component props
 * @param {string} props.selector    Property target selector
 * @param {string} props.description Property description
 */
const SettingsSpacing = ( { selector, description } ) => {
	const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig ) || [];
	const userValue = getThemeOption( selector, userConfig ) || [];

	const [ units, setUnits ] = useState( userValue?.units || [] );

	const onChange = ( newValue, key ) => {
		let config = structuredClone( userConfig );
		config = set( config, [ selector, key ].join( '.' ), newValue );
		setUserConfig( config );
	};

	const handleUnitChange = ( val ) => {
		if ( units.includes( val ) ) {
			const index = units.indexOf( val );
			const newUnits = [ ...units ];
			newUnits.splice( index, 1 );
			setUnits( newUnits );
		} else if ( ! units.includes( val ) ) {
			const newUnits = [ ...units, val ];
			setUnits( newUnits );
		}
	};

	useEffect( () => {
		let config = structuredClone( userConfig );
		config = set( config, `${ selector }.units`, units );
		setUserConfig( config );
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ units ] );

	return (
		<>
			<span className="themer--settings__item__title">
				{ __( 'Spacing', 'themer' ) }
			</span>
			{ description && (
				<p className="themer--settings__item__description">
					{ description }
				</p>
			) }
			<ToggleControl
				checked={ value?.blockGap }
				label={ __( 'Block Gap', 'themer' ) }
				onChange={ ( val ) => {
					onChange( val, 'blockGap' );
				} }
			/>
			<ToggleControl
				checked={ value?.margin }
				label={ __( 'Margin', 'themer' ) }
				onChange={ ( val ) => {
					onChange( val, 'margin' );
				} }
			/>
			<ToggleControl
				checked={ value?.padding }
				label={ __( 'Padding', 'themer' ) }
				onChange={ ( val ) => {
					onChange( val, 'padding' );
				} }
			/>
			<span className="themer--settings__item__title">
				{ __( 'Units', 'themer' ) }
			</span>
			<div className="themer--styles__item__control">
				<CheckboxControl
					checked={ units.includes( 'px' ) }
					label={ __( 'px', 'themer' ) }
					onChange={ () => handleUnitChange( 'px' ) }
				/>
				<CheckboxControl
					checked={ units.includes( 'em' ) }
					label={ __( 'em', 'themer' ) }
					onChange={ () => handleUnitChange( 'em' ) }
				/>
				<CheckboxControl
					checked={ units.includes( 'rem' ) }
					label={ __( 'rem', 'themer' ) }
					onChange={ () => handleUnitChange( 'rem' ) }
				/>
				<CheckboxControl
					checked={ units.includes( 'vh' ) }
					label={ __( 'vh', 'themer' ) }
					onChange={ () => handleUnitChange( 'vh' ) }
				/>
				<CheckboxControl
					checked={ units.includes( 'vw' ) }
					label={ __( 'vw', 'themer' ) }
					onChange={ () => handleUnitChange( 'vw' ) }
				/>
				<CheckboxControl
					checked={ units.includes( '%' ) }
					label={ __( '%', 'themer' ) }
					onChange={ () => handleUnitChange( '%' ) }
				/>
			</div>
		</>
	);
};

export default SettingsSpacing;
