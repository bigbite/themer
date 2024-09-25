import { __experimentalHeading as Heading, Icon } from '@wordpress/components';
import { useContext } from '@wordpress/element';

import Settings from './Settings';

import EditorContext from '../../context/EditorContext';

import { getBlockSettingsFromSchema } from '../../../utils/block-helpers';

/**
 * Renders the block styles visible in the styles panel
 *
 * @param {Object} props          Component props
 * @param {string} props.name     Block name
 * @param {string} props.selector Selector to locate this block in the schema
 */
const SettingsItem = ( { name, selector } ) => {
	const { schema } = useContext( EditorContext );

	if ( ! name ) {
		return;
	}

	const schemaBlocks = getBlockSettingsFromSchema( schema );

	const block = schemaBlocks?.find(
		( schemaBlock ) => schemaBlock.name === name
	);

	const settingsSelector = `settings.${ selector }`;

	return (
		<>
			<span className="themer-styles-heading">
				<Icon icon={ block.icon.src } size={ 24 } />
				<Heading level={ 4 }>{ block.title }</Heading>
			</span>
			<p>{ block.description }</p>
			<Settings selector={ settingsSelector } />
		</>
	);
};

export default SettingsItem;
