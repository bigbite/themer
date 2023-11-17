import { __experimentalUseNavigator as useNavigator } from '@wordpress/components';
import { useContext } from '@wordpress/element';

import EditorContext from '../context/EditorContext';
import getThemeOption from '../../utils/get-theme-option';

import NavButton from './NavButton';

const PSEUDO_KEYS = [
	':hover',
	':focus',
	':active',
	':visited',
	':link',
	':any-link',
];

const Pseudos = ( { selector } ) => {
	const { themeConfig } = useContext( EditorContext );
	const { goTo, location } = useNavigator();

	const themeJSONParent = getThemeOption( selector, themeConfig );

	const themeJSONPseudos = Object.keys( themeJSONParent )?.filter(
		( pseudo ) => PSEUDO_KEYS?.includes( pseudo )
	);

	if ( 0 === themeJSONPseudos.length ) {
		return null;
	}

	// filter out any pseudos not present in theme.json
	const pseudos = PSEUDO_KEYS.filter( ( pseudo ) =>
		themeJSONPseudos.includes( pseudo )
	);

	return (
		<>
			<ul>
				{ pseudos.map( ( pseudo ) => {
					const route = `${ location.path }/${ pseudo }`;
					return (
						<li key={ route }>
							<NavButton onClick={ () => goTo( route ) }>
								{ pseudo.replace( ':', '' ) }
							</NavButton>
						</li>
					);
				} ) }
			</ul>
		</>
	);
};

export default Pseudos;
