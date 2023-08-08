import { select } from '@wordpress/data';

/**
 * Returns a list of registered core blocks
 *
 * @return {Array}
 */
export const getCoreBlocks = () => select( 'core/blocks' ).getBlockTypes();

/**
 * Returns a list of registered custom blocks
 *
 * @return {Array}
 */
export const getCustomBlocks = () => [];
