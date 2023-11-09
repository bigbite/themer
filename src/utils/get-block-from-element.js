import { createBlock, getBlockFromExample } from '@wordpress/blocks';

/**
 * Create a block object from an element.
 *
 * @param {string} name
 *
 * @return {Object|null} block or null if not found
 */
const getBlockFromElement = ( name ) => {
	switch ( name ) {
		case 'link':
			return createBlock( 'core/paragraph', {
				content: "This is my content with a <a href='#'>Link</a>.",
			} );
		case 'button':
			return getBlockFromExample( 'core/button', {} );
		default:
			return null;
	}
};

export default getBlockFromElement;
