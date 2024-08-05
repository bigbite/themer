import { useContext, useEffect, useState } from '@wordpress/element';

import EditorContext from '../context/EditorContext';
import { eye } from '../utils/icons';

const StylesItem = ( { children, selector, title,  } ) => {
	const [ selectorId, setSelectorId ] = useState('');
	const { addPropToMetaConfig } = useContext( EditorContext );
	
	useEffect(() => {
		const newSelectorId = addPropToMetaConfig(selector)?.id ?? '';
		setSelectorId(newSelectorId);
	}, [])
	
	return (
		<div className="themer--styles__item">
			<div className="themer--styles__toolbar">
				<span className="themer--styles__item__title">
					{ title }
				</span>
				<a
					className="themer--styles__button"
					role="navigation"
					aria-label="Jump to code"
					href={`#themer-styles-prop-id-${selectorId}`}
				>
					{ eye }
				</a>
			</div>
			<div>
				{ children }
			</div>
		</div>
	)
};

export default StylesItem;
