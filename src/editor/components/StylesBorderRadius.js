import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext, useState, useEffect, useRef } from '@wordpress/element';
import {
	__experimentalUnitControl as UnitControl,
	RangeControl,
	__experimentalHStack as HStack,
	__experimentalGrid as Grid,
	Button,
} from '@wordpress/components';

import getThemeOption from '../../utils/get-theme-option';
import EditorContext from '../context/EditorContext';
import StylesContext from '../context/StylesContext';

/**
 * Reusable border control style component
 *
 * @param {Object} props          Component props
 * @param {string} props.selector Property target selector
 */
const BorderRadius = ( { selector } ) => {
	const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig );

	// Set initial state to determine if the values are linked or unlinked
	const [ hasLinkedValues, setHasLinkedValues ] = useState(
		typeof value === 'object' ? false : true
	);

	// Set initial state for the linked value
	const [ linkedValue, setLinkedValue ] = useState( value?.topLeft ?? value );

	// Set initial state for the unlinked values
	const [ unlinkedValues, setUnlinkedValues ] = useState( {
		topLeft: value?.topLeft ?? value,
		topRight: value?.topRight ?? value,
		bottomRight: value?.bottomRight ?? value,
		bottomLeft: value?.bottomLeft ?? value,
	} );

	// Set mount reference to avoid unlinked values being changes on initial mount
	const isInitialMount = useRef( true );

	// Main function to push data to the user config
	const onChange = ( newValue ) => {
		let config = structuredClone( userConfig );
		config = set( config, selector, newValue );
		setUserConfig( config );
	};

	// When the values change, update the user config
	useEffect( () => {
		if ( isInitialMount.current ) {
			isInitialMount.current = false;
		} else {
			onChange( hasLinkedValues ? linkedValue : unlinkedValues );
		}
	}, [ unlinkedValues, linkedValue, hasLinkedValues ] );

	/**
	 * Handle changes to the linked value
	 *
	 * @param {string} newValue The updated linked value
	 */
	const handleLinkedValueChange = ( newValue ) => {
		// Set the linked value
		setLinkedValue( newValue );

		// Also set the unlinked values to the new linked value
		const updatedUnlinkedValues = {
			topLeft: newValue,
			topRight: newValue,
			bottomRight: newValue,
			bottomLeft: newValue,
		};
		setUnlinkedValues( updatedUnlinkedValues );
	};

	/**
	 * Add the measurement unit to the value from the slider
	 *
	 * @param {string} newValue The updated value
	 */
	const addMeasurement = ( newValue ) => {
		// Get the unit of measurement
		const measurementUnit = String( linkedValue ).replace( /[0-9.]/g, '' );

		// Concatenate the new value with the unit of measurement
		const updatedValue = newValue + measurementUnit;

		// Update the linked value
		handleLinkedValueChange( updatedValue );
	};

	/**
	 * A function to handle changes to an unlinked value
	 *
	 * @param {string} newValue The updated value
	 * @param {string} position The border radius position
	 *
	 * @return {Object} The updated unlinked values
	 */
	const handleUnlinkedValueChange = ( newValue, position ) => {
		const updatedValue = {
			...unlinkedValues,
			[ position ]: newValue,
		};

		return updatedValue;
	};

	return (
		<>
			<HStack spacing="3">
				{ hasLinkedValues ? (
					<HStack spacing="3">
						<div className="components-base-control components-input-control components-number-control components-unit-control components-unit-control-wrapper e1bagdl32 ep09it41 css-x5161z ej5x27r4">
							<UnitControl
								onChange={ handleLinkedValueChange }
								value={ linkedValue }
							/>
						</div>
						<div className="components-base-control components-range-control css-mn3isp ej5x27r4">
							<div className="components-base-control__field css-1sf3vf3 ej5x27r3">
								<RangeControl
									__nextHasNoMarginBottom
									label={ __( 'Border radius' ) }
									hideLabelFromVision
									initialPosition={ 0 }
									max={ 100 }
									min={ 0 }
									onChange={ addMeasurement }
									step={ 1 }
									value={
										parseInt( linkedValue ) || undefined
									}
									withInputField={ false }
								/>
							</div>
						</div>
					</HStack>
				) : (
					<Grid alignment="bottom" columns={ 2 } gap={ 2 }>
						<UnitControl
							label={ __( 'Top left border radius', 'themer' ) }
							hideLabelFromVision
							onChange={ ( topLeftValue ) =>
								setUnlinkedValues(
									handleUnlinkedValueChange(
										topLeftValue,
										'topLeft'
									)
								)
							}
							value={ value?.topLeft ?? value }
						/>
						<UnitControl
							label={ __( 'Top right border radius', 'themer' ) }
							hideLabelFromVision
							onChange={ ( topRightValue ) =>
								setUnlinkedValues(
									handleUnlinkedValueChange(
										topRightValue,
										'topRight'
									)
								)
							}
							value={ value?.topRight ?? value }
						/>
						<UnitControl
							label={ __(
								'Bottom left border radius',
								'themer'
							) }
							hideLabelFromVision
							onChange={ ( bottomLeftValue ) =>
								setUnlinkedValues(
									handleUnlinkedValueChange(
										bottomLeftValue,
										'bottomLeft'
									)
								)
							}
							value={ value?.bottomLeft ?? value }
						/>
						<UnitControl
							label={ __(
								'Bottom right border radius',
								'themer'
							) }
							hideLabelFromVision
							onChange={ ( bottomRightValue ) =>
								setUnlinkedValues(
									handleUnlinkedValueChange(
										bottomRightValue,
										'bottomRight'
									)
								)
							}
							value={ value?.bottomRight ?? value }
						/>
					</Grid>
				) }
				<Button
					onClick={ () => setHasLinkedValues( ! hasLinkedValues ) }
					icon={ hasLinkedValues ? 'admin-links' : 'editor-unlink' }
					isSmall
					label={
						hasLinkedValues
							? __( 'Unlink radii', 'themer' )
							: __( 'Link radii', 'themer' )
					}
				></Button>
			</HStack>
		</>
	);
};

export default BorderRadius;
