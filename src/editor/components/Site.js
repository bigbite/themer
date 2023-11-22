import { __experimentalHeading as Heading } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import Styles from './Styles';

/**
 * Site tab menu component
 */
const Site = () => {
	return (
		<section>
			<Heading level={ 4 }>{ __( 'Site', 'themer' ) }</Heading>
			<p>{ __( 'Customise the appearance of the site.', 'themer' ) }</p>
			<Styles selector="styles" />
		</section>
	);
};

export default Site;
