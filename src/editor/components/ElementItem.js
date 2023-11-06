import Styles from './Styles';

/**
 * Individual element item
 *
 * @param {Object} props      Component props
 * @param {string} props.name Element name
 * @param {string} props.path Path name
 */
const ElementItem = ( { path, name } ) => {
	if ( ! name ) {
		return;
	}

	return (
		<details className="themer--blocks-item-component">
			<summary>{ name }</summary>
			<div className="themer--blocks-item-component--styles">
				<Styles path={ `${ path }.${ name }` } />
			</div>
		</details>
	);
};

export default ElementItem;
