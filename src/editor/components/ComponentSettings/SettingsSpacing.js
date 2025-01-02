import { set, get } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';
import { TextControl, Button, ToggleControl } from '@wordpress/components';
import { cancelCircleFilled, plus } from '@wordpress/icons';

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
	const units = value?.units || [];
	const [ newUnit, setNewUnit ] = useState( '' );

	const onChange = ( newValue, key ) => {
		let config = structuredClone( userConfig );
		config = set( config, [ selector, key ].join( '.' ), newValue );
		setUserConfig( config );
	};

	const handleUpdateUnit = ( newValue, index ) => {
		let config = structuredClone( userConfig );
		config = set( config, `${ selector }.units[${ index }]`, newValue );
		setUserConfig( config );
	};

	const handleDelete = ( index ) => {
		let config = structuredClone( userConfig );
		const obj = get( config, `${ selector }.units` );
		obj.splice( index, 1 );
		config = set( config, `${ selector }.units`, obj );
		setUserConfig( config );
	};

	const handleNewUnit = () => {
		let config = structuredClone( userConfig );
		const obj = get( config, `${ selector }.units` ) || [];
		obj.push( newUnit );
		config = set( config, `${ selector }.units`, obj );
		setUserConfig( config );
		setNewUnit( '' );
	};

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
			Units
			{ units.map( ( unit, index ) => {
				return (
					<div
						className="themer--styles__item__control"
						key={ index }
					>
						<span className="themer--styles__inline-units">
							<TextControl
								value={ unit }
								onChange={ ( newValue ) => {
									handleUpdateUnit( newValue, index );
								} }
							/>
							<Button
								onClick={ () => {
									handleDelete( index );
								} }
								icon={ cancelCircleFilled }
							/>
						</span>
					</div>
				);
			} ) }
			{
				<div>
					<span className="themer--styles__inline-units">
						<TextControl
							value={ newUnit }
							onChange={ ( val ) => {
								setNewUnit( val );
							} }
						/>
						<Button
							icon={ plus }
							onClick={ () => {
								handleNewUnit();
							} }
						/>
					</span>
				</div>
			}
		</>
	);
};

export default SettingsSpacing;
