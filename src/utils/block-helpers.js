import { select } from '@wordpress/data';
import { useContext } from '@wordpress/element';
import EditorContext from '../editor/context/EditorContext';

/**
 * Returns a list of core blocks that are in the theme.json schema
 * and also have styles set in theme.json
 *
 * @return {Array}
 */
const getCoreBlocksFromSchema = () => {
	const { themeConfig, schema } = useContext( EditorContext );
	const schemaBlocks = Object.keys(
		schema?.definitions?.stylesBlocksPropertiesComplete?.properties ?? {}
	);
	const themeJSONBlocks = Object.keys( themeConfig?.styles?.blocks ?? {} );
	return schemaBlocks?.filter( ( block ) =>
		themeJSONBlocks?.includes( block )
	);
};

/**
 * Returns a list of registered core blocks
 *
 * @param {int} mode Mode of operation
 *                   0: Use core store as data source
 *                   1: Use schema and theme.json as data source
 *
 * @return {Array}
 */
export const getCoreBlocks = ( mode = 0 ) => {
	switch ( mode ) {
		case 1:
			return select( 'core/blocks' ).getBlockTypes();
		case 0:
		default:
			return getCoreBlocksFromSchema();
	}
};

/**
 * Returns a list of registered custom blocks
 *
 * @return {Array}
 */
export const getCustomBlocks = () => [];
