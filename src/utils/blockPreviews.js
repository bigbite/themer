import {
	createBlock,
	getBlockFromExample,
	store as blocksStore,
} from '@wordpress/blocks';
import { select } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Create a default block preview
 *
 * @return {Array<Object>} Array of blocks
 */
export function getDefaultPreview() {
	return [
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
	];
}

/**
 * Create a block preview specific to heading blocks
 *
 * @return {Array<Object>} Array of blocks
 */
export function getHeadingPreview() {
	return [
		createBlock( 'core/heading', {
			content: __( 'Code Is Poetry' ),
			level: 1,
		} ),
		createBlock( 'core/heading', {
			content: __( 'Code Is Poetry' ),
			level: 2,
		} ),
		createBlock( 'core/heading', {
			content: __( 'Code Is Poetry' ),
			level: 3,
		} ),
		createBlock( 'core/heading', {
			content: __( 'Code Is Poetry' ),
			level: 4,
		} ),
		createBlock( 'core/heading', {
			content: __( 'Code Is Poetry' ),
			level: 5,
		} ),
	];
}

/**
 * Create a block preview based on a block name
 * Uses the block example defined during block registration or the heading preview for core/heading blocks
 *
 * @param {string} blockName
 * @return {Object} Block object
 */
export function getBlockPreview( blockName ) {
	if ( blockName === 'core/heading' ) {
		return getHeadingPreview();
	}

	const { getBlockType } = select( blocksStore );
	const block = getBlockType( blockName );

	if ( block?.example ) {
		return [ getBlockFromExample( block.name, block.example ) ];
	}

	let preview;
	try {
		preview = [ createBlock( blockName ) ];
	} catch ( e ) {
		preview = [];
	}
	return preview;
}

/**
 * Create a block preview based on an element name
 *
 * @param {string} elementName
 *
 * @return {Array<Object>|null} Array of blocks or null if no preview available
 */
export function getElementPreview( elementName ) {
	switch ( elementName ) {
		case 'button':
			return getBlockPreview( 'core/button' );
		case 'link':
			return [
				createBlock( 'core/paragraph', {
					content:
						'In a village of La Mancha, <a href="#">the name of which</a> I have no desire to call to mind, there lived not long since one of those gentlemen that keep a lance in the lance-rack, an old  <a href="#">buckler</a>, a lean hack, and a  <a href="#">greyhound</a> for coursing.',
				} ),
			];
		case 'heading':
		case 'h1':
		case 'h2':
		case 'h3':
		case 'h4':
		case 'h5':
		case 'h6':
			return getHeadingPreview();
		case 'caption':
			return getBlockPreview( 'core/image' );
		case 'cite':
			return getBlockPreview( 'core/quote' );
		default:
			return null;
	}
}

/**
 * Gets a block preview from the current route params.
 * Returns the default preview if no params are passed.
 * The block preview will override the element preview if both are passed.
 *
 * @param {*} params - the route params
 * @return {Object} - the preview blocks
 */
export function getPreviewFromRouteParams( params ) {
	let previewBlocks = getDefaultPreview();

	if ( ! params ) {
		return previewBlocks;
	}

	if ( params.elementName ) {
		const elementPreview = getElementPreview( params.elementName );
		if ( elementPreview ) {
			previewBlocks = {
				name: params.elementName,
				blocks: elementPreview,
			};
		}
	}

	if ( params.blockName ) {
		const blockPreview = getBlockPreview( params.blockName );
		if ( blockPreview ) {
			previewBlocks = { name: params.blockName, blocks: blockPreview };
		}
	}

	return previewBlocks;
}
