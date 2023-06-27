/**
 * This component requires use of experimental apis
 */

/* eslint-disable @wordpress/no-unsafe-wp-apis */

import { useState } from '@wordpress/element';
import {
	Button,
	RangeControl,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';

/**
 * renders component for managing spacing elements
 *
 * @param {Object} props
 * @param {Object} props.value
 * @param {Event}  props.onChange
 * @param {Object} props.data
 */
const SpacingControl = ( { value, onChange, data } ) => {
	const [ toggle, setToggle ] = useState( isNaN( Array.from( value )[ 0 ] ) );

	/**
	 * returns default markers for spacing component
	 *
	 * @param {number} val
	 */
	const getRangeMarks = ( val ) => {
		const marks = data?.settings?.spacing?.spacingSizes?.theme;
		const result = [];
		marks.forEach( ( item ) => {
			result.push( {
				value: item.size,
				label: item.name,
			} );
		} );
		if ( val ) {
			return result[ val ].value;
		}

		return result;
	};

	return (
		<>
			<Button
				icon="menu"
				onClick={ () => setToggle( ! toggle ) }
				isPressed={ ! toggle }
			/>
			{ toggle && (
				<>
					<RangeControl
						min={ 1 }
						max={ getRangeMarks().length - 1 }
						marks={ getRangeMarks }
						onChange={ ( val ) => onChange( getRangeMarks( val ) ) }
					/>
				</>
			) }
			{ ! toggle && (
				<>
					<UnitControl
						value={ value }
						onChange={ ( val ) => {
							onChange( val );
						} }
					/>
				</>
			) }
		</>
	);
};

export default SpacingControl;
