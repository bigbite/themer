import { Notice } from '@wordpress/components';

/**
 * Component for displaying notices
 *
 * @param {Object}  props
 * @param {string}  props.status
 * @param {string}  props.message
 * @param {boolean} props.isDismissible
 */
const ThemerNotice = ( { status, message = '', isDismissible } ) => {
	return (
		message.length > 0 && (
			<Notice status={ status } isDismissible={ isDismissible }>
				<p>
					{ status }: { message }
				</p>
			</Notice>
		)
	);
};

export default ThemerNotice;
