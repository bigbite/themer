import { Notice } from '@wordpress/components';

/**
 * Component for displaying notices
 *
 * @param {Object} props
 * @param {string} props.status
 * @param {string} props.message
 * @returns {false | React.JSX.Element}
 */
const ThemerNotice = ( { status, message = '' } ) => {
	return (
		message.length > 0 && (
			<Notice status={ status }>
				<p>
					{ status }: { message }
				</p>
			</Notice>
		)
	);
};

export default ThemerNotice;
