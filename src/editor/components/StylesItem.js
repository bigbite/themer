import { Button } from '@wordpress/components';

import { eye } from '../utils/icons';

const StylesItem = ( { title, children } ) => {
	return (
		<div className="themer--styles__item">
			<div className="themer--styles__toolbar">
				<span className="themer--styles__item__title">
					{ title }
				</span>
				<Button
					className="themer--styles__button"
					role="navigation"
					aria-label="Jump to code"
				>
					{ eye }
				</Button>
			</div>
			<div>
				{ children }
			</div>
		</div>
	)
};

export default StylesItem;
