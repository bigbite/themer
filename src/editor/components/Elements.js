import { useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import ElementItem from './ElementItem';

import EditorContext from '../context/EditorContext';
import { getElementsFromSchema } from '../../utils/block-helpers';

/**
 * Elements tab menu component
 *
 * @param {Object} props      Component props
 * @param {string} props.path Path name
 */
const Elements = ( { path } ) => {
	const { schema } = useContext( EditorContext );
	const elements = getElementsFromSchema( schema );

	return (
		<section className="themer--blocks-component">
			<h2>{ __( 'Elements', 'themer' ) }</h2>
			<p>
				{ __(
					'Customise the appearance of specific HTML elements for the whole site.',
					'themer'
				) }
			</p>
			{ elements.map( ( element ) => (
				<ElementItem key={ element } name={ element } path={ path } />
			) ) }
		</section>
	);
};

export default Elements;
