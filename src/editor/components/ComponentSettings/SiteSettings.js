import { __experimentalHeading as Heading } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import Settings from './Settings';

/**
 * Site tab menu component
 */
const Site = () => {
	return (
		<section className="themer--panel">
			<div className="themer--settings-header">
				<Heading level={ 4 }>{ __( 'Site', 'themer' ) }</Heading>
				<p>
					{ __( 'Customise the appearance of the site.', 'themer' ) }
				</p>
			</div>
			<Settings selector="settings" />
		</section>
	);
};

export default Site;
