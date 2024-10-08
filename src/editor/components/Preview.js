import { useContext } from '@wordpress/element';

import EditorContext from '../context/EditorContext';

import BlockView from './BlockView';
import CodeView from './CodeView';

import PreviewToolbar from './PreviewToolbar';

/**
 * Preview component
 *
 * @param {Object} props
 * @param {Object} props.editorSettings Settings for the block editor
 */
const Preview = ( { editorSettings } ) => {
	const { themeConfig, previewMode } = useContext( EditorContext );

	return (
		<div className="themer-preview">
			<PreviewToolbar />
			<div className="themer-preview__container">
				{ previewMode === 'visual' && (
					<BlockView editorSettings={ editorSettings } />
				) }
				{ previewMode === 'code' && (
					<CodeView themeConfig={ themeConfig } />
				) }
			</div>
		</div>
	);
};

export default Preview;
