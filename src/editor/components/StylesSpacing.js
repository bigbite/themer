import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { __experimentalSpacingSizesControl as SpacingSizesControl } from '@wordpress/block-editor';

import { varToSpacing } from '../../utils/block-helpers';
import getThemeOption from '../../utils/get-theme-option';
import EditorContext from '../context/EditorContext';

/**
 * Reusable spacing control style component
 */
const Spacing = ( { selector } ) => {
	const { themeConfig } = useContext( EditorContext );
	const spacingStyles = getThemeOption( selector, themeConfig );
	const themeSpacing = getThemeOption(
		'settings.spacing.spacingSizes',
		themeConfig
	);

	const allControls = Object.keys( spacingStyles ).map( ( key ) => (
		<div key={ key } className="themer--blocks-item-component--column">
			<SpacingSizesControl 
				values={ varToSpacing(spacingStyles[key], themeSpacing) }
				label={ key }
				allowReset={ false }
			/>
		</div>
	) );

	return (
		<>
			<span className="themer--blocks-item-component--styles--title">
				{ __( 'Spacing', 'themer' ) }
			</span>
			<div className="themer--blocks-item-component--columns themer--blocks-item-component--columns-2">
				{ allControls }
			</div>
		</>
	);
};

export default Spacing;
