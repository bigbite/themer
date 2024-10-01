import { useMemo, useEffect, useContext } from '@wordpress/element';
import { BlockEditorProvider, BlockCanvas } from '@wordpress/block-editor';
import { SlotFillProvider, Spinner } from '@wordpress/components';

import EditorContext from '../context/EditorContext';
import classnames from 'classnames';

/**
 * @param {Object} props
 * @param {string} props.className
 * @param {Object} props.editorSettings Settings for the block editor
 *
 * @return {JSX.Element} A non-interactive preview of the blocks
 */
const BlockView = ( { className, editorSettings } ) => {
	const { previewBlocks, resetPreviewBlocks, previewSize } =
		useContext( EditorContext );

	useEffect( () => {
		if ( ! previewBlocks ) {
			resetPreviewBlocks();
		}
	}, [ previewBlocks, resetPreviewBlocks ] );

	/**
	 * The memoized settings for the block editor.
	 */
	const settings = useMemo(
		() => ( {
			...editorSettings,
			__unstableIsPreviewMode: true,
			styles: {
				...editorSettings.styles,
				// blockStyles,
			},
		} ),
		[ editorSettings ]
	);

	const wrapperClasses = classnames(
		'themer-block-preview',
		`themer-block-preview--${ previewSize }`,
		className
	);

	if ( ! previewBlocks?.blocks ) {
		return (
			<div className={ wrapperClasses }>
				<Spinner />
			</div>
		);
	}

	return (
		<div className={ wrapperClasses }>
			<SlotFillProvider>
				<BlockEditorProvider
					value={ previewBlocks.blocks }
					settings={ settings }
				>
					<BlockCanvas height="80vh" styles={ settings.styles } />
				</BlockEditorProvider>
			</SlotFillProvider>
		</div>
	);
};

export default BlockView;
