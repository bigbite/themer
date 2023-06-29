import Field from './Field';

/**
 * loops over theme config and renders fields
 *
 * @param {Object} props
 * @param {Object} props.baseConfig
 * @param {Object} props.sourceObject
 * @param {string} props.path
 * @param {boolean} props.child
 */
const Fields = ( { baseConfig, sourceObject, path = '', child } ) => {
	return Object.entries( sourceObject ).map( ( [ key, value ] ) => {
		if ( typeof value === 'object' && value !== null ) {
			const currentPath = `${ path }.${ key }`;
			return (
				<div
					key={ currentPath }
					className={ `themer-nav-${ child ? 'child' : 'parent' }` }
				>
					<p className="themer-nav-title">{ key }</p>
					<Fields
						baseConfig={ baseConfig }
						sourceObject={ value }
						path={ currentPath }
						child
					/>
				</div>
			);
		}
		if ( typeof value === 'string' ) {
			const currentPath = path;
			return (
				<Field
					key={ currentPath }
					parent={ currentPath }
					id={ key }
					value={ value }
					data={ baseConfig }
				/>
			);
		}
	} );
};

export default Fields;
