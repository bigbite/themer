import { __ } from '@wordpress/i18n';
import { Button, Modal, ExternalLink } from '@wordpress/components';
import { useEntityRecords, store as coreStore } from '@wordpress/core-data';
import { useDispatch } from '@wordpress/data';

import { download, trash } from '@wordpress/icons';
import { savePhpFile } from '../../utils/save-file';

/**
 * SavedPatternsModal Component
 *
 * This component renders a modal displaying a list of saved patterns (WordPress block patterns).
 * Users can edit, remove, or export patterns from this modal.
 *
 * @param {Object}   props           - Component properties.
 * @param {boolean}  props.isOpen    - Determines if the modal is open.
 * @param {Function} props.setIsOpen - Function to toggle the modal's open state.
 *
 * @return {JSX.Element|null} The rendered modal component or null if `isOpen` is false.
 */
const SavedPatternsModal = ( { isOpen, setIsOpen } ) => {
	const { deleteEntityRecord } = useDispatch( coreStore );

	const { records: patterns } = useEntityRecords( 'postType', 'wp_block', {
		per_page: 100,
		status: [ 'publish', 'draft' ],
		_embed: true,
	} );

	if ( ! isOpen ) {
		return null;
	}

	return (
		<Modal
			focusOnMount
			title={ __( 'Saved Patterns', 'themer' ) }
			onRequestClose={ () => setIsOpen( false ) }
		>
			<table>
				<tbody>
					{ patterns.map( ( pattern ) => {
						const isSynced =
							pattern.wp_pattern_sync_status !== 'unsynced';

						const editUrl = `site-editor.php?postId=${ pattern.id }&postType=wp_block&canvas=edit`;

						return (
							<tr key={ pattern.id }>
								<td>
									{ isSynced && (
										<span className="themer--tag">
											{ __( 'Synced', 'themer' ) }
										</span>
									) }
								</td>
								<td>
									<ExternalLink href={ editUrl }>
										{ pattern.title.raw
											? pattern.title.raw
											: __( '(no title)', 'default' ) }
									</ExternalLink>
								</td>
								<td>
									<Button
										icon={ trash }
										isDestructive
										onClick={ () =>
											deleteEntityRecord(
												'postType',
												'wp_block',
												pattern.id
											)
										}
									>
										{ __( 'Remove', 'default' ) }
									</Button>
								</td>
								<td>
									<Button
										icon={ download }
										onClick={ () => savePhpFile( pattern ) }
									>
										{ __( 'Export', 'default' ) }
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

export default SavedPatternsModal;
