import { set } from 'lodash';
import { useContext, useState } from '@wordpress/element';
import { GradientPicker, Button, TextControl } from '@wordpress/components';
import { plus } from '@wordpress/icons';

import getThemeOption from '../../../../utils/get-theme-option';
import EditorContext from '../../../context/EditorContext';
import StylesContext from '../../../context/StylesContext';
/**
 * Reusable GradientPicker component
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 */
const Gradient = ( { selector } ) => {
	const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const gradientValues = getThemeOption( selector, themeConfig ) || [];

	const [ newGradient, setNewGradient ] = useState( {} );
	const [ showNewGradient, setShowNewGradient ] = useState( false );

	const onChange = ( value, key ) => {
		const targetIndex = gradientValues.findIndex(
			( item ) => item.slug === key
		);
		let config = structuredClone( userConfig );
		config = set(
			config,
			`${ selector }[${ targetIndex }].gradient`,
			value
		);
		setUserConfig( config );
	};

	const handleNewGradient = () => {
		const newGradientValues = [ ...gradientValues, newGradient ];
		let config = structuredClone( userConfig );
		config = set( config, selector, newGradientValues );
		setUserConfig( config );
		setShowNewGradient( false );
		setNewGradient( {} );
	};

	if ( ! gradientValues ) {
		return (
			<>
				<Button
					icon={ plus }
					onClick={ () => setShowNewGradient( ! showNewGradient ) }
				/>
				{ showNewGradient && (
					<div className="themer--styles__item__column">
						<TextControl
							label="Gradient Name"
							value={ newGradient.name }
							onChange={ ( val ) =>
								setNewGradient( {
									...newGradient,
									name: val,
								} )
							}
						/>
						<GradientPicker
							value={ newGradient.gradient }
							onChange={ ( val ) =>
								setNewGradient( {
									...newGradient,
									gradient: val,
								} )
							}
						/>
						<Button onClick={ handleNewGradient } isSecondary>
							Save Gradient
						</Button>
					</div>
				) }
			</>
		);
	}

	return (
		<>
			{ gradientValues.map( ( gradVal ) => {
				return (
					<div
						key="Gradient"
						className="themer--styles__item__column"
					>
						<span className="themer--styles__item__label">
							{ gradVal.name }
						</span>
						<GradientPicker
							key={ gradVal.name }
							value={ gradVal.gradient }
							onChange={ ( currentGradient ) =>
								onChange( currentGradient, gradVal.slug )
							}
						/>
					</div>
				);
			} ) }
			<>
				<Button
					icon={ plus }
					onClick={ () => setShowNewGradient( ! showNewGradient ) }
				/>
				{ showNewGradient && (
					<div className="themer--styles__item__column">
						<TextControl
							label="Gradient Name"
							value={ newGradient.name }
							onChange={ ( val ) =>
								setNewGradient( {
									...newGradient,
									name: val,
								} )
							}
						/>
						<GradientPicker
							value={ newGradient.gradient }
							onChange={ ( val ) =>
								setNewGradient( {
									...newGradient,
									gradient: val,
								} )
							}
						/>
						<Button onClick={ handleNewGradient } isSecondary>
							Save Gradient
						</Button>
					</div>
				) }
			</>
		</>
	);
};

export default Gradient;
