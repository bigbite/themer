import { createBlock } from '@wordpress/blocks';

function getDefaultPreview() {
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

export default getDefaultPreview;
