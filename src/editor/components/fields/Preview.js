
const { BlockTools, BlockEditorProvider, BlockList } = wp.blockEditor;
const { createBlock } = wp.blocks;
const { useState, useEffect, useMemo, Fragment } = wp.element;
const { ShortcutProvider } = wp.keyboardShortcuts;
const { ExperimentalBlockEditorProvider } = unlock(blockEditorPrivateApis);
// import { ReusableBlocksMenuItems } from '@wordpress/reusable-blocks';
import EditCanvas from './EditCanvas.js';
// import { GlobalStylesProvider } from './global-styles-provider.js';
// import { EntityProvider } from '@wordpress/core-data';

import { __experimentalStyleProvider as StyleProvider } from '@wordpress/components';

import { unlock } from '../../utils/private-apis.js';

import {
  privateApis as blockEditorPrivateApis,
  __unstableEditorStyles as EditorStyles,
  __unstableIframe as Iframe,
  __experimentalLayoutStyle as LayoutStyle,
  __unstableUseClipboardHandler as useClipboardHandler,
  __unstableUseTypingObserver as useTypingObserver,
} from '@wordpress/block-editor';

import { useMergeRefs, useResizeObserver } from '@wordpress/compose';

import { useRef } from '@wordpress/element';




function Preview({ baseOptions }) {

  const [blocks, updateBlocks] = useState();
  const [resizeObserver, sizes] = useResizeObserver();

  const editorStyles = useMemo(() => {
    if (baseOptions.styles) {
      return [baseOptions.styles];
    }

    return baseOptions.styles;
  }, [baseOptions.styles]);

  useEffect(() => {
    updateBlocks([
      createBlock('core/heading', {
        // style: editorStyles[0],
        content: 'Post title',
      }),
      createBlock('core/paragraph', {
        content: `This is the Post Content block, it will display all the blocks in any single post or page.
  That might be a simple arrangement like consecutive paragraphs in a blog post, or a more elaborate composition that includes image galleries, videos, tables, columns, and any other block types.
  If there are any Custom Post Types registered at your site, the Post Content block can display the contents of those entries as well.`,
        // style: editorStyles[0],
      }),
      createBlock('core/list', {
        values: '<li>one</li><li>two</li><li>three</li>',
        ordered: true,
        // style: editorStyles[0],
      }),
    ]);
  }, [editorStyles]);

  const contentRef = useRef();
  const mergedRefs = useMergeRefs([contentRef, useClipboardHandler(), useTypingObserver()]);

  return (


    // <>
    //   <div className="themerPreviewTopbar">
    //     <p className="topbarLeft">Themer</p>
    //     <p className="topbarRight">Sample Page</p>
    //   </div>

    <ShortcutProvider >
      {/* <GlobalStylesProvider> */}
      <BlockEditorProvider value={blocks} settings={baseOptions}>
        <div className={'edit-site-visual-editor'}>
          <ExperimentalBlockEditorProvider value={blocks}>
            <BlockTools
              className={'edit-site-visual-editor is-focus-mode is-view-mode'}
              __unstableContentRef={contentRef}
            >
              {/* <EditorCanvas settings={baseOptions}> */}
              <EditCanvas
                settings={baseOptions}
                contentRef={mergedRefs}
                enableResizing={false}
                readonly={true}
              >
                <BlockList
                  renderAppender={false}
                  className={'edit-site-block-editor__block-list wp-site-blocks'}
                />
              </EditCanvas>
              {/* </EditorCanvas> */}
            </BlockTools>
          </ExperimentalBlockEditorProvider>
        </div>
      </BlockEditorProvider>
      {/* </GlobalStylesProvider> */}
    </ShortcutProvider>
    // </>
  );
  
}

export default Preview;
