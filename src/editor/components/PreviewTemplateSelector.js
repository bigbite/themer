import { parse } from '@wordpress/blocks';
import {
	Button,
	Dropdown,
	MenuGroup,
	MenuItemsChoice,
} from '@wordpress/components';
import { useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { moreVertical } from '@wordpress/icons';

import EditorContext from '../context/EditorContext';
import { useEntityRecords } from '@wordpress/core-data';

/**
 * Dropdown menu to select the preview template
 */
const PreviewModeSelector = () => {
	const { previewBlocks, resetPreviewBlocks, setPreviewBlocks } =
		useContext( EditorContext );

	const templates = useEntityRecords( 'postType', 'wp_template', {
		per_page: -1,
	} );

	const templateOptions = templates.records?.map( ( template ) => {
		return {
			label: template.title.rendered,
			value: template.id,
		};
	} );

	const handleSelect = ( value ) => {
		if ( value === 'default' ) {
			resetPreviewBlocks();
			return;
		}

		const rawContent = templates.records.find(
			( template ) => template.id === value
		).content.raw;

		setPreviewBlocks( {
			name: value,
			blocks: parse( rawContent ),
		} );
	};

	return (
		<Dropdown
			icon={ moreVertical }
			label={ __( 'Select a template', 'themer' ) }
			renderToggle={ ( { isOpen, onToggle } ) => (
				<Button
					variant="tertiary"
					onClick={ onToggle }
					aria-expanded={ isOpen }
				>
					{ previewBlocks?.name }
				</Button>
			) }
			renderContent={ () => (
				<MenuGroup>
					<MenuItemsChoice
						choices={ [
							{ label: 'Default', value: 'default' },
							...templateOptions,
						] }
						value={ previewBlocks.name }
						onSelect={ handleSelect }
					/>
				</MenuGroup>
			) }
		/>
	);
};

export default PreviewModeSelector;
