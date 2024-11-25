import {
	Button,
	__experimentalUseNavigator as useNavigator,
} from '@wordpress/components';
import { useContext, useEffect } from '@wordpress/element';
import { seen } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import EditorContext from '../context/EditorContext';

import { getPreviewFromRouteParams } from '../../utils/blockPreviews';

/**
 * Button to handle updating the preview example blocks
 *
 */
const PreviewExampleButton = () => {
	const {
		previewExampleIsActive,
		setPreviewExampleIsActive,
		setPreviewBlocks,
		resetPreviewBlocks,
		previewMode,
	} = useContext( EditorContext );

	const { params } = useNavigator();

	useEffect( () => {
		if ( previewExampleIsActive ) {
			const preview = getPreviewFromRouteParams( params );
			setPreviewBlocks( preview );
		} else {
			resetPreviewBlocks();
		}
	}, [
		params,
		previewExampleIsActive,
		resetPreviewBlocks,
		setPreviewBlocks,
	] );

	const handlePreviewExampleToggle = () => {
		if ( previewExampleIsActive ) {
			setPreviewExampleIsActive( false );
			resetPreviewBlocks();
			return;
		}
		setPreviewExampleIsActive( true );
	};

	return (
		<Button
			className="themer-styles-heading__right"
			onClick={ handlePreviewExampleToggle }
			icon={ seen }
			isPressed={ previewExampleIsActive && previewMode !== 'code' }
			disabled={ previewMode === 'code' }
			label={ __( 'Toggle example', 'themer' ) }
		/>
	);
};

export default PreviewExampleButton;
