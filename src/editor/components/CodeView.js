import { __experimentalUseNavigator as useNavigator } from '@wordpress/components';
import { useMemo } from '@wordpress/element';

/**
 * Renders code view component.
 *
 * @param {Object} props             Component props
 * @param {Object} props.themeConfig Current theme configuration
 */
const CodeView = ( { themeConfig } ) => {
	const { location } = useNavigator();

	/**
	 * Get the code section within the theme config which relates to
	 * the current navigator location.
	 *
	 * e.g. `/blocks/core%2Fparagraph` -> `blocks.['core/paragraph']`
	 * e.g. `/elements/button/:hover` -> `elements.button.[':hover']`
	 * e.g. `/blocks/core%2Fcolumn/caption/:focus` -> `blocks.['core/column'].elements.caption.[':focus']`
	 */
	const code = useMemo( () => {
		/**
		 * If the current location is the root path, return the entire
		 * styles object, omitting the blocks and elements keys.
		 */
		if ( location.path === '/' ) {
			const { blocks, elements, ...rest } = themeConfig.styles;
			return rest;
		}

		/**
		 * Remove the leading slash from the path so we don't end up with
		 * an empty string as the first part of the pathParts array.
		 */
		const path = location.path.startsWith( '/' )
			? location.path.slice( 1 )
			: location.path;

		/**
		 * Split the path into parts and replace any encoded slashes with
		 * regular slashes, as these are used in block names.
		 */
		const pathParts = path.split( '/' ).map( ( part ) => {
			return part.replace( /%2F/g, '/' );
		} );

		/**
		 * Elements nested under blocks are stored in the styles object
		 * as `blocks.blockName.elements.elementName`. This code ensures
		 * that the correct path is used in these cases.
		 *
		 * e.g. `/blocks/core%2Fbutton/link` -> `blocks.['core/button'].elements.link`
		 */
		if ( pathParts[ 0 ] === 'blocks' && pathParts.length >= 3 ) {
			pathParts.splice( 2, 0, 'elements' );
		}

		/**
		 * Traverse the theme config object to find the code section
		 * that relates to the current navigator location.
		 */
		const foundCode = pathParts.reduce( ( acc, part ) => {
			if ( acc ) {
				return acc[ part ];
			}
			return acc;
		}, themeConfig.styles );

		return foundCode;
	}, [ themeConfig, location ] );

	return (
		<pre>
			<code>{ JSON.stringify( code, null, 2 ) }</code>
		</pre>
	);
};

export default CodeView;
