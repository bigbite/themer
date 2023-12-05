import {
	Button,
	__experimentalUseNavigator as useNavigator,
} from '@wordpress/components';
import { useContext, useEffect } from '@wordpress/element';
import { seen } from '@wordpress/icons';

import EditorContext from '../context/EditorContext';

import { getPreviewFromRouteParams } from '../../utils/blockPreviews';

import ResponsiveButton from './ResponsiveButton';

/**
 * button to handle responsive preview options
 *
 */
const PreviewToolbar = () => {
	const {
		previewExampleIsActive,
		setPreviewExampleIsActive,
		setPreviewBlocks,
		resetPreviewBlocks,
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
		<div className="themer-preview__toolbar">
			<Button
				className="themer-styles-heading__right"
				onClick={ handlePreviewExampleToggle }
				icon={ seen }
				isPressed={ previewExampleIsActive }
				label="Toggle example"
			/>
			<ResponsiveButton />
		</div>
	);
};

export default PreviewToolbar;
