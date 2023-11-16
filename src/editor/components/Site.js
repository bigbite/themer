import { __ } from '@wordpress/i18n';

import Styles from './Styles';

/**
 * Site tab menu component
 */
const Site = () => {
	return (
		<section className="themer--blocks-component">
			<h2>{ __( 'Site', 'themer' ) }</h2>
			<p>{ __( 'Customise the appearance of the site.', 'themer' ) }</p>
			<Styles selector="styles" />
		</section>
	);
};

export default Site;
