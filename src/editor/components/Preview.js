/**
 * This component requires use of experimental apis
 */

/* eslint-disable @wordpress/no-unsafe-wp-apis */

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
 * @param {string} props.previewSize
 */
function Preview( { baseOptions, previewCss, previewSize } ) {
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
				level: 1,
			} ),
			createBlock( 'core/paragraph', {
				content: `This is the Post Content block, it will display all the blocks in any single post or page.`,
			} ),
			createBlock( 'core/paragraph', {
				content: `That might be a simple arrangement like consecutive paragraphs in a blog post, or a more elaborate composition that includes image galleries, videos, tables, columns, and any other block types.`,
			} ),
			createBlock( 'core/paragraph', {
				content: `If there are any Custom Post Types registered at your site, the Post Content block can display the contents of those entries as well.`,
			} ),
			createBlock( 'core/list', {
				values: '<li>one</li><li>two</li><li>three</li>',
				ordered: true,
			} ),
			createBlock( 'core/quote', {
				value: `<p>I never even thought about whether or not they understand what I'm doing… the emotional reaction is all that matters. As long as there's some feeling of communication, it isn't necessary that it be understood.</p>`,
				citation: 'John Coltrane',
			} ),
			createBlock( 'core/pullquote', {
				value: `<p>It's not about standing still and becoming safe. If anybody wants to keep creating they have to be about change.</p>`,
				citation: 'Miles Davis',
			} ),
		] );
	}, [ editorStyles ] );

	const contentRef = useRef();

	const handlePreviewSize = () => {
		switch ( previewSize ) {
			case 'desktop':
				return '768px';
			case 'tablet':
				return '514px';
			case 'mobile':
				return '384px';
			default:
				return '768px';
		}
	};

	return (
		<ShortcutProvider>
			<BlockEditorProvider
				value={ blocks }
				settings={ { ...baseOptions, stlyes: previewCss } }
			>
				<div
					className="editor-styles-wrapper"
					style={ { width: handlePreviewSize() } }
					inert=""
				>
					{ /* <EditorStyles styles={ [ { css: previewCss } ] } /> */ }
					<BlockTools
						className={
							'edit-site-visual-editor is-focus-mode is-view-mode'
						}
						__unstableContentRef={ contentRef }
					>
						<BlockList
							renderAppender={ false }
							className={
								'edit-site-block-editor__block-list wp-site-blocks has-global-padding'
							}
						/>
					</BlockTools>
				</div>
			</BlockEditorProvider>
		</ShortcutProvider>
	);
}

export default Preview;
