import { Notice } from '@wordpress/components';

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
