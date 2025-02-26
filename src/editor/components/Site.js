import { __experimentalHeading as Heading } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import Styles from './Styles';

import PreviewExampleButton from './PreviewExampleButton';

/**
 * Site tab menu component
 */
const Site = () => {
	return (
		<section className="themer--panel">
			<span className="themer-styles-heading">
				<Heading level={ 4 }>{ __( 'Site', 'themer' ) }</Heading>
				<PreviewExampleButton />
			</span>
			<p>{ __( 'Customise the appearance of the site.', 'themer' ) }</p>
			<Styles selector="styles" />
		</section>
	);
};

export default Site;
