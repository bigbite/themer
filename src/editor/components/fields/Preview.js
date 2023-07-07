import {
	BlockTools,
	BlockEditorProvider,
	BlockList,
	__unstableEditorStyles as EditorStyles,
} from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { ShortcutProvider } from '@wordpress/keyboard-shortcuts';
import { useState, useEffect, useMemo, useRef } from '@wordpress/element';

/**
 * renders preview element
 *
 * @param {Object} props
 * @param {Object} props.baseOptions
 * @param {string} props.previewCss
 */
function Preview( { baseOptions, previewCss } ) {
	const [ blocks, updateBlocks ] = useState();

	const editorStyles = useMemo( () => {
		if ( baseOptions.styles ) {
			return [ baseOptions.styles ];
		}

		return baseOptions.styles;
	}, [ baseOptions.styles ] );

	useEffect( () => {
		updateBlocks( [
			createBlock( 'core/heading', {
				content: 'Post title',
			} ),
			createBlock( 'core/paragraph', {
				content: `This is the Post Content block, it will display all the blocks in any single post or page.
  That might be a simple arrangement like consecutive paragraphs in a blog post, or a more elaborate composition that includes image galleries, videos, tables, columns, and any other block types.
  If there are any Custom Post Types registered at your site, the Post Content block can display the contents of those entries as well.`,
			} ),
			createBlock( 'core/list', {
				values: '<li>one</li><li>two</li><li>three</li>',
				ordered: true,
			} ),
		] );
	}, [ editorStyles ] );

	const contentRef = useRef();

	return (
		<ShortcutProvider>
			<BlockEditorProvider value={ blocks } settings={ baseOptions }>
				<div className="editor-styles-wrapper">
					<EditorStyles styles={ [ { css: previewCss } ] } />
					<BlockTools
						className={
							'edit-site-visual-editor is-focus-mode is-view-mode'
						}
						__unstableContentRef={ contentRef }
					>
						<BlockList
							renderAppender={ false }
							className={
								'edit-site-block-editor__block-list wp-site-blocks'
							}
						/>
					</BlockTools>
				</div>
			</BlockEditorProvider>
		</ShortcutProvider>
	);
}

export default Preview;
