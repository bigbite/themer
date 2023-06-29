import Field from './Field';

/**
 * loops over theme config and renders fields
 *
 * @param {Object}  props
 * @param {Object}  props.sourceObject
 * @param {string}  props.path
 * @param {boolean} props.child
 */
const Fields = ( { sourceObject, path = '', child } ) => {
	return Object.entries( sourceObject ).map( ( [ key, value ] ) => {
		const currentPath = `${ path }.${ key }`;
		/**
		 * If we encounter an unknown object, recursively call the function again using it's value
		 */
		if ( typeof value === 'object' && value !== null ) {
			return (
				<div
					key={ currentPath }
					className={ `themer-nav-${ child ? 'child' : 'parent' }` }
				>
					<p className="themer-nav-title">{ key }</p>
					<Fields sourceObject={ value } path={ currentPath } child />
				</div>
			);
		}
		/**
		 * If we encounter a string, render a field
		 */
		if ( typeof value === 'string' ) {
			return (
				<Field
					key={ currentPath }
					path={ currentPath }
					id={ key }
					value={ value }
				/>
			);
		}
		return null;
	} );
};

export default Fields;
