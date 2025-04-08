import { __ } from '@wordpress/i18n';
import { Button, Modal, ExternalLink } from '@wordpress/components';
import { useEntityRecords, store as coreStore } from '@wordpress/core-data';
import { useDispatch } from '@wordpress/data';

import { saveHtmlFile } from '../../utils/save-file';
import { download, backup } from '@wordpress/icons';

/**
 * Renders the button to export theme.json
 *
 * @param {Object}   props
 * @param {boolean}  props.isOpen    Whether the modal is open
 * @param {Function} props.setIsOpen Function to set the modal open state
 */
const TemplatePartManagerModal = ( { isOpen, setIsOpen } ) => {
	const { deleteEntityRecord } = useDispatch( coreStore );

	const { records: templateParts } = useEntityRecords(
		'postType',
		'wp_template_part',
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
			title={ __( 'Template Parts', 'themer' ) }
			onRequestClose={ () => setIsOpen( false ) }
		>
			<table>
				<tbody>
					{ templateParts.map( ( templatePart ) => {
						const isCustom = templatePart.source === 'custom';
						const hasThemeFile = templatePart.has_theme_file;

						const editUrl = `site-editor.php?postId=${ templatePart.id }&postType=wp_template_part&canvas=edit`;

						return (
							<tr key={ templatePart.id }>
								<td>
									<ExternalLink href={ editUrl }>
										{ templatePart.title.raw }
									</ExternalLink>
								</td>
								<td>
									{ isCustom && (
										<Button
											icon={ backup }
											isDestructive
											onClick={ () =>
												deleteEntityRecord(
													'postType',
													'wp_template_part',
													templatePart.id
												)
											}
										>
											{ hasThemeFile
												? __( 'Reset', 'default' )
												: __( 'Remove', 'default' ) }
										</Button>
									) }
								</td>
								<td>
									<Button
										icon={ download }
										onClick={ () =>
											saveHtmlFile( templatePart )
										}
									>
										{ __( 'Export', 'themer' ) }
									</Button>
								</td>
							</tr>
						);
					} ) }
				</tbody>
			</table>
		</Modal>
	);
};

export default TemplatePartManagerModal;
