import { set } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';
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

	/**
	 * Handle changes to the border radius value
	 *
	 * @param {string} newValue The updated linked value
	 */
	const onChange = ( newValue ) => {
		let config = structuredClone( userConfig );
		config = set( config, selector, newValue );
		setUserConfig( config );
	};

	/**
	 * Handle toggling between linked and unlinked values
	 */
	const handleToggleValueType = () => {
		setHasLinkedValues( ! hasLinkedValues );

		// When switching from unlinked to linked values, set the value to the topleft value
		if ( ! hasLinkedValues ) {
			onChange( value?.topLeft );
		}
	};

	/**
	 * Handle value changes made via the range control
	 *
	 * @param {string} newValue The updated value
	 */
	const handleRangeValue = ( newValue ) => {
		// Get the unit of measurement, or default to px
		const valueUnit = value
			? String( value ).replace( /[0-9.]/g, '' )
			: 'px';

		// Concatenate the new value with the unit of measurement (or use px if one isn't defined)
		const updatedValue = newValue + ( valueUnit ?? 'px' );

		// Update the value
		onChange( updatedValue );
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
		// Define the structure of the unlinked values and set default values, if required
		const unlinkedStructure = {
			topLeft: value?.topLeft ?? value,
			topRight: value?.topRight ?? value,
			bottomLeft: value?.bottomLeft ?? value,
			bottomRight: value?.bottomRight ?? value,
		};

		// Insert in the updated value
		const updatedValue = {
			...unlinkedStructure,
			[ position ]: newValue,
		};

		// Return the updated values
		return updatedValue;
	};

	return (
		<>
			<HStack spacing="3">
				{ hasLinkedValues ? (
					<HStack spacing="3">
						<div className="components-base-control components-input-control components-number-control components-unit-control components-unit-control-wrapper e1bagdl32 ep09it41 css-x5161z ej5x27r4">
							<UnitControl
								onChange={ onChange }
								value={ value }
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
									onChange={ handleRangeValue }
									step={ 1 }
									value={ parseInt( value ) || undefined }
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
								onChange(
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
								onChange(
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
								onChange(
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
								onChange(
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
					onClick={ handleToggleValueType }
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
