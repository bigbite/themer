import { useContext } from '@wordpress/element';
import EditorContext from '../context/EditorContext';

import Border from './StylesBorder';
import getThemeOption from '../../utils/get-theme-option';

/**
 * Individual block item
 *
 * @param {string} block Block name
 */
const BlocksItem = ( { block } ) => {
	if ( ! block ) {
		return;
	}

	const blockSelector = [ 'styles', 'blocks', block ];
	const { themeConfig } = useContext( EditorContext );
	const hasBorderStyles = getThemeOption(
		[ ...blockSelector, 'border' ].join( '.' ),
		themeConfig
	);

	return (
		<details className="themer--blocks-item-component">
			<summary>{ block }</summary>
			<div className="themer--blocks-item-component--styles">
				{ hasBorderStyles && (
					<Border
						selector={ [ ...blockSelector, 'border' ].join( '.' ) }
					/>
				) }
			</div>
		</details>
	);
};

export default BlocksItem;
