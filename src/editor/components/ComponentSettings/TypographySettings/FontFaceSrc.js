import { set, get } from 'lodash';
import { __ } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';
import { Button, TextControl, Modal } from '@wordpress/components';
import { plus } from '@wordpress/icons';

import getThemeOption from '../../../../utils/get-theme-option';
import EditorContext from '../../../context/EditorContext';
import StylesContext from '../../../context/StylesContext';

const FontFaceSrc = ( { selector, familyIndex, fontFaceIndex } ) => {
	const { userConfig, themeConfig } = useContext( EditorContext );
	const { setUserConfig } = useContext( StylesContext );
	const value = getThemeOption( selector, themeConfig ) || [];

	const [ newSrc, setNewSrc ] = useState( '' );

	let srcOptions = [];

	if ( fontFaceIndex !== '' ) {
		srcOptions = value[ familyIndex ].fontFace[ fontFaceIndex ]?.src || [];
	}

	const handleNewValue = ( newValue, index ) => {
		let config = structuredClone( userConfig );
		config = set(
			config,
			`${ selector }[${ familyIndex }].fontFace[${ fontFaceIndex }].src[${ index }]`,
			newValue
		);
		setUserConfig( config );
	};

	const pushNewSrc = () => {
		let config = structuredClone( userConfig );
		let obj =
			get(
				config,
				`${ selector }[${ familyIndex }].fontFace[${ fontFaceIndex }].src`
			) || [];
		obj.push( newSrc );
		config = set(
			config,
			`${ selector }[${ familyIndex }].fontFace[${ fontFaceIndex }].src`,
			obj
		);
		setUserConfig( config );
		setNewSrc( '' );
	};

	return (
		<div>
			{ srcOptions.map( ( srcOption, index ) => (
				<TextControl
					label={ `Src ${ index }` }
					value={ srcOption }
					onChange={ ( val ) => handleNewValue( val, index ) }
				/>
			) ) }
			<TextControl
				label="Add Src"
				value={ newSrc }
				onChange={ ( val ) => setNewSrc( val ) }
			/>
			<Button icon={ plus } onClick={ pushNewSrc }>
				Add Src
			</Button>
		</div>
	);
};

export default FontFaceSrc;
