import { __ } from '@wordpress/i18n';
import { Button, Modal, ExternalLink } from '@wordpress/components';
import { useEntityRecords, store as coreStore } from '@wordpress/core-data';
import { useDispatch } from '@wordpress/data';

import saveHelper from '../../utils/save-helper';
import { download, backup } from '@wordpress/icons';

/**
 * Renders the button to export theme.json
 *
 * @param {Object}   props
 * @param {boolean}  props.isOpen    Whether the modal is open
 * @param {Function} props.setIsOpen Function to set the modal open state
 */
const TemplateManagerModal = ( { isOpen, setIsOpen } ) => {
	const { deleteEntityRecord } = useDispatch( coreStore );

	const { records: templates } = useEntityRecords(
		'postType',
		'wp_template',
		{
			per_page: 100,
		}
	);

	if ( ! isOpen ) {
		return null;
	}

	return (
		<Modal
			focusOnMount
			title={ __( 'Block Templates', 'themer' ) }
			onRequestClose={ () => setIsOpen( false ) }
		>
			<table>
				{ templates.map( ( template ) => {
					const isCustomised =
						template.has_theme_file && template.source === 'custom';
					const editUrl = `site-editor.php?postId=${ template.id }&postType=wp_template&canvas=edit`;
					return (
						<tr key={ template.id }>
							<td>
								<ExternalLink href={ editUrl }>
									{ template.title.raw }
								</ExternalLink>
							</td>
							<td>
								{ isCustomised && (
									<Button
										icon={ backup }
										isDestructive
										onClick={ () =>
											deleteEntityRecord(
												'postType',
												'wp_template',
												template.id
											)
										}
									>
										{ __( 'Reset', 'themer' ) }
									</Button>
								) }
							</td>
							<td>
								<Button
									icon={ download }
									onClick={ () => saveHelper( template ) }
								>
									{ __( 'Export', 'themer' ) }
								</Button>
							</td>
						</tr>
					);
				} ) }
			</table>
		</Modal>
	);
};

export default TemplateManagerModal;
