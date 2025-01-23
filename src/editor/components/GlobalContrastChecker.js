import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

import { varToHex } from '../../utils/block-helpers';
import { getContrastRatio } from '../../utils/colour-contrast';
import getThemeOption from '../../utils/get-theme-option';

/**
 *
 * @param {*} param0
 * @return
 */
const GlobalContrastChecker = ( { themeConfig } ) => {
	const { colourViolations } = useSelect( ( select ) => {
		return {
			colourViolations: select( 'bigbite/themer' ).getColourViolations(),
		};
	}, [] );

	const themePalette = getThemeOption(
		'settings.color.palette.theme',
		themeConfig
	);

	const { setColourViolations } = useDispatch( 'bigbite/themer' );
	useEffect( () => {
		const themeConfigStyles = themeConfig.styles;
		const violations = Object.entries( themeConfigStyles ).reduce(
			( acc, [ key, value ] ) => {
				if ( key !== 'color' ) {
					return acc;
				}
				const contrastRatio = getContrastRatio(
					varToHex( value.background, themePalette ),
					varToHex( value.text, themePalette )
				);

				if ( contrastRatio >= 7 ) {
					return acc;
				}

				acc.push( {
					path: 'mypath',
					contrastRatio,
				} );
				return acc;
			},
			[]
		);

		setColourViolations( violations );
	}, [ themeConfig, themePalette, setColourViolations ] );

	/*
		step 1: register a react store - done
		step 1.5: check you can access the store.
		step 2: loop through root, element, blocks.   Check colour and that text, background exists. preform accessibility tests
		step 3: save results to store
  */
	return <div> test notice </div>;
};

export default GlobalContrastChecker;
