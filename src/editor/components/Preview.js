import {
	BlockEditorProvider,
	BlockList,
	__unstableEditorStyles as EditorStyles,
} from '@wordpress/block-editor';
import { ShortcutProvider } from '@wordpress/keyboard-shortcuts';
import { useEffect, useContext } from '@wordpress/element';

import EditorContext from '../context/EditorContext';

/**
 * renders preview element
 *
 * @param {Object} props
 * @param {Object} props.baseOptions
 * @param {string} props.previewCss
 * @param {string} props.previewSize
 */
const Preview = ( { baseOptions, previewCss, previewSize } ) => {
	const { previewBlocks, resetPreviewBlocks } = useContext( EditorContext );

	useEffect( () => {
		if ( ! previewBlocks ) {
			resetPreviewBlocks();
		}
	}, [ previewBlocks, resetPreviewBlocks ] );

	const handlePreviewSize = () => {
		switch ( previewSize ) {
			case 'desktop':
				return '100%';
			case 'tablet':
				return '514px';
			case 'mobile':
				return '384px';
			default:
				return '100%';
		}
	};

	return (
		<ShortcutProvider className="themer-preview__container">
			<BlockEditorProvider
				value={ previewBlocks?.blocks }
				settings={ baseOptions }
			>
				<div
					className="editor-styles-wrapper"
					style={ { width: handlePreviewSize() } }
					inert=""
				>
					<EditorStyles styles={ [ { css: previewCss } ] } />
					<BlockList
						renderAppender={ false }
						className={
							'edit-site-block-editor__block-list wp-site-blocks has-global-padding'
						}
					/>
				</div>
			</BlockEditorProvider>
		</ShortcutProvider>
	);
};

export default Preview;
